import React, { useState, useRef } from 'react';
import { NeoCard } from '../components/NeoCard';
import { NeoButton } from '../components/NeoButton';
import { SubViewState, ChatMessage, FoodAnalysisResult } from '../types';
import * as GeminiService from '../services/geminiService';
import { Camera, MessageSquare, FileText, Send, Upload } from 'lucide-react';

export const AIPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubViewState>('FOOD_ID');

  // Food ID State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [foodResult, setFoodResult] = useState<FoodAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: '你好！我是你们的情侣健康助手。关于健康目标，有什么想问的吗？' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Food Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setFoodResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeFood = async () => {
    if (!selectedImage) return;
    setAnalyzing(true);
    try {
      // Extract base64 part
      const base64 = selectedImage.split(',')[1];
      const result = await GeminiService.analyzeFoodImage(base64);
      setFoodResult(result);
    } catch (e) {
      alert("分析图片失败，请重试");
    } finally {
      setAnalyzing(false);
    }
  };

  // Chat Handler
  const handleSendMessage = async () => {
    if (!inputMsg.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputMsg };
    setMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setChatLoading(true);

    try {
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));
        const responseText = await GeminiService.chatWithHealthAssistant(userMsg.text, history);
        
        const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
        setMessages(prev => [...prev, modelMsg]);
    } catch (e) {
        // Error handled in service
    } finally {
        setChatLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <NeoButton 
          variant={activeTab === 'REPORT' ? 'pink' : 'white'} 
          onClick={() => setActiveTab('REPORT')}
          className="whitespace-nowrap flex items-center gap-2"
        >
          <FileText className="w-4 h-4" /> 健康报告
        </NeoButton>
        <NeoButton 
          variant={activeTab === 'FOOD_ID' ? 'yellow' : 'white'} 
          onClick={() => setActiveTab('FOOD_ID')}
          className="whitespace-nowrap flex items-center gap-2"
        >
          <Camera className="w-4 h-4" /> 食物识别
        </NeoButton>
        <NeoButton 
          variant={activeTab === 'CHAT' ? 'cyan' : 'white'} 
          onClick={() => setActiveTab('CHAT')}
          className="whitespace-nowrap flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" /> 健康顾问
        </NeoButton>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        
        {/* --- REPORT VIEW --- */}
        {activeTab === 'REPORT' && (
          <div className="space-y-4">
             <NeoCard title="今日总结" color="white">
                <div className="flex justify-between items-center mb-4 text-black">
                    <span className="font-mono text-gray-700 font-bold">2023-10-27</span>
                    <span className="bg-green-400 border-2 border-black px-2 font-black">状态很棒</span>
                </div>
                <div className="space-y-4 text-black">
                    <div className="bg-gray-100 p-2 border-2 border-black">
                        <div className="font-black mb-1">你的状态</div>
                        <ul className="list-disc pl-4 font-bold text-sm">
                            <li>睡眠: 00:48 (偏晚)</li>
                            <li>饮水: 3/8 杯</li>
                            <li>跑步: 25 分钟 ✅</li>
                        </ul>
                    </div>
                    <div className="bg-pink-100 p-2 border-2 border-black">
                        <div className="font-black mb-1">TA 的状态</div>
                        <ul className="list-disc pl-4 font-bold text-sm">
                            <li>睡眠: 23:15 (良好)</li>
                            <li>心情: 精力充沛</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-yellow-100 border-2 border-black font-bold italic">
                        "试着在睡前多喝两杯水，把手机放下！"
                    </div>
                    <NeoButton fullWidth variant="pink">发送关怀 ❤️</NeoButton>
                </div>
             </NeoCard>
          </div>
        )}

        {/* --- FOOD ID VIEW --- */}
        {activeTab === 'FOOD_ID' && (
          <div className="space-y-4 h-full flex flex-col">
            <NeoCard title="AI 热量扫描仪" color="white" className="flex-1 flex flex-col">
                <div 
                    className="border-4 border-dashed border-black bg-gray-50 flex-1 flex flex-col items-center justify-center min-h-[200px] cursor-pointer relative text-black"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {selectedImage ? (
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-contain absolute inset-0 p-2" />
                    ) : (
                        <>
                            <Upload className="w-12 h-12 mb-2 stroke-black" />
                            <span className="font-black">点击上传食物照片</span>
                        </>
                    )}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                    />
                </div>
                
                {selectedImage && (
                    <NeoButton 
                        className="mt-4" 
                        fullWidth 
                        variant="green"
                        onClick={handleAnalyzeFood}
                        disabled={analyzing}
                    >
                        {analyzing ? 'AI 分析中...' : '开始分析热量'}
                    </NeoButton>
                )}

                {foodResult && (
                    <div className="mt-4 border-t-4 border-black pt-4 text-black">
                        <div className="text-2xl font-black mb-2">{foodResult.food}</div>
                        <div className="flex gap-2 mb-2">
                             <span className="bg-yellow-400 border-2 border-black px-2 font-black">{foodResult.calorie}</span>
                        </div>
                        <p className="font-bold text-sm border-l-4 border-black pl-2 py-1 bg-gray-100">
                            {foodResult.nutrition}
                        </p>
                        <NeoButton fullWidth variant="cyan" className="mt-4">确认并打卡</NeoButton>
                    </div>
                )}
            </NeoCard>
          </div>
        )}

        {/* --- CHAT VIEW --- */}
        {activeTab === 'CHAT' && (
           <div className="flex flex-col h-full">
             <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                            max-w-[85%] p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black
                            ${m.role === 'user' ? 'bg-cyan-300' : 'bg-white'}
                        `}>
                            <div className="font-black text-xs mb-1 uppercase text-black">{m.role === 'user' ? '你' : 'AI 顾问'}</div>
                            <div className="font-bold text-sm leading-relaxed">{m.text}</div>
                        </div>
                    </div>
                ))}
                {chatLoading && <div className="text-center font-bold text-xs animate-pulse text-black">AI 正在思考...</div>}
             </div>
             <div className="flex gap-2">
                 <input 
                    type="text" 
                    className="flex-1 border-4 border-black p-2 font-bold outline-none focus:bg-yellow-100 transition-colors text-black placeholder-gray-500"
                    placeholder="询问关于饮食、睡眠..."
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                 />
                 <NeoButton variant="green" onClick={handleSendMessage}>
                     <Send className="w-5 h-5 stroke-black" />
                 </NeoButton>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};