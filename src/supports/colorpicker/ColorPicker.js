import './colorpicker.scss';
import template from './template.html';
import configuration from './configuration.json';

/**
 * 颜色#FF00FF格式转为Array(255,0,255)
 * @param {String} color 
 */
function color2rgb(color) {
    var r = parseInt(color.substr(1, 2), 16);
    var g = parseInt(color.substr(3, 2), 16);
    var b = parseInt(color.substr(5, 2), 16);
    return new Array(r, g, b);
}

/**
 * 颜色Array(255,0,255)格式转为#FF00FF
 * @param {String} rgb 
 */
function rgb2color(rgb) {
    var s = "#";
    for (var i = 0; i < 3; i++) {
        var c = Math.round(rgb[i]).toString(16);
        if (c.length == 1)
            c = '0' + c;
        s += c;
    }
    return s.toUpperCase();
}

/**
 * 生成渐变(gradient算法)
 * @param {String} colorStart 
 * @param {String} colorEnd 
 * @param {Number} step 
 */
function gradient(colorStart, colorEnd, step = 50) {
    var result = "";
    var Gradient = new Array(3);
    var A = color2rgb(colorStart);
    var B = color2rgb(colorEnd);
    for (var N = 0; N <= step; N++) {
        for (var c = 0; c < 3; c++) { // RGB通道分别进行计算
            Gradient[c] = A[c] + (B[c] - A[c]) / step * N;
        }
        result += `<td border="0" cellpadding="0" cellspacing="0" height="40" width="100" bgcolor="${rgb2color(Gradient)}"></td>`;
    }
    return result;
}

export default class ColorPicker {

    constructor(container) {
        this.container = container;
        this.render();
    }

    render() {
        this.container.innerHTML = template;
        this.root = this.container.querySelector('.color_picker_box');

        this.createPresetsPicker();
        this.createGradientPicker();
        this.createLightPicker();
    }

    createPresetsPicker() {
        this.presetsPicker = this.root.querySelector('.color_presets');
        const presetColors = configuration.preset_colors || [];

        let chunk = '';
        presetColors.forEach(colors => {
            chunk += `<tr>`;
            colors.forEach(color => {
                chunk += `<td height="30" width="30" bgcolor="${color}"></td>`;
            })
            chunk += `</tr>`;
        });

        this.presetsPicker.innerHTML = chunk;
    }

    createGradientPicker() {
        this.gradientPicker = this.root.querySelector('.color_gradient');
        const gradientColors = configuration.gradient_colors || [];

        let chunk = '<tr>';
        var startColor, endColor;
        for (let i = 0; i < gradientColors.length; ++i) {
            if ((i + 1) < gradientColors.length) {
                startColor = gradientColors[i];
                endColor = gradientColors[i + 1];
                chunk += gradient(startColor, endColor, 40);
            }
        }
        chunk += '</tr>';

        this.gradientPicker.innerHTML = chunk;
    }

    createLightPicker() {
        this.lightPicker = this.root.querySelector('.light_picker');

        let chunk = '<tr>';
        chunk += gradient('#000000', '#ffffff', 100);
        chunk += '</tr>';

        this.lightPicker.innerHTML = chunk;
    }
}