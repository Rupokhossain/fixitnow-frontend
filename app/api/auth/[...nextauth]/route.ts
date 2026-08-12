

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { cookies } from "next/headers"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
callbacks: {
  async signIn({ user, account }) {
    if (account?.provider === "google") {
      try {
        console.log("Attempting to sync with backend for:", user.email);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/social-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, name: user.name }),
        });

        if (!res.ok) {
          console.error("Backend responded with error:", res.status);
          return false; 
        }

        const result = await res.json();
        console.log("Backend sync successful, token received.");

        if (result.success) {
          const cookieStore = await cookies();
          cookieStore.set("accessToken", result.data.accessToken, {
            path: "/",
            httpOnly: true,
          });
          return true;
        }
      } catch (error) {
        console.error("CRITICAL ERROR during social login:", error);
        return false; 
      }
    }
    return true;
  },
},
})

export { handler as GET, handler as POST }