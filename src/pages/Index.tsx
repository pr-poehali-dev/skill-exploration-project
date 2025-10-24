import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  { id: 'all', name: 'Все товары', icon: 'LayoutGrid' },
  { id: 'health', name: 'Здоровье', icon: 'HeartPulse' },
  { id: 'beauty', name: 'Красота', icon: 'Sparkles' },
  { id: 'hygiene', name: 'Личная гигиена', icon: 'Droplet' },
  { id: 'lifestyle', name: 'Товары для жизни', icon: 'Home' },
  { id: 'food', name: 'Продукты питания', icon: 'Salad' },
  { id: 'other', name: 'Другое', icon: 'Package' },
];

const products: Product[] = [
  { id: 1, name: 'Атоми ХемоХИМ', price: 12610, category: 'health', image: 'https://cdn.poehali.dev/files/0717f853-ef72-462a-a0cb-8d99d0988f2c.jpg' },
  { id: 2, name: 'Атоми Витамин C', price: 2860, category: 'health', image: 'https://cdn.poehali.dev/files/7c07d277-99b5-4606-85f4-5a614338a9e2.jpg' },
  { id: 3, name: 'Атоми Аляска Е-Омега 3', price: 2860, category: 'health', image: 'https://cdn.poehali.dev/files/a3cda9ff-1bb3-434e-a968-35fe86b2d936.jpg' },
  { id: 4, name: 'Атоми Спирулина', price: 2860, category: 'health', image: 'https://cdn.poehali.dev/files/4b0a7af0-f741-4e16-9842-155adaaec2e3.jpg' },
  { id: 5, name: 'Атоми Пробиотик 10+', price: 4030, category: 'health', image: 'https://cdn.poehali.dev/files/b0e8ec98-1279-4600-a300-ab92d43ad20c.jpg' },
  { id: 6, name: 'Атоми Слим Боди Эпплфенон', price: 3640, category: 'health', image: 'https://cdn.poehali.dev/files/282d52b3-bbe1-474e-bf5e-5c88607af18b.jpg' },
  { id: 7, name: 'Атоми Ферментированный концентрат Нони', price: 7800, category: 'health', image: 'https://cdn.poehali.dev/files/4f414916-0b06-4ad9-8b76-c19b4d3c4611.jpg' },
  { id: 8, name: 'Атоми rTG Омега-3', price: 5590, category: 'health', image: 'https://cdn.poehali.dev/files/890f9b78-cc78-4f20-8c98-534d81cb4687.jpg' },
  { id: 9, name: 'Атоми Железо', price: 3640, category: 'health', image: 'https://cdn.poehali.dev/files/68b89b32-7672-4be5-aecc-0138ce1e4163.jpg' },
  { id: 10, name: 'Атоми Ай Лютеин', price: 3900, category: 'health', image: 'https://cdn.poehali.dev/files/b6586f7f-0f7c-49bf-83d6-24a976632329.jpg' },
  { id: 11, name: 'Атоми Премиум Лютеин', price: 4550, category: 'health', image: 'https://cdn.poehali.dev/files/6d62bcf4-6f88-41a0-aaaa-e30daa6add25.jpg' },
  { id: 12, name: 'Атоми Чай Пуэр для Похудения', price: 3640, category: 'health', image: 'https://cdn.poehali.dev/files/d6d65068-9a8e-4119-831c-285e7f2b5076.jpg' },
  { id: 13, name: 'Атоми ХемоХИМ набор (4 упаковки)', price: 47190, category: 'health', image: 'https://cdn.poehali.dev/files/dcedc7f9-3470-40e0-a3c8-4fe2b67700ae.jpg' },
  { id: 14, name: 'Атоми Банаба и Красный женьшень', price: 3510, category: 'health', image: 'https://cdn.poehali.dev/files/b18c4885-c12d-455d-9701-99cffeef848a.jpg' },
  { id: 15, name: 'Атоми Красный Женьшень в стик-желе', price: 5070, category: 'health', image: 'https://cdn.poehali.dev/files/68d0c537-be4f-4c40-9f1c-979abbd58f4f.jpg' },
  { id: 16, name: 'Атоми Хонсамдан Женьшень', price: 10010, category: 'health', image: 'https://cdn.poehali.dev/files/ab5b1044-fc10-411c-a2c5-ee5808c14d95.jpg' },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-serif font-semibold tracking-tight">LUXE</h1>
          
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingBag" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 flex flex-col h-full">
                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                    <Icon name="ShoppingBag" size={48} className="mb-4 opacity-50" />
                    <p>Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-auto space-y-4 pr-2">
                      {cart.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.price.toLocaleString('ru-RU')} ₽
                                </p>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center text-sm font-medium">
                                    {item.quantity}
                                  </span>
                                  <Button 
                                    variant="outline" 
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 ml-auto"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="border-t pt-6 mt-6 space-y-4">
                      <div className="flex justify-between text-lg font-serif">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button className="w-full h-12 text-base" size="lg">
                        Оформить заказ
                        <Icon name="ArrowRight" size={18} className="ml-2" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif mb-6 tracking-tight">
              Премиум товары <br />для вашего благополучия
            </h2>
            <p className="text-lg text-muted-foreground">
              Тщательно отобранные продукты высочайшего качества
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                className="gap-2 transition-all duration-300"
                onClick={() => setSelectedCategory(cat.id)}
              >
                <Icon name={cat.icon as any} size={16} />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <Card 
                key={product.id}
                className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-serif">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </p>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        addToCart(product);
                        setIsCartOpen(true);
                      }}
                    >
                      <Icon name="Plus" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-6 mt-16">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p className="font-serif text-lg mb-2">LUXE</p>
          <p>© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;