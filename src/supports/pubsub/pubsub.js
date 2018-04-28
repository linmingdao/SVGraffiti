export default class PubSub {

    // 缓存主题和主题的订阅者列表
    static topics = {};

    /**
     * 发布主题消息
     * @param topic 主题
     * @param entity 消息体 
     */
    static publish(topic, entity) {
        if (!PubSub.topics[topic]) {
            return;
        }

        const subscribers = PubSub.topics[topic];

        // 向所有该主题的订阅者发送主题消息
        for (let subscriber of subscribers) {
            subscriber.notify && subscriber.notify(entity)
        }
    }

    static registerTopic(topic) {
        const topics = PubSub['topics'];
        !topics[topic] && (topics[topic] = []);
    }

    /**
     * 添加主题订阅者
     * @param {string} topic 主题
     * @param {object} subscriber 实现了notify接口的订阅者
     */
    static addSubscriber(topic, subscriber) {
        const topics = PubSub['topics'];
        !topics[topic] && (topics[topic] = []);

        // 将该主题的订阅者登记到对应的主题
        topics[topic].push(subscriber);
    }

    // /**
    //  * 根据token删除对应的订阅者
    //  * @param token 
    //  */
    // static removeSubscriber(subscriber) {
    //     var subs = [];
    //     // 遍历所有主题下的订阅者列表，将对应订阅者删除
    //     const topics = PubSub.topics;
    //     Object.keys(topics).forEach(topic => {
    //         topics[topic]
    //     });
    //     for (let topic in topics) {
    //         for (let i = 0; i < topics[topic].length; ++i) {
    //             if (token === topics[topic][i].token) {
    //                 break;
    //             }
    //         }
    //         subs.push(topics[topic].splice(i, 1));
    //     }
    //     return subs;
    // }
}