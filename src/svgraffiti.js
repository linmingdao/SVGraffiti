import Layout from './components/layout/layout';
import ToolBar from './components/toolbar/toolbar';

export default class SVGraffiti {
    constructor(config) {
        this.layout(config);
    }

    layout(config) {
        this.layout = new Layout(config);
        // console.log(this.layout.sketchpad());
        // console.log(this.layout.sidebar());
        this.toolbar = new ToolBar(this.layout.sidebar());
    }

    initToolBar() {

    }
}