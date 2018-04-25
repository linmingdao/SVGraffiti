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

// 创建svg circle对象
// sector = createSvg('circle', {
//     'cx': center.x,
//     'cy': center.y,
//     'r': sectorR,
//     'fill': color
// })

export {
    createSvg
}