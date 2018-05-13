import ColorPicker from '../../../supports/colorpicker/ColorPicker';
import Publisher from '../../../supports/pubsub/base/publisher';

export default class ColorPickerPanel extends Publisher {

    constructor(container) {
        super();
        this.container = container;
        this.createInteraction();
    }

    createInteraction() {
        this.$view = document.createElement('div');
        this.$view.className = `setting_item`;

        this.colorPicker = new ColorPicker({
            el: this.$view,
            components: ['presets', 'gradient', 'depth', 'operator']
        }).onColorChange(color => {
            this.publish('set_preference', {
                from: 'ColorPickerPanel',
                color: color
            });
        })

        this.container.appendChild(this.$view);
    }

    show() {
        this.$view.style.display = 'block';
        return this;
    }

    hide() {
        this.$view.style.display = 'none';
        return this;
    }

    getView() {
        return this.$view;
    }
}