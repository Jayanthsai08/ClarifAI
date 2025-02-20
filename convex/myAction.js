import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;  // Securely use API key from env

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is missing. Check your .env.local file.");
}

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await ConvexVectorStore.fromTexts(
        args.splitText, // Array
        { fileId: args.fileId }, // String
        new GoogleGenerativeAIEmbeddings({
          apiKey: API_KEY,  // Using environment variable
          model: "text-embedding-004", // 768 dimensions
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        }),
        { ctx }
      );
      return "Completed..";
    } catch (error) {
      console.error("Error in ingest function:", error);
      return { error: "Failed to process the request." };
    }
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const vectorStore = new ConvexVectorStore(
        new GoogleGenerativeAIEmbeddings({
          apiKey: API_KEY,  // Using environment variable
          model: "text-embedding-004", // 768 dimensions
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        }),
        { ctx }
      );

      const results = await vectorStore.similaritySearch(args.query, 5);
      const filteredResults = results.filter(q => q.metadata.fileId === args.fileId);

      console.log("Search results:", filteredResults);
      return JSON.stringify(filteredResults);
    } catch (error) {
      console.error("Error in search function:", error);
      return { error: "Search failed." };
    }
  },
});
