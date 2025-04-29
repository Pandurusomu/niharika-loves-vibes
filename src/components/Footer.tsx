
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 text-center">
      <p className="text-sm flex items-center justify-center gap-2">
        Made with <Heart className="h-4 w-4 text-blush-pink fill-blush-pink" /> for the one who brings sunshine – Niharika Rana
      </p>
    </footer>
  );
};

export default Footer;
