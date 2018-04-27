export default function Autowired(params) {
    return function (target) {
        Object.keys(params).forEach(k => {
            target.prototype[k] = params[k];
        });
    };
}