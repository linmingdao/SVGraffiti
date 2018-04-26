import Stamper from './base/Stamper';

export default class Line extends Stamper {

    constructor(attrs = {}) {
        super('line', {
            'x1': 0,
            'y1': 0,
            'x2': 10,
            'y2': 10,
            ...attrs
        });
    }

    start(x = 0, y = 0) {
        this.attrs['x1'] = x;
        this.attrs['y1'] = y;
        return this;
    }
    // startX(x) {
    //     return this;
    // }
    // startY(y) {
    //     return this;
    // }

    end(x = 10, y = 10) {
        this.attrs['x2'] = x;
        this.attrs['y2'] = y;
        return this;
    }
    // endX(x = 10) {
    //     return this;
    // }
    // endY(y = 10) {
    //     return this;
    // }
}