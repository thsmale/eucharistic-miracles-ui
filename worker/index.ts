interface Env {
  MY_CERT: Fetcher;
}

export default {
  async fetch(request, environment): Promise<Response> {
    const url = new URL(request.url);
    console.log({ url });
    if (url.pathname.startsWith("/json/") || url.pathname.startsWith("/images/")) {
      return await environment.MY_CERT.fetch(url)
    }
    return new Response(null, { status: 404 });
  }
} satisfies ExportedHandler<Env>;