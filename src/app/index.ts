import '../styles/style.scss';

// Need for trigger HMR refresh index.html
if (process.env.NODE_ENV !== 'production') {
    //require('file-loader!../index.html');
}

export default class Main {
    appElem: HTMLElement;
    map: L.Map;

    constructor() {
        console.log('Webpack Typescript Scss starter launched !');

        this.appElem = document.getElementById('app');
        let title: HTMLElement = document.createElement('h1');

        let data = require('../assets/datas/data.json');
        this.appElem.innerHTML = `
            <h1>${data.title}</h1>
            <div>
                <img src="${require('../assets/imgs/webpack.svg')}">
                <img src="./assets/imgs/ts.svg">
                <img src="${require('../assets/imgs/sass.svg')}">
            </div>
            <p>Open your console to see your printed message from the index.ts file</p>
            <br />
            <p>Leaflet vendor example:</p>
            <div id="map"></div>
        `;

        this.initMap();
    }

    private initMap() {
        this.map = new L.Map("map");
        this.map.setView([45.769862657803, 3.1011480992265485], 13);
        L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            opacity: 0.75,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

    }
}

let start = new Main();
