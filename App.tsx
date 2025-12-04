import React, { useState } from 'react';
import { ViewState } from './types';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { RelationshipPage } from './pages/RelationshipPage';
import { AIPage } from './pages/AIPage';
import { CertificatePage } from './pages/CertificatePage';
import { SettingsPage } from './pages/SettingsPage';
import { NeoButton } from './components/NeoButton';
import { Home, Heart, ListChecks, Bot, Settings, Award, Menu, X, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('LOGIN');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (currentView === 'LOGIN') {
    return <LoginPage onLogin={() => setCurrentView('HOME')} />;
  }

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button 
      onClick={() => setCurrentView(view)}
      className={`
        flex items-center gap-3 p-3 w-full border-b-2 border-black transition-colors text-left
        ${currentView === view ? 'bg-yellow-400 font-black' : 'hover:bg-gray-100 font-bold'}
      `}
    >
      <Icon className="w-6 h-6 stroke-[2.5px] stroke-black" />
      <span className="uppercase tracking-tight text-black">{label}</span>
    </button>
  );

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#f0f0f0]">
      
      {/* Sidebar - Collapsible */}
      <div 
        className={`
          flex flex-col border-r-4 border-black bg-white transition-all duration-300 relative z-20
          ${sidebarOpen ? 'w-64' : 'w-0'}
        `}
      >
        <div className="p-4 border-b-4 border-black bg-black text-white overflow-hidden whitespace-nowrap">
          <h1 className="text-xl font-black italic">爱·陪伴</h1>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
           <NavItem view="HOME" icon={Home} label="主页" />
           <NavItem view="RELATIONSHIP" icon={Heart} label="情侣" />
           <NavItem view="TASKS" icon={ListChecks} label="打卡" />
           <NavItem view="AI_ASSISTANT" icon={Bot} label="健康助手" />
           
           <div className="mt-8 border-t-4 border-black">
             <NavItem view="CERTIFICATE" icon={Award} label="证书" />
             <NavItem view="SETTINGS" icon={Settings} label="设置" />
           </div>
        </div>
      </div>

      {/* Collapse Toggle */}
      <div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30"
        style={{ left: sidebarOpen ? '15rem' : '0' }}
      >
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white border-2 border-l-0 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-200 text-black"
        >
           {sidebarOpen ? <X className="w-4 h-4"/> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Header mainly for mobile but consistent across */}
        <header className="md:hidden h-16 border-b-4 border-black bg-white flex items-center px-4 justify-between">
            <span className="font-black text-xl text-black">
                {currentView === 'HOME' && '主页'}
                {currentView === 'RELATIONSHIP' && '情侣关系'}
                {currentView === 'TASKS' && '打卡管理'}
                {currentView === 'AI_ASSISTANT' && '健康助手'}
                {currentView === 'CERTIFICATE' && '证书'}
                {currentView === 'SETTINGS' && '设置'}
            </span>
            <button onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6 text-black" />
            </button>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
          <div className="max-w-3xl mx-auto h-full">
            {currentView === 'HOME' && <HomePage onNavigate={setCurrentView} />}
            {currentView === 'RELATIONSHIP' && <RelationshipPage />}
            {currentView === 'TASKS' && (
                <div className="text-center pt-20">
                    <h2 className="text-4xl font-black mb-4 text-black">任务管理</h2>
                    <p className="font-bold text-black">在此编辑你的每日习惯。</p>
                    <NeoButton className="mt-4" onClick={() => setCurrentView('HOME')}>返回主页</NeoButton>
                </div>
            )}
            {currentView === 'AI_ASSISTANT' && <AIPage />}
            {currentView === 'CERTIFICATE' && <CertificatePage />}
            {currentView === 'SETTINGS' && <SettingsPage onLogout={() => setCurrentView('LOGIN')} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;