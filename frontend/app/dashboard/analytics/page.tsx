'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const monthlyData = [
  { month: 'Jan', income: 4800, expenses: 3200, savings: 1600 },
  { month: 'Feb', income: 5200, expenses: 3800, savings: 1400 },
  { month: 'Mar', income: 4900, expenses: 3100, savings: 1800 },
  { month: 'Apr', income: 5500, expenses: 4200, savings: 1300 },
  { month: 'May', income: 5800, expenses: 3900, savings: 1900 },
  { month: 'Jun', income: 6200, expenses: 4100, savings: 2100 },
];

const expenseCategories = [
  { name: 'Food & Dining', value: 1200, color: '#10B981' },
  { name: 'Transportation', value: 800, color: '#3B82F6' },
  { name: 'Shopping', value: 600, color: '#8B5CF6' },
  { name: 'Utilities', value: 400, color: '#F59E0B' },
  { name: 'Entertainment', value: 300, color: '#EF4444' },
  { name: 'Others', value: 500, color: '#6B7280' },
];

const savingsData = [
  { month: 'Jan', personal: 800, business: 400, savings: 400 },
  { month: 'Feb', personal: 900, business: 300, savings: 200 },
  { month: 'Mar', personal: 1100, business: 500, savings: 200 },
  { month: 'Apr', personal: 700, business: 400, savings: 200 },
  { month: 'May', personal: 1200, business: 500, savings: 200 },
  { month: 'Jun', personal: 1300, business: 600, savings: 200 },
];

export default function Analytics() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Analytics Dashboard</h1>
            <p className="text-sm text-gray-600">Insights into your financial patterns</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100">Total Income</p>
                    <p className="text-2xl font-bold">$34,400</p>
                    <p className="text-sm text-emerald-200 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12% from last month
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-emerald-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100">Total Expenses</p>
                    <p className="text-2xl font-bold">$22,300</p>
                    <p className="text-sm text-red-200 flex items-center mt-1">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      -5% from last month
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Savings</p>
                    <p className="text-2xl font-bold">$12,100</p>
                    <p className="text-sm text-blue-200 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +18% from last month
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Avg. Monthly</p>
                    <p className="text-2xl font-bold">$2,017</p>
                    <p className="text-sm text-purple-200">Savings Rate: 35%</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Monthly Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>Income, expenses, and savings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#10B981" name="Income" />
                    <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                    <Bar dataKey="savings" fill="#3B82F6" name="Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Categories */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Where your money goes this month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Wallet Distribution */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Wallet Performance</CardTitle>
                <CardDescription>Growth across different wallets</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={savingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="personal" stroke="#10B981" strokeWidth={3} name="Personal" />
                    <Line type="monotone" dataKey="business" stroke="#3B82F6" strokeWidth={3} name="Business" />
                    <Line type="monotone" dataKey="savings" stroke="#8B5CF6" strokeWidth={3} name="Savings" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Financial Goals */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Financial Goals</CardTitle>
                <CardDescription>Track your progress towards goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Emergency Fund</span>
                    <span className="text-sm text-gray-600">$8,500 / $10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Vacation Fund</span>
                    <span className="text-sm text-gray-600">$2,400 / $5,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Investment Goal</span>
                    <span className="text-sm text-gray-600">$12,000 / $20,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Car Fund</span>
                    <span className="text-sm text-gray-600">$5,200 / $15,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Financial Insights</CardTitle>
              <CardDescription>AI-powered recommendations for better financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-emerald-800">Great Progress!</span>
                    </div>
                    <p className="text-sm text-emerald-700">
                      Your savings rate increased by 18% this month. Keep up the excellent work!
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Spending Pattern</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Your dining expenses are 15% higher than average. Consider meal planning to save more.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Investment Opportunity</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      You have $2,100 sitting idle. Consider investing in our high-yield savings options.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold text-orange-800">Budget Alert</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      You're approaching your monthly shopping budget limit. $100 remaining.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}