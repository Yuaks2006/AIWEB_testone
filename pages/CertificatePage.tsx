import React from 'react';
import { NeoCard } from '../components/NeoCard';
import { NeoButton } from '../components/NeoButton';
import { Award, Download } from 'lucide-react';

export const CertificatePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <NeoCard className="w-full text-center py-10 relative bg-yellow-100" color="white">
        <div className="absolute top-0 left-0 w-full h-4 bg-black"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-black"></div>
        
        <Award className="w-24 h-24 mx-auto mb-4 stroke-black fill-yellow-400 stroke-[1.5px]" />
        
        <h1 className="font-black text-3xl uppercase mb-2 text-black">健康恋爱证书</h1>
        <h2 className="font-bold text-xl mb-6 text-black">Love & Companion</h2>
        
        <div className="font-bold text-base mb-8 px-8 leading-loose text-black">
          特此证明 <br/>
          <span className="font-black text-xl bg-pink-300 px-2 border border-black mx-1">Alex</span> & 
          <span className="font-black text-xl bg-cyan-300 px-2 border border-black mx-1">Sam</span><br/>
          已连续坚持健康打卡 <span className="text-2xl font-black underline">7</span> 天。
        </div>

        <div className="border-t-2 border-black w-1/2 mx-auto pt-2 font-serif italic font-bold text-black">
          爱·陪伴 App 官方认证
        </div>

        <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-red-500 rounded-full border-4 border-black flex items-center justify-center transform rotate-12">
           <span className="text-white font-black text-xs">OFFICIAL</span>
        </div>
      </NeoCard>

      <NeoButton variant="cyan" className="mt-8 flex items-center gap-2">
         <Download className="w-5 h-5" /> 保存到相册
      </NeoButton>
    </div>
  );
};