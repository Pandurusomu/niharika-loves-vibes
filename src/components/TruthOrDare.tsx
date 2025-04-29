
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowRight, Gift } from 'lucide-react';

// Mock implementation for demonstration purposes
// In a real application, this would be integrated with socket.io
interface Room {
  id: string;
  players: string[];
  currentTurn?: number;
  currentQuestion?: Question;
}

interface Question {
  type: 'truth' | 'dare';
  text: string;
}

const TRUTH_QUESTIONS = [
  "What's the most romantic thing you've ever done?",
  "What's your idea of a perfect date?",
  "What's a secret you've never told anyone?",
  "What's the most embarrassing thing you've done?",
  "What's your biggest turn-on?",
  "What's your biggest fear in a relationship?",
  "What's the most adventurous thing you've ever done?",
  "What's something you've always wanted to try but haven't yet?",
  "What's your favorite physical feature about yourself?",
  "What's a deal-breaker for you in a relationship?",
  "Who was your first crush?",
  "What's your love language?",
  "What's the most thoughtful gift you've ever received?",
  "What's something unexpected that makes you happy?",
  "What's your most cherished memory?",
  "If you could change one thing about yourself, what would it be?",
  "What's something you're proud of but don't usually tell people?",
  "What's your favorite way to be shown affection?",
  "What's a dream you've never shared with anyone?",
  "What's the most spontaneous thing you've ever done?",
  "What's something you've always wanted to hear someone say to you?",
  "What's your favorite physical feature in others?",
  "What's a misconception people often have about you?",
  "If you could be famous for one thing, what would it be?",
  "What's your favorite memory of us together?",
];

const DARE_QUESTIONS = [
  "Send a voice note singing your favorite love song.",
  "Send a selfie making your cutest face.",
  "Write a short poem about your feelings right now.",
  "Call the other person and tell them three things you adore about them.",
  "Show the most recent photo you've taken.",
  "Do your best dance move and send a video.",
  "Send the last text you sent to someone else (nothing too personal).",
  "Tell a joke that will make the other person laugh.",
  "Reveal something on your bucket list.",
  "Send a voice message whispering something sweet.",
  "Share your screen and show your most visited website.",
  "Send a picture of your happy place.",
  "Send a voice message in your best accent.",
  "Tell the story of how we met from your perspective.",
  "Send a photo of something that reminds you of me.",
  "Draw something that represents our relationship and send a picture.",
  "Set a romantic song as your ringtone for the next day.",
  "Write a haiku about your current feelings.",
  "Send a voice message telling a childhood story.",
  "Send a picture of your favorite outfit.",
  "Describe the perfect day with me in three sentences.",
  "Send a message in another language (with translation).",
  "Leave a sweet voice message that I can listen to tomorrow morning.",
  "Share a screenshot of your favorite chat between us.",
  "Create a short playlist of songs that remind you of me.",
];

const TruthOrDare: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [room, setRoom] = useState<Room | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedType, setSelectedType] = useState<'truth' | 'dare' | null>(null);
  const [bottleRotation, setBottleRotation] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number | null>(null);
  
  // Generate a random room ID
  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  // Create a new room
  const createRoom = () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name first");
      return;
    }
    
    const newRoomId = generateRoomId();
    const newRoom: Room = {
      id: newRoomId,
      players: [playerName],
    };
    
    // In a real app, this would be sent to the server
    setRoom(newRoom);
    setRoomId(newRoomId);
    toast.success(`Room created! Your room ID is ${newRoomId}`);
  };
  
  // Join an existing room
  const joinRoom = () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name first");
      return;
    }
    
    if (!roomId.trim()) {
      toast.error("Please enter a room ID");
      return;
    }
    
    // In a real app, this would check with the server
    // Mock implementation for demonstration
    const mockRoom: Room = {
      id: roomId,
      players: ['Host', playerName],
    };
    
    setRoom(mockRoom);
    toast.success(`Joined room ${roomId}`);
  };
  
  // Spin the bottle
  const spinBottle = () => {
    if (!room || room.players.length < 2) {
      toast.error("Need at least 2 players to spin");
      return;
    }
    
    setSpinning(true);
    setSelectedType(null);
    setQuestion(null);
    
    // Generate a random rotation between 720 and 1080 degrees (2-3 full spins) plus some offset
    const randomRotation = 720 + Math.random() * 360 + Math.random() * 360;
    const targetPlayerIndex = Math.floor(Math.random() * room.players.length);
    
    // Apply the rotation
    setBottleRotation(randomRotation);
    
    // Wait for the spin animation to finish
    setTimeout(() => {
      setSpinning(false);
      setCurrentPlayerIndex(targetPlayerIndex);
      toast.info(`The bottle points to ${room.players[targetPlayerIndex]}!`);
    }, 2000);
  };
  
  // Choose truth or dare
  const chooseQuestion = (type: 'truth' | 'dare') => {
    const questions = type === 'truth' ? TRUTH_QUESTIONS : DARE_QUESTIONS;
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    setSelectedType(type);
    setQuestion({ type, text: randomQuestion });
  };
  
  // Get a new question of the same type
  const getNewQuestion = () => {
    if (!selectedType) return;
    chooseQuestion(selectedType);
  };
  
  // Set custom CSS variable for spin animation
  useEffect(() => {
    document.documentElement.style.setProperty('--spin-degree', `${bottleRotation}deg`);
  }, [bottleRotation]);
  
  // Room creation/joining view
  if (!room) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="glass-card">
          <CardContent className="p-8">
            <h2 className="text-3xl font-serif mb-6 text-center">Truth or Dare</h2>
            <p className="mb-8 text-center">Create or join a room to play with someone special</p>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2">Your Name</label>
                <Input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={createRoom}
                  className="btn-peach"
                >
                  Create New Room
                </Button>
                
                <div className="flex gap-2">
                  <Input
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    placeholder="Room ID"
                    className="w-full"
                    maxLength={6}
                  />
                  <Button 
                    onClick={joinRoom}
                    variant="outline"
                  >
                    Join <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Game room view
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card className="glass-card">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif">Room: {room.id}</h2>
            <div className="text-sm bg-lavender/30 px-3 py-1 rounded-full">
              {room.players.length} Players
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Players</h3>
            <div className="flex gap-2 flex-wrap">
              {room.players.map((player, index) => (
                <div 
                  key={index} 
                  className={`px-3 py-1 rounded-full ${
                    currentPlayerIndex === index 
                      ? 'bg-lavender text-white' 
                      : 'bg-white/40'
                  }`}
                >
                  {player}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="relative w-full h-48 flex items-center justify-center">
              {/* Wooden table background */}
              <div className="absolute inset-0 bg-soft-peach/30 rounded-lg"></div>
              
              {/* Bottle */}
              <div 
                className={`relative h-32 w-8 rounded-full transform origin-center ${
                  spinning ? 'animate-spin-bottle' : ''
                }`}
                style={{ transform: !spinning ? `rotate(${bottleRotation}deg)` : undefined }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-sky-blue to-sky-blue/70 rounded-full"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
            
            <Button 
              onClick={spinBottle}
              className="btn-lavender w-full"
              disabled={spinning}
            >
              {spinning ? 'Spinning...' : 'Spin the Bottle'}
            </Button>
          </div>
          
          {currentPlayerIndex !== null && !question && (
            <div className="mb-8 text-center animate-fade-in">
              <p className="mb-4">
                {room.players[currentPlayerIndex]} must answer...
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => chooseQuestion('truth')} 
                  className="bg-sky-blue hover:bg-sky-blue/90 text-primary-foreground"
                >
                  Truth
                </Button>
                <Button 
                  onClick={() => chooseQuestion('dare')} 
                  className="bg-blush-pink hover:bg-blush-pink/90 text-primary-foreground"
                >
                  Dare
                </Button>
              </div>
            </div>
          )}
          
          {question && (
            <div className="animate-slide-up">
              <Card className="mb-4 bg-white/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                      question.type === 'truth' 
                        ? 'bg-sky-blue/40' 
                        : 'bg-blush-pink/40'
                    }`}>
                      {question.type.toUpperCase()}
                    </div>
                    <Gift className="h-5 w-5 text-lavender" />
                  </div>
                  <p className="text-lg">{question.text}</p>
                </CardContent>
              </Card>
              
              <div className="flex gap-2">
                <Button
                  onClick={getNewQuestion}
                  variant="outline"
                  className="flex-1"
                >
                  New Question
                </Button>
                <Button
                  onClick={spinBottle}
                  className="btn-lavender flex-1"
                >
                  Next Turn
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TruthOrDare;
