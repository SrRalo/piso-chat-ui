import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Package, 
  MessageSquare,
  Truck,
  Megaphone,
  DollarSign,
  ShoppingCart,
  Star,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const salesData = [
    { month: 'Ene', sales: 4000 },
    { month: 'Feb', sales: 6000 },
    { month: 'Mar', sales: 8000 },
    { month: 'Abr', sales: 10000 }
  ];

  const recentCustomers = [
    { id: 1, name: 'María González', email: 'maria@email.com', lastOrder: '2024-01-15', total: '$125.00' },
    { id: 2, name: 'Carlos Ruiz', email: 'carlos@email.com', lastOrder: '2024-01-14', total: '$89.50' },
    { id: 3, name: 'Ana Martínez', email: 'ana@email.com', lastOrder: '2024-01-13', total: '$230.00' },
    { id: 4, name: 'Luis Pérez', email: 'luis@email.com', lastOrder: '2024-01-12', total: '$75.25' },
    { id: 5, name: 'Carmen Silva', email: 'carmen@email.com', lastOrder: '2024-01-11', total: '$150.00' }
  ];

  const topProduct = {
    name: 'Camiseta Premium',
    sales: 45,
    revenue: '$1,125.00'
  };

  const customerCategories = [
    { 
      name: 'Frecuentes', 
      count: 8, 
      customers: ['María G.', 'Carlos R.', 'Ana M.', 'Luis P.', 'Carmen S.', 'Pedro L.', 'Sofia T.', 'Diego M.']
    },
    { 
      name: 'Ocasionales', 
      count: 12, 
      customers: ['Roberto F.', 'Laura K.', 'Miguel A.', 'Isabel H.', 'Fernando D.', 'Lucia R.', '+6 más']
    },
    { 
      name: 'Potenciales', 
      count: 15, 
      customers: ['Alejandro S.', 'Patricia N.', 'Gabriel C.', 'Monica V.', 'Ricardo T.', '+10 más']
    }
  ];

  const quickActions = [
    { title: 'Gestión de Inventario', icon: Package, path: '/inventory', color: 'bg-blue-500' },
    { title: 'Tickets de Envío', icon: Truck, path: '/tickets', color: 'bg-green-500' },
    { title: 'Campañas', icon: Megaphone, path: '/campaigns', color: 'bg-purple-500' },
    { title: 'Chat', icon: MessageSquare, path: '/chat', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Bienvenido de nuevo a PisoChat</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Último acceso</p>
            <p className="font-medium text-foreground">Hoy, 10:30 AM</p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ventas (28 días)</p>
                  <p className="text-2xl font-bold text-foreground">$28,450</p>
                  <p className="text-sm text-success flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.5%
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pedidos</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-sm text-success flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8.2%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Clientes</p>
                  <p className="text-2xl font-bold text-foreground">1,248</p>
                  <p className="text-sm text-success flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15.3%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversaciones</p>
                  <p className="text-2xl font-bold text-foreground">89</p>
                  <p className="text-sm text-success flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +5.7%
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <Card className="lg:col-span-2 border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Ventas Últimos 28 Días
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-4">
                {salesData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-primary rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{ height: `${(data.sales / 10000) * 200}px` }}
                    />
                    <p className="text-sm text-muted-foreground mt-2">{data.month}</p>
                    <p className="text-xs font-medium text-foreground">${data.sales}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Product */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                Producto Más Vendido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-lg mx-auto flex items-center justify-center">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{topProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{topProduct.sales} vendidos</p>
                  <p className="text-lg font-bold text-primary">{topProduct.revenue}</p>
                </div>
                <Link to="/inventory">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Inventario
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Customers & Customer Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Últimos 10 Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCustomers.slice(0, 5).map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{customer.total}</p>
                      <p className="text-xs text-muted-foreground">{customer.lastOrder}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/customers" className="block mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Todos los Clientes
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Categorías de Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerCategories.map((category, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{category.name}</h4>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.customers.slice(0, 6).map((customer, i) => (
                        <span key={i} className="text-xs bg-background px-2 py-1 rounded text-muted-foreground">
                          {customer}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} to={action.path}>
                    <Button
                      variant="outline"
                      className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:shadow-medium transition-all"
                    >
                      <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium">{action.title}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;