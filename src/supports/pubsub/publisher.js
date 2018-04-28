import PubSub from './pubsub';

export default class Publisher {
    publish(entity) {
        PubSub.publish(this.__proto__.constructor.topic, entity);
    }
}