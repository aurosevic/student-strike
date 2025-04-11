self.addEventListener('push', function(event) {
    const {title, options} = event.data?.json() ?? {};

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
