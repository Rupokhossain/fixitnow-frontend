/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  CheckCircle2,
  Zap,
  DollarSign,
  Users,
} from 'lucide-react'



interface StatsProps {
  stats: {
    totalUsers: number;
    totalBookings: number;
    totalRevenue: number;
    activeTechnicians: number;
  }
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  orange: 'bg-orange-50 text-orange-600',
  purple: 'bg-purple-50 text-purple-600',
}



export default function OverviewCards({ stats }: StatsProps) {


   const cards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers,
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Total Bookings',
      value: stats?.totalBookings,
      icon: CheckCircle2,
      color: 'green',
    },
    {
      title: 'Platform Revenue',
      value: `$${stats?.totalRevenue}`,
      icon: DollarSign,
      color: 'orange',
    },
    {
      title: 'Total Technicians',
      value: stats?.activeTechnicians,
      icon: Zap,
      color: 'purple',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {card.value}
                  </p>
                  {/* <p className="text-xs text-gray-500 mt-1">{card.subtext}</p> */}
                </div>
                <div className={`p-3 rounded-lg ${(colorClasses as any)[card.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
