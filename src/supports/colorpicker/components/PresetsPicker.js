import {
    reverseColor
} from '../utils';

export default class PresetsPicker {

    constructor(container, colors) {
        this.$container = container;
        this.presetColors = colors;
        this.$container.appendChild(this.getView());
        this.bindClick();
    }

    getView() {
        const presetsTable = document.createElement('table');
        presetsTable.className = 'color_presets';
        presetsTable.style.border = '2px solid #fff';
        presetsTable.setAttribute('cellspacing', 0);
        presetsTable.setAttribute('cellpadding', 0);

        let chunk = '';
        this.presetColors.forEach(colors => {
            chunk += `<tr>`;
            colors.forEach(color => {
                chunk += `<td height="30" style="border:2px solid #fff;" width="30" bgcolor="${color}"></td>`;
            });
            chunk += `</tr>`;
        });
        presetsTable.innerHTML = chunk;

        this.presetsTable = presetsTable;

        return this.presetsTable;
    }

    bindClick() {
        let lastSelectedTd = null;
        let currentSelectedTd = null;
        this.presetsTable.onmousedown = function (e) {
            if (e.target.tagName === 'TD') {
                if (lastSelectedTd) {
                    lastSelectedTd.style.border = '2px solid #fff';
                }
                lastSelectedTd = currentSelectedTd = e.target;
                currentSelectedTd.style.border = '2px solid red';
                console.log(e.target.bgColor);
            }
        }
    }
}