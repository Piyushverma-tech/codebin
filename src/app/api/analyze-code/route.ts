import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    const { code, language } = await request.json();

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json({ error: 'code is required' }, { status: 400 });
    }

    const prompt = `Analyze the following ${
      language || ''
    } code and respond strictly as JSON with the following fields only:\n{
  "timeComplexity": "Big-O time complexity like O(n), O(n log n), O(1)",
  "optimizationPercent": 0
}\nRules:\n- "optimizationPercent" must be an integer 0-100 estimating how optimized this solution is vs a naive baseline for the same task.\n- If unsure, be conservative.\n- Do not include any extra text or markdown.\n\nCode:\n\n${code}`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const text = result.response.text();

    if (!text) {
      return NextResponse.json(
        { error: 'Empty analysis response' },
        { status: 500 }
      );
    }

    try {
      const parsed = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim());
      return NextResponse.json({
        timeComplexity: parsed.timeComplexity || '',
        optimizationPercent:
          typeof parsed.optimizationPercent === 'number'
            ? parsed.optimizationPercent
            : undefined,
      });
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: 'Invalid analysis format' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error analyzing code:', error);
    return NextResponse.json(
      { error: 'Failed to analyze code' },
      { status: 500 }
    );
  }
}
