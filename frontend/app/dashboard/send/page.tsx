'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, User, DollarSign, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SendMoney() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [fromWallet, setFromWallet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const wallets = [
    { id: '1', name: 'Personal Wallet', balance: 12450.00 },
    { id: '2', name: 'Business Wallet', balance: 8920.50 },
    { id: '3', name: 'Savings Wallet', balance: 25780.25 }
  ];

  const handleSend = async () => {
    if (!amount || !recipient || !fromWallet) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard?success=sent');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Send Money</h1>
            <p className="text-sm text-gray-600">Transfer funds to another wallet</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Send Money</CardTitle>
              <CardDescription>Choose recipient and amount to send</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From Wallet Selection */}
              <div className="space-y-2">
                <Label>From Wallet</Label>
                <Select value={fromWallet} onValueChange={setFromWallet}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wallet to send from" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{wallet.name}</span>
                          <span className="text-gray-500 ml-4">${wallet.balance.toFixed(2)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Recipient */}
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="recipient"
                    placeholder="Email, phone, or wallet ID"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 text-2xl font-bold"
                    type="number"
                    step="0.01"
                  />
                </div>
                {fromWallet && (
                  <p className="text-sm text-gray-600">
                    Available: ${wallets.find(w => w.id === fromWallet)?.balance.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Textarea
                    id="description"
                    placeholder="What's this payment for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="pl-10 resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="space-y-2">
                <Label>Quick Amounts</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['10', '25', '50', '100'].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      onClick={() => setAmount(quickAmount)}
                      className="h-12"
                    >
                      ${quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {amount && recipient && fromWallet && (
                <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-2">Transaction Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-semibold">${parseFloat(amount || '0').toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee:</span>
                        <span className="font-semibold">$0.00</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-emerald-600">${parseFloat(amount || '0').toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Send Button */}
              <Button
                onClick={handleSend}
                disabled={!amount || !recipient || !fromWallet || isLoading}
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg"
              >
                {isLoading ? 'Sending...' : `Send $${parseFloat(amount || '0').toFixed(2)}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}