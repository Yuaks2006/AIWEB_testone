import React from 'react';
import { NeoCard } from '../components/NeoCard';
import { NeoButton } from '../components/NeoButton';

export const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-yellow-400 p-4 flex items-center justify-center">
      <NeoCard className="w-full max-w-sm bg-white pt-8 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic mb-2 tracking-tighter text-black">爱·陪伴</h1>
          <h2 className="text-xl font-bold bg-black text-white inline-block px-2 transform -rotate-2">
            LOVE & COMPANION
          </h2>
        </div>

        <div className="space-y-4 text-black">
           <div>
             <label className="font-black block mb-1 text-sm">手机号 / 邮箱</label>
             <input type="text" className="w-full border-4 border-black p-3 font-bold focus:bg-pink-100 outline-none placeholder-gray-400 text-black" placeholder="请输入账号" />
           </div>
           
           <div>
             <label className="font-black block mb-1 text-sm">验证码</label>
             <div className="flex gap-2">
                <input type="text" className="w-full border-4 border-black p-3 font-bold outline-none placeholder-gray-400 text-black" placeholder="123456" />
                <button className="border-4 border-black px-4 font-bold bg-cyan-300 hover:bg-cyan-400 whitespace-nowrap text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  获取验证码
                </button>
             </div>
           </div>

           <NeoButton fullWidth variant="green" className="mt-6" onClick={onLogin}>
             开启旅程
           </NeoButton>

           <div className="text-center mt-4">
             <span className="text-sm font-bold underline cursor-pointer text-black hover:text-blue-600">注册新账号</span>
           </div>
        </div>
      </NeoCard>
    </div>
  );
};