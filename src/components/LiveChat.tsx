import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MessageCircle, Send, Bot, User, Minimize2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  type?: 'text' | 'quick_reply';
}

export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Campus Connect support. How can I help you today? 😊',
      sender: 'support',
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const quickReplies = [
    'I need help with my order',
    'Room search assistance',
    'Delivery status update',
    'Payment issue',
    'Technical support'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAutoResponse(text),
        sender: 'support',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAutoResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('order') || message.includes('purchase')) {
      return 'I can help you with your order! Please provide your order ID or phone number, and I\'ll check the status for you.';
    } else if (message.includes('room') || message.includes('accommodation')) {
      return 'Looking for accommodation? Our rental team can help you find the perfect room. What\'s your budget and preferred area?';
    } else if (message.includes('delivery')) {
      return 'For delivery updates, please share your order number. Our delivery team will provide real-time updates via WhatsApp.';
    } else if (message.includes('payment')) {
      return 'Payment issues can be frustrating! Please describe the problem and I\'ll connect you with our finance team immediately.';
    } else {
      return 'Thanks for reaching out! A human support agent will be with you shortly. In the meantime, you can also WhatsApp us at +254 790 767 347 for faster assistance.';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(newMessage);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              size="lg"
              className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:scale-110 transition-all duration-200"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0">
            <div className="flex flex-col h-full">
              <SheetHeader className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <SheetTitle className="text-white">Campus Connect Support</SheetTitle>
                    <SheetDescription className="text-blue-100">
                      We're here to help! Average response time: 2 minutes
                    </SheetDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-blue-100">Online</span>
                  </div>
                </div>
              </SheetHeader>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={message.sender === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}>
                          {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border shadow-sm'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white border p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="p-4 bg-white border-t">
                  <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply) => (
                      <Button
                        key={reply}
                        size="sm"
                        variant="outline"
                        onClick={() => sendMessage(reply)}
                        className="text-xs"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => sendMessage(newMessage)}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  For urgent matters, WhatsApp us at +254 790 767 347
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};