/**
 * Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, …).
 * Run after a deploy: `npm run indexnow`. Reads the deployed sitemap so only
 * URLs that actually exist get submitted.
 */

const SITE = process.env.SITE_URL ?? "https://mukulkumar.dev";
const KEY = "203586f5a5d1d7e79f1f4fe73aba37e0";

const host = new URL(SITE).host;
const keyLocation = `${SITE}/${KEY}.txt`;

const keyRes = await fetch(keyLocation);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`Key file not served at ${keyLocation} - deploy first.`);
  process.exit(1);
}

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((u) => new URL(u).host === host);

if (urlList.length === 0) {
  console.error(`No URLs for ${host} in sitemap - is the deployed sitemap up to date?`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
});

console.log(`IndexNow: ${res.status} ${res.statusText}`);
urlList.forEach((u) => console.log(`  ${u}`));
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
