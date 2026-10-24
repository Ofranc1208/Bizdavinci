import { canonicalRedirects } from "./canonicalRedirects";
import { seoFixesRedirects } from "./seoFixesRedirects";

export async function getRedirects() {
  return [...canonicalRedirects, ...seoFixesRedirects];
}
