import {
    gradient,
    reverseColor
} from '../utils';

export default class GradientPicker {

    constructor(container, colors = [], step = 50) {
        this.gradientColors = colors;
        this.step = step;
        this.$container = container;
        this.$container.appendChild(this.getView());
        this.bindEvent();
    }

    getView() {
        const gradientTable = document.createElement('table');
        gradientTable.className = 'color_gradient';
        gradientTable.setAttribute('border', 0);
        gradientTable.setAttribute('cellspacing', 0);
        gradientTable.setAttribute('cellpadding', 0);
        gradientTable.setAttribute('border-collapse', 'collapse');

        let chunk = '<tr>';
        var startColor, endColor;
        for (let i = 0; i < this.gradientColors.length; ++i) {
            if ((i + 1) < this.gradientColors.length) {
                startColor = this.gradientColors[i];
                endColor = this.gradientColors[i + 1];
                chunk += gradient(startColor, endColor, this.step);
            }
        }
        chunk += '</tr>';
        gradientTable.innerHTML = chunk;

        this.gradientTable = gradientTable;

        return gradientTable;
    }

    bindEvent() {
        let lastSelectedTd = null;
        let currentSelectedTd = null;
        this.gradientTable.onmousedown = function (e) {
            if (e.target.tagName === 'TD') {
                if (lastSelectedTd) {
                    lastSelectedTd.style['border-right'] = '0px solid #fff';
                }
                lastSelectedTd = currentSelectedTd = e.target;
                currentSelectedTd.style['border-right'] = `2px solid ${reverseColor(e.target.bgColor)}`;
                console.log(e.target.bgColor);
            }
        }
    }
}