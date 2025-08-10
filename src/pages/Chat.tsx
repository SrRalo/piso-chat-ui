import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Send, 
  Search,
  Phone,
  Filter,
  Bot,
  User,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot' | 'admin';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  customer: string;
  phone: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  status: 'active' | 'resolved' | 'pending';
  messages: Message[];
}

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('CONV001');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [conversations] = useState<Conversation[]>([
    {
      id: 'CONV001',
      customer: 'María González',
      phone: '+52 55 1234 5678',
      lastMessage: '¿Tienen la camiseta en talla M?',
      lastMessageTime: '10:30 AM',
      unread: 2,
      status: 'active',
      messages: [
        {
          id: 'MSG001',
          sender: 'user',
          content: 'Hola, buenos días',
          timestamp: '10:25 AM'
        },
        {
          id: 'MSG002',
          sender: 'bot',
          content: '¡Hola! Bienvenido a PisoChat. ¿En qué puedo ayudarte hoy?',
          timestamp: '10:25 AM'
        },
        {
          id: 'MSG003',
          sender: 'user',
          content: '¿Tienen la camiseta en talla M?',
          timestamp: '10:30 AM'
        },
        {
          id: 'MSG004',
          sender: 'bot',
          content: 'Sí, tenemos la Camiseta Premium en talla M disponible. El precio es $25.00. ¿Te gustaría hacer el pedido?',
          timestamp: '10:30 AM'
        }
      ]
    },
    {
      id: 'CONV002',
      customer: 'Carlos Ruiz',
      phone: '+52 55 9876 5432',
      lastMessage: 'Perfecto, quiero hacer el pedido',
      lastMessageTime: '09:45 AM',
      unread: 0,
      status: 'pending',
      messages: [
        {
          id: 'MSG005',
          sender: 'user',
          content: '¿Cuánto cuesta el envío?',
          timestamp: '09:40 AM'
        },
        {
          id: 'MSG006',
          sender: 'bot',
          content: 'El envío tiene un costo de $5.00 dentro de la ciudad. Para pedidos mayores a $50.00 el envío es gratis.',
          timestamp: '09:40 AM'
        },
        {
          id: 'MSG007',
          sender: 'user',
          content: 'Perfecto, quiero hacer el pedido',
          timestamp: '09:45 AM'
        }
      ]
    },
    {
      id: 'CONV003',
      customer: 'Ana Martínez',
      phone: '+52 55 5555 1234',
      lastMessage: 'Muchas gracias por la atención',
      lastMessageTime: 'Ayer',
      unread: 0,
      status: 'resolved',
      messages: [
        {
          id: 'MSG008',
          sender: 'user',
          content: '¿Ya enviaron mi pedido?',
          timestamp: 'Ayer 3:20 PM'
        },
        {
          id: 'MSG009',
          sender: 'admin',
          content: 'Hola Ana, sí, tu pedido ya fue enviado. El número de seguimiento es ABC123.',
          timestamp: 'Ayer 3:25 PM'
        },
        {
          id: 'MSG010',
          sender: 'user',
          content: 'Muchas gracias por la atención',
          timestamp: 'Ayer 3:30 PM'
        }
      ]
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.phone.includes(searchTerm)
  );

  const activeConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Simulate sending message
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { label: 'Activa', color: 'bg-green-500' };
      case 'pending':
        return { label: 'Pendiente', color: 'bg-yellow-500' };
      case 'resolved':
        return { label: 'Resuelta', color: 'bg-gray-500' };
      default:
        return { label: 'Desconocido', color: 'bg-gray-500' };
    }
  };

  const getSenderInfo = (sender: string) => {
    switch (sender) {
      case 'user':
        return { icon: User, name: 'Cliente', bgColor: 'bg-secondary' };
      case 'bot':
        return { icon: Bot, name: 'Bot', bgColor: 'bg-primary' };
      case 'admin':
        return { icon: User, name: 'Admin', bgColor: 'bg-accent' };
      default:
        return { icon: User, name: 'Usuario', bgColor: 'bg-muted' };
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-8 h-8 text-primary" />
              Historial de Conversaciones
            </h1>
            <p className="text-muted-foreground">Gestiona las conversaciones con tus clientes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-0 shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Conversaciones</CardTitle>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-350px)]">
                  <div className="space-y-1 p-4 pt-0">
                    {filteredConversations.map((conversation) => {
                      const statusInfo = getStatusInfo(conversation.status);
                      const isSelected = selectedConversation === conversation.id;
                      
                      return (
                        <div
                          key={conversation.id}
                          onClick={() => setSelectedConversation(conversation.id)}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-primary text-primary-foreground' 
                              : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{conversation.customer}</h4>
                              <p className={`text-xs flex items-center gap-1 ${
                                isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                              }`}>
                                <Phone className="w-3 h-3" />
                                {conversation.phone}
                              </p>
                            </div>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          
                          <p className={`text-xs truncate mb-2 ${
                            isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                          }`}>
                            {conversation.lastMessage}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-1 ${
                              isSelected ? 'text-primary-foreground/60' : 'text-muted-foreground'
                            }`}>
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">{conversation.lastMessageTime}</span>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {activeConversation ? (
              <Card className="border-0 shadow-soft h-full flex flex-col">
                <CardHeader className="border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {activeConversation.customer}
                        <Badge variant="outline" className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getStatusInfo(activeConversation.status).color}`} />
                          {getStatusInfo(activeConversation.status).label}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {activeConversation.phone}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {activeConversation.messages.map((message) => {
                        const senderInfo = getSenderInfo(message.sender);
                        const SenderIcon = senderInfo.icon;
                        const isUser = message.sender === 'user';
                        
                        return (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                          >
                            <div className={`w-8 h-8 rounded-full ${senderInfo.bgColor} flex items-center justify-center flex-shrink-0`}>
                              <SenderIcon className="w-4 h-4 text-white" />
                            </div>
                            <div className={`max-w-[70%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                              <div className={`rounded-lg px-4 py-2 ${
                                isUser 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <span className="text-xs text-muted-foreground mt-1">
                                {message.timestamp}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="border-t border-border p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Escribe tu respuesta..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-soft h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Selecciona una conversación
                  </h3>
                  <p className="text-muted-foreground">
                    Elige una conversación de la lista para ver los mensajes
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;