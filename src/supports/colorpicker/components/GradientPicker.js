import {
    fullHexColor,
    gradient,
    reverseColor
} from '../utils';

export default class GradientPicker {

    constructor(container, colors = [], step = 100) {
        this.$container = container;
        this.gradient(colors, step);
    }

    gradient(colors = [], step = 50) {
        this.gradientColors = colors;
        this.step = step;
        this.$container.appendChild(this.getView());
        this.bindEvent();
    }

    reGradient(colors = [], step = 100) {
        this.gradientColors = colors;
        this.step = step;
        // 生成新的渐变器
        this.gradientTr.innerHTML = this.getGradientChunk();
    }

    getGradientChunk() {
        let chunk = '';
        var startColor, endColor;
        for (let i = 0; i < this.gradientColors.length; ++i) {
            if ((i + 1) < this.gradientColors.length) {
                startColor = this.gradientColors[i];
                endColor = this.gradientColors[i + 1];
                chunk += gradient(startColor, endColor, this.step);
            }
        }
        return chunk;
    }

    getView() {
        const gradientTable = document.createElement('table');
        gradientTable.className = 'color_gradient';

        gradientTable.setAttribute('border', 0);
        gradientTable.setAttribute('cellspacing', 0);
        gradientTable.setAttribute('cellpadding', 0);
        gradientTable.setAttribute('border-collapse', 'collapse');

        let chunk = this.getGradientChunk();
        const gradientTr = document.createElement('tr');
        gradientTr.innerHTML = chunk;

        this.gradientTable = gradientTable;
        this.gradientTr = gradientTr;
        this.gradientTable.appendChild(this.gradientTr);

        return this.gradientTable;
    }

    bindEvent() {
        this.lastSelectedTd = null;
        this.currentSelectedTd = null;
        this.gradientTable.onmousedown = e => {
            if (e.target.tagName === 'TD') {
                if (this.lastSelectedTd) {
                    this.lastSelectedTd.style['border-right'] = '0px solid #fff';
                }
                this.lastSelectedTd = this.currentSelectedTd = e.target;
                this.currentSelectedTd.style['border-right'] = `2px solid ${reverseColor(e.target.bgColor)}`;
                this.colorChangeCallback && this.colorChangeCallback(fullHexColor(e.target.bgColor));
            }
        }
    }

    reset() {
        this.currentSelectedTd.style['border-right'] = '0px solid #fff';
    }

    onColorChange(callback) {
        this.colorChangeCallback = callback;
    }
}