export default class FunctionItem {
    constructor(config) {
        this.config = config;

        this.type = config.type;
        this.tag = config.tag;
        this.active = config.active;

        this.init();
    }

    init() {
        this.$item = document.createElement('div');
        this.$item.className = 'item';

        this.$content = document.createElement('a');
        this.$content.setAttribute('function', this.tag);
        this.$content.className = 'content';
        this.$item.appendChild(this.$content);

        // 左上角角标
        if (this.config['local_preference']) {
            this.$localPreference = document.createElement('a');
            this.$localPreference.setAttribute('local_preference', this.tag);
            this.$localPreference.className = 'cornermark';
            this.$item.appendChild(this.$localPreference);
        }

        // 设置是否出于激活态
        this.active ? this.enable() : this.disable();
    }

    enable() {
        this.active = true;
        this.$item.setAttribute('status', 'enabled');
        this.$item.className = `item enabled`;
        this.$content.style.backgroundImage = `url(${this.config.icon_active})`;
    }

    disable() {
        this.active = false;
        this.$item.setAttribute('status', 'disabled');
        this.$item.className = `item`;
        this.$content.style.backgroundImage = `url(${this.config.icon})`;
    }

    getView() {
        return this.$item;
    }
}