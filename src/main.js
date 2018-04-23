import './style/index.scss';
import Snap from 'snapsvg';

const svgraffiti_panel = document.getElementById("svgraffiti_panel")
const h = svgraffiti_panel.clientHeight
const w = svgraffiti_panel.clientWidth

var svg = Snap(w, h);
svgraffiti_panel.appendChild(svg.node);
