import Layout from './components/layout/layout';
import ToolBar from './components/toolbar/ToolBar';
import Settings from './components/settings/settings';
import Sketchpad from './components/sketchpad/Sketchpad';

export default class SVGraffiti {

    constructor(config) {
        this.layout(config);
    }

    layout(config) {
        this.layout = new Layout(config);
        this.toolbar = new ToolBar(this.layout.sidebar());
        this.settings = new Settings(this.layout.settings());
        this.sketchpad = new Sketchpad(this.layout.sketchpad());
    }
}