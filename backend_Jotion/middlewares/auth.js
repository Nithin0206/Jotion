import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";


export const requireAuth = ClerkExpressWithAuth({
unauthorizedHandler: (req, res, next) => {
    return res.status(401).json({ error: "Unauthorized" });
},
});
