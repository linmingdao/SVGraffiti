import {
    Circle
} from '../../../../supports/svg-stamper/stampers-mixin';
import template from './template.html';
import Slider from '../../../../supports/slider/Slider';
import PreferencePanel from '../PreferencePanel';

export default class EraserPreferencesPanel extends PreferencePanel {

    constructor(container) {
        super(container, template);
        this.addWatch({
            'depth': 1,
            'size': 40
        });
    }

    getPaper() {
        !this.paper && (this.paper = this.getView().querySelector('.eraser_paper'));
        return this.paper;
    }

    respond() {
        this.preview && this.preview.remove();
        this.preview = new Circle({
                cx: 140,
                cy: 100,
                r: this.size
            })
            .fill('#fff')
            .strokeWidth(0)
            .fillOpacity(this.depth)
            .affix(this.getPaper());

        this.publish('set_preference', {
            from: 'EraserPreferencesPanel',
            depth: this.depth,
            size: this.size
        });
    }

    createInteraction() {
        const __self = this;

        // range: eraser_size
        this.strokeWidthRange = this.container.querySelector('.eraser_size_range');
        this.strokeWidthRange.oninput = function (e) {
            __self.size = this.value;
        }
        // range: eraser_depth
        this.fillOpacityRange = this.container.querySelector('.eraser_depth_range');
        this.fillOpacityRange.oninput = function (e) {
            __self.depth = this.value;
        }
    }
}