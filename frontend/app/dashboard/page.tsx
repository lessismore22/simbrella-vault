'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, Plus, Send, RadioReceiver as Receive, CreditCard, Smartphone, Zap, BarChart3, History, Settings, LogOut, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Wallet {
  id: string;
  name: string;
  type: 'personal' | 'business' | 'savings';
  balance: number;
  color: string;
}

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'payment';
  amount: number;
  description: string;
  date: string;
  walletId: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeWallet, setActiveWallet] = useState<string>('1');
  const [wallets, setWallets] = useState<Wallet[]>([
    { id: '1', name: 'Personal Wallet', type: 'personal', balance: 12450.00, color: 'emerald' },
    { id: '2', name: 'Business Wallet', type: 'business', balance: 8920.50, color: 'blue' },
    { id: '3', name: 'Savings Wallet', type: 'savings', balance: 25780.25, color: 'purple' }
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'receive', amount: 500.00, description: 'Payment from Client', date: '2025-01-20', walletId: '2' },
    { id: '2', type: 'send', amount: -150.00, description: 'Transfer to Savings', date: '2025-01-19', walletId: '1' },
    { id: '3', type: 'payment', amount: -45.00, description: 'Electricity Bill', date: '2025-01-18', walletId: '1' },
    { id: '4', type: 'receive', amount: 1200.00, description: 'Salary Deposit', date: '2025-01-15', walletId: '1' },
    { id: '5', type: 'payment', amount: -25.00, description: 'Mobile Data', date: '2025-01-14', walletId: '1' }
  ]);

  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const currentWallet = wallets.find(w => w.id === activeWallet);
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const recentTransactions = transactions.filter(t => t.walletId === activeWallet).slice(0, 5);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Welcome back, {user.name}</h1>
              <p className="text-sm text-gray-600">Manage your finances with ease</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5" />
                  <span>My Wallets</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {wallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      activeWallet === wallet.id 
                        ? `bg-gradient-to-r from-${wallet.color}-100 to-${wallet.color}-200 border-2 border-${wallet.color}-300` 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveWallet(wallet.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-${wallet.color}-500`}></div>
                      <div className="flex-1">
                        <p className="font-medium">{wallet.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{wallet.type}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold mt-2">${wallet.balance.toFixed(2)}</p>
                  </div>
                ))}
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Wallet
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Overview Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-100">Current Balance</p>
                        <p className="text-2xl font-bold">${currentWallet?.balance.toFixed(2)}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-emerald-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Balance</p>
                        <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">This Month</p>
                        <p className="text-2xl font-bold">+12.5%</p>
                      </div>
                      <Activity className="w-8 h-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Perform common tasks with one click</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      className="h-20 flex-col space-y-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                      onClick={() => router.push('/dashboard/send')}
                    >
                      <Send className="w-6 h-6" />
                      <span>Send Money</span>
                    </Button>
                    <Button 
                      className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      onClick={() => router.push('/dashboard/receive')}
                    >
                      <Receive className="w-6 h-6" />
                      <span>Receive</span>
                    </Button>
                    <Button 
                      className="h-20 flex-col space-y-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      onClick={() => router.push('/dashboard/services')}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span>Pay Bills</span>
                    </Button>
                    <Button 
                      className="h-20 flex-col space-y-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                      onClick={() => router.push('/dashboard/analytics')}
                    >
                      <BarChart3 className="w-6 h-6" />
                      <span>Analytics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => router.push('/dashboard/history')}
                  >
                    <History className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'receive' 
                              ? 'bg-emerald-100 text-emerald-600' 
                              : transaction.type === 'send'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-purple-100 text-purple-600'
                          }`}>
                            {transaction.type === 'receive' && <Receive className="w-5 h-5" />}
                            {transaction.type === 'send' && <Send className="w-5 h-5" />}
                            {transaction.type === 'payment' && <CreditCard className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-600">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            transaction.amount > 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </p>
                          <Badge variant={transaction.type === 'receive' ? 'default' : 'secondary'} className="text-xs">
                            {transaction.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}