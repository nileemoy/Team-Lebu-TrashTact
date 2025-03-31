import React, { useState, useRef, useEffect } from 'react';
import { Send, PlusCircle, MapPin, AlertTriangle, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Type definitions
type MessageType = 'user' | 'system' | 'complaint';

interface BaseMessage {
  id: number;
  user: string;
  type: MessageType;
}

interface UserMessage extends BaseMessage {
  type: 'user';
  text: string;
}

interface SystemMessage extends BaseMessage {
  type: 'system';
  text: string;
}

interface ComplaintMessage extends BaseMessage {
  type: 'complaint';
  timestamp: string;
  complaint: {
    type: string;
    location: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
  };
}

type Message = UserMessage | SystemMessage | ComplaintMessage;

interface ComplaintData {
  type: string;
  location: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

const WasteManagementCommunityChat: React.FC = () => {
  // Load messages from localStorage or use default
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('wasteManagementMessages');
    return savedMessages 
      ? JSON.parse(savedMessages) 
      : [
          {
            id: 1,
            user: 'Community Assistant',
            type: 'system',
            text: 'Welcome to the Waste Management Community Chat! Feel free to discuss local waste management issues.'
          }
        ];
  });

  const [inputMessage, setInputMessage] = useState<string>('');
  const [complaintData, setComplaintData] = useState<ComplaintData>({
    type: '',
    location: '',
    description: '',
    severity: 'Low'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wasteManagementMessages', JSON.stringify(messages));
  }, [messages]);

  // Complaint types with predefined options
  const complaintTypes: string[] = [
    'Trash Can Overflow',
    'Missed Waste Collection',
    'Illegal Dumping',
    'Recycling Issues',
    'Public Area Cleanliness'
  ];

  // Severity levels
  const severityLevels: ComplaintData['severity'][] = ['Low', 'Medium', 'High', 'Critical'];

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send regular message
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage: UserMessage = {
      id: Date.now(), // Use timestamp as unique ID
      user: 'Current User',
      type: 'user',
      text: inputMessage
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
  };

  // Submit complaint
  const handleSubmitComplaint = () => {
    // Validate all fields are filled
    if (!complaintData.type || !complaintData.location || !complaintData.description) {
      return;
    }

    // Create complaint message
    const complaintMessage: ComplaintMessage = {
      id: Date.now(), // Use timestamp as unique ID
      user: 'Current User',
      type: 'complaint',
      timestamp: new Date().toLocaleString(),
      complaint: { ...complaintData }
    };

    // Add complaint to messages
    setMessages(prevMessages => [...prevMessages, complaintMessage]);

    // Reset complaint form
    setComplaintData({ 
      type: '', 
      location: '', 
      description: '', 
      severity: 'Low' 
    });
  };

  // Clear chat history
  const handleClearChat = () => {
    localStorage.removeItem('wasteManagementMessages');
    setMessages([
      {
        id: 1,
        user: 'Community Assistant',
        type: 'system',
        text: 'Welcome to the Waste Management Community Chat! Feel free to discuss local waste management issues.'
      }
    ]);
  };

  // Render different message types
  const renderMessage = (message: Message) => {
    switch(message.type) {
      case 'user':
        return (
          <div className="flex items-start mb-4">
            <UserCircle2 className="mr-2 w-8 h-8 text-gray-500" />
            <div>
              <div className="font-semibold text-sm mb-1">{message.user}</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[70%]">
                {message.text}
              </div>
            </div>
          </div>
        );
      case 'system':
        return (
          <div className="text-center mb-4 text-gray-500 text-sm">
            {message.text}
          </div>
        );
      case 'complaint':
        return (
          <div className="mb-4">
            <Card className="border-red-500 border-2">
              <CardHeader className="bg-red-50 flex flex-row items-center">
                <AlertTriangle className="mr-2 text-red-500" />
                <span className="font-bold text-red-700">Community Complaint</span>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-semibold">Complaint Type:</span>
                    <p>{message.complaint.type}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Severity:</span>
                    <p className={`
                      font-bold 
                      ${message.complaint.severity === 'Low' ? 'text-green-600' : 
                        message.complaint.severity === 'Medium' ? 'text-yellow-600' : 
                        message.complaint.severity === 'High' ? 'text-orange-600' : 
                        'text-red-600'}
                    `}>
                      {message.complaint.severity}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold flex items-center">
                      <MapPin className="mr-1 w-4 h-4 text-gray-500" /> Location:
                    </span>
                    <p>{message.complaint.location}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold">Description:</span>
                    <p>{message.complaint.description}</p>
                  </div>
                  <div className="col-span-2 text-right text-sm text-gray-500">
                    Reported on: {message.timestamp}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-auto mx-auto border">
      {/* Chat Header */}
      <div className="bg-white p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Community</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <PlusCircle className="mr-2" /> File Complaint
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit a Community Complaint</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Complaint Type</label>
                  <select 
                    value={complaintData.type}
                    onChange={(e) => setComplaintData(prev => ({...prev, type: e.target.value}))}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Complaint Type</option>
                    {complaintTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Severity</label>
                  <select 
                    value={complaintData.severity}
                    onChange={(e) => setComplaintData(prev => ({...prev, severity: e.target.value as ComplaintData['severity']}))}
                    className="w-full p-2 border rounded"
                  >
                    {severityLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Location</label>
                  <Input 
                    type="text"
                    value={complaintData.location}
                    onChange={(e) => setComplaintData(prev => ({...prev, location: e.target.value}))}
                    placeholder="Specific location of the issue"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Description</label>
                  <textarea 
                    className="w-full p-2 border rounded"
                    rows={4}
                    value={complaintData.description}
                    onChange={(e) => setComplaintData(prev => ({...prev, description: e.target.value}))}
                    placeholder="Provide detailed description of the waste management issue"
                    required
                  />
                </div>
                <Button 
                  onClick={handleSubmitComplaint}
                  disabled={!complaintData.type || !complaintData.location || !complaintData.description}
                  className="w-full"
                >
                  Submit Community Complaint
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* <Button 
            variant="destructive" 
            onClick={handleClearChat}
            className="flex items-center"
          >
            Clear Chat
          </Button> */}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-gray-100 p-4 border-t flex items-center">
        <Input 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage}>
          <Send className="mr-2" /> Send
        </Button>
      </div>
    </div>
  );
};

export default WasteManagementCommunityChat;