import Publisher from '../../supports/pubsub/base/publisher';
import FunctionItem from './base/functionItem';
import ResidentFunctionItem from './base/residentFunctionItem';
import PreferenceItem from './base/preferenceItem';
import Items from './items';
import itemList from './itemlist.json';

@Items(itemList)
export default class ToolBar extends Publisher {
    constructor(container) {
        super();

        // 缓存toolbar容器节点
        this.$container = container;

        this.enabledFunction = null;

        // 初始化toolbar的item项
        this.initItems();

        // 将内部item的点击事件委托给容器
        this.$container.onclick = event => this.onClick(event);
    }

    /**
     * 初始化toolbar的内部功能项
     */
    initItems() {
        this.functionsMap = {};
        ToolBar.items.map(cfg => {
            let item;
            if (cfg.type === 'functional') {
                item = new FunctionItem(cfg);
                this.functionsMap[cfg.tag] = item;
                cfg.active && (this.enabledFunction = item);
            } else if (cfg.type === 'memoryFunctional') {
                item = new ResidentFunctionItem(cfg);
            } else {
                item = new PreferenceItem(cfg);
            }
            this.$container.appendChild(item.getView());
        });
    }

    /**
     * 处理toolbar的点击事件
     * @param {Object} event 
     */
    onClick(event) {
        const func = event.target.getAttribute('function');
        const memoryfunc = event.target.getAttribute('memoryfunctional');
        const funcsetting = event.target.getAttribute('funcsetting');
        const globalsetting = event.target.getAttribute('globalsetting');

        if (func) {
            this.switchFunction(func);
            return;
        }

        if (memoryfunc) {
            this.publish('function', memoryfunc);
            return;
        }

        if (funcsetting) {
            const status = event.target.parentNode.getAttribute('status');
            if (status === 'enable') {
                // 发布设置画板属性值的主题消息
                this.publish('funcsetting', funcsetting);
            }
            return;
        }

        if (globalsetting) {
            // 发布设置画板属性值的主题消息
            this.publish('globalsetting', globalsetting);
        }
    }

    switchFunction(func) {
        this.enabledFunction.disable();
        this.functionsMap[func].enable();
        this.enabledFunction = this.functionsMap[func];

        // 发布切换画板功能的主题消息
        this.publish('function', func);
    }
}