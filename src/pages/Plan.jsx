import React, { useEffect } from 'react';
import BusinessPlan from '../components/home/BusinessPlan';

const Plan = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <BusinessPlan />
    </div>
  );
};

export default Plan;
