'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (type: 'login' | 'signup') => {
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      }));
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Wallet className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to FinWallet
          </h1>
          <p className="text-gray-600 mt-2">Your journey to financial freedom starts here</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Get Started</CardTitle>
            <CardDescription className="text-center">
              Create your account or sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      placeholder="••••••••"
                      className="pl-10"
                      type="password"
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                  onClick={() => handleAuth('login')}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      placeholder="john@example.com"
                      className="pl-10"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      placeholder="••••••••"
                      className="pl-10"
                      type="password"
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                  onClick={() => handleAuth('signup')}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/')}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Access */}
        <Card className="mt-4 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="font-semibold text-gray-700">Quick Demo Access</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    localStorage.setItem('user', JSON.stringify({
                      id: '1',
                      name: 'Demo User',
                      email: 'demo@example.com',
                      role: 'user'
                    }));
                    router.push('/dashboard');
                  }}
                >
                  User Demo
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    localStorage.setItem('user', JSON.stringify({
                      id: 'admin',
                      name: 'Admin User',
                      email: 'admin@example.com',
                      role: 'admin'
                    }));
                    router.push('/admin');
                  }}
                >
                  Admin Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}