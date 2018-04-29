import Subscriber from '../../../src/supports/pubsub/base/subscriber';
import Topics from '../../../src/supports/pubsub/base/topics';

@Topics(['iphone', 'iphone X', 'iphone New'])
export default class SubIphone extends Subscriber {
    constructor(billboard, userId) {
        super();
        this.billboard = billboard;
        this.userId = userId;
    }

    notify(entity) {
        this.updateBillboard(entity);
    }

    updateBillboard(msg) {
        this.billboard.innerHTML = this.billboard.innerHTML + `<p style="background-color:#e7f1d5;">${this.userId}收到消息：${msg}</p>`;
    }
}