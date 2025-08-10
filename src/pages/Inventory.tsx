import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Package, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  code: string;
  category: string;
  name: string;
  image: string;
  price: number;
  minSize: string;
  maxSize: string;
  stock: number;
}

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isCreatingOffer, setIsCreatingOffer] = useState(false);

  const [products] = useState<Product[]>([
    {
      id: 1,
      code: 'CAM001',
      category: 'Camisetas',
      name: 'Camiseta Premium Algodón',
      image: '🎽',
      price: 25.00,
      minSize: 'S',
      maxSize: 'XL',
      stock: 45
    },
    {
      id: 2,
      code: 'PAN001',
      category: 'Pantalones',
      name: 'Jeans Clásicos',
      image: '👖',
      price: 45.00,
      minSize: '28',
      maxSize: '36',
      stock: 32
    },
    {
      id: 3,
      code: 'ZAP001',
      category: 'Zapatos',
      name: 'Sneakers Deportivos',
      image: '👟',
      price: 85.00,
      minSize: '38',
      maxSize: '44',
      stock: 18
    },
    {
      id: 4,
      code: 'ACC001',
      category: 'Accesorios',
      name: 'Gorra Deportiva',
      image: '🧢',
      price: 15.00,
      minSize: 'Única',
      maxSize: 'Única',
      stock: 67
    }
  ]);

  const categories = ['Todas', 'Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = () => {
    toast({
      title: "Archivo subido",
      description: "Inventario actualizado desde Google Sheets",
    });
  };

  const handleAddProduct = () => {
    toast({
      title: "Producto agregado",
      description: "El producto ha sido añadido al inventario",
    });
    setIsAddingProduct(false);
  };

  const handleCreateOffer = () => {
    toast({
      title: "Oferta creada",
      description: "La campaña de descuento ha sido configurada",
    });
    setIsCreatingOffer(false);
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 10) return { color: 'bg-red-500', text: 'Bajo' };
    if (stock <= 30) return { color: 'bg-yellow-500', text: 'Medio' };
    return { color: 'bg-green-500', text: 'Alto' };
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Package className="w-8 h-8 text-primary" />
              Gestión de Inventario
            </h1>
            <p className="text-muted-foreground">Administra tu catálogo de productos</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleFileUpload} variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Subir Google Sheets
            </Button>
            
            <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Agregar Producto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Nombre del producto</Label>
                    <Input id="productName" placeholder="Ej: Camiseta Premium" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productCode">Código</Label>
                      <Input id="productCode" placeholder="CAM001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productCategory">Categoría</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="camisetas">Camisetas</SelectItem>
                          <SelectItem value="pantalones">Pantalones</SelectItem>
                          <SelectItem value="zapatos">Zapatos</SelectItem>
                          <SelectItem value="accesorios">Accesorios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Precio</Label>
                      <Input id="price" type="number" placeholder="25.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock</Label>
                      <Input id="stock" type="number" placeholder="50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minSize">Talla mínima</Label>
                      <Input id="minSize" placeholder="S" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxSize">Talla máxima</Label>
                      <Input id="maxSize" placeholder="XL" />
                    </div>
                  </div>
                  <Button onClick={handleAddProduct} className="w-full">
                    Agregar Producto
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isCreatingOffer} onOpenChange={setIsCreatingOffer}>
              <DialogTrigger asChild>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Crear Oferta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Crear Nueva Oferta</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="offerName">Nombre de la oferta</Label>
                    <Input id="offerName" placeholder="Descuento Fin de Semana" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="offerProduct">Producto/Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los productos</SelectItem>
                        <SelectItem value="camisetas">Camisetas</SelectItem>
                        <SelectItem value="pantalones">Pantalones</SelectItem>
                        <SelectItem value="zapatos">Zapatos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">% Descuento</Label>
                    <Input id="discount" type="number" placeholder="20" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Fecha inicio</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Fecha fin</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                  <Button onClick={handleCreateOffer} className="w-full">
                    Crear Oferta
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Productos ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Código</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoría</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nombre</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Imagen</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Precio</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tallas</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <tr key={product.id} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm">{product.code}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">{product.name}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">
                            {product.image}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">${product.price.toFixed(2)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">
                            {product.minSize} - {product.maxSize}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${stockStatus.color}`} />
                            <span className="font-medium">{product.stock}</span>
                            <Badge variant="secondary" className="text-xs">
                              {stockStatus.text}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;