exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { messages } = JSON.parse(event.body || '{}');
  if (!messages || !Array.isArray(messages)) {
    return { statusCode: 400, body: 'Invalid request' };
  }

  const SYSTEM_PROMPT = `You are an AI assistant on Parth Patel's personal portfolio website.
You answer questions about Parth and his work. Be concise, friendly, and honest.
Only answer questions related to Parth's background, skills, projects, or the portfolio itself.
If you don't know something specific about Parth, say so — do not make things up.

Here is what you know about Parth:
- Name: Parth Patel
- School: Miami University, graduating 2027
- Major: Cybersecurity
- Minor: Deep Learning / AI
- Interests: Offensive and defensive security, threat analysis, applying machine learning to security problems
- GitHub: github.com/parth0326
- LinkedIn: linkedin.com/in/parth-patel-0656822b4
- Email: ppatel2005263@gmail.com
- Open to: internships, research opportunities, and collaborations
- Status: actively building projects (check the projects section for the latest)`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();
    const reply = data?.content?.[0]?.text || 'Sorry, I could not generate a response.';
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
