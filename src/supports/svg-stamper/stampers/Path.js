import Stamper from './base/Stamper';

export default class Path extends Stamper {

    constructor(attrs = {}) {
        super('path', {
            'd': 'M250 150 L150 350 L350 350 Z',
            ...attrs
        });
    }

    d(chunk) {
        this.attrs['d'] = chunk;
        return this;
    }
}