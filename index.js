const rideListElement = document.querySelector('#rideList');
const allRides = getAllRides();
allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value);
    ride.id = id;

    const itemElement = document.createElement('li');
    itemElement.id = ride.id;
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"
    rideListElement.appendChild(itemElement);

    itemElement.addEventListener('click', () => {
        window.location.href = `./detail.html?id=${ride.id}`;

    })
    const firstPosition = ride.data[0];
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

    const mapElement = document.createElement('div');
    const mapID = `map${ride.id}`
    mapElement.id = mapID;
    mapElement.style = "width:100px;height:100px;"
    mapElement.classList.add('bg-light')
    mapElement.classList.add('rounded-4')

    const dataElement = document.createElement('div');
    dataElement.className = "flex-fill d-flex flex-column"

    const cityDiv = document.createElement('div');
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryName}`;
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement('div');
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} Km/h`;
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement('div');
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`;

    const durationDiv = document.createElement('div');
    durationDiv.innerText = `Duration: ${getDuration(ride)}`;

    const dateDiv = document.createElement('div');
    dateDiv.innerText = getStartDate(ride);
    dateDiv.className = "mt-2 text-secondary"

    dataElement.appendChild(cityDiv);
    dataElement.appendChild(maxSpeedDiv);
    dataElement.appendChild(distanceDiv);
    dataElement.appendChild(durationDiv);
    dataElement.appendChild(dateDiv);

    itemElement.appendChild(mapElement);
    itemElement.appendChild(dataElement);

    const map = L.map(mapID,{
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
    })
    map.setView([firstPosition.latitude, firstPosition.longitude], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 18,
    }).addTo(map);
    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)

})

