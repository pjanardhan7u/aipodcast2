import { action } from "./_generated/server";
import { v } from "convex/values";
import axios from "axios";

import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateThumbnailAction = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const apiKey = process.env.DEEPAI_API_KEY!;
    const response = await axios.post(
      "https://api.deepai.org/api/text2img",
      { text: prompt },
      { headers: { "Api-Key": apiKey } }
    );

    const url = response.data.output_url;

    if (!url) {
      throw new Error("Error generating thumbnail");
    }

    const imageResponse = await fetch(url);
    const buffer = await imageResponse.arrayBuffer();
    return buffer;
  }
});