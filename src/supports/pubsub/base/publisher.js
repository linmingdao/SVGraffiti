import PubSub from '../pubsub';

/**
 * 主题消息发布者
 */
export default class Publisher {
    publish(topic, entity) {
        PubSub.publish(topic, entity);
    }
}