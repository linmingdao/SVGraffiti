import Publisher from '../../supports/pubsub/base/publisher';
import FunctionItem from './base/FunctionItem';
import ResidentFunctionItem from './base/ResidentFunctionItem';
import GlobalPreferenceItem from './base/GlobalPreferenceItem';
import { Items } from './decorators';
import configuration from './configuration.json';

const Constructors = {
    'function': FunctionItem,
    'resident_function': ResidentFunctionItem,
    'global_preference': GlobalPreferenceItem
};

const createItem = cfg => {
    const constructor = Constructors[cfg.type];
    if (constructor) {
        return new constructor(cfg);
    } else {
        throw new Error(`unsupported type:${cfg.type}`);
    }
}

@Items(configuration)
export default class ToolBar extends Publisher {
    constructor(container) {
        super();

        // 缓存toolbar容器节点
        this.$container = container;

        this.activedItem = null;

        // 初始化toolbar的item项
        this.initItems();

        // 将内部item的点击事件委托给容器
        this.$container.onclick = event => this.onClick(event);
    }

    /**
     * 初始化toolbar功能项列表
     */
    initItems() {
        this.functions = {};
        ToolBar.items.map(cfg => {
            const item = createItem(cfg);
            if (item) {
                if (cfg.type === 'function') {
                    this.functions[cfg.tag] = item;
                    cfg.active && (this.activedItem = item);
                }
                this.$container.appendChild(item.getView());
            }
        });
    }

    /**
     * 处理toolbar的点击事件
     * @param {Object} event 
     */
    onClick(event) {
        const target = event.target;

        const func = target.getAttribute('function');
        if (func) {
            this.switchFunction(func);
            return;
        }

        const residentFunc = target.getAttribute('resident_function');
        if (residentFunc) {
            this.publish('resident_function', residentFunc);
            return;
        }

        const localPreference = target.getAttribute('local_preference');
        if (localPreference) {
            const status = event.target.parentNode.getAttribute('status');
            if (status === 'enabled') {
                // 发布设置画板属性值的主题消息
                this.publish('local_preference', localPreference);
            }
            return;
        }

        const globalPreference = target.getAttribute('global_preference');
        if (globalPreference) {
            // 发布设置画板属性值的主题消息
            this.publish('global_preference', globalPreference);
        }
    }

    switchFunction(func) {
        this.activedItem.disable();
        this.functions[func].enable();
        this.activedItem = this.functions[func];

        // 发布切换画板功能的主题消息
        this.publish('function', func);
    }
}