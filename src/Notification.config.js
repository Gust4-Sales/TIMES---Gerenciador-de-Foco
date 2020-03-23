import PushNotification from 'react-native-push-notification'


function configureNotification (){
    PushNotification.configure({
        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
          return 
        },
  
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
      
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
        requestPermissions: true
      })
  
}

async function scheduleBreakStartNotification(time){
    PushNotification.localNotificationSchedule({
        title: "Intervalo!",
        message: "Inspecione seu foco e inicie seu intervalo.",
        smallIcon: "ic_notification",
        largeIcon: "icon",
        date: new Date(Date.now() + (time * 1000) ),
        importance: "high",
        visibility: "public",
        priority: "high",
        vibration: 3000,
        soundName: 'alarm.mp3'
    })
    
}   

async function scheduleBreakFinishedNotification(time){
    PushNotification.localNotificationSchedule({
        title: "De volta ao trabalho!",
        message: "Seu intervalo acabou, volte ao trabalho",
        date: new Date(Date.now() + (time * 1000)),
        smallIcon: "ic_notification",
        largeIcon: "icon",
        importance: "high",
        visibility: "public",
        priority: "high",
        vibration: 3000,
        soundName: 'alarm.mp3'
    })
}

async function scheduleCicleFinishedNotification(time){
    PushNotification.localNotificationSchedule({
        title: "Fim do Ciclo",
        message: "Inspecione seu foco pela última vez e verifique seu desempenho.",
        smallIcon: "ic_notification",
        largeIcon: "icon",
        date: new Date(Date.now() + (time * 1000)),
        importance: "high",
        visibility: "public",
        priority: "high",
        vibration: 3000,
        soundName: 'alarm.mp3'
    })
}

async function cancellAllNotifications(){
    PushNotification.cancelAllLocalNotifications()
}


export { configureNotification, scheduleBreakStartNotification, scheduleBreakFinishedNotification, cancellAllNotifications, scheduleCicleFinishedNotification };