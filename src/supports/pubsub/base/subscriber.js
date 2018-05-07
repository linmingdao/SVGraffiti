import PubSub from '../pubsub';

const addSubscribe = (topics = [], context) => {
    topics.forEach(topic => {
        PubSub.addSubscriber(topic, context);
    });
}

/**
 * 主题订阅者
 */
export default class Subscriber {
    constructor() {
        addSubscribe(this.__proto__.constructor.topics, this);
    }

    subscribe(topic) {
        PubSub.addSubscriber(topic, this);
    }
}