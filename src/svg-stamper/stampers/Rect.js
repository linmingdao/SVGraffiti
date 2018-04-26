import Stamper from './base/Stamper';

export default class Rect extends Stamper {

    constructor(attrs = {}) {
        super('rect', {
            'x': 0,
            'y': 0,
            'width': 10,
            'height': 10,
            ...attrs
        });
    }

    start(x = 0, y = 0) {
        this.attrs['x'] = x;
        this.attrs['y'] = y;
        return this;
    }
    // startX(x) {
    //     return this;
    // }
    // startY(y) {
    //     return this;
    // }

    size(w = 10, h = 10) {
        this.attrs['width'] = w;
        this.attrs['height'] = h;
        return this;
    }
    // width(w) {
    //     this.attrs['width'] = w;
    //     return this;
    // }
    // height(h) {
    //     this.attrs['height'] = h;
    //     return this;
    // }

    radius(rx, ry) {
        this.attrs['rx'] = rx;
        this.attrs['ry'] = ry;
        return this;
    }

    radiusX(rx) {
        this.attrs['rx'] = rx;
        return this;
    }

    radiusY(ry) {
        this.attrs['ry'] = ry;
        return this;
    }
}