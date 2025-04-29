
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

const colors = ['#E6E6FA', '#FFE5B4', '#ADD8E6', '#FFD1DC', '#F5FFFA'];

const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create particles
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const newParticles = [];
    
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        size: Math.random() * 10 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5
      });
    }
    
    setParticles(newParticles);

    // Update positions on window resize
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: Math.min(particle.x, windowWidth),
          y: Math.min(particle.y, windowHeight)
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </>
  );
};

export default FloatingParticles;
