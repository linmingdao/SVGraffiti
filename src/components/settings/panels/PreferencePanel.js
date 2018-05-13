import Publisher from '../../../supports/pubsub/base/publisher';

export default class PreferencePanel extends Publisher {

    constructor(container, template) {
        super();

        // 创建视图
        this.container = container;
        this.$view = document.createElement('div');
        this.$view.className = `setting_item`;
        this.$view.innerHTML = template;
        this.container.appendChild(this.$view);

        // 创建交互
        this.createInteraction && this.createInteraction(this.$view);
    }

    addWatch(attrs = {}) {
        Object.keys(attrs).forEach(name => {
            let value = attrs[name];
            Object.defineProperty(this, name, {
                configurable: false,
                enumerable: true,
                set: function (newVal) {
                    if (value !== newVal) {
                        value = newVal;
                        this.respond && this.respond();
                    }
                },
                get: function () {
                    return value;
                }
            });
        });

        this.createReference && this.createReference();
        this.respond && this.respond();

        return this;
    }

    show() {
        this.$view.style.display = 'block';
        return this;
    }

    hide() {
        this.$view.style.display = 'none';
        return this;
    }

    getView() {
        return this.$view;
    }
}