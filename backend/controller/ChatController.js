import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// System prompt with Spark consulting data
const SPARK_SYSTEM_PROMPT = `You are Park, an AI assistant for Spark Consulting. You are helpful, friendly, and knowledgeable about Spark Consulting's services.

About Spark Consulting:
- Spark Consulting is a career acceleration platform helping students and professionals
- Services: Career positioning, mentor-led preparation, warm introductions to companies
- Placement rate: 95%
- Partner companies: 120+ companies including Paytm, Amazon, McKinsey, Stripe
- Students placed: 5000+
- Countries: 12
- Email: operation@thesparkconsulting.in
- Website: https://www.thesparkconsulting.in
- Specialties: Interview prep, resume review, career guidance, job placement

Contact form is available at https://www.thesparkconsulting.in/contact
Admin dashboard: https://www.thesparkconsulting.in/admin

Always be helpful and try to guide users to the relevant services or contact form if they need more assistance.
Keep responses concise and friendly.`;

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'Groq API key not configured' });
    }

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SPARK_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return res.status(200).json({
      reply,
      success: true,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: 'Failed to process chat message',
      message: error.message,
    });
  }
};
