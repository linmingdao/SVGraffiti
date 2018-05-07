import ColorPicker from './settings/ColorPicker';
import Line from './settings/line/Line';

export default class Settings {
    constructor(container) {
        // this.colorPicker = new ColorPicker(container);
        this.line = new Line(container);
    }
}