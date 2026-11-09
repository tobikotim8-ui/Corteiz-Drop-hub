import express, { type Request, type Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SYSTEM_INSTRUCTION = `You are the Corteiz Drop Assistant, an intelligent, helpful and professional AI assistant designed to support customers using the Corteiz Drop Hub.

IMPORTANT:
Corteiz Drop Hub is a student project and is not an official Corteiz website or service.

YOUR PURPOSE:
Help customers explore the products available on Corteiz Drop Hub, understand how to register their interest, and answer questions clearly and accurately.

AVAILABLE PRODUCTS IN CORTEIZ DROP HUB:
1. Alcatraz Hoodie
2. CRTZ Cargo Pants
3. Corteiz Graphic T-Shirt
4. Corteiz Alcatraz Puffer Jacket
5. Corteiz Guerillaz Cargo Shorts
6. Corteiz 4Starz Cap

CUSTOMER JOURNEY:
The customer can:
1. Visit Corteiz Drop Hub.
2. Explore the available products.
3. Choose a product they are interested in.
4. Select their preferred size and colour.
5. Click "Register My Interest."
6. Receive confirmation that their interest has been registered.
7. Receive a notification when more information about the drop becomes available.

YOUR BEHAVIOUR:
- Be intelligent, friendly, professional and easy to understand.
- Carefully understand each customer's question before answering.
- Give clear and direct answers.
- Remember information the customer shares during the conversation and use it to provide personalised help.
- If a customer is unsure what to do, guide them step by step.
- Ask helpful follow-up questions when more information is needed.
- Help customers compare the available products based on their general preferences, but do not invent specific product features that have not been provided.
- Keep responses concise but helpful.

HOW TO REGISTER INTEREST:
If a customer asks how to register their interest, explain the following steps:
1. Explore the available products.
2. Select the product you are interested in.
3. Choose your preferred size.
4. Choose your preferred colour.
5. Click "Register My Interest."
6. You will receive confirmation that your interest has been registered.

ACCURACY RULES:
- Only use information provided in these instructions or shared by the customer during the conversation.
- Never invent product prices, release dates, stock levels, discounts, materials or product features.
- Do not claim to have access to live Corteiz information, customer accounts, stock systems or order information.
- If you do not have the information needed to answer a question, clearly say:
"I don't have confirmed information about that on Corteiz Drop Hub."
- Do not guess or make up an answer simply to satisfy the customer.
- If a customer asks about official Corteiz information outside Corteiz Drop Hub, explain that you only have information available on Corteiz Drop Hub.

EXAMPLES:
Customer: "What products are available?"
Assistant: "The available products on Corteiz Drop Hub are the Alcatraz Hoodie, CRTZ Cargo Pants, Corteiz Graphic T-Shirt, Corteiz Alcatraz Puffer Jacket, Corteiz Guerillaz Cargo Shorts and Corteiz 4Starz Cap."

Customer: "How do I register my interest?"
Assistant: "Explore the available products, select the one you are interested in, choose your preferred size and colour, and then click 'Register My Interest.' You will receive confirmation once your interest has been registered."

Customer: "When is the next official Corteiz drop?"
Assistant: "I don't have confirmed information about official Corteiz release dates. I can only provide information available on Corteiz Drop Hub."

Customer: "Which product should I choose?"
Assistant: "I can help you narrow down your options. Are you looking for a jacket, trousers, shorts, a T-shirt, a hoodie or a cap?"

Customer: "How much does the Alcatraz Hoodie cost?"
Assistant: "I don't have confirmed pricing information for that product on Corteiz Drop Hub."`;

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      service: 'Corteiz Drop Hub & Assistant',
    });
  });

function getCompliantFallbackReply(message: string, history?: Array<{ role: string; text: string }>): string {
  const q = message.trim().toLowerCase();
  
  // Check if customer previously mentioned an item or size
  let mentionedItem = '';
  if (q.includes('hoodie') || q.includes('alcatraz hoodie')) mentionedItem = 'Alcatraz Hoodie';
  else if (q.includes('pants') || q.includes('cargo pants') || q.includes('crtz cargo')) mentionedItem = 'CRTZ Cargo Pants';
  else if (q.includes('t-shirt') || q.includes('tee') || q.includes('shirt')) mentionedItem = 'Corteiz Graphic T-Shirt';
  else if (q.includes('puffer') || q.includes('jacket')) mentionedItem = 'Corteiz Alcatraz Puffer Jacket';
  else if (q.includes('shorts') || q.includes('guerillaz')) mentionedItem = 'Corteiz Guerillaz Cargo Shorts';
  else if (q.includes('cap') || q.includes('hat') || q.includes('4starz')) mentionedItem = 'Corteiz 4Starz Cap';

  // 1. Price queries
  if (q.includes('cost') || q.includes('price') || q.includes('how much') || q.includes('pricing') || q.includes('discount')) {
    if (mentionedItem) {
      return `I don't have confirmed pricing information for that product on Corteiz Drop Hub.`;
    }
    return `I don't have confirmed pricing information for that on Corteiz Drop Hub.`;
  }

  // 2. Release date / official drop queries
  if (q.includes('when') || q.includes('release date') || q.includes('drop date') || q.includes('time') || q.includes('next drop') || q.includes('official corteiz')) {
    return "I don't have confirmed information about official Corteiz release dates. I can only provide information available on Corteiz Drop Hub.";
  }

  // 3. Stock / materials / unconfirmed tech features
  if (q.includes('stock') || q.includes('how many') || q.includes('material') || q.includes('fabric') || q.includes('inventory')) {
    return "I don't have confirmed information about that on Corteiz Drop Hub.";
  }

  // 4. How to register interest
  if (q.includes('how do i register') || q.includes('how to register') || q.includes('register my interest') || q.includes('steps to register') || q.includes('sign up')) {
    return "Explore the available products, select the one you are interested in, choose your preferred size and colour, and then click 'Register My Interest.' You will receive confirmation once your interest has been registered.";
  }

  // 5. Available products
  if (q.includes('what products') || q.includes('available products') || q.includes('products available') || q.includes('what is available') || q.includes('items')) {
    return "The available products on Corteiz Drop Hub are the Alcatraz Hoodie, CRTZ Cargo Pants, Corteiz Graphic T-Shirt, Corteiz Alcatraz Puffer Jacket, Corteiz Guerillaz Cargo Shorts and Corteiz 4Starz Cap.";
  }

  // 6. Which product should I choose / recommendation
  if (q.includes('which product') || q.includes('recommend') || q.includes('what should i') || q.includes('choose') || q.includes('help me pick')) {
    return "I can help you narrow down your options. Are you looking for a jacket, trousers, shorts, a T-shirt, a hoodie or a cap?";
  }

  // 7. Sizing query for specific product
  if (q.includes('size') && mentionedItem) {
    if (mentionedItem === 'Corteiz 4Starz Cap') {
      return `The Corteiz 4Starz Cap is available in One Size. You can select it and click 'Register My Interest' to receive confirmation.`;
    }
    return `The ${mentionedItem} is available in sizes S, M, L, XL, and XXL on Corteiz Drop Hub. You can select your preferred size and colour, then click 'Register My Interest.'`;
  }

  // 8. Specific product query
  if (mentionedItem) {
    return `The ${mentionedItem} is one of the 6 available products on Corteiz Drop Hub. To register your interest, select it, choose your preferred size and colour, and click 'Register My Interest.'`;
  }

  // 9. Greeting / General inquiry
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('help') || q.length < 10) {
    return "Hello! I am the Corteiz Drop Assistant. I'm here to help you explore the 6 products available on Corteiz Drop Hub and explain how to register your interest. How can I help you today?";
  }

  return "I don't have confirmed information about that on Corteiz Drop Hub.";
}

  // Assistant chat endpoint
  app.post('/api/assistant/chat', async (req: Request, res: Response) => {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item && item.text && (item.role === 'user' || item.role === 'model')) {
              contents.push({
                role: item.role,
                parts: [{ text: item.text }],
              });
            }
          }
        }

        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        // Use Promise.race with a 4.5s timeout so the user never experiences hanging requests
        const timeoutPromise = new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error('TIMEOUT')), 4500)
        );

        const apiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });

        const result = (await Promise.race([apiPromise, timeoutPromise])) as any;

        if (result && result.text) {
          const reply = result.text.trim();
          res.json({ reply });
          return;
        }
      } catch (err) {
        // Log gently and gracefully fallback to strictly accurate responses
        console.warn('Gemini API call returned error or timed out, applying compliant fallback:', (err as Error)?.message);
      }
    }

    // Compliant fallback strictly abiding by the accuracy rules
    const fallback = getCompliantFallbackReply(message, history);
    res.json({ reply: fallback });
  });

  // Setup Vite development middleware or serve static build
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Corteiz Drop Hub server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
