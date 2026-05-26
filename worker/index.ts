interface Env {
  MY_CERT: Fetcher;
  CDN_URL: string,
}

export default {
  async fetch(request, environment): Promise<Response> {
    const { pathname }= new URL(request.url);
    if (pathname.startsWith("/json/") || pathname.startsWith("/images/")) {
      try {
        const url = new URL(pathname, environment.CDN_URL);
        const response = await environment.MY_CERT.fetch(url)
        
        if (!response.ok) {
          return new Response(`Worker failed with ${response.status}`, { status: 503 });
        }

        return response;
      } catch (err: any) {
        return new Response(`Worker response: ${err?.message}`, { status: 503 })
      }
    }
    return new Response(null, { status: 404 });
  }
} satisfies ExportedHandler<Env>;