
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

interface AuthGateProps {
  onAuthenticated: () => void;
}

const AuthGate: React.FC<AuthGateProps> = ({ onAuthenticated }) => {
  const [answer, setAnswer] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const correctAnswer = "october";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsAnimating(true);
    
    setTimeout(() => {
      if (answer.toLowerCase() === correctAnswer) {
        toast.success("Welcome! You have the Niharika key! ✨");
        localStorage.setItem('niharika-auth', 'true');
        onAuthenticated();
      } else {
        toast.error("Oops! You don't have the Niharika Key. Try again with more love 💛");
      }
      setIsAnimating(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="glass-card p-8 md:p-12 w-[90%] max-w-md text-center">
        <h2 className="text-3xl font-serif font-semibold mb-6">Welcome to Niharika's World</h2>
        <p className="mb-8 text-lg">To enter this special space, please answer a simple question</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium">What's your birthday month?</label>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`w-full px-4 py-3 border-2 focus:border-lavender rounded-lg text-center text-lg ${
                isAnimating ? 'animate-pulse-soft' : ''
              }`}
              placeholder="Type with love..."
            />
          </div>
          
          <Button 
            type="submit" 
            className="btn-lavender w-full"
          >
            Enter with Love ❤️
          </Button>
        </form>
      </div>
      
      <p className="mt-8 text-sm text-muted-foreground">
        Made with 💜 for the one who brings sunshine – Niharika Rana
      </p>
    </div>
  );
};

export default AuthGate;
