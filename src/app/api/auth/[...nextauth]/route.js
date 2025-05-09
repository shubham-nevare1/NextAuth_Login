import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
          const { email, password } = credentials;

        // ✅ Hardcoded admin check
        const ADMIN_EMAIL = "admin@example.com";
        const ADMIN_PASSWORD = "admin123";

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          return {
            id: "admin-001",
            email,
            firstName: "Admin",
            role: "admin",
            personalInfo: {
              occupation: "Administrator",
            },
            profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0rcnkCIh4V-5JOhdPqfi9ESlZ9GadzwfSw&s",
          };
        }
        // ❌ Optional: handle real user login via API
        const res = await fetch("https://api.xcamper.com/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        // const res = await fetch("https://api.xcamper.com/api/user/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     email: credentials.email,
        //     password: credentials.password,
        //   }),
        // });

        const response = await res.json();
        console.log("Auth API response:", response);

        if (res.ok && response.user) return response.user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60, // 30 minutes in seconds
    updateAge: 0, // Optional: force JWT to be refreshed every 5 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
