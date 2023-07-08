const speedElement = document.querySelector('#speed');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');

let watchID = null;
let currentRide = null;
startBtn.addEventListener('click', () => {
    if (watchID != null) {
        return;
    }
    function handleSuccess(position) {
        addPosition(currentRide, position);
        console.log(position)
        if (position.coords.speed === null) {
            speedElement.innerText = 0;
        } else {
            speedElement.innerText = (position.coords.speed * 3.6).toFixed(1);
        }
    }
    function handleError(error) {
        console.log(error.msg)
    }
    const options = { enableHighAccuracy: true }

    currentRide = createNewRide();
    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options)

    startBtn.classList.add('d-none');
    stopBtn.classList.remove('d-none');
})

stopBtn.addEventListener('click', () => {
    if (!watchID) {
        return;
    }
    navigator.geolocation.clearWatch(watchID);
    watchID = null;
    updateStopTime(currentRide)
    currentRide = null;
    stopBtn.classList.add('d-none');
    startBtn.classList.remove('d-none');
    window.location.href = "./"
})
