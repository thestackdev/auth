import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default withAuth({
  callbacks: {
    authorized: async ({ req }) => {
      const token = await getToken({ req, secret });
      if (!token) return false;
      return true;
    },
  },
  pages: {
    error: "/error",
    signIn: "/login",
  },
});

export const config = { matcher: ["/"] };
