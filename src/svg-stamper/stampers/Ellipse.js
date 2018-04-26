import CircularStamper from './base/CircularStamper';

export default class Ellipse extends CircularStamper {

    constructor(attrs = {}) {
        super('ellipse', {
            'cx': 10,
            'cy': 10,
            'rx': 50,
            'ry': 70,
            ...attrs
        });
    }

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