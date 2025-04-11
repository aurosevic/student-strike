import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import webPush from "web-push";

type Post = {
  pubDate: string;
  title: string;
  body: string;
  url: string;
}

export default async (req: Request, context: Context) => {
  const store = getStore("subscriptions");
  const subscriptions = JSON.parse(await store.get("subscriptions")) as Subscription[];
  const storedLatest = await store.get("latest");
  const latestSent = storedLatest !== null ? new Date(storedLatest) : new Date();

  const postsLink = `${Netlify.context?.url.origin}/sr/vesti/posts.json`;
  const fetched = await fetch(postsLink);
  const allPosts: Post[] = await fetched.json();

  const latest = allPosts.reduce((acc: Post | null, curr: Post) => {
    if (acc?.pubDate ?? new Date(0) > new Date(curr.pubDate)) {
      return acc;
    }
    return curr;
  }, null) as Post;

  if (new Date(latest.pubDate) <= latestSent) {
    return new Response("Nothing to send", { status: 200 })
  }

  store.set("latest", new Date(latest.pubDate).toISOString());

  webPush.setVapidDetails(
    'https://blokade.org',
    Netlify.env.get("VAPID_PUBLIC_KEY"),
    Netlify.env.get("VAPID_PRIVATE_KEY")
  );

  const toDelete = new Set();

  for (const subscription of subscriptions) {
    try {
      await webPush.sendNotification(subscription, JSON.stringify({
        title: latest.title,
        options: {
          body: latest.body,
          data: {
            url: latest.url,
          },
          actions: [
            { action: "open_url", title: "Pročitaj" }
          ]
        }
      }));   
    } catch (e) {
      if (e.body === "push subscription has unsubscribed or expired.\n") {
        toDelete.add(subscription.endpoint);
      } else {
        console.log(e);
      }
    }
  }

  await store.setJSON("subscriptions", 
    subscriptions.filter(({endpoint}) => !toDelete.has(endpoint))
  );

  return new Response("Sent!")
}
