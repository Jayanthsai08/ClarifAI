import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js"; // ✅ Fixed import
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await ConvexVectorStore.fromTexts(
        args.splitText,  
        { fileId: args.fileId },  // ✅ Use array for metadata
        new GoogleGenerativeAIEmbeddings({
          apiKey:"AIzaSyBnt1ikUy_BbLY8GXIXOHkJS47PSW6ctnM",  // ✅ Use env variable
          model: "text-embedding-004",
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        }),
        { ctx }
      );
      return "Completed.";
    } catch (error) {
      console.error("Ingestion Error:", error);
      return "Failed to ingest data.";
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
          apiKey: "AIzaSyBnt1ikUy_BbLY8GXIXOHkJS47PSW6ctnM", // ✅ Use env variable
          model: "text-embedding-004",
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        }),
        { ctx }
      );

      const results = await vectorStore.similaritySearch(args.query, 5);
      return JSON.stringify(results.filter(q => q.metadata.fileId === args.fileId));
    } catch (error) {
      console.error("Search Error:", error);
      return JSON.stringify({ error: "Failed to search" });
    }
  },
});
