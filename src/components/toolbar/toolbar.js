import Publisher from '../../supports/pubsub/base/publisher';
import Item from './item';
import Items from './items';
import itemList from './itemlist.json';

@Items(itemList)
export default class ToolBar extends Publisher {
    constructor(container) {
        super();

        // 缓存toolbar容器节点
        this.$container = container;

        // 初始化toolbar的item项
        this.initItems();

        // 将内部item的点击事件委托给容器
        this.$container.onclick = event => this.onClick(event);
    }

    /**
     * 初始化toolbar的内部功能项
     */
    initItems() {
        ToolBar.items.map(item => this.$container.appendChild(new Item(item).getView()));
    }

    /**
     * 处理toolbar的点击事件
     * @param {Object} event 
     */
    onClick(event) {
        const func = event.target.getAttribute('function');
        const setting = event.target.getAttribute('setting');

        if (func) {
            // 发布切换画板功能的主题消息
            this.publish('function', func);
            return;
        }

        if (setting) {
            // 发布设置画板属性值的主题消息
            this.publish('setting', setting);
        }
    }
}