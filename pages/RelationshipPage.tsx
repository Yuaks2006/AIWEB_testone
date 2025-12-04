import React from 'react';
import { NeoCard } from '../components/NeoCard';
import { NeoButton } from '../components/NeoButton';

export const RelationshipPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <NeoCard title="情侣绑定" color="pink">
         <div className="text-center mb-6 text-black">
           <p className="font-black text-lg">一起守护健康</p>
           <p className="font-bold text-sm mt-2">输入对方的邀请码以进行绑定。</p>
         </div>

         <div className="space-y-4">
           <input 
              type="text" 
              className="w-full border-4 border-black p-4 text-center font-black text-2xl tracking-widest outline-none bg-yellow-50 text-black placeholder-gray-400" 
              placeholder="X Y 8 9 Z"
           />
           <NeoButton fullWidth variant="green">绑定伴侣</NeoButton>
         </div>

         <div className="my-6 border-b-4 border-dashed border-black"></div>

         <div className="text-center text-black">
           <div className="font-black mb-2">我的邀请码</div>
           <div className="bg-black text-white p-4 font-mono text-xl font-bold flex justify-between items-center cursor-pointer active:bg-gray-800">
             <span>A 7 B 2 9</span>
             <span className="text-xs border border-white px-1 font-sans">复制</span>
           </div>
         </div>
      </NeoCard>
    </div>
  );
};