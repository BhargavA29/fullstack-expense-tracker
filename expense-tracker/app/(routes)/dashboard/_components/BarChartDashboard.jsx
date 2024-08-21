import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip } from 'recharts';

function CustomYAxis({ tickSize = 5, ...props }) {
  return <YAxis tickSize={tickSize} {...props} />;
}

function CustomXAxis({ tickSize = 5, ...props }) {
  return <XAxis tickSize={tickSize} {...props} />;
}

function BarChartDashboard({ budgetList }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing on the server, only render on the client
  }

  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
      <BarChart 

        data={budgetList}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 5
        }}
      >
        <CustomXAxis dataKey='name'/>
        <CustomYAxis /> 
        <Tooltip/>
        <Legend/>
        <Bar dataKey='totalSpend' stackId="a" fill="#4845d2" />
        <Bar dataKey='amount' stackId="a" fill="#c3c2ff" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
