import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import Whiteboard from "@/app/workspace/_components/Whiteboard";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
    edited: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("files", args);
    return result;
  },
});

export const getFile = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .collect();

    return result;
  },
});

export const updateFile = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
    edited: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      document: args.document,
      edited: args.edited,
    });
  },
});

export const getFileById = query({
  args: {
    _id: v.id("files"), // Use v.id() with the correct table name
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args._id);
    if (!file) {
      throw new Error("File not found");
    }
    return file;
  },
});

export const gerDocById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args._id);
    return file;
  },
});

export const updateWhiteDoc = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, { whiteboard: args.document });
  },
});




// convex/files.ts
