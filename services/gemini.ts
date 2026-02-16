
import { GoogleGenAI, Type } from "@google/genai";

export interface MemoryEntry {
  name: string;
  location: string;
  context: string;
  tags: string[];
  phone?: string;
  email?: string;
}

export type ChatMode = 'store' | 'retrieve';

export const processMemoryChat = async (input: string, mode: ChatMode = 'store'): Promise<{ reply: string, entry?: MemoryEntry }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const storeInstruction = `You are MemorableContact, a professional memory assistant. 
    1. Respond warmly to the user.
    2. Extract details into JSON format.
    3. Extract: Name of person, Location, Context/Topic, Phone number, Email address, and 3 helpful tags.
    4. If no specific name is found, use 'Unknown'.`;

  const retrieveInstruction = `You are MemorableContact's retrieval engine. 
    1. The user is asking to recall someone or something (e.g., 'Who did I meet at the festival?').
    2. Respond as if you are searching a high-security digital brain.
    3. If the user mentions someone like 'Pradeep', 'Sarah', or 'Marcus' (who are in their mock dashboard), provide a detailed summary of that connection.
    4. If you can't find a specific match, answer intelligently based on the query.
    5. Return a conversational 'reply' and optionally an 'extracted' object if a specific person's card should be displayed. Include captured phone and email if found.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Mode: ${mode.toUpperCase()}. User query: "${input}"`,
      config: {
        systemInstruction: mode === 'store' ? storeInstruction : retrieveInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING, description: "Your conversational response to the user." },
            extracted: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                location: { type: Type.STRING },
                context: { type: Type.STRING },
                phone: { type: Type.STRING },
                email: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          required: ["reply"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    return {
      reply: data.reply,
      entry: data.extracted ? {
        name: data.extracted.name || "Unknown",
        location: data.extracted.location || "Unknown",
        context: data.extracted.context || "Unknown",
        phone: data.extracted.phone || "",
        email: data.extracted.email || "",
        tags: data.extracted.tags || []
      } : undefined
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { reply: "I encountered an error querying your MemorableContact digital brain. Please try again." };
  }
};
