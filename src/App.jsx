import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import LoadingIndicator from './components/LoadingIndicator';
import ResultSection from './components/ResultSection';
import './App.css'; // Left empty earlier, bringing back default framework

// Real AI generation using Gemini API
import { GoogleGenAI } from '@google/genai';

const translations = {
  en: {
    title: "MultiContent Gen",
    subtitle: "Copy, Paste, Done! Redefining Social Media Freedom.",
    description: "Automate 'Post Text' and 'AI Image Prompts' from any link. Just paste, generate, and post. Ready for X, TikTok, and more in 3 simple steps.",
    languageLabel: "Output Language (Single Selection)",
    productLabel: "Product Features, Keywords, or URL",
    productPlaceholder: "Enter the product details here, e.g., 'New lightweight running shoes...' or paste a URL.",
    platformLabel: "Target Platform (Single Selection)",
    generateBtn: "Generate Content",
    generatingBtn: "Generating Magic...",
    postContent: "Post Content",
    imagePrompt: "Image Generation Prompt",
    thinking: "AI is thinking..."
  },
  tw: {
    title: "MultiContent Gen",
    subtitle: "複製貼上就搞定！讓社群貼文更自由。",
    description: "從鏈接自動生成「貼文內容」和「AI圖像提示」。只需貼上、生成、發布。只需3步，即可完成 X 或 TikTok 的發布準備。",
    languageLabel: "輸出語言（單選）",
    productLabel: "產品特點、關鍵字或 URL",
    productPlaceholder: "在此輸入產品詳情，例如「帶有碳板的新型輕量跑鞋...」或貼上 URL。",
    platformLabel: "目標平台（單選）",
    generateBtn: "生成內容",
    generatingBtn: "正在生成魔法...",
    postContent: "貼文內容",
    imagePrompt: "圖像生成提示詞",
    thinking: "AI 正在思考..."
  },
  cn: {
    title: "MultiContent Gen",
    subtitle: "复制粘贴就搞定！让社群贴文更自由。",
    description: "从链接自动生成“贴文内容”和“AI图像提示”。只需粘贴、生成、发布。只需3步，即可完成 X 或 TikTok 的发布准备。",
    languageLabel: "输出语言（单选）",
    productLabel: "产品特点、关键字或 URL",
    productPlaceholder: "在此输入产品详情，例如“带有碳板的新型轻便跑鞋...”或粘贴 URL。",
    platformLabel: "目标平台（单选）",
    generateBtn: "生成内容",
    generatingBtn: "正在生成魔法...",
    postContent: "贴文内容",
    imagePrompt: "图像生成提示词",
    thinking: "AI 正在思考..."
  },
  ja: {
    title: "MultiContent Gen",
    subtitle: "コピペで完了！SNS投稿をもっと自由に。リンクから「投稿テキスト」と「AI画像指示」を自動作成！",
    description: "貼り付ける、生成する、投稿する。たった3ステップで、XやTikTokの投稿準備が整います。画像のプロンプトまで作ってくれるから、クリエイティブに悩む必要はもうありません。あなたの「伝えたい」を、AIが最高のカタチに変換します。",
    languageLabel: "出力言語（単一選択）",
    productLabel: "商品の特徴、キーワード、または URL",
    productPlaceholder: "商品の詳細を入力してください（例：「カーボンプレート搭載の軽量ランニングシューズ」）またはURLを貼り付けてください。",
    platformLabel: "投稿媒体（単一選択）",
    generateBtn: "投稿案を生成",
    generatingBtn: "魔法をかけています...",
    postContent: "投稿案",
    imagePrompt: "画像生成プロンプト",
    thinking: "AIが考えています..."
  },
  ko: {
    title: "MultiContent Gen",
    subtitle: "복사하고 붙여넣으면 끝! SNS 게시물을 더욱 자유롭게.",
    description: "링크에서 '게시물 텍스트'와 'AI 이미지 지시어'를 자동 생성합니다. 붙여넣기, 생성하기, 게시하기. 단 3단계로 X나 TikTok 게시 준비가 완료됩니다.",
    languageLabel: "출력 언어 (단일 선택)",
    productLabel: "제품 특징, 키워드 또는 URL",
    productPlaceholder: "제품 상세 정보를 입력하세요(예: '카본 플레이트가 장착된 새로운 경량 러닝화...') 또는 URL을 붙여넣으세요.",
    platformLabel: "대상 플랫폼 (단일 선택)",
    generateBtn: "콘텐츠 생성",
    generatingBtn: "마법을 부리는 중...",
    postContent: "게시물 내용",
    imagePrompt: "이미지 생성 프롬프트",
    thinking: "AI가 생각 중입니다..."
  }
};

const generateAIContent = async (text, platforms, language) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not set. Please add VITE_GEMINI_API_KEY to your .env.local file.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const languageNames = {
    ja: "Japanese",
    en: "English",
    cn: "Simplified Chinese",
    tw: "Traditional Chinese",
    ko: "Korean"
  };

  const systemInstruction = `
You are an expert social media marketer and copywriter proficient in ${languageNames[language]}. 
Your task is to take a product description or set of keywords and generate compelling, tailored social media posts for specific platforms chosen by the user.

CRITICAL: The output MUST be in ${languageNames[language]}.
DO NOT just translate. Use the tone, slang, hashtags, and cultural nuances that make posts go viral in that specific language and platform.

### ANTI-AI WRITING CONSTRAINTS (CRITICAL)
Your writing must sound human and avoid typical "AI-generated" patterns. Follow these negative constraints strictly:

1. **FORBIDDEN VOCABULARY**: Never use these words (or their equivalents in ${languageNames[language]}):
   - Additionally, Moreover, Furthermore, In conclusion, To sum up.
   - Delve, Embark, Tapestry, Testament, Unleash, Vibrant, Bolster, Underscore, Elevate, Foster.
   - (For Japanese): "〜といえます", "〜といっても過言ではありません", "〜役割を果たしています", "〜彩ります", "〜自分へのご褒美".

2. **STRUCTURE CONSTRAINTS**:
   - **No "Not only... but also..."**: Avoid this specific contrast pattern. Use simpler, direct statements.
   - **No "Rule of Three"**: Do not list things in groups of three (e.g., "adjective, adjective, and adjective").
   - **No Superficial Analysis**: Do not end sentences with "-ing" phrases that summarize the significance (e.g., "...showcasing its importance").
   - **Prefer Simple Copulas**: Use "is/are" (または「〜です」「〜だ」) instead of wordy alternatives like "serves as", "represents", or "stands as".

3. **TONE & STYLE**:
   - Use concrete facts instead of generic puffery (e.g., instead of "revolutionary product", describe what it actually does).
   - For SNS (X, TikTok, Instagram), use the actual way humans talk on those platforms. Be punchy, direct, and slightly informal if the platform allows.
   - Avoid "hedging" or overly polite AI preambles.

For each platform, you must generate:
1. 'text': The catchphrase or post text itself, strictly adhering to the character limits, tone, emojis, and hashtags typical of that platform in ${languageNames[language]}.
2. 'imagePrompt': A detailed prompt instructing an image AI (like Midjourney or DALL-E) to create the perfect accompanying visual. (Keep image prompts in English as most image AIs understand it better).

The user has selected the following platforms: ${platforms.join(", ")}.

You MUST return the output ONLY as a valid JSON object. 
The keys of the JSON object must be EXACTLY the names of the requested platforms (e.g., "x", "instagram", "blog", "tiktok", "facebook").
The value for each key must be an object with string keys "text" and "imagePrompt".

Do not include markdown formatting like \`\`\`json. Return only the raw JSON string.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Please generate posts for this product/keywords:\n\n${text}`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const contentText = response.text || "{}";
    const parsedResults = JSON.parse(contentText);

    // Ensure all requested platforms are in the response; if not, add a fallback
    const finalResults = {};
    platforms.forEach(p => {
      if (parsedResults[p]) {
        finalResults[p] = parsedResults[p];
      } else {
        finalResults[p] = { text: "Error: AI didn't generate content for this platform.", imagePrompt: "Error" };
      }
    });

    return finalResults;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['blog']);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const t = translations[selectedLanguage];

  const togglePlatform = (id) => {
    // Single selection only to save API tokens
    setSelectedPlatforms([id]);
  };

  const handleGenerate = async () => {
    if (!inputValue.trim() || selectedPlatforms.length === 0) return;

    setIsGenerating(true);
    setResults(null);
    setErrorMsg('');

    try {
      const generatedResults = await generateAIContent(inputValue, selectedPlatforms, selectedLanguage);
      setResults(generatedResults);
    } catch (error) {
      setErrorMsg(error.message || "An error occurred during generation.");
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header t={t} />

      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        <InputSection
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedPlatforms={selectedPlatforms}
          togglePlatform={togglePlatform}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          isGenerating={isGenerating}
          handleGenerate={handleGenerate}
          t={t}
        />

        {errorMsg && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #fecaca' }}>
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        {isGenerating && <LoadingIndicator platforms={selectedPlatforms} t={t} />}

        {!isGenerating && results && <ResultSection results={results} t={t} />}
      </main>

      <footer className="app-footer">
        <p className="footer-text">© 2026 Tune Seki</p>
      </footer>
    </div>
  );
}

export default App;
