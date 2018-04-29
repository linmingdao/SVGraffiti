import PubSub from '../../src/supports/pubsub/pubsub';
import SubIphone from './subscribers/SubIphone';
import SubSonyBankrupt from './subscribers/SubSonyBankrupt';
import PubIphone from './publishers/PubIphone';
import PubSonyBankrupt from './publishers/PubSonyBankrupt';
import Intermediary from './intermediary/intermediary';

const subsMap = {
    'sonybankrupt': SubSonyBankrupt,
    'iphone': SubIphone,
    'iphone X': SubIphone,
    'iphone New': SubIphone
};
const pubsMap = {
    'sonybankrupt': PubSonyBankrupt,
    'iphone X': PubIphone,
    'iphone New': PubIphone
};

// 获取公告牌节点
const billboard = document.querySelector('.billboard');

// 获取订阅者节点
const subscribers = document.querySelectorAll('.subscriber');
for (let sub of subscribers) {
    const topic = sub.getAttribute('topic');
    const userIds = {
        'sonybankrupt': '【索尼仇家】',
        'iphone X': '【果粉一号】',
        'iphone New': '【果粉二号】'
    };
    let s;
    sub.onclick = function () {
        !s && (billboard.innerHTML = billboard.innerHTML + `<p style="background-color:#fff;">${userIds[topic]}订阅了频道：${topic}</p>`);
        !s && (s = new subsMap[topic](billboard, userIds[topic]));
    };
}

// 获取发布者节点
const publishers = document.querySelectorAll('.publisher');
for (let pub of publishers) {
    const topic = pub.getAttribute('topic');
    const msg = {
        'sonybankrupt': '索尼还未破产哟！',
        'iphone X': 'iphone X不会降价！！！！',
        'iphone New': '苹果未公布新品发布会时间！'
    };
    let p;
    pub.onclick = function () {
        !p && (p = new pubsMap[topic]());
        billboard.innerHTML = billboard.innerHTML + `<p style="background-color:#fff;">【内部系统】发布消息：${msg[topic]}</p>`;
        p.publish(topic, msg[topic]);
    };
}

const intermediaryPublisher = document.querySelector('.intermediary_publisher');
const intermediary = new Intermediary(billboard, '【国产分子】');
billboard.innerHTML = billboard.innerHTML + `<p style="background-color:#fff;">【国产分子】订阅了频道：MTK</p>`;
intermediaryPublisher.onclick = function () {
    intermediary.publish('MTK', '支持国产手机！');
}