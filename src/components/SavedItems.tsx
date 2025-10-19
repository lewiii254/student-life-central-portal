import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart,
  ShoppingCart,
  Eye,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SavedItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  discount?: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export const SavedItems = () => {
  const navigate = useNavigate();

  const savedItems: SavedItem[] = [
    {
      id: '1',
      name: 'Engineering Lab Coat',
      category: 'Study Materials',
      price: 1200,
      image: '🥼',
      discount: 10,
      availability: 'in-stock'
    },
    {
      id: '2',
      name: 'Scientific Calculator',
      category: 'Study Materials',
      price: 2500,
      image: '🔢',
      availability: 'in-stock'
    },
    {
      id: '3',
      name: 'Mountain Bike',
      category: 'Bicycle Rental',
      price: 300,
      image: '🚲',
      availability: 'low-stock'
    },
    {
      id: '4',
      name: 'Study Lamp',
      category: 'Household Items',
      price: 800,
      image: '💡',
      discount: 15,
      availability: 'in-stock'
    }
  ];

  const handleAddToCart = (item: SavedItem) => {
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (itemId: string, itemName: string) => {
    toast.success(`${itemName} removed from wishlist`);
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'in-stock':
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case 'low-stock':
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
            <span>Saved Items</span>
            <Badge variant="secondary">{savedItems.length}</Badge>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/study-essentials')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Browse More
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {savedItems.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No saved items yet</p>
            <p className="text-sm text-gray-500 mb-4">Start adding items you love!</p>
            <Button onClick={() => navigate('/study-essentials')}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {savedItems.map((item) => (
              <div 
                key={item.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl shadow-sm">
                      {item.image}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        KES {item.discount 
                          ? (item.price * (1 - item.discount / 100)).toFixed(0)
                          : item.price}
                      </span>
                      {item.discount && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            KES {item.price}
                          </span>
                          <Badge className="bg-red-100 text-red-800">
                            -{item.discount}%
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {getAvailabilityBadge(item.availability)}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                        disabled={item.availability === 'out-of-stock'}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              View All Saved Items ({savedItems.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
