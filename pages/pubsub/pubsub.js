import PubSub from '../../src/supports/pubsub/pubsub';
import SubIphone from './SubIphone';
import SubSonyBankrupt from './SubSonyBankrupt';
import PubIphone from './PubIphone';
import PubSonyBankrupt from './PubSonyBankrupt';

const billboard = document.querySelector('.billboard');

const subsMap = {
    'sonybankrupt': SubSonyBankrupt,
    'iphone': SubIphone
};

const pubsMap = {
    'sonybankrupt': PubSonyBankrupt,
    'iphone X': PubIphone,
    'iphone New': PubIphone
};

const subscribers = document.querySelectorAll('.subscriber');
for (let sub of subscribers) {
    const topic = sub.getAttribute('topic');
    let s;
    sub.onclick = function () {
        if (!s) {
            s = new subsMap[topic](billboard);
        }
    };
}

const publishers = document.querySelectorAll('.publisher');
for (let pub of publishers) {
    const topic = pub.getAttribute('topic');
    let p;
    pub.onclick = function () {
        if (!p) {
            p = new pubsMap[topic]();
        }
        switch (topic) {
            case 'sonybankrupt':
                p.publish('索尼还未破产哟！');
                break;
            case 'iphone X':
                p.publish('iphone X不会降价！！！！');
                break;
            case 'iphone New':
                p.publish('苹果官方还未公布新品发布会时间呀！');
                break;
            default:
                ;
        }
    };
}