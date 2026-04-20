import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { Badge } from './badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from './popover';
import { cn } from '@/lib/utils';

interface GlobalSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;
  className?: string;
}

export function GlobalSearch({ onSearch, onFilterChange, className }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = () => {
    onSearch(query);
  };

  const addFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    onFilterChange({ ...filters, [key]: value });
    setFilterOpen(false);
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAll = () => {
    setFilters({});
    setQuery('');
    onSearch('');
    onFilterChange({});
  };

  return (
    <div className={cn('flex flex-col lg:flex-row gap-3 w-full lg:w-auto', className)}>
      {/* Search Input */}
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar em todo o CRM... (Leads, Clientes, Orçamentos)"
          className="w-full pl-10 h-12 bg-background/80 backdrop-blur-sm border-border rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      <Popover open={filterOpen} onOpenChange={setFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-12 gap-2 bg-background/80 backdrop-blur-sm">
            <Filter className="h-4 w-4" />
            Filtros
            {Object.keys(filters).length > 0 && (
              <Badge variant="secondary" className="ml-1 h-6 px-2">
                {Object.keys(filters).length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-lg">Filtros Avançados</h3>
          </div>
          <div className="p-4 max-h-60 overflow-auto">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Status</label>
                <Select onValueChange={(value) => addFilter('status', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="qualificado">Qualificado</SelectItem>
                    <SelectItem value="proposta">Proposta</SelectItem>
                    <SelectItem value="fechado">Fechado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Data</label>
                <Select onValueChange={(value) => addFilter('data', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Semana</SelectItem>
                    <SelectItem value="mes">Mês</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Tipo</label>
                <Select onValueChange={(value) => addFilter('tipo', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="orcamento">Orçamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="p-4 border-t bg-muted/50">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {Object.entries(filters).map(([key, value]) => (
                <Badge key={`${key}-${value}`} variant="secondary" className="gap-1 px-2.5">
                  {key}: {value}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                    onClick={() => removeFilter(key)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Button variant="outline" className="w-full" onClick={clearAll} size="sm">
              Limpar tudo
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Search Button */}
      <Button className="h-12 px-6 whitespace-nowrap" onClick={handleSearch}>
        Buscar
      </Button>
    </div>
  );
}

