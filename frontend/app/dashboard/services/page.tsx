'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Smartphone, Wifi, Zap, Tv, Car, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const services = [
  {
    id: 'airtime',
    name: 'Airtime',
    icon: Smartphone,
    description: 'Top up your phone',
    color: 'emerald',
    providers: ['MTN', 'Airtel', 'Glo', '9mobile']
  },
  {
    id: 'data',
    name: 'Data Bundle',
    icon: Wifi,
    description: 'Buy internet data',
    color: 'blue',
    providers: ['MTN', 'Airtel', 'Glo', '9mobile']
  },
  {
    id: 'electricity',
    name: 'Electricity',
    icon: Zap,
    description: 'Pay your power bill',
    color: 'yellow',
    providers: ['EKEDC', 'AEDC', 'IKEDC', 'PHEDC']
  },
  {
    id: 'cable',
    name: 'Cable TV',
    icon: Tv,
    description: 'Renew subscription',
    color: 'purple',
    providers: ['DSTV', 'GOtv', 'StarTimes', 'ShowMax']
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: Car,
    description: 'Fund transport cards',
    color: 'orange',
    providers: ['Cowry Card', 'Lagos Ride']
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingCart,
    description: 'Gift cards & vouchers',
    color: 'pink',
    providers: ['Amazon', 'iTunes', 'Google Play', 'Steam']
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [provider, setProvider] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const currentService = services.find(s => s.id === selectedService);

  const handlePayment = async () => {
    if (!provider || !amount) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard?success=payment');
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
            <h1 className="text-xl font-bold">Pay for Services</h1>
            <p className="text-sm text-gray-600">Quick payments for everyday services</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!selectedService ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose a Service</h2>
              <p className="text-gray-600">Select the service you want to pay for</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card
                    key={service.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r from-${service.color}-400 to-${service.color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r from-${currentService?.color}-400 to-${currentService?.color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {currentService && <currentService.icon className="w-8 h-8 text-white" />}
                </div>
                <CardTitle>{currentService?.name}</CardTitle>
                <CardDescription>{currentService?.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Provider Selection */}
                <div className="space-y-2">
                  <Label>Select Provider</Label>
                  <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentService?.providers.map((prov) => (
                        <SelectItem key={prov} value={prov}>
                          {prov}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone Number for Airtime/Data */}
                {(selectedService === 'airtime' || selectedService === 'data') && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="080XXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                )}

                {/* Meter Number for Electricity */}
                {selectedService === 'electricity' && (
                  <div className="space-y-2">
                    <Label htmlFor="meter">Meter Number</Label>
                    <Input
                      id="meter"
                      placeholder="Enter meter number"
                      value={meterNumber}
                      onChange={(e) => setMeterNumber(e.target.value)}
                    />
                  </div>
                )}

                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    step="0.01"
                  />
                </div>

                {/* Quick Amount Buttons */}
                {(selectedService === 'airtime' || selectedService === 'data') && (
                  <div className="space-y-2">
                    <Label>Quick Amounts</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedService === 'airtime' 
                        ? ['100', '200', '500', '1000'].map((quickAmount) => (
                            <Button
                              key={quickAmount}
                              variant="outline"
                              onClick={() => setAmount(quickAmount)}
                              className="h-12"
                            >
                              ₦{quickAmount}
                            </Button>
                          ))
                        : ['1000', '2000', '5000', '10000'].map((quickAmount) => (
                            <Button
                              key={quickAmount}
                              variant="outline"
                              onClick={() => setAmount(quickAmount)}
                              className="h-12"
                            >
                              ₦{quickAmount}
                            </Button>
                          ))
                      }
                    </div>
                  </div>
                )}

                {/* Summary */}
                {provider && amount && (
                  <Card className={`bg-gradient-to-r from-${currentService?.color}-50 to-${currentService?.color}-100 border-${currentService?.color}-200`}>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-2">Payment Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="font-semibold">{currentService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Provider:</span>
                          <span className="font-semibold">{provider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span className="font-semibold">₦{parseFloat(amount || '0').toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fee:</span>
                          <span className="font-semibold">₦0.00</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Total:</span>
                          <span className={`font-bold text-${currentService?.color}-600`}>₦{parseFloat(amount || '0').toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedService(null)}
                    className="flex-1"
                  >
                    Back to Services
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={!provider || !amount || isLoading}
                    className={`flex-1 bg-gradient-to-r from-${currentService?.color}-500 to-${currentService?.color}-600 hover:from-${currentService?.color}-600 hover:to-${currentService?.color}-700`}
                  >
                    {isLoading ? 'Processing...' : `Pay ₦${parseFloat(amount || '0').toFixed(2)}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}