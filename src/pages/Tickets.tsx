import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Truck, 
  Package, 
  MapPin,
  Calendar,
  Check,
  Clock,
  Filter
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Ticket {
  id: string;
  customer: string;
  phone: string;
  address: string;
  products: string[];
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
  total: number;
}

const Tickets = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'pending' | 'shipped'>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TK001',
      customer: 'María González',
      phone: '+52 55 1234 5678',
      address: 'Av. Insurgentes Sur 123, Col. Roma Norte, CDMX',
      products: ['Camiseta Premium', 'Jeans Clásicos'],
      status: 'pending',
      date: '2024-01-15',
      total: 70.00
    },
    {
      id: 'TK002',
      customer: 'Carlos Ruiz',
      phone: '+52 55 9876 5432',
      address: 'Calle Madero 456, Col. Centro, CDMX',
      products: ['Sneakers Deportivos'],
      status: 'pending',
      date: '2024-01-14',
      total: 85.00
    },
    {
      id: 'TK003',
      customer: 'Ana Martínez',
      phone: '+52 55 5555 1234',
      address: 'Av. Revolución 789, Col. San Ángel, CDMX',
      products: ['Gorra Deportiva', 'Camiseta Premium'],
      status: 'shipped',
      date: '2024-01-13',
      total: 40.00
    },
    {
      id: 'TK004',
      customer: 'Luis Pérez',
      phone: '+52 55 7777 8888',
      address: 'Calzada de Tlalpan 321, Col. Portales, CDMX',
      products: ['Jeans Clásicos'],
      status: 'shipped',
      date: '2024-01-12',
      total: 45.00
    },
    {
      id: 'TK005',
      customer: 'Carmen Silva',
      phone: '+52 55 3333 4444',
      address: 'Av. Universidad 654, Col. Del Valle, CDMX',
      products: ['Sneakers Deportivos', 'Gorra Deportiva'],
      status: 'delivered',
      date: '2024-01-11',
      total: 100.00
    }
  ]);

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          label: 'Pendiente', 
          color: 'bg-yellow-500', 
          variant: 'secondary' as const,
          icon: Clock 
        };
      case 'shipped':
        return { 
          label: 'Enviado', 
          color: 'bg-blue-500', 
          variant: 'default' as const,
          icon: Truck 
        };
      case 'delivered':
        return { 
          label: 'Entregado', 
          color: 'bg-green-500', 
          variant: 'secondary' as const,
          icon: Check 
        };
      default:
        return { 
          label: 'Desconocido', 
          color: 'bg-gray-500', 
          variant: 'secondary' as const,
          icon: Clock 
        };
    }
  };

  const markAsShipped = (ticketId: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: 'shipped' as const }
        : ticket
    ));
    
    const ticket = tickets.find(t => t.id === ticketId);
    
    toast({
      title: "Ticket marcado como enviado",
      description: `Notificación enviada a ${ticket?.customer}`,
    });
  };

  const statusCounts = {
    all: tickets.length,
    pending: tickets.filter(t => t.status === 'pending').length,
    shipped: tickets.filter(t => t.status === 'shipped').length,
    delivered: tickets.filter(t => t.status === 'delivered').length
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Truck className="w-8 h-8 text-primary" />
              Gestión de Tickets de Envío
            </h1>
            <p className="text-muted-foreground">Administra y rastrea tus envíos</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.all}</p>
                </div>
                <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.pending}</p>
                </div>
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enviados</p>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.shipped}</p>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Truck className="w-4 h-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Entregados</p>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.delivered}</p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="shipped">Enviados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Table */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Tickets de Envío ({filteredTickets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTickets.map((ticket) => {
                const statusInfo = getStatusInfo(ticket.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <div key={ticket.id} className="p-4 rounded-lg border border-border bg-card hover:shadow-soft transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div>
                        <p className="font-mono text-sm font-medium text-foreground">{ticket.id}</p>
                        <p className="text-xs text-muted-foreground">{ticket.date}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-foreground">{ticket.customer}</p>
                        <p className="text-sm text-muted-foreground">{ticket.phone}</p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{ticket.address}</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Badge variant={statusInfo.variant} className="flex items-center gap-1 w-fit mx-auto">
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </Badge>
                        <p className="text-lg font-bold text-foreground mt-1">${ticket.total.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              Ver Detalles
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Detalles del Ticket {selectedTicket?.id}</DialogTitle>
                            </DialogHeader>
                            {selectedTicket && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-foreground mb-2">Cliente</h4>
                                  <p className="text-sm text-muted-foreground">{selectedTicket.customer}</p>
                                  <p className="text-sm text-muted-foreground">{selectedTicket.phone}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-foreground mb-2">Dirección</h4>
                                  <p className="text-sm text-muted-foreground">{selectedTicket.address}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-foreground mb-2">Productos</h4>
                                  <div className="space-y-1">
                                    {selectedTicket.products.map((product, index) => (
                                      <p key={index} className="text-sm text-muted-foreground">• {product}</p>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                  <span className="font-medium text-foreground">Total:</span>
                                  <span className="text-lg font-bold text-primary">${selectedTicket.total.toFixed(2)}</span>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {ticket.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => markAsShipped(ticket.id)}
                            className="flex items-center gap-1"
                          >
                            <Truck className="w-3 h-3" />
                            Marcar Enviado
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tickets;