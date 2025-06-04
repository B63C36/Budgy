// export default async function handler(req, res) {
//   const { message } = req.body;

//   // Ensure the Ollama server is running
//   try {
//     const response = await fetch("http://localhost:11434/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "llama3.2:1b",  // or "llama" based on your available models
//         messages: [{ role: "user", content: message }],
//       }),
//     });

//     const data = await response.json();

//     // Log the response to see what Ollama returns
//     console.log("Ollama API Response:", data);

//     if (!data.choices || !data.choices[0]) {
//       return res.status(500).json({ error: "Invalid response from Ollama" });
//     }

//     // Send the AI's response to the client
//     res.status(200).json({ reply: data.choices[0].message.content });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Something went wrong with Ollama" });
//   }
// }

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const financeKeywords = [
      "budget", "saving", "investment", "spending", "money", "income",
      "expense", "debt", "loan", "finance", "financial", "salary", "cost",
      "mortgage", "credit", "bank", "tax", "insurance", "retirement"
    ];

    const isFinancial = financeKeywords.some(keyword =>
      message.toLowerCase().includes(keyword)
    );

    if (!isFinancial) {
      return new Response(JSON.stringify({
        error: "This assistant only helps with financial questions."
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch("http://localhost:11434/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2:1b",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return new Response(JSON.stringify({ error: "Invalid response from Ollama" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Server error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
