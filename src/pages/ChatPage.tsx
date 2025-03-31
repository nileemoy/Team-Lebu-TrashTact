import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  isAi: boolean;
}

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm TrashTact, your Waste Management AI Assistant. How can I help you create a more sustainable future today?",
      isAi: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite"});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isAi: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages
        .map(msg => msg.isAi ? `AI: ${msg.text}` : `User: ${msg.text}`)
        .join('\n');

      // Enhance prompt with waste management-focused context
      const prompt = `You are a Waste Management AI Assistant that provides expert advice on waste reduction, recycling, composting, and sustainable waste practices. You are named TrashTact. Previous conversation:\n${conversationHistory}\n\nUser's latest message: ${input}\n\nProvide a comprehensive, environmentally-friendly response focused on waste management solutions, recycling tips, waste reduction strategies, and sustainable practices.`;

      
      // Send request to Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: text,
        isAi: true,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, there was an error processing your request. Please try again.",
        isAi: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800 flex flex-col">
      {/* Header with Gradient and Shadow */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="mr-4 hover:bg-green-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-green-700" />
          </Link>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-green-800">AI Chatbot</h1>
          </div>
        </div>
      </div>

      {/* Chat Container with Modern Scrollbar and Padding */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isAi ? 'justify-start' : 'justify-end'} transition-all duration-300 ease-in-out`}
          >
            <div 
              className={`
                max-w-[80%] p-4 rounded-2xl shadow-md 
                ${message.isAi 
                  ? 'bg-white text-green-900 border border-green-200' 
                  : 'bg-green-600 text-white'}
                transform hover:scale-[1.02] transition-all duration-200
              `}
            >
              <ReactMarkdown 
                components={{
                  p: ({node, ...props}) => (
                    <p 
                      {...props} 
                      className={`
                        ${message.isAi 
                          ? 'text-green-900' 
                          : 'text-white'}
                      `}
                    />
                  )
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {/* Loading Indicator with Modern Animation */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-4 bg-white rounded-2xl border border-green-200 shadow-md">
              <div className="flex space-x-2">
                {[1, 2, 3].map((dot) => (
                  <div 
                    key={dot} 
                    className="w-3 h-3 bg-green-400 rounded-full animate-pulse" 
                    style={{ animationDelay: `${dot * 100}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section with Floating Effect */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 bg-white border border-green-200 rounded-full p-1 shadow-sm focus-within:ring-2 focus-within:ring-green-300 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about waste management and recycling..."
              className="flex-1 bg-transparent px-4 py-2 rounded-full focus:outline-none text-green-900 placeholder-green-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="
                bg-green-600 text-white p-2 rounded-full 
                disabled:opacity-50 hover:bg-green-700 
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-green-300
              "
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};