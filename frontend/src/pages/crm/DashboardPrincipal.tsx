import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BarChart3, Users, DollarSign, Clock, TrendingUp } from 'lucide-react'

const DashboardPrincipal = () => {
  const stats = [
    { title: 'Leads Novos', value: '247', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'MRR', value: 'R$ 47.892', change: '+4%', icon: DollarSign, color: 'text-green-600' },
    { title: 'SLA Médio', value: '3.2 dias', change: '-1%', icon: Clock, color: 'text-orange-600' },
    { title: 'Contratos', value: '89', change: '+8%', icon: TrendingUp, color: 'text-purple-600' },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Principal</h1>
        <div className="text-sm text-muted-foreground">
          Webside CRM + CPM | {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <stat.icon className={`h-8 w-8 ${stat.color} mr-4 opacity-75`} />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} vs semana passada
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Funil Comercial</h2>
            <div className="h-64 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
              {/* Recharts funil aqui */}
              <p className="text-muted-foreground">Gráfico Funil: Leads → Contratos (87% conversão)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Mensageria Hoje</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Campanhas Enviadas</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between">
                <span>Abertas</span>
                <span className="font-semibold text-green-600">89%</span>
              </div>
              <div className="flex justify-between">
                <span>Clicadas</span>
                <span className="font-semibold text-blue-600">42%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPrincipal

