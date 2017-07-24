// Application Dependencies

import 'leaflet';
import '!!style-loader!css-loader!leaflet/dist/leaflet.css';
L.Icon.Default.imagePath = '.';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
