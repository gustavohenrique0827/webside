import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type LucideIcon } from 'lucide-react';
import { Filter, DollarSign, Users, Clock, RefreshCw, Download, Plus, Activity, ArrowRight, Grip } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableCard } from '@/components/SortableCard';
// SortableCard import removed - visual kanban

type Stat = {
  value: string;
  label: string;
  icon: LucideIcon;
  change: string;
  trend: 'up' | 'down' | 'neutral';
};

type PipelineItem = {
  id: string;
  cliente: string;
  valor: string;
  etapa: 'lead' | 'analise' | 'proposta' | 'negociacao' | 'fechado';
  probabilidade: string;
  data: string;
};

const stages = [
  { id: 'lead', name: 'Leads', color: 'gray' },
  { id: 'analise', name: 'Análise', color: 'blue' },
  { id: 'proposta', name: 'Proposta', color: 'yellow' },
  { id: 'negociacao', name: 'Negociação', color: 'orange' },
  { id: 'fechado', name: 'Fechado', color: 'green' },
];

const mockStats: Stat[] = [
  { value: '12', label: 'Total Funnel', icon: Activity, change: '+3', trend: 'up' },
  { value: 'R$ 789.500', label: 'Valor Pipeline', icon: DollarSign, change: '+22%', trend: 'up' },
  { value: '5', label: 'Em Análise', icon: Clock, change: '+1', trend: 'up' },
  { value: '3', label: 'Negociação', icon: Users, change: '0', trend: 'neutral' },
];

const initialItems: Record<string, PipelineItem[]> = {
  lead: [
    { id: 'L1', cliente: 'Lead Webside 1', valor: 'R$ 15.000', etapa: 'lead', probabilidade: '20%', data: 'Hoje' },
  ],
  analise: [
    { id: 'P001', cliente: 'Posto Central Webside', valor: 'R$ 125.000', etapa: 'analise', probabilidade: '65%', data: '2024-10-10' },
    { id: 'P003', cliente: 'Auto Posto Webside', valor: 'R$ 210.000', etapa: 'analise', probabilidade: '45%', data: '2024-10-12' },
  ],
  proposta: [
    { id: 'P002', cliente: 'Rede Fuel Webside', valor: 'R$ 89.500', etapa: 'proposta', probabilidade: '85%', data: '2024-10-08' },
    { id: 'P004', cliente: 'Petro Quality Webside', valor: 'R$ 32.700', etapa: 'proposta', probabilidade: '90%', data: '2024-10-07' },
  ],
  negociacao: [
    { id: 'N1', cliente: 'Cliente Negociação', valor: 'R$ 95.000', etapa: 'negociacao', probabilidade: '95%', data: 'Ontem' },
  ],
  fechado: [],
};

function StatsCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  return (
    <Card className="hover:shadow-md transition-all border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </div>
          </div>
          <Badge className={`ml-auto ${stat.trend === 'up' ? 'bg-green-100 text-green-800' : stat.trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
            {stat.change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Pipeline() {
  const [filters, setFilters] = useState('all');
  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeContainer = Object.keys(items).find((key) =>
        items[key].some((item) => item.id === active.id)
      );
      const overContainer = Object.keys(items).find((key) =>
        items[key].some((item) => item.id === over.id)
      );

      if (activeContainer !== overContainer) {
        setItems((items) => {
          const activeItems = [...items[activeContainer]];
          const overItems = [...items[overContainer] || []];

          const activeIndex = activeItems.findIndex((item) => item.id === active.id);
          const overIndex = overItems.findIndex((item) => item.id === over.id);

          let newIndex;
          if (items[activeContainer].length > 1) {
            newIndex = overItems.length + 1;
          } else {
            const isBottom = active.rect.current.translated &&
              active.rect.current.translated.bottom > over.rect.current.translated.bottom;
            newIndex = isBottom ? overItems.length : 0;
          }

          return {
            ...items,
            [activeContainer]: items[activeContainer].filter((item) => item.id !== active.id),
            [overContainer]: [
              ...overItems.slice(0, overIndex),
              items[activeContainer][activeIndex],
              ...overItems.slice(overIndex),
            ],
          };
        });
      }
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Pipeline Kanban</h1>
          <p className="text-gray-500 text-sm lg:text-base">Drag & drop funnel - Webside CRM completo</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={filters} onValueChange={setFilters}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Etapas</SelectItem>
              <SelectItem value="lead">Leads</SelectItem>
              <SelectItem value="analise">Análise</SelectItem>
              <SelectItem value="proposta">Proposta</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4" />
            Nova Oportunidade
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, i) => <StatsCard key={i} stat={stat} />)}
      </div>

      {/* Kanban Board */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Webside Sales Funnel - Drag & Drop</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-x-auto pb-4">
              {stages.map((stage) => (
                <div key={stage.id}>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                    <div className="w-3 h-3 rounded-full bg-[hsl(var(--${stage.color}-500))]" />
                    <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                    <Badge className="ml-auto">{items[stage.id].length}</Badge>
                  </div>
                  <SortableContext items={items[stage.id].map(i => i.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3 min-h-[200px]">
                      {items[stage.id].map((item) => (
                        <SortableCard key={item.id} id={item.id}>
                          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing">
                            <div className="flex items-center gap-3 mb-2">
                              <Grip className="h-4 w-4 text-gray-400" />
                              <Badge variant="outline">{item.etapa}</Badge>
                            </div>
                            <h4 className="font-semibold text-gray-900">{item.cliente}</h4>
                            <p className="text-sm text-gray-500 mb-2">{item.valor}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full" />
                              {item.probabilidade}
                            </div>
                            <p className="text-xs text-gray-400">{item.data}</p>
                          </div>
                        </SortableCard>
                      ))}
                    </div>
                  </SortableContext>
                </div>
              ))}
            </div>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
}

