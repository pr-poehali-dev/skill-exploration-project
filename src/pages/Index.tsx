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
  { id: 1, name: 'Витаминный комплекс премиум', price: 4500, category: 'health', image: 'https://cdn.poehali.dev/projects/e19ffcda-500b-4173-8ecf-df3943387ea1/files/a674093c-aee4-4377-a787-d9e768e632ff.jpg' },
  { id: 2, name: 'Сыворотка для лица люкс', price: 8900, category: 'beauty', image: 'https://cdn.poehali.dev/projects/e19ffcda-500b-4173-8ecf-df3943387ea1/files/797f642f-e8e8-4e06-8a3e-afbb52938fbb.jpg' },
  { id: 3, name: 'Органический шампунь', price: 2200, category: 'hygiene', image: 'https://cdn.poehali.dev/projects/e19ffcda-500b-4173-8ecf-df3943387ea1/files/797f642f-e8e8-4e06-8a3e-afbb52938fbb.jpg' },
  { id: 4, name: 'Аромадиффузор премиум', price: 5500, category: 'lifestyle', image: 'https://cdn.poehali.dev/projects/e19ffcda-500b-4173-8ecf-df3943387ea1/files/797f642f-e8e8-4e06-8a3e-afbb52938fbb.jpg' },
  { id: 5, name: 'Органический мёд артизан', price: 1800, category: 'food', image: 'https://cdn.poehali.dev/projects/e19ffcda-500b-4173-8ecf-df3943387ea1/files/360494d3-2c63-4e45-9714-c7bb2d15338f.jpg' },
  { id: 6, name: 'Коллагеновые добавки', price: 6200, category: 'health', image: 'https://cdn.poehali.dev/projects/e19ffcda-500b-4173-8ecf-df3943387ea1/files/a674093c-aee4-4377-a787-d9e768e632ff.jpg' },
  { id: 7, name: 'Крем для рук люкс', price: 3400, category: 'beauty', image: 'https://cdn.poehali.dev/projects/e19ffcda-500b-4173-8ecf-df3943387ea1/files/797f642f-e8e8-4e06-8a3e-afbb52938fbb.jpg' },
  { id: 8, name: 'Зубная паста премиум', price: 1500, category: 'hygiene', image: 'https://cdn.poehali.dev/projects/e19ffcda-500b-4173-8ecf-df3943387ea1/files/797f642f-e8e8-4e06-8a3e-afbb52938fbb.jpg' },
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
