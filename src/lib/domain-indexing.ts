/** Match DNS suffixes, not lookalike names or caller-supplied forwarding headers. */
export function isPlatformIndexingHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  return ["lovable.app", "workers.dev", "pages.dev", "netlify.app"].some(
    (suffix) => host.endsWith(`.${suffix}`),
  );
}

/** Apply only to HTML; leave every custom-host response and existing SEO untouched. */
export function applyDomainIndexingPolicy(request: Request, response: Response): Response {
  if (!isPlatformIndexingHost(new URL(request.url).hostname)) return response;
  const contentType = response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "text/html" && contentType !== "application/xhtml+xml") return response;

  const headers = new Headers(response.headers);
  headers.append("X-Robots-Tag", "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}