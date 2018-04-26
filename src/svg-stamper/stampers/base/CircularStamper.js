import Stamper from './Stamper';

export default class CircularStamper extends Stamper {

    constructor(tag = '', attrs = {}) {
        super(tag, {
            'cx': 0,
            'cy': 0,
            ...attrs
        });
    }

    center(x = 0, y = 0) {
        this.attrs['cx'] = x;
        this.attrs['cy'] = y;
        return this;
    }

    centerX(x) {
        this.attrs['cx'] = x;
        return this;
    }

    centerY(y) {
        this.attrs['cy'] = y;
        return this;
    }
}