import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Edge runtime is required for Cloudflare Pages
export const runtime = 'edge';

// Note: maxDuration is a Vercel-specific setting, Cloudflare has its own timeout limits
// but keeping it here won't hurt if you switch back to Vercel.
export const maxDuration = 30;
const systemPrompt = `You are the official AI Assistant for the Samargalo Custom Token (SCT). Your sole purpose is to provide helpful, concise, and accurate information about this specific token.

Here is the knowledge you have about the Samargalo Token:
- **Token Name**: Samargalo Custom Token
- **Token Symbol**: SCT
- **Network**: Deployed on the Sepolia testnet (Ethereum)
- **Total Supply**: A fixed supply of 100 tokens
- **Smart Contract Security**: Built using OpenZeppelin's secure and audited smart contracts
- **Fees**: There are no annual fees, ever. New decentralized exchanges are supported free of charge.
- **Rewards**: Users can collect staking and performance rewards from hundreds of Web3 sources worldwide. Every time a smart contract interacts with a user's wallet, they can collect tokens.
- **Dashboard Features**: Users can manage their tokens, connect their wallet to view balances, use the "Earn Free Tokens" section to play a Crypto Quiz or Tic Tac Toe to earn rewards (1 SCT for the quiz, 2 SCT for winning Tic Tac Toe).

If a user asks a question that is unrelated to the Samargalo Token, blockchain, cryptocurrency, or Web3 basics, politely redirect the conversation back to the token. Do not make up information that is not in the knowledge base above. Be friendly, crypto-native, and professional.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      messages,
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
