
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Sparkles, User, Bot, RefreshCw, Copy, Check, 
  Menu, X, MessageSquare, Zap, Code, PenTool, BarChart, 
  Paperclip, Image as ImageIcon, FileText, Shield, 
  MoreHorizontal, Download, Trash2, ShieldCheck, Terminal, Maximize2, Moon, Sun, 
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
type MessageType = 'text' | 'code' | 'image' | 'chart' | 'security' | 'file';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  type: MessageType;
  content: string;
  data?: any; // For charts, code language, file details etc.
  timestamp: Date;
}

// --- Helpers ---
const handleDownload = (msg: Message) => {
    const element = document.createElement("a");
    let file;
    let fileName = `srxai-output-${Date.now()}`;

    if (msg.type === 'code') {
        const ext = msg.data?.language === 'typescript' || msg.data?.language === 'javascript' ? 'js' : 'txt';
        file = new Blob([msg.data?.code], { type: 'text/plain' });
        fileName += `.${ext}`;
    } else if (msg.type === 'image') {
        const link = document.createElement('a');
        link.href = msg.data.url;
        link.download = fileName + '.png';
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        return;
    } else if (msg.type === 'chart') {
        file = new Blob([JSON.stringify(msg.data, null, 2)], { type: 'application/json' });
        fileName += '.json';
    } else {
        file = new Blob([msg.content], { type: 'text/plain' });
        fileName += '.txt';
    }

    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        // Remove data:mime;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// --- Components ---

// 1. Code Block Component (Light Theme Variant)
const CodeBlock = ({ code, language, onDownload }: { code: string, language: string, onDownload: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-gray-200 bg-gray-900 shadow-xl group">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs font-mono text-gray-400 ml-2 lowercase">{language || 'code'}</span>
        </div>
        <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={onDownload} className="text-gray-400 hover:text-white transition-colors" title="Download Code">
                <Download size={14} />
            </button>
            <button onClick={handleCopy} className="text-gray-400 hover:text-white flex items-center text-xs transition-colors">
            {copied ? <Check size={14} className="mr-1 text-green-400" /> : <Copy size={14} className="mr-1" />}
            {copied ? 'Copied' : 'Copy'}
            </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-sm text-blue-100 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

// 2. Chart Component
const AnalyticsChart = ({ data, onDownload }: { data: ChartData[], onDownload: () => void }) => {
  return (
    <div className="my-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-md relative group">
      <div className="flex justify-between items-start mb-6">
          <h4 className="text-sm font-bold text-gray-700 flex items-center">
            <BarChart size={16} className="mr-2 text-indigo-500" /> Analysis
          </h4>
          <button onClick={onDownload} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <Download size={14} />
          </button>
      </div>
      <div className="flex items-end justify-between h-40 space-x-3 px-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1 group/bar">
             <div className="relative w-full flex justify-center h-full items-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${item.value}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                  className={`w-full max-w-[40px] rounded-t-lg opacity-90 hover:opacity-100 transition-all relative shadow-sm ${item.color}`} 
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg pointer-events-none">
                        {item.value}%
                    </div>
                </motion.div>
             </div>
             <span className="text-[10px] uppercase font-bold text-gray-400 mt-3">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Security Card Component
const SecurityCard = () => {
  return (
    <div className="my-4 p-5 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 flex items-start space-x-4 shadow-sm">
       <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 shadow-sm">
          <ShieldCheck size={24} />
       </div>
       <div>
          <h4 className="font-bold text-emerald-800 text-sm mb-1">Security Scan Complete</h4>
          <p className="text-xs text-emerald-600/80 mb-3">No critical vulnerabilities found in the uploaded file.</p>
          <div className="grid grid-cols-2 gap-2">
             <div className="bg-white px-3 py-1.5 rounded-md text-[10px] font-medium text-emerald-600 border border-emerald-100 flex items-center shadow-sm">
               <Check size={10} className="mr-1.5" /> Malware Free
             </div>
             <div className="bg-white px-3 py-1.5 rounded-md text-[10px] font-medium text-emerald-600 border border-emerald-100 flex items-center shadow-sm">
               <Check size={10} className="mr-1.5" /> Valid Signature
             </div>
          </div>
       </div>
    </div>
  );
};

// 4. File Display Component
const FileMessage = ({ filename, size }: { filename: string, size: string }) => {
    return (
        <div className="flex items-center p-3 bg-white border border-gray-200 rounded-xl max-w-sm my-2 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500 mr-3">
                <FileText size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="text-sm font-medium text-gray-800 truncate">{filename}</div>
                <div className="text-xs text-gray-500">{size} • Uploaded</div>
            </div>
            <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            </div>
        </div>
    );
};

// --- Main Chat Page ---

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  
  // Responsiveness State
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Chat States
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recentChats, setRecentChats] = useState<string[]>([]);
  
  // Feature Toggles
  const [isImageMode, setIsImageMode] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Responsive State
  useEffect(() => {
    const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        if (mobile) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    };
    
    // Initial Check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // --- Real Intelligence Engine using Gemini API ---
  const generateResponse = async (prompt: string, file: File | null, forceImageMode: boolean = false) => {
    setIsTyping(true);
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        let modelName = 'gemini-2.5-flash'; // Default for text
        let isImageRequest = forceImageMode;

        // Enhanced Intent Detection for Image Generation (Includes Hinglish/Hindi)
        const lowerPrompt = prompt.toLowerCase();
        const imageKeywords = [
            'generate image', 'create an image', 'draw', 'paint', 'picture of', 'visualize', 'sketch', 'render', 
            'photo', 'image', 'tasveer', 'chitra', 'banao', 'dikhao', 'khencho', 'pic', 'art'
        ];

        // Check if user is asking for an image via keywords if not forced
        if (!isImageRequest && imageKeywords.some(keyword => lowerPrompt.includes(keyword))) {
            modelName = 'gemini-2.5-flash-image';
            isImageRequest = true;
        }

        // If forced mode, enforce model
        if (forceImageMode) {
             modelName = 'gemini-2.5-flash-image';
        }

        let contents: any = null;

        if (file) {
            const base64Data = await fileToBase64(file);
            // If file is provided, we send it as a part
            contents = {
                parts: [
                    { 
                        inlineData: { 
                            mimeType: file.type, 
                            data: base64Data 
                        } 
                    },
                    { text: prompt || "Analyze this file" }
                ]
            };
            // If user explicitly asks for image generation/editing with an input image, use flash-image
            if (isImageRequest) {
                 modelName = 'gemini-2.5-flash-image';
            }
        } else {
             // Text only prompt
             if (isImageRequest) {
                 // For image generation, sometimes adding "Generate an image of" helps the model context if the user just typed "cat"
                 const augmentedPrompt = prompt.length < 20 ? `Generate a high quality image of ${prompt}` : prompt;
                 contents = {
                    parts: [{ text: augmentedPrompt }]
                 };
             } else {
                 contents = prompt;
             }
        }

        const response = await ai.models.generateContent({
            model: modelName,
            contents: contents
        });

        const newMessages: Message[] = [];
        const msgId = Date.now().toString();

        // Check for parts in response (Nano Banana / Flash Image model structure often returns parts)
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    // Handle Image Response
                    const base64String = part.inlineData.data;
                    const mimeType = part.inlineData.mimeType || 'image/png';
                    newMessages.push({
                        id: msgId + '_img',
                        role: 'assistant',
                        type: 'image',
                        content: isImageRequest ? `Generated result for: "${prompt}"` : "I've generated this visualization for you:",
                        data: { url: `data:${mimeType};base64,${base64String}` },
                        timestamp: new Date()
                    });
                } else if (part.text) {
                    // Handle Text Response part
                    newMessages.push({
                        id: msgId + '_text',
                        role: 'assistant',
                        type: 'text',
                        content: part.text,
                        timestamp: new Date()
                    });
                }
            }
        } else if (response.text) {
             // Standard text response
             newMessages.push({
                id: msgId,
                role: 'assistant',
                type: 'text',
                content: response.text,
                timestamp: new Date()
            });
        }

        // Fallback
        if (newMessages.length === 0) {
             newMessages.push({
                id: msgId,
                role: 'assistant',
                type: 'text',
                content: "I processed your request but didn't generate a visible output. Please try refining your prompt.",
                timestamp: new Date()
            });
        }

        setMessages(prev => [...prev, ...newMessages]);

    } catch (error: any) {
        console.error("AI Error:", error);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'assistant',
            type: 'text',
            content: `I encountered an error: ${error.message || "Unknown error"}. Please check if the API key is configured correctly.`,
            timestamp: new Date()
        }]);
    } finally {
        setIsTyping(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setSelectedFile(e.target.files[0]);
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    // --- Dynamic Recent Chat Generation ---
    if (messages.length === 0) {
        let chatTitle = "New Conversation";
        if (input) {
            chatTitle = input.length > 25 ? input.substring(0, 25) + "..." : input;
        } else if (selectedFile) {
            chatTitle = `Analysis: ${selectedFile.name}`;
        }
        setRecentChats(prev => [chatTitle, ...prev]);
    }

    // Handle File Message UI
    if (selectedFile) {
        const fileMsg: Message = {
            id: Date.now().toString() + '_file',
            role: 'user',
            type: 'file',
            content: 'Uploaded a file',
            data: { 
                filename: selectedFile.name, 
                size: (selectedFile.size / 1024).toFixed(1) + ' KB' 
            },
            timestamp: new Date()
        };
        setMessages(prev => [...prev, fileMsg]);
    }

    // Handle Text Message UI
    if (input.trim()) {
        const textMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            type: 'text',
            content: input,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, textMsg]);
    }

    const currentInput = input;
    const currentFile = selectedFile;
    const currentMode = isImageMode; // Capture current mode

    // Reset Input
    setInput('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    // Optional: Reset image mode after send? No, let user keep it if they want multiple images.
    
    // Trigger Real AI
    generateResponse(currentInput || (currentFile ? "Analyze this file" : ""), currentFile, currentMode);
  };

  return (
    <div className="flex h-[100dvh] bg-[#f8f9fc] text-gray-900 font-sans overflow-hidden selection:bg-indigo-100 selection:text-indigo-900 relative">
      
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setIsSidebarOpen(false)}
             className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
           />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{ 
           width: isMobile ? 280 : (isSidebarOpen ? 280 : 0),
           x: isMobile ? (isSidebarOpen ? 0 : -280) : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
            bg-white/80 backdrop-blur-xl border-r border-indigo-50 flex-col overflow-hidden 
            ${isMobile ? 'fixed inset-y-0 left-0 z-50 h-full shadow-2xl' : 'relative z-20 flex-shrink-0 shadow-xl shadow-indigo-100/50'}
        `}
      >
        <div className="p-6 flex items-center justify-between">
             <Link to="/" className="flex items-center space-x-3 text-gray-900 font-bold text-xl hover:text-indigo-600 transition-colors group">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                    <span className="text-white font-serif font-bold tracking-tight">SRX</span>
                 </div>
                 <span className="tracking-tight">SrxAI</span>
             </Link>
             <button onClick={() => { setMessages([]); if(isMobile) setIsSidebarOpen(false); }} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-indigo-600 transition-colors" title="Clear Chat">
                 <RefreshCw size={18} />
             </button>
        </div>

        <div className="px-5 pb-6">
            <button 
                onClick={() => { setMessages([]); if(isMobile) setIsSidebarOpen(false); }} 
                className="w-full flex items-center justify-center space-x-2 bg-white border border-indigo-100 text-gray-700 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md px-4 py-3.5 rounded-2xl transition-all font-semibold shadow-sm active:scale-95 group"
            >
                <Zap size={18} className="text-yellow-500 group-hover:animate-pulse" />
                <span>New Conversation</span>
            </button>
        </div>

        <div className="flex-grow overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
            <div className="px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 mt-2">Recent Chats</div>
            {recentChats.length === 0 ? (
                 <div className="px-4 py-2 text-xs text-gray-400 italic">Start a conversation to see history...</div>
            ) : (
                recentChats.map((chat, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => { if(isMobile) setIsSidebarOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl truncate transition-all flex items-center group animate-in fade-in slide-in-from-left-2 duration-300"
                    >
                        <MessageSquare size={16} className="mr-3 text-gray-300 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
                        <span className="truncate">{chat}</span>
                    </button>
                ))
            )}
        </div>

        <div className="p-5 border-t border-indigo-50">
             <div className="flex items-center space-x-3 px-3 py-3 hover:bg-indigo-50 rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-indigo-100 group">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-md group-hover:shadow-lg transition-all">
                     SR
                 </div>
                 <div className="flex-grow min-w-0">
                     <div className="text-sm font-bold text-gray-800 truncate">Sumit Rao</div>
                     <div className="text-xs text-indigo-500 font-medium truncate">Pro Plan</div>
                 </div>
                 <MoreHorizontal size={16} className="text-gray-400 group-hover:text-indigo-500" />
             </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col relative bg-[#f8f9fc] h-full w-full">
          {/* Aesthetic Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 z-0"></div>
          <div className="hidden md:block absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="hidden md:block absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] pointer-events-none"></div>
          
          {/* Header */}
          <div className="h-16 md:h-20 flex items-center px-4 md:px-6 justify-between relative z-10 shrink-0">
              <div className="flex items-center">
                  <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="p-2 hover:bg-white rounded-lg mr-3 text-gray-500 transition-colors shadow-sm bg-white/50 border border-transparent hover:border-gray-200"
                  >
                      {isSidebarOpen && !isMobile ? <X size={20} /> : <Menu size={20} />}
                  </button>
                  <div className="flex flex-col">
                      <div className="flex items-center">
                          <span className="font-bold text-lg text-gray-800 mr-2 tracking-tight">SrxAI</span>
                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">BETA</span>
                      </div>
                  </div>
              </div>
              <div className="flex items-center space-x-4">
                   <div className="hidden md:flex items-center text-xs font-bold text-emerald-600 bg-white/80 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm backdrop-blur-sm">
                       <ShieldCheck size={14} className="mr-1.5" /> Secure Connection
                   </div>
              </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth custom-scrollbar relative z-10">
              {messages.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-8"
                  >
                       {/* Center Orb Logo */}
                       <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)] border-4 border-white relative group cursor-pointer">
                           <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-10 animate-pulse"></div>
                           <span className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 group-hover:scale-110 transition-transform">
                               SRX
                           </span>
                       </div>

                       <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm mb-6">
                           <span className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 flex items-center">
                               <Sparkles size={12} className="mr-2 text-purple-500" /> GENERATIVE AI FOR BUSINESS
                           </span>
                       </div>

                       <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                           Meet SrxAI, <br/> your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">All-in-One AI</span> assistant
                       </h2>
                       <p className="text-gray-500 text-sm md:text-lg mb-8 md:mb-12 max-w-xl leading-relaxed">
                           SrxAI is an integrated intelligence layer. Try asking it to "Generate an image of a futuristic city" or "Write a Python script".
                       </p>
                       
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
                           {[
                               { icon: Code, label: 'Code Gen', prompt: 'Write a React component', color: 'text-blue-500', bg: 'bg-blue-50' },
                               { icon: ImageIcon, label: 'Generate Image', prompt: 'Generate an image of a futuristic office', color: 'text-purple-500', bg: 'bg-purple-50' },
                               { icon: BarChart, label: 'Analytics', prompt: 'Explain recent tech trends', color: 'text-indigo-500', bg: 'bg-indigo-50' },
                               { icon: Shield, label: 'Security', prompt: 'How to secure a React app?', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                           ].map((item, idx) => (
                               <button 
                                 key={idx}
                                 onClick={() => setInput(item.prompt)}
                                 className="flex flex-col items-center justify-center p-4 md:p-6 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all group backdrop-blur-sm shadow-sm"
                               >
                                   <div className={`p-3 rounded-full ${item.bg} mb-3 group-hover:scale-110 transition-transform`}>
                                       <item.icon className={item.color} size={24} />
                                   </div>
                                   <span className="text-xs md:text-sm font-bold text-gray-600 group-hover:text-gray-900">{item.label}</span>
                               </button>
                           ))}
                       </div>
                  </motion.div>
              ) : (
                  messages.map((msg) => (
                      <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                          <div className={`flex max-w-[95%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                               
                               {/* Avatar */}
                               <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md mt-1 border-2 border-white ${
                                   msg.role === 'user' 
                                   ? 'bg-gradient-to-br from-indigo-500 to-purple-600 ml-2 md:ml-4' 
                                   : 'bg-white mr-2 md:mr-4'
                               }`}>
                                   {msg.role === 'user' 
                                     ? <User size={16} className="text-white" /> 
                                     : <span className="text-[10px] font-bold text-indigo-600">SRX</span>
                                   }
                               </div>

                               {/* Content Bubble */}
                               <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                   
                                   {/* Name & Time */}
                                   <div className={`flex items-center text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                       <span className="mx-2">{msg.role === 'user' ? 'You' : 'SrxAI'}</span>
                                       <span>{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                   </div>

                                   {/* Bubble Body */}
                                   <div className={`p-4 md:p-5 rounded-2xl shadow-sm text-sm leading-relaxed overflow-hidden relative ${
                                       msg.role === 'user' 
                                       ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-sm shadow-indigo-200' 
                                       : 'bg-white text-gray-700 border border-gray-100 rounded-tl-sm w-full shadow-sm'
                                   }`}>
                                       {/* Render different message types */}
                                       
                                       {msg.type === 'text' && (
                                           <div className="whitespace-pre-wrap">{msg.content}</div>
                                       )}

                                       {msg.type === 'file' && msg.data && (
                                           <div className={`${msg.role === 'user' ? 'text-white' : 'text-gray-900'}`}>
                                               <div className="mb-2 opacity-90">{msg.content}</div>
                                               <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                                                   <FileMessage filename={msg.data.filename} size={msg.data.size} />
                                               </div>
                                           </div>
                                       )}

                                       {msg.type === 'code' && (
                                           <>
                                              <p className="mb-2 font-medium text-gray-900">{msg.content}</p>
                                              <CodeBlock code={msg.data.code} language={msg.data.language} onDownload={() => handleDownload(msg)} />
                                           </>
                                       )}

                                       {msg.type === 'chart' && (
                                           <>
                                               <p className="mb-2 font-medium text-gray-900">{msg.content}</p>
                                               <AnalyticsChart data={msg.data} onDownload={() => handleDownload(msg)} />
                                           </>
                                       )}

                                       {msg.type === 'image' && (
                                           <>
                                               <p className="mb-3 font-medium text-gray-900">{msg.content}</p>
                                               <div className="relative group/image max-w-sm rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                                                   <img src={msg.data.url} alt="Generated" className="w-full h-auto" />
                                                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                       <button onClick={() => handleDownload(msg)} className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-xs flex items-center hover:bg-gray-100 transition-colors shadow-lg">
                                                           <Download size={14} className="mr-2" /> Download Image
                                                       </button>
                                                   </div>
                                               </div>
                                           </>
                                       )}

                                       {msg.type === 'security' && (
                                           <>
                                               <p className="mb-2 italic opacity-80">{msg.content}</p>
                                               <SecurityCard />
                                           </>
                                       )}

                                       {/* Universal Action Bar for AI Text messages */}
                                       {msg.role === 'assistant' && msg.type === 'text' && (
                                           <div className="mt-4 flex items-center space-x-3 pt-3 border-t border-gray-100">
                                               <button onClick={() => navigator.clipboard.writeText(msg.content)} className="text-gray-400 hover:text-indigo-600 transition-colors" title="Copy">
                                                   <Copy size={14} />
                                               </button>
                                               <button onClick={() => handleDownload(msg)} className="text-gray-400 hover:text-indigo-600 transition-colors" title="Download as .txt">
                                                   <Download size={14} />
                                               </button>
                                           </div>
                                       )}
                                   </div>
                               </div>
                          </div>
                      </motion.div>
                  ))
              )}
              
              {/* Typing Indicator */}
              {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start w-full">
                       <div className="flex flex-row items-end">
                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 mr-4 flex items-center justify-center mb-1 shadow-sm">
                               <span className="text-[8px] font-bold text-indigo-600">SRX</span>
                           </div>
                           <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100 flex space-x-1.5 items-center h-10 shadow-sm">
                               <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                               <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                               <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                           </div>
                       </div>
                  </motion.div>
              )}
              <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 relative z-20 shrink-0">
              <div className="max-w-4xl mx-auto">
                  {/* File Preview Chip */}
                  <AnimatePresence>
                      {selectedFile && (
                          <motion.div 
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: 10 }}
                             className="flex items-center bg-white border border-indigo-100 rounded-xl p-2 mb-3 w-max shadow-lg shadow-indigo-100/50"
                          >
                              <div className="bg-indigo-50 p-1.5 rounded-lg mr-2 text-indigo-500">
                                  <Paperclip size={14} />
                              </div>
                              <span className="text-sm text-gray-700 mr-3 font-medium">{selectedFile.name}</span>
                              <button onClick={() => { setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value='' }} className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-md">
                                  <X size={14} />
                              </button>
                          </motion.div>
                      )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="relative flex items-end bg-white border border-gray-200 rounded-3xl shadow-2xl shadow-indigo-100/50 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all overflow-hidden group p-2">
                      {/* Hidden File Input */}
                      <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          className="hidden"
                          id="file-upload"
                      />
                      
                      <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="p-3 m-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                          title="Upload File"
                      >
                          <Paperclip size={20} />
                      </button>

                      {/* Image Generation Toggle */}
                      <button 
                          type="button"
                          onClick={() => setIsImageMode(!isImageMode)}
                          className={`p-3 m-1 rounded-full transition-all flex items-center justify-center ${
                              isImageMode 
                              ? 'bg-purple-100 text-purple-600 shadow-inner' 
                              : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                          }`}
                          title={isImageMode ? "Image Mode ON" : "Turn on Image Mode"}
                      >
                          <ImageIcon size={20} />
                          {isImageMode && <span className="ml-2 text-xs font-bold hidden md:inline">Image Mode</span>}
                      </button>

                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isImageMode ? "Describe the image you want..." : "Message SrxAI..."}
                        className="w-full bg-transparent text-gray-800 border-none focus:ring-0 py-4 px-2 placeholder-gray-400 max-h-32 font-medium"
                      />
                      
                      <button 
                         type="submit" 
                         disabled={(!input.trim() && !selectedFile) || isTyping}
                         className={`p-3 m-1 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed ${
                             isImageMode 
                             ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-200' 
                             : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-indigo-300'
                         }`}
                      >
                          <Send size={18} fill="white" />
                      </button>
                  </form>
                  <div className="text-center mt-3 hidden md:block">
                      <p className="text-[10px] font-bold text-gray-400 flex items-center justify-center uppercase tracking-wider">
                          <Shield size={10} className="mr-1" /> SrxAI protects your data and privacy
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AiChat;
