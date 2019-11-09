// Chekc if service workers are supported

if ('serviceWorker' in navigator) {
    console.log("Service Worker Supported");
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service_worker.js')
            .then( register => {
                console.log(register)
            })
            .catch( error => {
                console.log(error)
            })
    })
}