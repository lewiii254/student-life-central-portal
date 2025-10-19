import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Wallet,
  TrendingDown,
  TrendingUp,
  DollarSign,
  AlertCircle,
  PieChart
} from 'lucide-react';
import { toast } from 'sonner';

interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  icon: string;
  color: string;
}

export const BudgetTracker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState(15000);

  const budgetCategories: BudgetCategory[] = [
    { name: 'Study Materials', allocated: 3000, spent: 2450, icon: '📚', color: 'bg-blue-500' },
    { name: 'Accommodation', allocated: 6000, spent: 6000, icon: '🏠', color: 'bg-green-500' },
    { name: 'Food & Dining', allocated: 4000, spent: 3200, icon: '🍔', color: 'bg-orange-500' },
    { name: 'Transport', allocated: 1500, spent: 890, icon: '🚲', color: 'bg-purple-500' },
    { name: 'Entertainment', allocated: 500, spent: 320, icon: '🎉', color: 'bg-pink-500' }
  ];

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalAllocated - totalSpent;
  const budgetPercentage = (totalSpent / totalAllocated) * 100;

  const handleSetBudget = (amount: number) => {
    if (amount < 0) {
      toast.error('Budget must be a positive number');
      return;
    }
    setMonthlyBudget(amount);
    toast.success('Monthly budget updated successfully!');
    setIsOpen(false);
  };

  const getBudgetStatus = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 100) return { color: 'text-red-600', label: 'Exceeded', bg: 'bg-red-100' };
    if (percentage >= 80) return { color: 'text-yellow-600', label: 'Warning', bg: 'bg-yellow-100' };
    return { color: 'text-green-600', label: 'On Track', bg: 'bg-green-100' };
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-purple-500" />
            <span>Budget Tracker</span>
          </CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Set Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Monthly Budget</DialogTitle>
                <DialogDescription>
                  Set your monthly budget to track your expenses
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Enter amount (KES)"
                  defaultValue={monthlyBudget}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      handleSetBudget(value);
                    }
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Budget Summary */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">KES {totalAllocated.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Remaining</p>
                <p className={`text-2xl font-bold ${remainingBudget > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  KES {remainingBudget.toLocaleString()}
                </p>
              </div>
            </div>
            <Progress value={budgetPercentage} className="h-3 mb-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Spent: KES {totalSpent.toLocaleString()} ({Math.round(budgetPercentage)}%)
              </span>
              {budgetPercentage >= 80 && (
                <Badge variant="destructive" className="flex items-center space-x-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{budgetPercentage >= 100 ? 'Over Budget' : 'Alert'}</span>
                </Badge>
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Category Breakdown</span>
            </h4>
            {budgetCategories.map((category, index) => {
              const percentage = (category.spent / category.allocated) * 100;
              const status = getBudgetStatus(category.spent, category.allocated);
              
              return (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                    <Badge className={status.bg + ' ' + status.color}>
                      {status.label}
                    </Badge>
                  </div>
                  <Progress value={percentage} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      KES {category.spent.toLocaleString()} / {category.allocated.toLocaleString()}
                    </span>
                    <span className={`font-medium ${
                      percentage >= 100 ? 'text-red-600' : 
                      percentage >= 80 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spending Trend */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month's Spending</p>
                <p className="text-xl font-bold text-gray-900">KES {totalSpent.toLocaleString()}</p>
              </div>
              <div className={`flex items-center space-x-2 ${
                totalSpent < totalAllocated ? 'text-green-600' : 'text-red-600'
              }`}>
                {totalSpent < totalAllocated ? (
                  <TrendingDown className="h-5 w-5" />
                ) : (
                  <TrendingUp className="h-5 w-5" />
                )}
                <span className="font-medium">
                  {totalSpent < totalAllocated ? 'Under Budget' : 'Over Budget'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
