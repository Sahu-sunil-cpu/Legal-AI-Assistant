import React from 'react';

interface AISpinnerProps {
  size?: number;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

const AISpinner: React.FC<AISpinnerProps> = ({ 
  size = 150, 
  className = "",
  speed = 'fast'
}) => {
  const speedClasses = {
    slow: 'animate-spin [animation-duration:2s]',
    normal: 'animate-spin [animation-duration:1s]', 
    fast: 'animate-spin [animation-duration:0.6s]'
  };

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Main spinning ring */}
      <div 
        className={`absolute inset-0 rounded-full border-4 border-transparent ${speedClasses[speed]}`}
        style={{
          background: `conic-gradient(from 0deg, hsl(var(--ai-primary)), hsl(var(--ai-accent)), hsl(var(--ai-secondary)), hsl(var(--ai-primary)))`,
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px))',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px))'
        }}
      />
      
      {/* Inner counter-spinning ring */}
      <div 
        className={`absolute rounded-full border-2 border-transparent ${speedClasses[speed]} [animation-direction:reverse]`}
        style={{
          width: size * 0.8,
          height: size * 0.8,
          background: `conic-gradient(from 0deg, hsl(var(--ai-glow) / 0.6), transparent, hsl(var(--ai-accent) / 0.4), transparent)`,
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))'
        }}
      />
      
      {/* Center dot */}
      <div 
        className="absolute bg-gradient-to-r from-ai-primary to-ai-secondary rounded-full animate-ai-pulse"
        style={{ 
          width: size * 0.15, 
          height: size * 0.15
        }}
      />
    </div>
  );
};

export default AISpinner;