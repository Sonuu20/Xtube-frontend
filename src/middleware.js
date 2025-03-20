import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Add the pathname to the headers
  requestHeaders.set("x-pathname", pathname);

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
