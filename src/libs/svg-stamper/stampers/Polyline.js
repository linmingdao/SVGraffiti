import Stamper from './base/Stamper';

export default class Polyline extends Stamper {

    constructor(attrs = {}) {
        super('polyline', {
            'points': '300,100 300,210 170,250',
            'fill': 'none',
            ...attrs
        });
    }

    vertexs() {
        const vertexs = Array.from(arguments);
        let pointsChunk = '';
        for (let v of vertexs) {
            pointsChunk += v.join(',');
            pointsChunk += ' ';
        }
        this.attrs['points'] = pointsChunk;
        return this;
    }
}