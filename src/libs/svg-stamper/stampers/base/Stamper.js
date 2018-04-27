import { createSvg } from './createSvg';

export default class Stamper {
    constructor(tag = '', attrs = {}) {
        this.tag = tag;
        this.attrs = {
            'fill': '#fff',
            'stroke': '#fff',
            'stroke-width': 5,
            'fill-opacity': 1,
            'stroke-opacity': 1,
            ...attrs
        };
        this.stamper = null;
    }

    fill(color = '#000') {
        this.attrs['fill'] = color;
        return this;
    }

    fillOpacity(opacity = 1) {
        this.attrs['fill-opacity'] = opacity;
        return this;
    }

    stroke(color = '#000') {
        this.attrs['stroke'] = color;
        return this;
    }

    strokeWidth(width = 0) {
        this.attrs['stroke-width'] = width;
        return this;
    }

    strokeOpacity(opacity = 1) {
        this.attrs['stroke-opacity'] = opacity;
        return this;
    }

    strokeDash() {
        this.attrs['stroke-dasharray'] = Array.from(arguments).join(',');
        return this;
    }

    /**
     * 设置linecap
     * @param linecap 'butt' || 'round' || 'square'
     */
    strokeLinecap(linecap = this.LINECAP.BUTT) {
        this.attrs['stroke-linecap'] = linecap;
        return this;
    }

    // 创建svg节点对象(雕刻)
    engrave() {
        this.stamper = createSvg(this.tag, this.attrs);
        return this;
    }

    // 获取创建的svg节点
    getStamper() {
        return this.stamper;
    }

    // 将创建出来的svg节点追加到给定的svg舞台(盖章)
    affix(paper) {
        this.engrave();
        paper.appendChild(this.stamper);
        return this;
    }
}

Stamper.LINECAP = {
    'BUTT': 'butt',
    'ROUND': 'round',
    'SQUARE': 'square'
};