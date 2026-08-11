"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', bookings: 400 },
  { name: 'Feb', bookings: 300 },
  { name: 'Mar', bookings: 600 },
  { name: 'Apr', bookings: 800 },
  { name: 'May', bookings: 500 },
];

export function StatsChart() {
  return (
    <div className="h-[350px] w-full bg-card p-6 rounded-[2.5rem] border border-border shadow-sm">
      <h3 className="text-lg font-black uppercase tracking-tighter mb-6">Booking Analytics</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="bookings" stroke="#4F46E5" fillOpacity={1} fill="url(#colorPv)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}