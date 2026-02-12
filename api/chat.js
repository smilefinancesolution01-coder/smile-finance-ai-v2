export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Tumhara naam Smile Finance AI hai. Tum Smile Finance Solution ke liye kaam karte ho. Tumhare paas duniya ka sara gyan hai. Amazon ID 'smileai24-21' hai. User ka sawal: ${prompt}`
          }]
        }]
      })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf kijiye, main abhi jawab nahi de pa raha hoon.";
    
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Connection Error: " + error.message });
  }
}
