import { describe, it as test } from "node:test";
import { strict as assert } from "node:assert";
import { applyDomainIndexingPolicy, isPlatformIndexingHost } from "./domain-indexing";

function expect(actual: unknown) {
  return {
    toBe: (expected: unknown) => assert.equal(actual, expected),
    toBeNull: () => assert.equal(actual, null),
  };
}

describe("domain-aware noindex", () => {
  for (const suffix of ["lovable.app", "workers.dev", "pages.dev", "netlify.app"]) {
    test(`all HTML paths and nested subdomains on *.${suffix} stay accessible and noindex`, async () => {
      for (const path of ["/", "/services", "/zh/projects/example?category=industrial", "/missing"]) {
        const status = path === "/missing" ? 404 : 200;
        const request = new Request(`https://nested.project.${suffix}${path}`);
        const response = applyDomainIndexingPolicy(request, new Response("<html>unchanged</html>", {
          status,
          headers: { "Content-Type": "text/html; charset=utf-8", "X-Existing": "preserved" },
        }));
        expect(response.status).toBe(status);
        expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
        expect(response.headers.get("location")).toBeNull();
        expect(response.headers.get("X-Existing")).toBe("preserved");
        expect(await response.text()).toBe("<html>unchanged</html>");
      }
      expect(isPlatformIndexingHost(`PROJECT.${suffix.toUpperCase()}.`)).toBe(true);
    });
  }

  test("custom-domain SEO and forwarded-host claims remain untouched", () => {
    for (const host of ["www.oceanicflo.com", "oceanicflo.com", "localhost", "notlovable.app", "project.lovable.app.example.com"]) {
      const original = new Response("<html>existing SEO</html>", { headers: { "Content-Type": "text/html" } });
      const result = applyDomainIndexingPolicy(new Request(`https://${host}/services`, {
        headers: { "X-Forwarded-Host": "project.lovable.app" },
      }), original);
      expect(result).toBe(original);
      expect(result.headers.has("X-Robots-Tag")).toBe(false);
    }
  });

  test("non-HTML crawler files and API responses remain unchanged", () => {
    for (const type of ["text/plain", "application/xml", "application/json", "image/svg+xml"]) {
      const original = new Response("unchanged", { headers: { "Content-Type": type } });
      expect(applyDomainIndexingPolicy(new Request("https://project.pages.dev/robots.txt"), original)).toBe(original);
    }
  });

  test("existing crawler directives and HTML error responses are preserved", () => {
    const result = applyDomainIndexingPolicy(new Request("https://project.workers.dev/error"), new Response("error", {
      status: 500,
      headers: { "Content-Type": "text/html", "X-Robots-Tag": "nofollow" },
    }));
    expect(result.status).toBe(500);
    expect(result.headers.get("X-Robots-Tag")).toBe("nofollow, noindex");
  });
});