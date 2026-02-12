export default async function handler(req, res) {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Tum Smile Finance AI ho. User ka sawal: ${prompt}` }] }]
    })
  });
  const data = await response.json();
  const reply = data.candidates[0].content.parts[0].text;
  res.status(200).json({ reply });
}
