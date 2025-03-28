import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server"
import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import {internal} from './_generated/api'

const validatePayload = async (req: Request): Promise<WebhookEvent | undefined> => {
    const payload = await req.text()

    const svixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    }

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

    try{
        const event = webhook.verify(payload, svixHeaders) as WebhookEvent

        return event
    }catch (error){
        console.error("Clerk webhook request could not be verified")
    }
}

const handleClerkWebhook = httpAction(async (ctx, req) => {
    const event = await validatePayload(req)
    if(!event){
        return new Response("Could not validate Clerk payload", {
            status: 400,
        });
    }

    switch(event.type) {
        case "user.created":
            const user = await ctx.runQuery(internal.users.get, {clerkId: event.data.id})

            if(user) {
                console.log("Updating user ${event.data.id} with: ${event.data}")
            }
        
        case "user.updated":
        case "user.deleted":
        case "session.created":
        case "session.ended":
        case "session.removed":
        case "session.revoked":
        case "email.created":
        case "sms.created":
        case "organization.created":
        case "organization.updated":
        case "organization.deleted":
        case "organizationDomain.created":
        case "organizationDomain.updated":
        case "organizationDomain.deleted":
        case "organizationMembership.created":
        case "organizationMembership.deleted":
        case "organizationMembership.updated":
        case "organizationInvitation.accepted":
        case "organizationInvitation.created":
        case "organizationInvitation.revoked":
        case "role.created":
        case "role.updated":
        case "role.deleted":
        case "permission.created":
        case "permission.updated":
        case "permission.deleted":
        case "waitlistEntry.created":
        case "waitlistEntry.updated":
    }
})

const http = httpRouter()

http.route({    
    path: "/clerk-users-webhook",
    method: "POST",
    handler: handleClerkWebhook
})

export default http;