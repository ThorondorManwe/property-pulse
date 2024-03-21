import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invokes on successful sign in
    async signIn({ profile }) {
      // 1. Connect to the database
      // 2. Check if the user exists
      // 3. If not, add the user to the database
        // 4. Return true to allow sign in
    },
    // Modifies the session object
    async session({ session }) {
        // 1. Get the user from the database
        // 2. Assign the user id to the session
        // 3. Return session
    },
  },
};
