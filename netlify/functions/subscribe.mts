import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const store = getStore("subscriptions");
  const subscriptions: Subscription[] = JSON.parse(await store.get("subscriptions"))?? [];
  const newSubscription: Subscription = (await req.json()).subscription;
  if (subscriptions.some(({endpoint}) => endpoint === newSubscription.endpoint )) {
    return new Response("already subscribed");
  }

  subscriptions.push(newSubscription);
  await store.setJSON("subscriptions", subscriptions);

  return new Response("Registered!");
}
