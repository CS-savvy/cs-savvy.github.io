import { NextResponse } from "next/server";

const BASE_URL = "https://mukulkumar.dev";
const INDEXNOW_KEY = "8cd0ecc9661648599a870f90d89bb371";

const URLS_TO_SUBMIT = [BASE_URL];

export async function POST() {
  const payload = {
    host: new URL(BASE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: URLS_TO_SUBMIT,
  };

  const results = await Promise.allSettled([
    fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    }),
    fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    }),
  ]);

  const responses = results.map((r, i) => ({
    engine: i === 0 ? "IndexNow" : "Bing",
    status: r.status === "fulfilled" ? r.value.status : "error",
  }));

  return NextResponse.json({ submitted: URLS_TO_SUBMIT, responses });
}
