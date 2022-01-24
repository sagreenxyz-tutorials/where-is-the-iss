        // Making a map and tiles
        const myMap = L.map('issMap').setView([0, 0], 1);
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap.org</a> Contributors';
        
        const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileURL, {attribution})
        tiles.addTo(myMap);


        // Making a marker with a custom icon
        const issIcon = L.icon({
          iconUrl: './assets/iss.svg',
          iconSize: [50, 32],
          iconAnchor: [25, 16]
        });

        const marker = L.marker([0, 0], {icon: issIcon}).addTo(myMap);
        const issAPIURL = 'https://api.wheretheiss.at/v1/satellites/25544';

        let firstTime = true;

        async function getISS() {
            const response = await fetch(issAPIURL);
            const data = await response.json();
            const {latitude, longitude} = data // JavaScript destructuring technique (object or array)
            marker.setLatLng([latitude, longitude]);
            if(firstTime){
              myMap.setView([latitude, longitude], 2);
              firstTime = false;
            }
            document.getElementById('lat').textContent = latitude.toFixed(3);
            document.getElementById('lon').textContent = longitude.toFixed(3);
        }

        setInterval(getISS, 1000);