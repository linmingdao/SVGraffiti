import * as Stampers from '../../../src/libs/svg-stamper/stampers-mixin';
import createSvg from '../../../src/libs/svg-stamper/stampers/base/createSvg';
import Tester from './Tester';
import Autowired from './decorators/autowired';

@Autowired({
    Stampers,
    createSvg,
    container: document.querySelector('#container')
})
export default class StamperTester extends Tester {
    paper() {
        const paper = this.createSvg('svg', {
            width: 300,
            height: 300
        });
        paper.style = 'border-radius:5px;border:10px solid #fff;margin:8px;background-color:#555;cursor:pointer;';
        this.container.appendChild(paper);

        return paper;
    }
}