import ColorPicker from '../../../supports/colorpicker/ColorPicker';

export default class ColorPickerPanel {

    constructor(container) {
        this.container = container;
        this.init(container);
    }

    init() {
        this.$view = document.createElement('div');
        this.$view.className = `setting_item`;

        this.clrPicker = new ColorPicker({
            el: this.$view,
            components: ['presets', 'gradient', 'depth', 'operator']
        });

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