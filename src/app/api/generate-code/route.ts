import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import { NextResponse } from 'next/server';

if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    const { prompt, language, isModification } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Different prompt format for modifications vs new code generation
    const enhancedPrompt = isModification
      ? prompt // For modifications, use the prompt as is
      : `Generate a code snippet based on this request: "${prompt}"
    Please provide the response in the following JSON format:
    {
      "title": "A clear, concise title for this code snippet (max 50 chars)",
      "description": "A brief explanation of what the code does (max 200 chars)",
      "code": "The actual code implementation",
      "suggestedTags": ["tag1", "tag2", "tag3"], // Only 3 tags: 1st - code language, 2nd - main functionality, 3rd - category/topic
      "timeComplexity": "Big-O time complexity such as O(n), O(n log n)",
      "optimizationPercent": 0
    }
    
    The code should be in user's preferred language, if not provided then default to "${language}".
    Make the title descriptive but concise.
    The description should explain the purpose and key features.
    The suggestedTags must include exactly three tags:
    1. The programming language (e.g., "Python", "JavaScript"),
    2. The core functionality (e.g., "validation", "API", "sorting"),
    3. A broader category or context (e.g., "backend", "frontend", "data-processing").
    The "optimizationPercent" should be an integer from 0 to 100 estimating how optimized the solution is compared to a naive baseline for the same task.
    Provide only the JSON response, no additional text or markdown.`;

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

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: enhancedPrompt }] }],
      });

      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error('Generated content is empty');
      }

      // Handle the response differently based on request type
      if (isModification) {
        // For modifications, return the text directly
        return NextResponse.json(text.trim());
      } else {
        // For new code generation, parse as JSON
        try {
          const parsedResponse = JSON.parse(
            text.replace(/```json\n?|\n?```/g, '').trim()
          );

          if (
            !parsedResponse.title ||
            !parsedResponse.description ||
            !parsedResponse.code
          ) {
            throw new Error('Invalid response format');
          }

          return NextResponse.json({
            title: parsedResponse.title,
            description: parsedResponse.description,
            code: parsedResponse.code.trim(),
            suggestedTags: parsedResponse.suggestedTags || [],
            timeComplexity: parsedResponse.timeComplexity || '',
            optimizationPercent:
              typeof parsedResponse.optimizationPercent === 'number'
                ? parsedResponse.optimizationPercent
                : undefined,
          });
        } catch (parseError) {
          console.error('Error parsing AI response:', parseError);
          return NextResponse.json(
            { error: 'Invalid AI response format' },
            { status: 500 }
          );
        }
      }
    } catch (genError) {
      console.error('Gemini API Error:', genError);
      return NextResponse.json(
        { error: 'Error generating code with AI' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in generate-code API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
