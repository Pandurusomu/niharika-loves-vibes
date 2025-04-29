
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, Gift, Image, Music } from 'lucide-react';

const AboutNiharika: React.FC = () => {
  const likes = [
    { title: 'Being loved', icon: <Heart className="h-5 w-5" /> },
    { title: 'Giving off good vibes', icon: <Music className="h-5 w-5" /> },
    { title: 'Attending weddings', icon: <Users className="h-5 w-5" /> },
    { title: '"Somie" (a special person)', icon: <Heart className="h-5 w-5" /> },
  ];
  
  const favorites = {
    food: "She doesn't have a fixed one; eats everything that tastes good.",
    color: "Black",
    flower: "Sunflower",
    clothing: "Comfortable and classy",
    hobbies: ["Reading", "Dancing", "Wedding vibes", "Spending time with loved ones"]
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-serif font-semibold text-center mb-12">
        About <span className="text-lavender">Niharika</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-1">
          <Card className="glass-card h-full overflow-hidden">
            <div className="h-full flex items-center justify-center p-6">
              <div className="relative w-48 h-48 md:w-full md:h-64 rounded-full overflow-hidden border-4 border-lavender">
                <div className="w-full h-full bg-gradient-to-br from-lavender to-sky-blue flex items-center justify-center">
                  <Image className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="glass-card h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-serif mb-4">Likes & Interests</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {likes.map((like, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-3 rounded-lg bg-white/30 hover:bg-white/50 transition-all duration-300"
                  >
                    <div className="mr-3 p-2 rounded-full bg-lavender text-white">
                      {like.icon}
                    </div>
                    <span>{like.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="glass-card">
        <CardContent className="p-6">
          <Tabs defaultValue="food" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="color">Color</TabsTrigger>
              <TabsTrigger value="flower">Flower</TabsTrigger>
              <TabsTrigger value="clothing">Clothing</TabsTrigger>
              <TabsTrigger value="hobbies">Hobbies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="food" className="animate-fade-in p-4 bg-white/30 rounded-lg">
              <h3 className="text-xl font-serif mb-2">Favorite Food</h3>
              <p>{favorites.food}</p>
            </TabsContent>
            
            <TabsContent value="color" className="animate-fade-in p-4 bg-white/30 rounded-lg">
              <h3 className="text-xl font-serif mb-2">Favorite Color</h3>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-black rounded-full mr-3"></div>
                <p>{favorites.color}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="flower" className="animate-fade-in p-4 bg-white/30 rounded-lg">
              <h3 className="text-xl font-serif mb-2">Favorite Flower</h3>
              <p className="flex items-center">
                {favorites.flower} <span className="ml-2 text-xl">🌻</span>
              </p>
            </TabsContent>
            
            <TabsContent value="clothing" className="animate-fade-in p-4 bg-white/30 rounded-lg">
              <h3 className="text-xl font-serif mb-2">Clothing Style</h3>
              <p>{favorites.clothing}</p>
            </TabsContent>
            
            <TabsContent value="hobbies" className="animate-fade-in p-4 bg-white/30 rounded-lg">
              <h3 className="text-xl font-serif mb-2">Hobbies</h3>
              <div className="flex flex-wrap gap-2">
                {favorites.hobbies.map((hobby, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-lavender/40 rounded-full"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutNiharika;
