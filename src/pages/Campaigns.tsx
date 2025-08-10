import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Megaphone, 
  Plus, 
  Calendar,
  Users,
  Target,
  TrendingUp,
  Edit,
  Trash2,
  Play,
  Pause
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  name: string;
  description: string;
  targetCategory: string;
  products: string[];
  discount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'completed';
  reach: number;
  conversions: number;
}

const Campaigns = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetCategory: '',
    products: '',
    discount: '',
    startDate: '',
    endDate: ''
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'CAM001',
      name: 'Descuento Fin de Semana',
      description: 'Promoción especial para clientes frecuentes en camisetas y accesorios',
      targetCategory: 'Frecuentes',
      products: ['Camisetas', 'Accesorios'],
      discount: 20,
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      status: 'active',
      reach: 125,
      conversions: 23
    },
    {
      id: 'CAM002',
      name: 'Liquidación de Invierno',
      description: 'Ofertas especiales en ropa de invierno para clientes ocasionales',
      targetCategory: 'Ocasionales',
      products: ['Pantalones', 'Zapatos'],
      discount: 35,
      startDate: '2024-01-10',
      endDate: '2024-01-20',
      status: 'active',
      reach: 89,
      conversions: 17
    },
    {
      id: 'CAM003',
      name: 'Bienvenida Nuevos Clientes',
      description: 'Descuento especial para atraer nuevos clientes',
      targetCategory: 'Potenciales',
      products: ['Todas las categorías'],
      discount: 15,
      startDate: '2024-01-05',
      endDate: '2024-01-15',
      status: 'completed',
      reach: 156,
      conversions: 45
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateCampaign = () => {
    const newCampaign: Campaign = {
      id: `CAM${String(campaigns.length + 1).padStart(3, '0')}`,
      name: formData.name,
      description: formData.description,
      targetCategory: formData.targetCategory,
      products: formData.products.split(',').map(p => p.trim()),
      discount: parseInt(formData.discount),
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'active',
      reach: 0,
      conversions: 0
    };

    setCampaigns(prev => [...prev, newCampaign]);
    setFormData({
      name: '',
      description: '',
      targetCategory: '',
      products: '',
      discount: '',
      startDate: '',
      endDate: ''
    });
    setIsCreating(false);

    toast({
      title: "Campaña creada",
      description: "La campaña ha sido lanzada exitosamente",
    });
  };

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { 
            ...campaign, 
            status: campaign.status === 'active' ? 'paused' : 'active'
          }
        : campaign
    ));

    const campaign = campaigns.find(c => c.id === campaignId);
    const newStatus = campaign?.status === 'active' ? 'pausada' : 'activada';
    
    toast({
      title: `Campaña ${newStatus}`,
      description: `La campaña ha sido ${newStatus} exitosamente`,
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { label: 'Activa', color: 'bg-green-500', variant: 'default' as const };
      case 'paused':
        return { label: 'Pausada', color: 'bg-yellow-500', variant: 'secondary' as const };
      case 'completed':
        return { label: 'Completada', color: 'bg-gray-500', variant: 'outline' as const };
      default:
        return { label: 'Desconocido', color: 'bg-gray-500', variant: 'outline' as const };
    }
  };

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const conversionRate = totalReach > 0 ? ((totalConversions / totalReach) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Megaphone className="w-8 h-8 text-primary" />
              Campañas de Marketing
            </h1>
            <p className="text-muted-foreground">Gestiona tus campañas promocionales</p>
          </div>
          
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nueva Campaña
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nueva Campaña</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaignName">Nombre de la campaña</Label>
                    <Input
                      id="campaignName"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ej: Descuento de Verano"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetCategory">Categoría de clientes</Label>
                    <Select value={formData.targetCategory} onValueChange={(value) => handleInputChange('targetCategory', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Frecuentes">Frecuentes</SelectItem>
                        <SelectItem value="Ocasionales">Ocasionales</SelectItem>
                        <SelectItem value="Potenciales">Potenciales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe tu campaña..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="products">Productos/Categorías</Label>
                    <Input
                      id="products"
                      value={formData.products}
                      onChange={(e) => handleInputChange('products', e.target.value)}
                      placeholder="Camisetas, Pantalones (separados por coma)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">% Descuento</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={formData.discount}
                      onChange={(e) => handleInputChange('discount', e.target.value)}
                      placeholder="20"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de inicio</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Fecha de fin</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handleCreateCampaign} className="w-full">
                  Crear Campaña
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Campañas Activas</p>
                  <p className="text-2xl font-bold text-foreground">{activeCampaigns}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alcance Total</p>
                  <p className="text-2xl font-bold text-foreground">{totalReach}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversiones</p>
                  <p className="text-2xl font-bold text-foreground">{totalConversions}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tasa Conversión</p>
                  <p className="text-2xl font-bold text-foreground">{conversionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Todas las Campañas</h2>
          
          {campaigns.map((campaign) => {
            const statusInfo = getStatusInfo(campaign.status);
            const conversionRate = campaign.reach > 0 ? ((campaign.conversions / campaign.reach) * 100).toFixed(1) : '0';
            
            return (
              <Card key={campaign.id} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-2 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono">{campaign.id}</p>
                        </div>
                        <Badge variant={statusInfo.variant} className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                          {statusInfo.label}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground">{campaign.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {campaign.targetCategory}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {campaign.discount}% OFF
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {campaign.startDate} - {campaign.endDate}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Productos:</p>
                        <div className="flex flex-wrap gap-1">
                          {campaign.products.map((product, index) => (
                            <span key={index} className="text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Alcance</p>
                        <p className="text-2xl font-bold text-foreground">{campaign.reach}</p>
                      </div>
                      
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Conversiones</p>
                        <p className="text-2xl font-bold text-primary">{campaign.conversions}</p>
                        <p className="text-xs text-muted-foreground">{conversionRate}% tasa</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {campaign.status !== 'completed' && (
                        <Button
                          onClick={() => toggleCampaignStatus(campaign.id)}
                          variant={campaign.status === 'active' ? 'secondary' : 'default'}
                          className="flex items-center gap-2"
                        >
                          {campaign.status === 'active' ? (
                            <>
                              <Pause className="w-4 h-4" />
                              Pausar
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Activar
                            </>
                          )}
                        </Button>
                      )}
                      
                      <Button variant="outline" className="flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Editar
                      </Button>
                      
                      <Button variant="outline" className="flex items-center gap-2 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;