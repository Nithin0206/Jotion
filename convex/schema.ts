import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {z} from "zod"
export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});

export const formSchema = z.object({
  firstname:z.string().min(2).max(50),
  lastname:z.string().min(2).max(50),
  email:z.string().email(),
  message:z.string().min(5).max(100)

})