export default class Item {
    constructor(config) {
        this.config = config;
        this.$item = document.createElement('div');
        this.active = config.active;
        this.active ? this.enable() : this.disable();
        this.setTag();
    }

    setTag() {
        this.$item.setAttribute('function', this.config.tag);
        this.config.cornermark !== false && (this.$item.innerHTML = `<div setting="${this.config.tag}" class="cornermark"></div>`);
    }

    enable() {
        this.active = true;
        this.$item.className = `function active`;
        this.$item.style = `background-image: url(${this.config.icon_active});`;
    }

    disable() {
        this.active = false;
        this.$item.className = `function`;
        this.$item.style = `background-image: url(${this.config.icon});`;
    }

    getView() {
        return this.$item;
    }
}