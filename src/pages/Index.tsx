
import React, { useState, useEffect } from 'react';
import AuthGate from '@/components/AuthGate';
import AboutNiharika from '@/components/AboutNiharika';
import TruthOrDare from '@/components/TruthOrDare';
import CustomCursor from '@/components/CustomCursor';
import FloatingParticles from '@/components/FloatingParticles';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('niharika-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft text-2xl font-serif">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <AuthGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }
  
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <FloatingParticles />
      
      <header className="py-6 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-serif">Niharika's World</h1>
        <p className="mt-2 text-muted-foreground">A space dedicated to someone special</p>
      </header>
      
      <main className="container mx-auto pb-16">
        <Tabs defaultValue="about" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="about" className="text-lg py-3">About Niharika</TabsTrigger>
              <TabsTrigger value="game" className="text-lg py-3">Truth or Dare</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="about" className="animate-fade-in">
            <AboutNiharika />
          </TabsContent>
          
          <TabsContent value="game" className="animate-fade-in">
            <TruthOrDare />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
