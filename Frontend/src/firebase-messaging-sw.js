importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCVMBoPf0oZgJIsilHkXUiwEjLnw_oxI9A",
    authDomain: "medpal-5ae11.firebaseapp.com",
    projectId: "medpal-5ae11",
    storageBucket: "medpal-5ae11.appspot.com",
    messagingSenderId: "729366534377",
    appId: "1:729366534377:web:9d302b52e9e26ea637f878",
    measurementId: "G-M60P9W7SM3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    return self.registration.showNotification(notificationTitle,
    notificationOptions);
    });
    self.addEventListener('notificationclick', event => {
       console.log(event)
});

