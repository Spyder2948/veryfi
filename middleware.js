import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
    publicRoutes: ['/', '/shop', '/product/(.*)', '/sign-in', '/sign-up', '/api/image', '/api/search', '/search', '/api/product', '/product', '/filter_notfound'],
});

export const config = {
  matcher:  ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};