import { GoogleGenAI } from "@google/genai";
import { prompt1, prompt2, prompt3, prompt4 } from "@utils/prompt";
import type { Response } from "express";

interface Prompt {
    level: string,
    query: string
}

const ai = new GoogleGenAI({apiKey: process.env?.apiKey});

export async function main(userPrompt: any,  res: Response) {

 
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: [
        {
            role: 'model',
            parts: [{text: prompt1}]
        },
        {
            role: 'model',
            parts: [{text: prompt2}]
        },
        {
            role: 'model',
            parts: [{text: prompt3}]
        },
        {
            role: 'model',
            parts: [{text: prompt4}]
        },
        {
            role: 'user',
            parts: [{text: JSON.stringify(userPrompt)}]
        }
    ]
  });

 


 // console.log(response.text);

  for await (const chunk of response) {
    res.write(chunk.text);
    console.log(chunk.text);
    console.log("_".repeat(80));
  }
  //return response.text
  res.end();
}


export async function getTemplate(prompt: string) {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Return either node or react based on what do you think this project should be.
         Only return a single word either 'node' or 'react'. Do not return anything extra.
         the project context is ${prompt}
              `
        
      });
    
    
      console.log(response.text);
      return response.text
}