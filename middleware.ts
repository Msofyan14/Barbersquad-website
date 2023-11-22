// export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/sign-in") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return await withAuth(req, {
    pages: {
      signIn: "/sign-in",
    },
  });
}

export const config = { matcher: ["/sign-in", "/dashboard/:path*"] };
