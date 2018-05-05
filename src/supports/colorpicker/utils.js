/**
 * 颜色#FF00FF格式转为Array(255,0,255)
 * @param {String} color 
 */
export function color2rgb(color) {
    var r = parseInt(color.substr(1, 2), 16);
    var g = parseInt(color.substr(3, 2), 16);
    var b = parseInt(color.substr(5, 2), 16);
    return new Array(r, g, b);
}

/**
 * 颜色Array(255,0,255)格式转为#FF00FF
 * @param {String} rgb 
 */
export function rgb2color(rgb) {
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
export function gradient(colorStart, colorEnd, step = 50) {
    var result = "";
    var Gradient = new Array(3);
    var A = color2rgb(colorStart);
    var B = color2rgb(colorEnd);
    for (var N = 0; N <= step; N++) {
        for (var c = 0; c < 3; c++) { // RGB通道分别进行计算
            Gradient[c] = A[c] + (B[c] - A[c]) / step * N;
        }
        result += `<td border="0" cellpadding="0" cellspacing="0" height="35" width="100" bgcolor="${rgb2color(Gradient)}"></td>`;
    }
    return result;
}

export function reverseColor(OldColorValue) {
    var OldColorValue = "0x" + OldColorValue.replace(/#/g, "");
    var str = "000000" + (0xFFFFFF - OldColorValue).toString(16);
    return `#${str.substring(str.length - 6, str.length)}`;
}