import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, Send, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the server
    console.log('Form submitted:', formData);
    // Reset form or show success message
    alert("Message sent successfully (Demo)");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-container relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

      <div className="text-center mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Get In <span className="text-gradient">Touch</span></h2>
          <div className="w-20 md:w-24 h-1 bg-orbit-gradient mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
            Have questions about our platform or need assistance to start trading? Our dedicated team is here to help you 24/5.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-14 max-w-full mx-auto px-0 lg:px-10">
        
        {/* Contact Info container */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6 md:space-y-8"
        >
          <div className="glass-card p-6 md:p-8 hover:bg-white/10 transition-colors h-full flex flex-col justify-center space-y-8 border-white/5">
            <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
            <p className="text-gray-400 mb-6 font-medium">Available 24/5 for all your trading inquiries and support needs.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue shrink-0 shadow-[0_0_15px_rgba(0,198,255,0.2)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Email Us</h4>
                  <p className="text-gray-400">support@orbitfx.org</p>
                  <p className="text-gray-400">info@orbitfx.org</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-crypto-violet/10 flex items-center justify-center text-crypto-violet shrink-0 shadow-[0_0_15px_rgba(138,43,226,0.2)]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Call Us</h4>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-500 text-sm">Mon-Fri, 9am-6pm (EST)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-neon-blue/10 flex items-center justify-center text-neon-blue shrink-0 shadow-[0_0_15px_rgba(0,255,204,0.2)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Office</h4>
                  <p className="text-gray-400">Global Financial Center</p>
                  <p className="text-gray-400">New York, NY 10004</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10 space-y-6 relative overflow-hidden group border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-crypto-violet/10 rounded-full blur-3xl group-hover:bg-electric-blue/20 transition-colors duration-700 pointer-events-none"></div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">Send us a Message</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all font-medium backdrop-blur-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all font-medium backdrop-blur-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Your Message
              </label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
                rows="5"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all resize-none font-medium backdrop-blur-md"
              ></textarea>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary w-full flex justify-center items-center gap-2 py-4 text-lg font-bold group cursor-pointer"
            >
              Send Message 
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
