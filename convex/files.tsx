import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
    edited : v.string()
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
    edited: v.number()
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      document: args.document, edited: args.edited
    });
  },
});

export const getFilebyId = query({
  args: {
    _id: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});
