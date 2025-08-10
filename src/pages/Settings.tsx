import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Store, 
  Bot,
  Users,
  Save,
  Upload,
  Shield,
  Bell
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const [businessData, setBusinessData] = useState({
    name: 'Mi Tienda Online',
    address: 'Av. Insurgentes Sur 123, Col. Roma Norte, CDMX',
    phone: '+52 55 1234 5678',
    email: 'contacto@mitienda.com',
    description: 'Tienda especializada en ropa y accesorios de calidad.'
  });

  const [chatbotConfig, setChatbotConfig] = useState({
    welcomeMessage: '¡Hola! Bienvenido a nuestra tienda. ¿En qué puedo ayudarte hoy?',
    autoResponse: true,
    workingHours: '9:00-18:00',
    language: 'es',
    maxResponseTime: '30'
  });

  const [users] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@mitienda.com', role: 'admin', status: 'active' },
    { id: 2, name: 'María González', email: 'maria@mitienda.com', role: 'operator', status: 'active' },
    { id: 3, name: 'Carlos Ruiz', email: 'carlos@mitienda.com', role: 'operator', status: 'inactive' }
  ]);

  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    newMessages: true,
    campaignUpdates: false
  });

  const handleSaveBusiness = () => {
    toast({
      title: "Datos guardados",
      description: "La información del negocio ha sido actualizada",
    });
  };

  const handleSaveChatbot = () => {
    toast({
      title: "Configuración guardada",
      description: "Los ajustes del chatbot han sido actualizados",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Preferencias guardadas",
      description: "Las configuraciones de notificaciones han sido actualizadas",
    });
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'admin':
        return { label: 'Administrador', color: 'bg-primary' };
      case 'operator':
        return { label: 'Operador', color: 'bg-secondary' };
      default:
        return { label: 'Usuario', color: 'bg-muted' };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { label: 'Activo', color: 'bg-green-500' };
      case 'inactive':
        return { label: 'Inactivo', color: 'bg-gray-500' };
      default:
        return { label: 'Desconocido', color: 'bg-gray-500' };
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <SettingsIcon className="w-8 h-8 text-primary" />
              Perfil y Configuración
            </h1>
            <p className="text-muted-foreground">Gestiona tu negocio y configuraciones del sistema</p>
          </div>
        </div>

        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Negocio
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Chatbot
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notificaciones
            </TabsTrigger>
          </TabsList>

          {/* Business Settings */}
          <TabsContent value="business">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-primary" />
                  Datos del Negocio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nombre del negocio</Label>
                    <Input
                      id="businessName"
                      value={businessData.name}
                      onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Teléfono</Label>
                    <Input
                      id="businessPhone"
                      value={businessData.phone}
                      onChange={(e) => setBusinessData({...businessData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Dirección</Label>
                  <Input
                    id="businessAddress"
                    value={businessData.address}
                    onChange={(e) => setBusinessData({...businessData, address: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Email de contacto</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={businessData.email}
                    onChange={(e) => setBusinessData({...businessData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">Descripción del negocio</Label>
                  <Textarea
                    id="businessDescription"
                    value={businessData.description}
                    onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessLogo">Logo del negocio</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Store className="w-8 h-8 text-white" />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Subir Logo
                    </Button>
                  </div>
                </div>

                <Button onClick={handleSaveBusiness} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chatbot Settings */}
          <TabsContent value="chatbot">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Configuración del Chatbot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Mensaje de bienvenida</Label>
                  <Textarea
                    id="welcomeMessage"
                    value={chatbotConfig.welcomeMessage}
                    onChange={(e) => setChatbotConfig({...chatbotConfig, welcomeMessage: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="workingHours">Horario de atención</Label>
                    <Input
                      id="workingHours"
                      value={chatbotConfig.workingHours}
                      onChange={(e) => setChatbotConfig({...chatbotConfig, workingHours: e.target.value})}
                      placeholder="9:00-18:00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select value={chatbotConfig.language} onValueChange={(value) => setChatbotConfig({...chatbotConfig, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">Inglés</SelectItem>
                        <SelectItem value="pt">Portugués</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxResponseTime">Tiempo máximo de respuesta (segundos)</Label>
                    <Input
                      id="maxResponseTime"
                      type="number"
                      value={chatbotConfig.maxResponseTime}
                      onChange={(e) => setChatbotConfig({...chatbotConfig, maxResponseTime: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoResponse"
                      checked={chatbotConfig.autoResponse}
                      onCheckedChange={(checked) => setChatbotConfig({...chatbotConfig, autoResponse: checked})}
                    />
                    <Label htmlFor="autoResponse">Respuestas automáticas activadas</Label>
                  </div>
                </div>

                <Button onClick={handleSaveChatbot} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Guardar Configuración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Gestión de Usuarios y Roles
                  </CardTitle>
                  <Button className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Agregar Usuario
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => {
                    const roleInfo = getRoleInfo(user.role);
                    const statusInfo = getStatusInfo(user.status);
                    
                    return (
                      <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${roleInfo.color}`} />
                            {roleInfo.label}
                          </Badge>
                          
                          <Badge variant="outline" className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                            {statusInfo.label}
                          </Badge>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Configuración de Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <h4 className="font-medium text-foreground">Nuevos pedidos</h4>
                      <p className="text-sm text-muted-foreground">Recibir notificaciones cuando lleguen nuevos pedidos</p>
                    </div>
                    <Switch
                      checked={notifications.newOrders}
                      onCheckedChange={(checked) => setNotifications({...notifications, newOrders: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <h4 className="font-medium text-foreground">Stock bajo</h4>
                      <p className="text-sm text-muted-foreground">Alertas cuando los productos tengan poco inventario</p>
                    </div>
                    <Switch
                      checked={notifications.lowStock}
                      onCheckedChange={(checked) => setNotifications({...notifications, lowStock: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <h4 className="font-medium text-foreground">Nuevos mensajes</h4>
                      <p className="text-sm text-muted-foreground">Notificaciones de mensajes de clientes en WhatsApp</p>
                    </div>
                    <Switch
                      checked={notifications.newMessages}
                      onCheckedChange={(checked) => setNotifications({...notifications, newMessages: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <h4 className="font-medium text-foreground">Actualizaciones de campañas</h4>
                      <p className="text-sm text-muted-foreground">Informes sobre el rendimiento de tus campañas</p>
                    </div>
                    <Switch
                      checked={notifications.campaignUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, campaignUpdates: checked})}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Guardar Preferencias
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;