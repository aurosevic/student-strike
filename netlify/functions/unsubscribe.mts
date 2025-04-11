import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const store = getStore("subscriptions");
  const subscriptions = JSON.parse(await store.get("subscriptions"))?? [] as Subscription[];
  const toDelete: Subscription = (await req.json()).subscription;
  subscriptions.filter(({endpoint}: Subscription) => endpoint !== toDelete.endpoint);
  await store.setJSON("subscriptions", subscriptions);

  return new Response("Registered!")
}
