interface Env {
  MY_CERT: Fetcher;
}

export default {
  async fetch(request, environment): Promise<Response> {
    const url = new URL(request.url);
    return await environment.MY_CERT.fetch(url)
  }
} satisfies ExportedHandler<Env>;