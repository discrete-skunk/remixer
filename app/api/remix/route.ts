import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(request: Request) {
  try {
    console.log('Received remix request');
    
    if (!process.env.CLAUDE_API_KEY) {
      console.error('CLAUDE_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { text } = await request.json();
    console.log('Input text length:', text?.length);

    if (!text) {
      console.log('No text provided in request');
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    console.log('Creating Claude message...');
    // Create a message with Claude
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Please remix the following text into exactly 6 tweets. Each tweet must be 140 characters or less and should not use hashtags or emojis. Format each tweet on its own line, separated by "|||" (three pipes). Make each tweet stand alone but related to the theme:

${text}`
      }],
      system: "You are a creative content remixer. Your goal is to take the input text and transform it into engaging tweets while maintaining the core message. Be creative but professional. Always return exactly 6 tweets, each separated by |||"
    });

    console.log('Received Claude response');
    
    // Extract the remixed text and split into tweets
    let remixedText: string[] = [];
    if (message.content[0].type === 'text') {
      remixedText = message.content[0].text.split('|||')
        .map(tweet => tweet.trim())
        .filter(tweet => tweet)
        .slice(0, 6); // Ensure exactly 6 tweets
      
      // Pad with empty tweets if less than 6
      while (remixedText.length < 6) {
        remixedText.push('Generated tweet unavailable');
      }
    } else {
      remixedText = Array(6).fill('Error: Unexpected response format');
    }

    return NextResponse.json({ remixedText });
  } catch (error) {
    console.error('Error processing remix request:', error);
    
    // Check if it's an Anthropic API error
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Claude API Error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 