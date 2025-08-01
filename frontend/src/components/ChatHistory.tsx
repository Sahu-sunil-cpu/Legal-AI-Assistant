
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare, Trash2 } from "lucide-react";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatHistoryProps {
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

const ChatHistory = ({ currentChatId, onChatSelect }: ChatHistoryProps) => {
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Contract Review Help",
      lastMessage: "Can you help me understand this employment contract?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: "2", 
      title: "Landlord Rights Question",
      lastMessage: "What are my rights as a tenant regarding repairs?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: "3",
      title: "Copyright Inquiry",
      lastMessage: "How do I protect my creative work?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
    }
  ]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="space-y-2">
      {chatSessions.map((chat) => (
        <Card
          key={chat.id}
          className={`p-3 cursor-pointer transition-colors hover:bg-gray-800 ${
            currentChatId === chat.id 
              ? 'bg-gray-800 border-cyan-500' 
              : 'bg-gray-900/50 border-gray-800'
          }`}
          onClick={() => onChatSelect(chat.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-1">
                <MessageSquare className="h-4 w-4 text-cyan-400 mr-2 flex-shrink-0" />
                <h3 className="text-sm font-medium text-white truncate">
                  {chat.title}
                </h3>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mb-1">
                {chat.lastMessage}
              </p>
              <p className="text-xs text-gray-500">
                {formatTime(chat.timestamp)}
              </p>
            </div>
            <button
              className="h-6 w-6 p-0 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                // Handle delete
              }}
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ChatHistory;
