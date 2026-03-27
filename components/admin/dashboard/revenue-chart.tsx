"use client";

import { useMemo } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export default function RevenueChart() {
  const data = useMemo(() => [
    { name: "Jan", revenue: 4000, bookings: 24 },
    { name: "Feb", revenue: 3000, bookings: 13 },
    { name: "Mar", revenue: 5000, bookings: 38 },
    { name: "Apr", revenue: 4500, bookings: 29 },
    { name: "Mei", revenue: 6000, bookings: 48 },
    { name: "Jun", revenue: 8000, bookings: 55 },
    { name: "Jul", revenue: 10000, bookings: 79 },
    { name: "Ags", revenue: 9500, bookings: 68 },
    { name: "Sep", revenue: 12500, bookings: 88 },
  ], []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl">
          <p className="font-bold text-gray-900 mb-1">{`Bulan ${label}`}</p>
          <p className="text-sm text-orange-600 font-medium">
            Pendapatan: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(payload[0].value * 1000)}
          </p>
          <p className="text-sm text-blue-600 font-medium mt-1">
            Total Pemesanan: {payload[1].value} Kamar
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 13 }}
            dy={10}
          />
          <YAxis 
            yAxisId="left"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 13 }}
            tickFormatter={(value) => `Rp${value}K`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            axisLine={false} 
            tickLine={false} 
            tick={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="revenue" 
            stroke="#f97316" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            activeDot={{ r: 6, fill: "#f97316", stroke: "#fff", strokeWidth: 3 }}
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="bookings" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorBookings)" 
            activeDot={{ r: 5, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
