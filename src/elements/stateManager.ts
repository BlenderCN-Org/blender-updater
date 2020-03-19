import { createFromConfig } from ".";

let active: Element;

export default {
    loadFromConfig: (config: Object) => {
        Object.values(config).forEach(value => {
            createFromConfig(value);
        })
    },
    setActive: (path: String) => {
        console.log(path);
    }
}