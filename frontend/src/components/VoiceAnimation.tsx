
import { Bot } from "lucide-react";

interface VoiceAnimationProps {
  isListening: boolean;
  isAiResponding: boolean;
}

const VoiceAnimation = ({ isListening, isAiResponding }: VoiceAnimationProps) => {
  if (isListening) {
    return (
      <div className="flex items-center justify-center space-x-1">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-red-500 rounded-full animate-pulse"
              style={{
                height: '20px',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>
        <span className="text-red-400 text-sm ml-2">Listening...</span>
      </div>
    );
  }

  if (isAiResponding) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="relative">
          <Bot className="h-6 w-6 text-blue-400 ai-responding" />
          <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" />
        </div>
        <span className="text-blue-400 text-sm">AI is responding...</span>
      </div>
    );
  }

  return null;
};

export default VoiceAnimation;
