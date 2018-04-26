import CircularStamper from './base/CircularStamper';

export default class Circle extends CircularStamper {

    constructor(attrs = {}) {
        super('circle', {
            'cx': 10,
            'cy': 10,
            'r': 10,
            ...attrs
        });
    }

    radius(r) {
        this.attrs['r'] = r;
        return this;
    }
}