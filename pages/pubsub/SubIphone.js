import Subscriber from '../../src/supports/pubsub/subscriber';
import Topic from '../../src/supports/pubsub/decorators/topic';

@Topic('iphone')
export default class SubIphone extends Subscriber {
    constructor(billboard) {
        super();
        this.billboard = billboard;
        this.user = `iphone手机用户${Date.now()}`;
    }

    notify(entity) {
        this.updateBillboard(entity);
    }

    updateBillboard(msg) {
        this.billboard.innerHTML = this.billboard.innerHTML + `<p>${this.user}收到消息：${msg}</p>`;
    }
}