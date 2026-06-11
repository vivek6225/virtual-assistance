import axios from "axios";

const geminiResponse = async (command,userName,assistantName) => {
  try {

    const apiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const prompt = `
You are a virtual assistant named ${assistantName} created by ${userName}.

You are not Google.
You behave like a voice-enabled assistant.

Your task is to understand the user's input and respond ONLY in JSON format.

Response format:

{
  "type": "general | google_search | youtube_search | youtube_play | get_time | get_date | get_day | get_month | calculator_open | instagram_open | facebook_open | weather_open",
  
  "userInput": "<cleaned user input>",

  "response": "<short voice-friendly reply>"
}

Rules:
- Remove assistant name from userinput if present.
- If user wants Google or YouTube search, userinput should contain only the search query.
- Reply ONLY with JSON.
- Do not add markdown.
- Do not add \`\`\`json.

Type meanings:
- general → Normal questions
- google_search → Search on Google
- youtube_search → Search on YouTube
- youtube_play → Play song/video directly
- calculator_open → Open calculator
- instagram_open → Open Instagram
- facebook_open → Open Facebook
- weather_open → Show weather
- get_time → Current time
- get_date → Today's date
- get_day → Current day
- get_month → Current month

If someone asks who created you,
reply with: "${userName} created me."

User input: ${command}
`;

    const result = await axios.post(apiUrl, {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });

    return result.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.log(error);
  }
};

export default geminiResponse;