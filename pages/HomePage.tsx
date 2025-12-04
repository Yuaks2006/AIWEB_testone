import React, { useState } from 'react';
import { NeoCard } from '../components/NeoCard';
import { NeoButton } from '../components/NeoButton';
import { Task, User, ViewState } from '../types';
import { MOCK_USER, MOCK_PARTNER, MOCK_TASKS } from '../constants';
import { Heart, Activity, Calendar, Award } from 'lucide-react';
import * as GeminiService from '../services/geminiService';

interface HomePageProps {
  onNavigate: (view: ViewState) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [loadingReport, setLoadingReport] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
    ));
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progress = (completedCount / tasks.length) * 100;

  const handleGenerateReport = async () => {
    setReportModalOpen(true);
    setLoadingReport(true);
    const text = await GeminiService.generateHealthReport({
      name: MOCK_USER.name,
      streakDays: MOCK_USER.streakDays,
      completedTasks: completedCount
    });
    setReportText(text);
    setLoadingReport(false);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pb-20">
      
      {/* 1. Relationship Section */}
      <NeoCard color="pink" className="flex flex-col gap-4 relative">
        <div className="flex justify-between items-center border-b-4 border-black pb-2 text-black">
          <div className="flex items-center gap-2">
             <Heart className="w-6 h-6 fill-red-500 stroke-black stroke-2" />
             <span className="font-black text-xl tracking-tight">爱·陪伴</span>
          </div>
          <div className="bg-white border-2 border-black px-2 py-1 font-mono font-bold text-black">
            第 {MOCK_USER.streakDays} 天
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 py-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full border-4 border-black overflow-hidden mb-2 bg-white">
              <img src={MOCK_USER.avatar} alt="Me" className="w-full h-full object-cover" />
            </div>
            <div className="font-bold bg-white border-2 border-black inline-block px-2 text-black">{MOCK_USER.name}</div>
          </div>
          
          <Activity className="w-10 h-10 animate-pulse stroke-black stroke-[3px]" />

          <div className="text-center opacity-90">
            <div className="w-20 h-20 rounded-full border-4 border-black overflow-hidden mb-2 bg-white">
              <img src={MOCK_PARTNER.avatar} alt="Partner" className="w-full h-full object-cover" />
            </div>
             <div className="font-bold bg-white border-2 border-black inline-block px-2 text-black">{MOCK_PARTNER.name}</div>
          </div>
        </div>

        <div className="space-y-2 text-black">
            <div className="flex justify-between items-center bg-white/50 p-2 border-2 border-black">
                <span className="font-bold">今日状态:</span>
                <span className="font-bold">良好 / 偏晚睡</span>
            </div>
            <div className="w-full bg-white h-6 border-2 border-black relative">
                <div 
                  className="bg-green-400 h-full border-r-2 border-black transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-sm font-bold">
                <span>进度: {Math.round(progress)}%</span>
                <button onClick={handleGenerateReport} className="underline decoration-2 hover:bg-black hover:text-white transition-colors px-1">
                  查看昨日健康分
                </button>
            </div>
        </div>
      </NeoCard>

      {/* 2. Tasks Grid */}
      <div className="grid grid-cols-2 gap-4">
        {tasks.map(task => (
          <NeoCard 
            key={task.id} 
            color={task.status === 'completed' ? 'green' : 'white'}
            className="flex flex-col items-center justify-between min-h-[160px] text-center"
            onClick={() => toggleTask(task.id)}
          >
            <div className="text-4xl mb-2">{task.icon}</div>
            <div className="font-black text-lg leading-tight text-black">{task.title}</div>
            <div className="text-xs font-bold mt-1 mb-2 text-black">
              {task.status === 'completed' ? '已完成' : '未完成'}
            </div>
            {task.status === 'pending' && (
              <div className="w-6 h-6 border-2 border-black bg-white"></div>
            )}
            {task.status === 'completed' && (
               <div className="w-6 h-6 border-2 border-black bg-black flex items-center justify-center">
                 <span className="text-white font-bold">✓</span>
               </div>
            )}
          </NeoCard>
        ))}
        
        {/* Add Task Button */}
        <NeoCard 
          color="yellow" 
          className="flex flex-col items-center justify-center min-h-[160px]"
          onClick={() => onNavigate('TASKS')}
        >
          <div className="text-6xl font-light text-black">+</div>
          <div className="font-black text-black">添加打卡</div>
        </NeoCard>
      </div>

       {/* Report Modal */}
       {reportModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <NeoCard color="white" className="w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-black text-black">AI 健康报告</h2>
              <button onClick={() => setReportModalOpen(false)} className="text-2xl font-bold text-black border-2 border-transparent hover:border-black w-8 h-8 flex items-center justify-center">X</button>
            </div>
            {loadingReport ? (
              <div className="text-center py-10 font-bold animate-pulse text-black">
                正在生成报告...
              </div>
            ) : (
              <div className="whitespace-pre-wrap font-medium text-sm leading-relaxed text-black">
                {reportText}
              </div>
            )}
            <NeoButton fullWidth className="mt-4" onClick={() => setReportModalOpen(false)}>关闭</NeoButton>
          </NeoCard>
        </div>
      )}
    </div>
  );
};