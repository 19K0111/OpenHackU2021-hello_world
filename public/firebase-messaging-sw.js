// Push通知を受け取ると呼ばれる
self.addEventListener('push', function (event) {
    // メッセージを表示する
    var data = {};
    if (event.data) {
        data = event.data.json();
    }
    var title = data.notification.title || "無題";
    var message = data.notification.body || "メッセージが届いています。";
    if (!message.startsWith('hoge')) { // hogeから始まるメッセージは表示しない
        event.waitUntil(
            self.registration.showNotification(title, {
                'body': message
            })
        );
    } else {
        console.info("通知されないメッセージが来ました");
        console.log(message);
    }
});