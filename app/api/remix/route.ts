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
        content: `Please remix the following text in a creative and interesting way. Make it engaging while keeping the core message intact:

${text}`
      }],
      system: "You are a creative content remixer. Your goal is to take the input text and transform it into something fresh and engaging while maintaining its core message. Be creative but professional."
    });

    console.log('Received Claude response');
    
    // Extract the remixed text from Claude's response
    const remixedText = message.content[0].type === 'text' 
      ? message.content[0].text
      : 'Error: Unexpected response format';

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