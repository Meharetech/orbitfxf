import React, { useState, useEffect, useCallback } from 'react';
import api from '../../../api/apiConfig';
import { Search, User } from 'lucide-react';

// Color by status
const getNodeColor = (node) => {
  if (!node) return 'vacant';
  if (node.isActivated) return 'active';
  return 'inactive';
};

const COLORS = {
  active:   { ring: '#22c55e', bg: '#052e16', text: '#22c55e', label: 'VIP ID' },
  inactive: { ring: '#ef4444', bg: '#2d0b0b', text: '#ef4444', label: 'Unpaid ID' },
  vacant:   { ring: '#4b5563', bg: '#111827', text: '#6b7280', label: 'Vacant'   },
};

// ── Avatar Circle ─────────────────────────────────────────────────────────────
const Avatar = ({ node, size = 56, onClick }) => {
  const type = getNodeColor(node);
  const c = COLORS[type];
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer group"
      style={{ minWidth: size + 16 }}
    >
      <div
        className="rounded-full flex items-center justify-center font-black transition-transform duration-200 group-hover:scale-110 relative"
        style={{
          width: size,
          height: size,
          background: c.bg,
          border: `3px solid ${c.ring}`,
          boxShadow: `0 0 14px ${c.ring}55`,
          color: c.text,
          fontSize: size * 0.35,
        }}
      >
        {node ? node.name?.charAt(0)?.toUpperCase() : <User size={size * 0.38} style={{ color: c.text, opacity: 0.4 }} />}
      </div>
      <span
        className="mt-1.5 text-center max-w-[80px] truncate font-bold"
        style={{ fontSize: 9, color: c.text, letterSpacing: '0.05em' }}
      >
        {node ? (node.referralCode || node.username || node.name) : 'Vacant'}
      </span>
    </div>
  );
};

// ── Tree Node (recursive, renders child branches below) ───────────────────────
const TreeNode = ({ node, depth = 0, onSelect }) => {
  const leftChild  = node?.left  || null;
  const rightChild = node?.right || null;
  const hasChildren = leftChild || rightChild;

  return (
    <div className="flex flex-col items-center select-none">
      {/* Self */}
      <Avatar node={node} size={depth === 0 ? 64 : 50} onClick={() => node && onSelect(node)} />

      {/* Connector to children */}
      {hasChildren && (
        <div className="flex flex-col items-center w-full">
          {/* Vertical down */}
          <div className="w-px h-5 bg-gray-600" />

          {/* Horizontal bracket */}
          <div className="relative w-full flex justify-center">
            {/* Full-width horizontal line */}
            <div
              className="absolute top-0 bg-gray-600"
              style={{ height: 1, left: '25%', right: '25%' }}
            />
            {/* Left drop */}
            <div className="absolute top-0 left-1/4 w-px h-4 bg-gray-600" />
            {/* Right drop */}
            <div className="absolute top-0 right-1/4 w-px h-4 bg-gray-600" />
          </div>

          {/* Children */}
          <div className="flex items-start justify-center gap-6 md:gap-14 pt-4">
            <TreeNode node={leftChild}  depth={depth + 1} onSelect={onSelect} />
            <TreeNode node={rightChild} depth={depth + 1} onSelect={onSelect} />
          </div>
        </div>
      )}
    </div>
  );
};

// ── Count nodes in subtree ────────────────────────────────────────────────────
const countNodes = (node) => {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
};

// ── Main Component ────────────────────────────────────────────────────────────
const TreeView = () => {
  const [treeData,  setTreeData]  = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState(null);
  const [findId,    setFindId]    = useState('');
  const [findResult, setFindResult] = useState(null);
  const [zoom,      setZoom]      = useState(1);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await api.get('/network/tree');
        setTreeData(res.data);
      } catch (err) {
        console.error('Tree fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, []);

  // Search node in tree
  const findNode = useCallback((node, query) => {
    if (!node) return null;
    const q = query.toLowerCase();
    if (
      node.referralCode?.toLowerCase().includes(q) ||
      node.username?.toLowerCase().includes(q) ||
      node.name?.toLowerCase().includes(q)
    ) return node;
    return findNode(node.left, query) || findNode(node.right, query);
  }, []);

  const handleFind = () => {
    if (!findId.trim()) return setFindResult(null);
    const result = findNode(treeData, findId.trim());
    setFindResult(result || 'not_found');
    if (result && result !== 'not_found') setSelected(result);
  };

  const leftCount  = treeData ? countNodes(treeData.left)  : 0;
  const rightCount = treeData ? countNodes(treeData.right) : 0;
  const totalCount = leftCount + rightCount;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">

      {/* ── Page Title ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
          Binary Tree <span className="text-electric-blue">View</span>
        </h2>
      </div>

      {/* ── Stats + Legend ───────────────────────────────────────────── */}
      <div className="glass-card border-white/5 bg-white/[0.01] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Stats table */}
          <div className="overflow-x-auto">
            <table className="text-center text-xs">
              <thead>
                <tr>
                  <th className="px-6 pb-2 text-gray-600 font-black uppercase tracking-widest text-[10px]" />
                  <th className="px-6 pb-2 text-electric-blue font-black uppercase tracking-widest text-[10px]">Left</th>
                  <th className="px-6 pb-2 text-crypto-violet font-black uppercase tracking-widest text-[10px]">Right</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-1 text-gray-400 font-bold text-[11px] text-left">Total Team</td>
                  <td className="px-6 py-1 text-white font-black text-lg">{leftCount}</td>
                  <td className="px-6 py-1 text-white font-black text-lg">{rightCount}</td>
                </tr>
                <tr>
                  <td className="px-6 py-1 text-gray-400 font-bold text-[11px] text-left">Total Nodes</td>
                  <td colSpan={2} className="px-6 py-1 text-amber-400 font-black text-lg">{totalCount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6">
            {Object.entries(COLORS).map(([key, c]) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                  style={{ background: c.bg, border: `3px solid ${c.ring}`, color: c.text }}
                >
                  {key === 'vacant' ? <User size={16} style={{ color: c.text, opacity: 0.4 }} /> : 'U'}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: c.text }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          {/* Find Down Line */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Find Down Line ID</p>
            <div className="flex gap-2">
              <input
                value={findId}
                onChange={e => { setFindId(e.target.value); setFindResult(null); }}
                onKeyDown={e => e.key === 'Enter' && handleFind()}
                placeholder="Enter ID or username..."
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-blue transition-all w-44"
              />
              <button
                onClick={handleFind}
                className="px-4 py-2 bg-electric-blue text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all flex items-center gap-1"
              >
                <Search size={12} /> Find
              </button>
            </div>
            {findResult === 'not_found' && (
              <p className="text-[9px] text-red-500 font-black uppercase tracking-widest">ID not found in network</p>
            )}
            {findResult && findResult !== 'not_found' && (
              <p className="text-[9px] text-green-500 font-black uppercase tracking-widest">
                ✓ Found: {findResult.name} ({findResult.referralCode})
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Tree Canvas ──────────────────────────────────────────────── */}
      <div className="glass-card border-white/5 bg-[#04060f] overflow-auto min-h-[520px]">

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[480px] gap-4">
            <div className="w-12 h-12 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Building Matrix...</p>
          </div>
        ) : !treeData ? (
          <div className="flex flex-col items-center justify-center min-h-[480px] gap-4 opacity-30">
            <User size={48} className="text-gray-700" />
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">No network data found</p>
          </div>
        ) : (
          <div className="flex items-start justify-center py-12 px-8 overflow-x-auto">
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.3s' }}>
              <TreeNode node={treeData} depth={0} onSelect={setSelected} />
            </div>
          </div>
        )}

        {/* Zoom bar */}
        <div className="sticky bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none">
          <div className="flex items-center gap-1 bg-black/60 border border-white/5 rounded-xl p-1 pointer-events-auto backdrop-blur-sm">
            <button onClick={() => setZoom(z => Math.max(0.4, +(z - 0.1).toFixed(1)))}
              className="px-3 py-1.5 text-gray-400 hover:text-white text-xs font-black rounded-lg hover:bg-white/5 transition-all">−
            </button>
            <button onClick={() => setZoom(1)}
              className="px-3 py-1.5 text-white text-[10px] font-black rounded-lg hover:bg-white/5 transition-all min-w-[52px]">
              {Math.round(zoom * 100)}%
            </button>
            <button onClick={() => setZoom(z => Math.min(1.8, +(z + 0.1).toFixed(1)))}
              className="px-3 py-1.5 text-gray-400 hover:text-white text-xs font-black rounded-lg hover:bg-white/5 transition-all">+
            </button>
          </div>
        </div>
      </div>

      {/* ── Selected Node Detail ──────────────────────────────────────── */}
      {selected && (
        <div className="glass-card border-white/5 bg-white/[0.01] p-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shrink-0"
              style={{
                background: COLORS[getNodeColor(selected)].bg,
                border: `3px solid ${COLORS[getNodeColor(selected)].ring}`,
                color: COLORS[getNodeColor(selected)].text,
              }}
            >
              {selected.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Full Name', value: selected.name },
                { label: 'Username', value: '@' + selected.username },
                { label: 'Referral ID', value: selected.referralCode },
                { label: 'Node Status', value: selected.isActivated ? '✓ Authorized' : '✗ Inactive',
                  color: selected.isActivated ? '#22c55e' : '#ef4444' },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="text-xs font-black" style={{ color: color || 'white' }}>{value}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)}
              className="text-gray-600 hover:text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 hover:bg-white/5 rounded-lg transition-all">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeView;
