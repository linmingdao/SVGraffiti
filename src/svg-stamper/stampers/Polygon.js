import Stamper from './base/Stamper';

export default class Polygon extends Stamper {

    constructor(attrs = {}) {
        super('polygon', {
            'points': '300,100 300,210 170,250',
            ...attrs
        });
    }

    vertexs() {
        const vertexs = Array.from(arguments);
        let pointsChunk = '';
        // vertexs.reduce();
        for (let v of vertexs) {
            pointsChunk += v.join(',');
            pointsChunk += ' ';
        }
        this.attrs['points'] = pointsChunk;
        return this;
    }
}