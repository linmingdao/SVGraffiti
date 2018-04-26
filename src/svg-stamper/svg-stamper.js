const createSvg = function (tag, attrs = {}) {
    if (!document.createElementNS) {
        return
    }
    let svgObj = document.createElementNS('http://www.w3.org/2000/svg', tag)
    for (var key in attrs) {
        switch (key) {
            case 'xlink:href': // 文本路径添加属性特有
                svgObj.setAttributeNS('http://www.w3.org/1999/xlink', key, attrs[key])
                break
            default:
                svgObj.setAttribute(key, attrs[key])
        }
    }
    return svgObj
}

this.$svg = SvgUtils.createSvg('svg', {
    width: w,
    height: h
});
this.$svg.style = 'background-color:#555';

const circle = SvgUtils.createSvg('circle', {
    'cx': 10,
    'cy': 10,
    'r': 10,
    'fill': '#fff'
})
const line = SvgUtils.createSvg('line', {
    'x1': 50,
    'y1': 50,
    'x2': 80,
    'y2': 80,
    'stroke': '#fff'
})
const rect = SvgUtils.createSvg('rect', {
    'x': 100,
    'y': 100,
    'rx': 10,
    'ry': 10,
    'width': 100,
    'height': 100,
    'stroke-width': 5,
    'stroke': 'pink',
    'fill': '#fff',
    // 'fill-opacity': 0.5,
    // 'stroke-opacity': 0.5
})
const ellipse = SvgUtils.createSvg('ellipse', {
    'cx': 150,
    'cy': 50,
    'rx': 50,
    'ry': 10,
    'fill': 'pink'
})
const polygon = SvgUtils.createSvg('polygon', {
    'points': '300,100 300,210 170,250',
    'fill': 'green',
    'stroke-width': 2,
    'stroke': 'black'
})
const polyline = SvgUtils.createSvg('polyline', {
    'points': '0,0 0,20 20,20 20,40 40,40 40,60',
    'stroke-width': 10,
    'fill': 'none',
    'stroke': 'red'
})
this.$svg.appendChild(circle)
this.$svg.appendChild(line)
this.$svg.appendChild(rect)
this.$svg.appendChild(ellipse)
this.$svg.appendChild(polygon)
this.$svg.appendChild(polyline)