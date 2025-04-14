import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new ConvexError("Not authenticated");
        }   

        if(args.email === identity.email) {
            throw new ConvexError("You cannot send a request to yourself");
        }

        const currentUser = await getUserByClerkId({
            ctx, clerkId: identity.subject
        })
        
    if(!currentUser) {
        throw new ConvexError("User not found")
    }

    const reciever = await ctx.db
        .query("user")
        .withIndex("by_email", (q) => q.eq
        ("email", args.email))
        .unique()

        const
}
})