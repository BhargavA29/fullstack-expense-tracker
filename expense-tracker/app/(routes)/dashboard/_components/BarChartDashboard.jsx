import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Activity</h2>
      <BarChart 
      width={500}
      height={300}
      data={budgetList}
      margin={{
        top:20,
        right:20,
        left:20,
        bottom:5
      }}
      >
        <XAxis dataKey='name'/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey='totalSpend' stackId="a" fill="#4845d2" />
        <Bar dataKey='amount' stackId="a" fill="#c3c2ff" />
      </BarChart>
    </div>
  )
}

export default BarChartDashboard
