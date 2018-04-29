import PubSub from '../pubsub';
import Subscriber from './subscriber';

/**
 * 主题订阅者 and 主题消息发布者
 */
export default class SubScatterer extends Subscriber {
    publish(topic, entity) {
        PubSub.publish(topic, entity);
    }
}