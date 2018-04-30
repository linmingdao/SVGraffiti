export default class FunctionItem {
    constructor(config) {
        this.config = config;

        this.type = config.type;
        this.tag = config.tag;
        this.active = config.active;

        this.$item = document.createElement('div');

        this.init();
    }

    init() {
        this.$item.setAttribute('function', this.tag);

        // 设置左上角功能参数设置按钮
        this.config.cornermark && (this.$item.innerHTML = `<div funcsetting="${this.tag}" class="cornermark"></div>`);

        // 设置是否出于激活态
        this.active ? this.enable() : this.disable();
    }

    enable() {
        this.active = true;
        this.$item.setAttribute('status', 'enable');
        this.$item.className = `function active`;
        this.$item.style = `background-image: url(${this.config.icon_active});`;
    }

    disable() {
        this.active = false;
        this.$item.setAttribute('status', 'disable');
        this.$item.className = `function`;
        this.$item.style = `background-image: url(${this.config.icon});`;
    }

    getView() {
        return this.$item;
    }
}