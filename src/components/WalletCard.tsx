import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  History
} from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  category: string;
}

export const WalletCard = () => {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [walletBalance] = useState(1250);

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'debit',
      amount: 450,
      description: 'Lab Coat Purchase',
      date: '2 hours ago',
      category: 'Study Materials'
    },
    {
      id: '2',
      type: 'credit',
      amount: 500,
      description: 'Top-up via M-Pesa',
      date: '1 day ago',
      category: 'Payment'
    },
    {
      id: '3',
      type: 'debit',
      amount: 150,
      description: 'Bicycle Rental',
      date: '2 days ago',
      category: 'Transport'
    },
    {
      id: '4',
      type: 'credit',
      amount: 50,
      description: 'Referral Bonus',
      date: '3 days ago',
      category: 'Reward'
    },
    {
      id: '5',
      type: 'debit',
      amount: 200,
      description: 'Event Ticket',
      date: '4 days ago',
      category: 'Events'
    }
  ];

  const handleTopUp = (amount: number) => {
    if (amount < 100) {
      toast.error('Minimum top-up amount is KES 100');
      return;
    }
    toast.success(`Successfully topped up KES ${amount}`);
    setIsTopUpOpen(false);
  };

  const getTransactionIcon = (type: string) => {
    return type === 'credit' ? ArrowDownLeft : ArrowUpRight;
  };

  const getTransactionColor = (type: string) => {
    return type === 'credit' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-green-500" />
          <span>My Wallet</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Wallet Balance */}
          <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-3xl font-bold mt-1">KES {walletBalance.toLocaleString()}</p>
              </div>
              <CreditCard className="h-12 w-12 opacity-80" />
            </div>
            
            <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-white text-green-600 hover:bg-gray-100">
                  <Plus className="h-4 w-4 mr-2" />
                  Top Up Wallet
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Top Up Your Wallet</DialogTitle>
                  <DialogDescription>
                    Add funds to your Campus Connect wallet
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[500, 1000, 2000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => handleTopUp(amount)}
                        className="h-20 flex flex-col items-center justify-center"
                      >
                        <span className="text-lg font-bold">KES {amount}</span>
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or enter amount</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Enter amount (KES)"
                      id="customAmount"
                    />
                    <Button
                      onClick={() => {
                        const input = document.getElementById('customAmount') as HTMLInputElement;
                        const amount = parseInt(input.value);
                        if (!isNaN(amount)) {
                          handleTopUp(amount);
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Payment methods: M-Pesa, Credit Card, Bank Transfer
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <ArrowDownLeft className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Total In</span>
              </div>
              <p className="text-xl font-bold text-green-600">KES 550</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <ArrowUpRight className="h-4 w-4 text-red-600" />
                <span className="text-sm text-gray-600">Total Out</span>
              </div>
              <p className="text-xl font-bold text-red-600">KES 800</p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-3">
              <History className="h-4 w-4" />
              <span>Recent Transactions</span>
            </h4>
            <div className="space-y-2">
              {recentTransactions.map((transaction) => {
                const Icon = getTransactionIcon(transaction.type);
                const colorClass = getTransactionColor(transaction.type);
                
                return (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Icon className={`h-4 w-4 ${colorClass}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className={`font-bold ${colorClass}`}>
                      {transaction.type === 'credit' ? '+' : '-'}KES {transaction.amount}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <Button variant="outline" className="w-full">
            View All Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
