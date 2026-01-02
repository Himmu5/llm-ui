import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Extract messages
    const messages = body.messages?.map((msg: { role: string; content: string }) => ({
      role: msg.role,
      content: msg.content,
    }));
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Get the last user message as the query
    const lastMessage = messages[messages.length - 1];
    const query = lastMessage?.content || '';
    
    // Support both fileNames (array) and fileName (string) for backwards compatibility
    const fileNames: string[] = body.fileNames || (body.fileName ? [body.fileName] : []);

    let response: Response;

    // If fileNames are provided, use the RAG endpoint
    if (fileNames.length > 0) {
      // Use POST to /api/chat with fileNames array for RAG
      const ragRequestBody = {
        messages: [{ role: "user", content: query }],
        fileNames: fileNames,
      };
      
      console.log('RAG request:', JSON.stringify(ragRequestBody));
      
      response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream, application/json',
        },
        body: JSON.stringify(ragRequestBody),
      });
    } else {
      // No document - use regular chat endpoint
      const requestBody = { messages };
      
      response = await fetch('http://127.0.0.1:8000/api/chat/json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream, application/json',
        },
        body: JSON.stringify(requestBody),
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', response.status, errorText);
      return NextResponse.json(
        { error: `Backend error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    
    // Handle SSE stream from backend - process and re-format it
    if (contentType.includes('text/event-stream')) {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      
      const stream = new ReadableStream({
        async start(controller) {
          if (!reader) {
            controller.close();
            return;
          }
          
          let buffer = '';
          const contentParts: string[] = [];
          
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              buffer += decoder.decode(value, { stream: true });
              
              // Process complete lines
              const lines = buffer.split('\n');
              buffer = lines.pop() || ''; // Keep incomplete line in buffer
              
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6).trim();
                  if (data === '[DONE]') continue;
                  
                  // Try to parse as JSON, otherwise use raw
                  let content = data;
                  try {
                    const parsed = JSON.parse(data);
                    content = typeof parsed === 'string' ? parsed : (parsed.content || parsed.message || parsed.response || data);
                  } catch {
                    // Use raw data
                  }
                  
                  if (content) {
                    contentParts.push(content);
                  }
                }
              }
            }
            
            // Process any remaining buffer
            if (buffer.startsWith('data: ')) {
              const data = buffer.slice(6).trim();
              if (data && data !== '[DONE]') {
                try {
                  const parsed = JSON.parse(data);
                  const content = typeof parsed === 'string' ? parsed : (parsed.content || parsed.message || parsed.response || data);
                  contentParts.push(content);
                } catch {
                  contentParts.push(data);
                }
              }
            }
            
            // Join parts with spaces if they don't already have spacing
            let fullContent = '';
            for (let i = 0; i < contentParts.length; i++) {
              const part = contentParts[i];
              if (i > 0) {
                const prevPart = contentParts[i - 1];
                const needsSpace = !prevPart.endsWith(' ') && 
                                   !prevPart.endsWith('\n') &&
                                   !part.startsWith(' ') && 
                                   !part.startsWith('\n') &&
                                   !/^[.,!?;:)\]}"']/.test(part);
                if (needsSpace) {
                  fullContent += ' ';
                }
              }
              fullContent += part;
            }
            
            // Now stream the full content word by word with proper spacing
            if (fullContent) {
              const words = fullContent.split(/(\s+)/);
              for (const word of words) {
                if (word) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(word)}\n\n`));
                  await new Promise(resolve => setTimeout(resolve, 15));
                }
              }
            }
            
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          } catch (error) {
            console.error('Stream processing error:', error);
          } finally {
            controller.close();
            reader.releaseLock();
          }
        },
      });
      
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }
    
    // Handle text/plain stream
    if (contentType.includes('text/plain')) {
      const text = await response.text();
      const encoder = new TextEncoder();
      
      const stream = new ReadableStream({
        async start(controller) {
          const words = text.split(/(\s+)/);
          for (const word of words) {
            if (word) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(word)}\n\n`));
              await new Promise(resolve => setTimeout(resolve, 15));
            }
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        },
      });
      
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }
    
    // For JSON responses, simulate streaming by sending chunks
    const data = await response.json();
    
    // Extract the message from various possible formats
    let fullMessage = '';
    if (typeof data === 'string') {
      fullMessage = data;
    } else if (data.content) {
      fullMessage = data.content;
    } else if (data.message) {
      fullMessage = data.message;
    } else if (data.response) {
      fullMessage = data.response;
    } else if (data.answer) {
      fullMessage = data.answer;
    } else if (data.result) {
      fullMessage = data.result;
    } else if (data.choices?.[0]?.message?.content) {
      fullMessage = data.choices[0].message.content;
    } else if (data.text) {
      fullMessage = data.text;
    } else {
      fullMessage = JSON.stringify(data);
    }

    // Create a streaming response that simulates typing
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Split into words for more natural streaming
        const words = fullMessage.split(/(\s+)/);
        
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          if (word) {
            // Send as SSE format
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(word)}\n\n`));
            // Small delay between words for streaming effect
            await new Promise(resolve => setTimeout(resolve, 15));
          }
        }
        
        // Send done signal
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error('API route error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const isConnectionError = errorMessage.includes('ECONNREFUSED') || 
                              errorMessage.includes('fetch failed') ||
                              errorMessage.includes('network');
    
    return NextResponse.json(
      { 
        error: isConnectionError 
          ? 'Cannot connect to backend server. Make sure it is running on http://127.0.0.1:8000' 
          : `Server error: ${errorMessage}` 
      },
      { status: isConnectionError ? 503 : 500 }
    );
  }
}
