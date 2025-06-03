"use server";
import { GoogleGenAI } from "@google/genai";

// APIキーを環境変数から取得
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstructionText = `あなたは子ども向けの「まちづくりアプリ」のAIアシスタントです。
ユーザーが「かわいい家つくって！」などと話しかけると、1つのまちづくり用オブジェクトのデータをJSON形式で返してください。

返答は必ず以下のJSONフォーマットに従ってください。

{
  "type": string,             // オブジェクトの種別（例: "house", "tree", "road" など）
  "name": string,             // 子どもにわかりやすい名前（例: "かわいいカフェ"）
  "emoji": string,            // オブジェクトを表す絵文字（例: "☕️", "🌳"）
  "color": string,            // オブジェクトの色（例: "#FFC0CB" または "hotpink"）
  "size": [number, number, number],  // 幅・高さ・奥行き（例: [1, 1, 1]）整数で指定してください
  "description": string       // 子どもとチャットで使う説明文（例: "ピンクの壁でかわいい外観のカフェだよ"）
}

ユーザーの要望を考慮して、現実的で子どもが楽しいと感じるようなオブジェクトを1つ提案してください。

例：
ユーザー: 「ピンクのカフェ作って！」
{
  "type": "building",
  "name": "ピンクのカフェ",
  "emoji": "☕️",
  "color": "#FFC0CB",
  "size": [1.5, 1, 1],
  "description": "明るいピンク色のかわいいカフェを作ってみたよ。\n変えたいところはある？\nこれで完了だったら完了ボタンを押してね！"
}
上記以外の形式での返答はしないでください。説明文や前置きは不要で、JSONオブジェクトのみを返してください。
では次のユーザーのリクエストに応えてください。`;

export async function create3DData(message: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: message,
    config: {
      systemInstruction: systemInstructionText,
      responseMimeType: "application/json",
    },
  });

  const data = JSON.parse(response.text ?? "{}");
  return data;
}

const chat = ai.chats.create({
  model: "gemini-2.0-flash",
  config: {
    systemInstruction: systemInstructionText,
    responseMimeType: "application/json",
  },
});

export async function create3DChat(message: string) {
  try {
    const response = await chat.sendMessage({
      message: message,
    });
    const data = JSON.parse(response.text ?? "{}");
    return data;
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create 3D data",
    };
  }
}

export async function getChatHistory() {
  try {
    const history = chat.getHistory();
    return history;
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to get chat history",
    };
  }
}
