const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("Error: GROQ_API_KEY is not defined in the environment.");
  console.error("Please ensure you run this script with: node --env-file=.env index.js");
  process.exit(1);
}

async function main() {
  console.log("Calling Groq API...");
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: "Write a short, inspiring poem about antigravity and coding."
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API returned status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    console.log("\n--- Groq Response ---");
    console.log(reply);
    console.log("----------------------");
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

main();
