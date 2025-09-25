import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, TrendingUp, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const trendingSearches = [
    { term: 'lab coat', category: 'Study Essentials', icon: '🥼' },
    { term: 'maskan rooms', category: 'Rental Help', icon: '🏠' },
    { term: 'bicycle rental', category: 'Transport', icon: '🚲' },
    { term: 'food delivery', category: 'Delivery', icon: '🍕' },
    { term: 'campus events', category: 'Events', icon: '🎉' }
  ];

  const recentSearches = [
    'engineering overalls',
    'westlands accommodation',
    'scientific calculator'
  ];

  const handleSearch = () => {
    if (!query.trim()) return;
    
    const searchTerm = query.toLowerCase();
    
    // Smart routing based on search terms
    if (searchTerm.includes('room') || searchTerm.includes('accommodation') || searchTerm.includes('rental')) {
      user ? navigate('/rental-help') : navigate('/auth');
    } else if (searchTerm.includes('food') || searchTerm.includes('delivery') || searchTerm.includes('laundry')) {
      user ? navigate('/delivery') : navigate('/auth');
    } else if (searchTerm.includes('bike') || searchTerm.includes('bicycle')) {
      user ? navigate('/bicycle-rentals') : navigate('/auth');
    } else if (searchTerm.includes('event') || searchTerm.includes('party') || searchTerm.includes('festival')) {
      user ? navigate('/events') : navigate('/auth');
    } else if (searchTerm.includes('furniture') || searchTerm.includes('household')) {
      user ? navigate('/household-items') : navigate('/auth');
    } else {
      // Default to study essentials
      user ? navigate('/study-essentials') : navigate('/auth');
    }
    
    setShowSuggestions(false);
    setQuery('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectTrending = (term: string) => {
    setQuery(term);
    setShowSuggestions(false);
    setTimeout(handleSearch, 100);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search for anything on campus..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          className="pl-12 pr-20 h-14 text-lg bg-white/95 backdrop-blur-sm border-2 border-gray-200 focus:border-purple-400 shadow-lg rounded-xl"
        />
        <Button 
          onClick={handleSearch}
          className="absolute right-2 top-2 h-10 px-4 bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 rounded-lg"
        >
          Search
        </Button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <Card className="absolute top-16 left-0 right-0 z-50 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Trending Searches */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <span className="font-semibold text-gray-900">Trending</span>
                </div>
                <div className="space-y-2">
                  {trendingSearches.map((search) => (
                    <button
                      key={search.term}
                      onClick={() => selectTrending(search.term)}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors text-left"
                    >
                      <span className="text-lg">{search.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{search.term}</div>
                        <div className="text-sm text-gray-500">{search.category}</div>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-semibold text-gray-900">Recent</span>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => selectTrending(search)}
                        className="w-full text-left p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Click outside to close */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};