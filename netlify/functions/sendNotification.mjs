import * as webPush from "web-push";


webPush.setVapidDetails(
    "https://example.com/",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export default async (req, context) => {
    const subscription = req.body.subscription;
    const payload = null;
    const options = {
        TTL: req.body.ttl,
    };

    setTimeout(function () {
        webPush
            .sendNotification(subscription, payload, options)
            .then(function () {
                res.sendStatus(201);
            })
            .catch(function (error) {
                res.sendStatus(500);
                console.log(error);
            });
    }, req.body.delay * 1000);
};
