/**
 * 主题订阅发布中心
 */
export default class PubSub {

    // 缓存主题和主题的订阅者列表
    static topics = {};

    /**
     * 发布主题消息
     * @param {String} topic 主题
     * @param {*} entity 消息体 
     */
    static publish(topic, entity) {
        console.log(`PubSub发布了消息:【${topic}】,消息内容:【${entity}】`);
        if (!PubSub.topics[topic]) return;

        // 获取该主题的订阅者列表
        const subscribers = PubSub.topics[topic];

        // 向所有该主题的订阅者发送主题消息
        for (let subscriber of subscribers) {
            subscriber.notify && subscriber.notify(topic, entity);
        }
    }

    /**
     * 一次登记一个主题
     * @param {String} topic 
     */
    static registerTopic(topic) {
        const topics = PubSub['topics'];
        !topics[topic] && (topics[topic] = []);
    }

    /**
     * 同时登记多个主题
     * @param {Array} topics 
     */
    static registerTopics(topics = []) {
        topics.forEach(topic => {
            this.registerTopic(topic);
        });
    }

    /**
     * 添加主题订阅者
     * @param {String} topic 主题
     * @param {Object} subscriber 实现了notify接口的订阅者
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