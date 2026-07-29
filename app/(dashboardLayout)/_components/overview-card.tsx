'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  CheckCircle2,
  Zap,
  DollarSign,
  TrendingUp,
} from 'lucide-react'

interface OverviewCard {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  subtext?: string
  color: 'blue' | 'green' | 'orange' | 'purple'
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  orange: 'bg-orange-50 text-orange-600',
  purple: 'bg-purple-50 text-purple-600',
}

export default function OverviewCards() {
  const cards: OverviewCard[] = [
    {
      title: 'Total Bookings',
      value: '24',
      icon: CheckCircle2,
      subtext: '+4 this month',
      color: 'blue',
    },
    {
      title: 'Active Jobs',
      value: '3',
      icon: Zap,
      subtext: 'In progress',
      color: 'green',
    },
    {
      title: 'Pending Payments',
      value: '$1,240',
      icon: DollarSign,
      subtext: '2 invoices',
      color: 'orange',
    },
    {
      title: 'Success Rate',
      value: '98%',
      icon: TrendingUp,
      subtext: 'Last 30 days',
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
                  <p className="text-xs text-gray-500 mt-1">{card.subtext}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[card.color]}`}>
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
