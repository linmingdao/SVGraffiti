import SubScatterer from '../../../src/supports/pubsub/base/subscatterer';
import Topics from '../../../src/supports/pubsub/base/topics';

@Topics(['MTK'])
export default class Intermediary extends SubScatterer {
    constructor(billboard, userId) {
        super();
        this.billboard = billboard;
        this.userId = userId;
    }

    notify(entity) {
        this.updateBillboard(entity);
    }

    publish(topic, entity) {
        this.billboard.innerHTML = this.billboard.innerHTML + `<p style="background-color:#fff;">【国产分子】发布消息：支持国产手机！</p>`;
        super.publish(topic, entity);
    }

    updateBillboard(msg) {
        this.billboard.innerHTML = this.billboard.innerHTML + `<p style="background-color:#e7f1d5;">${this.userId}收到消息：${msg}</p>`;
    }
}