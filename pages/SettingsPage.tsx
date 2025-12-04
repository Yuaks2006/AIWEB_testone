import React from 'react';
import { NeoCard } from '../components/NeoCard';
import { NeoButton } from '../components/NeoButton';

export const SettingsPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black bg-white inline-block border-2 border-black px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">设置</h1>

      <NeoCard title="账号" className="space-y-2">
        <div className="flex justify-between items-center p-2 border-b-2 border-gray-200 text-black">
          <span className="font-bold">编辑资料</span>
          <span className="font-black">&gt;</span>
        </div>
        <div className="flex justify-between items-center p-2 text-black">
          <span className="font-bold">伴侣管理</span>
          <span className="font-black">&gt;</span>
        </div>
      </NeoCard>

      <NeoCard title="偏好" className="space-y-2">
        <div className="flex justify-between items-center p-2 border-b-2 border-gray-200 text-black">
           <span className="font-bold">通知提醒</span>
           <div className="w-12 h-6 bg-green-400 border-2 border-black rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-black rounded-full"></div>
           </div>
        </div>
        <div className="flex justify-between items-center p-2 text-black">
           <span className="font-bold">清除数据</span>
           <span className="text-red-600 font-black cursor-pointer hover:underline">清除</span>
        </div>
      </NeoCard>

      <NeoButton fullWidth variant="white" onClick={onLogout} className="text-red-500 border-red-500 hover:bg-red-50">
        退出登录
      </NeoButton>
    </div>
  );
};