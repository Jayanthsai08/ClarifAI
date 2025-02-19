import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        email: v.string(),
        userName: v.string(),
        imageUrl: v.string(),
        upgrade: v.boolean()
    },
    handler: async (ctx, args) => {
        //if user alredy exists
        const user = await ctx.db.query('users')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect();


        //if not, then add new user

        if (user?.length == 0) {
            await ctx.db.insert('users', {
                email: args.email,
                userName: args.userName,
                imageUrl: args.imageUrl,
                upgrade:false
            });
            return 'Inserted New User....'

        }
        return 'User already exists'

    }
})

export const userUpgradePlan = mutation({
    args: {
        userEmail: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('users')
            .filter(q => q.eq(q.field('email'), args?.userEmail))
            .collect();
        
        console.log("User Query Result:", result); // ✅ Debugging

        if (!result || result.length === 0) {  // 🔥 Check if user exists
            console.error("❌ User not found for email:", args.userEmail);
            return { status: 'error', message: 'User not found' };
        }

        // Ensure we check for the user object before trying to access its properties
        const user = result[0];
        if (!user._id) {
            console.error("❌ User missing _id:", user);
            return { status: 'error', message: 'Invalid user data' };
        }

        // ✅ User found, update the upgrade status
        await ctx.db.patch(user._id, { upgrade: true });
        return { status: 'success', message: 'Plan upgraded' };
    }
});

export const GetUserInfo = query({
    args:{
        userEmail:v.optional(v.string()),
    },
    handler:async(ctx,args)=>{
        if(!args.userEmail){
            return ;
        }
        const result = await ctx.db.query('users')
            .filter(q => q.eq(q.field('email'), args?.userEmail))
            .collect();
            return result[0];
    }
})