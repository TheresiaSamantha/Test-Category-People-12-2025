import { cookies } from "next/headers";
import errHandler from "./helpers/errHandler";
import { verifyToken } from "./helpers/jwt";
import { NextResponse } from "next/server";

export async function proxy(request: Request) {
  try {
    const cookieStore = await cookies();
    const authtoken = cookieStore.get("Authorization");

    if (!authtoken) {
      throw { message: "Please login first", status: 401 };
    }

    const [type, token] = authtoken.value.split(" ");

    if (type !== "Bearer" || !token) {
      throw { message: "Invalid token format", status: 401 };
    }

    const decoded = verifyToken(token) as {
      id: string;
      email: string;
    };

    // Clone the request headers and set a new header `x-hello-from-proxy1`
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.id);
    requestHeaders.set("x-user-email", decoded.email);

    // You can also set request headers in NextResponse.next
    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });

    return response;
  } catch (err) {
    return errHandler(err);
  }
}

export const config = {
  matcher: ["/api/peopleDummy/:path*"],
};
