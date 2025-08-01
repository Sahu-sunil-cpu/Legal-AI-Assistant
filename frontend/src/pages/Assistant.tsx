import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Upload, Send, Volume2, User, Bot, Loader2, Plus } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Header from "@/components/Header";
import ChatHistory from "@/components/ChatHistory";
import VoiceAnimation from "@/components/VoiceAnimation";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const { toast } = useToast();

  const addMessage = (type: 'user' | 'ai', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText("");
    addMessage('user', userMessage);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      addMessage('ai', aiResponse);
      setIsLoading(false);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }, 2000);
  };

  const generateAIResponse = (question: string): string => {
    const responses = [
      "Based on legal precedent, this typically involves understanding the contractual obligations between parties. However, I recommend consulting with a qualified attorney for specific legal advice tailored to your situation.",
      "From a legal perspective, this matter often depends on jurisdiction-specific regulations. The general principle suggests that you should review the terms and conditions carefully before proceeding.",
      "This is an interesting legal question. Generally speaking, the law provides several protections in such cases, but the specific application would depend on the facts of your particular situation.",
      "In most jurisdictions, this type of issue is governed by specific statutes. I'd recommend reviewing the relevant documentation and potentially seeking professional legal counsel for a comprehensive analysis."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast({
        title: "Voice Recognition Not Available",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice Recognition Error",
        description: "Could not capture voice input. Please try again.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type.includes("document")) {
        setSelectedFile(file);
        toast({
          title: "File Uploaded",
          description: `${file.name} is ready for analysis.`
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive"
        });
      }
    }
  };

  const playTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar - Chat History */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="h-full bg-black border-r border-gray-800 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-800">
                <Button 
                  onClick={handleNewChat}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto p-2">
                <ChatHistory 
                  currentChatId={currentChatId}
                  onChatSelect={handleChatSelect}
                  onNewChat={handleNewChat}
                />
              </div>

              {/* Input Box at Bottom */}
              <div className="p-4 border-t border-gray-800">
                <div className="relative">
                  <Textarea
                    placeholder="Ask anything"
                    className="w-full resize-none border-gray-700 bg-gray-900 text-white placeholder-gray-400 pr-12 min-h-[60px]"
                    rows={2}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="absolute right-3 bottom-3 flex space-x-2">
                    <Button
                      size="sm"
                      onClick={handleVoiceInput}
                      disabled={isListening}
                      className={`p-2 h-8 w-8 ${
                        isListening 
                          ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                      } text-white border-0`}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Main Chat Area */}
          <ResizablePanel defaultSize={75}>
            <div className="h-full flex flex-col bg-gray-900">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Welcome to LexiAssist
                    </h3>
                    <p className="text-gray-400">
                      Ask me any legal question, upload a document, or use voice input to get started.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-4 ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.type === 'ai' && (
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-3xl px-6 py-4 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white ml-12'
                            : 'bg-gray-800 text-gray-100 mr-12'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        {message.type === 'ai' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => playTextToSpeech(message.content)}
                            className="mt-3 p-2 h-auto text-cyan-400 hover:bg-gray-700"
                          >
                            <Volume2 className="h-4 w-4 mr-1" />
                            Play
                          </Button>
                        )}
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-gray-800 px-6 py-4 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                        <span className="text-sm text-gray-300">Analyzing your question...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Voice Animation Area */}
              {(isListening || isLoading) && (
                <div className="px-6 py-3 bg-black border-t border-gray-800">
                  <VoiceAnimation isListening={isListening} isAiResponding={isLoading} />
                </div>
              )}

              {/* File Upload Indicator */}
              {selectedFile && (
                <div className="px-6 py-3 bg-blue-900/20 border-t border-blue-800/30">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-300">
                      {selectedFile.name} ready for analysis
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedFile(null)}
                      className="text-blue-400 hover:bg-blue-800/20 p-1 h-auto"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-6 bg-black border-t border-gray-800">
                <div className="max-w-4xl mx-auto">
                  <div className="flex space-x-3 items-end">
                    {/* File Upload Button */}
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-2 border-gray-700 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                      >
                        <Upload className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Text Input */}
                    <div className="flex-1">
                      <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask your legal question here..."
                        className="resize-none border-2 border-gray-700 focus:border-cyan-400 bg-gray-900 text-white placeholder-gray-400 transition-colors"
                        rows={2}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>

                    {/* Send Button */}
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isLoading}
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 border-0"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>

                  {isListening && (
                    <div className="mt-3 text-center">
                      <Badge variant="outline" className="border-red-400 text-red-400 bg-red-500/10">
                        🎤 Listening... Speak now
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Legal Disclaimer */}
              <div className="px-6 py-4 bg-amber-900/20 border-t border-amber-800/30">
                <p className="text-sm text-amber-300 text-center max-w-4xl mx-auto">
                  <strong>Legal Disclaimer:</strong> This AI assistant provides general legal information only and does not constitute legal advice. 
                  For specific legal matters, please consult with a qualified attorney.
                </p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Assistant;
