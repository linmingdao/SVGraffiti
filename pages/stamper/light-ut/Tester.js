export default class Tester {

    isTest(func) {
        return !!func['test'];
    }

    run() {
        for (let k in this) {
            if (this.isTest(this[k])) {
                this[k].call(this);
            }
        }
    }
}