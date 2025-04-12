import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import webPush from "web-push";

type ToSend = {
  key: string,
  notification: any
}

export default async (req: Request, context: Context) => {
  const store = getStore("subscriptions");
  const subscriptions = JSON.parse(await store.get("subscriptions")) as Subscription[];

  const body: ToSend = await req.json();

  if (body.key !== Netlify.env.get("VAPID_PRIVATE_KEY")) {
    return new Response("Unauthorized", {status: 401});
  }

  webPush.setVapidDetails(
    'https://blokade.org',
    Netlify.env.get("VAPID_PUBLIC_KEY"),
    Netlify.env.get("VAPID_PRIVATE_KEY")
  );

  for (const subscription of subscriptions) {
    try {
      await webPush.sendNotification(subscription, JSON.stringify(body.notification));
    } catch {}
  }

  return new Response("Sent!")
}
