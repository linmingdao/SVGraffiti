import Subscriber from '../../../src/supports/pubsub/base/subscriber';
import Topics from '../../../src/supports/pubsub/base/topics';

@Topics(['sonybankrupt'])
export default class SubSonyBankrupt extends Subscriber {
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