import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Package,
  Zap,
  Target,
  Award
} from 'lucide-react';

export const PersonalAnalytics = () => {
  const monthlyStats = {
    totalSpent: 12860,
    totalOrders: 23,
    averageOrderValue: 559,
    mostOrderedCategory: 'Study Materials',
    savings: 1240,
    comparedToLastMonth: {
      spending: -8,
      orders: 12,
    }
  };

  const categoryBreakdown = [
    { category: 'Study Materials', amount: 4500, percentage: 35, icon: '📚', color: 'bg-blue-500' },
    { category: 'Accommodation', amount: 6000, percentage: 47, icon: '🏠', color: 'bg-green-500' },
    { category: 'Transport', amount: 890, percentage: 7, icon: '🚲', color: 'bg-purple-500' },
    { category: 'Events', amount: 970, percentage: 8, icon: '🎉', color: 'bg-pink-500' },
    { category: 'Others', amount: 500, percentage: 3, icon: '📦', color: 'bg-gray-500' }
  ];

  const insights = [
    {
      title: 'Smart Saver',
      description: 'You saved KES 1,240 this month using discounts and offers!',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Budget Conscious',
      description: 'Your spending is 8% lower than last month. Great job!',
      icon: TrendingDown,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Top Category',
      description: 'You spent most on Study Materials - 35% of total budget',
      icon: Target,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          <span>Personal Analytics</span>
          <Badge variant="secondary">This Month</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-gray-600">Total Spent</span>
              </div>
              <p className="text-xl font-bold text-blue-900">
                KES {monthlyStats.totalSpent.toLocaleString()}
              </p>
              {monthlyStats.comparedToLastMonth.spending !== 0 && (
                <div className={`flex items-center space-x-1 text-xs mt-1 ${
                  monthlyStats.comparedToLastMonth.spending < 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {monthlyStats.comparedToLastMonth.spending < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : (
                    <TrendingUp className="h-3 w-3" />
                  )}
                  <span>{Math.abs(monthlyStats.comparedToLastMonth.spending)}% vs last month</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Package className="h-4 w-4 text-green-600" />
                <span className="text-xs text-gray-600">Orders</span>
              </div>
              <p className="text-xl font-bold text-green-900">{monthlyStats.totalOrders}</p>
              {monthlyStats.comparedToLastMonth.orders !== 0 && (
                <div className="flex items-center space-x-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+{monthlyStats.comparedToLastMonth.orders}% vs last month</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ShoppingBag className="h-4 w-4 text-purple-600" />
                <span className="text-xs text-gray-600">Avg. Order</span>
              </div>
              <p className="text-xl font-bold text-purple-900">
                KES {monthlyStats.averageOrderValue}
              </p>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-4 w-4 text-yellow-600" />
                <span className="text-xs text-gray-600">Saved</span>
              </div>
              <p className="text-xl font-bold text-yellow-900">
                KES {monthlyStats.savings}
              </p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Spending by Category</h4>
            <div className="space-y-3">
              {categoryBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">
                        KES {item.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Smart Insights</span>
            </h4>
            <div className="space-y-3">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div key={index} className={`p-4 ${insight.bg} rounded-lg`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 bg-white rounded-lg ${insight.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">{insight.title}</h5>
                        <p className="text-sm text-gray-700">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🏆</div>
                <div>
                  <h5 className="font-semibold text-gray-900">Budget Master</h5>
                  <p className="text-sm text-gray-600">You're in the top 20% of budget-conscious students!</p>
                </div>
              </div>
              <Badge className="bg-yellow-500 text-white">Level 3</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
