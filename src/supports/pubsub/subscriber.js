import PubSub from './pubsub';

export default class Subscriber {
    constructor() {
        this.subscribe();
    }

    subscribe() {
        PubSub.addSubscriber(this.__proto__.constructor.topic, this);
    }

}