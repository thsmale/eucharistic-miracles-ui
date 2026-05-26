interface Env {
  MY_CERT: Fetcher;
  CDN_URL: string,
  AUTH_SECRET: string,
}

export default {
  async fetch(request, environment): Promise<Response> {
    const { pathname }= new URL(request.url);
    if (pathname.startsWith("/json/") || pathname.startsWith("/images/")) {
      const url = new URL(pathname, environment.CDN_URL);
      return await fetch(url, {
        headers: { 'x-auth': environment.AUTH_SECRET }
      });
    }
    return new Response(null, { status: 404 });
  }
} satisfies ExportedHandler<Env>;