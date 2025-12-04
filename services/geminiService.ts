import { GoogleGenAI, Type } from "@google/genai";
import { FoodAnalysisResult } from "../types";

const apiKey = process.env.API_KEY || ''; 
// Note: In a real app, ensure process.env.API_KEY is available. 
// For this demo, we assume the environment is set up correctly as per instructions.

const ai = new GoogleGenAI({ apiKey });

export const analyzeFoodImage = async (base64Image: string): Promise<FoodAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: '分析这张食物图片。请返回有效的JSON格式数据，包含以下字段： "food" (食物名称，中文), "calorie" (预估卡路里，带单位), "nutrition" (简短的营养建议，中文)。'
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            food: { type: Type.STRING },
            calorie: { type: Type.STRING },
            nutrition: { type: Type.STRING }
          },
          required: ["food", "calorie", "nutrition"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as FoodAnalysisResult;
  } catch (error) {
    console.error("Gemini Food Analysis Error:", error);
    throw error;
  }
};

export const generateHealthReport = async (userData: any): Promise<string> => {
  try {
    const prompt = `
      为一款情侣应用生成每日健康报告。
      用户数据:
      - 姓名: ${userData.name}
      - 连续打卡: ${userData.streakDays} 天
      - 今日完成任务数: ${userData.completedTasks}
      - 心情: 累但快乐
      
      请严格使用中文回答。格式要求：
      - 使用项目符号
      - 语气：新野兽派风格（直率、幽默、鼓励、有点酷）
      - 加入一些emoji
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "报告生成失败。";
  } catch (error) {
    console.error("Gemini Report Error:", error);
    return "生成报告时出错，请重试。";
  }
};

export const chatWithHealthAssistant = async (message: string, history: any[]): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "你是情侣健康助手。你的语气要有趣、直接、乐于助人（Neo-brutalism 风格）。不要提供医疗诊断建议。回答要简短有力，严禁废话。请全程使用中文回答。",
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "我现在脑子有点乱，稍后再试吧！";
  }
};