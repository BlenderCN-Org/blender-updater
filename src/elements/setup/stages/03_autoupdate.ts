import { InputDirectory } from "../../input"

let initialized = false;
let root = document.createElement("setup-stage-wrapper");
let cb: Function;

const init = (wrapper: HTMLElement) => {
    initialized = true;

    wrapper.appendChild(root);

    root.innerHTML = "should i auto update?";



};

export default {
    name: "03",
    show: (wrapper: HTMLElement, _cb: Function) => {
        cb = _cb;
        if (!initialized) init(wrapper);
        root.style.display = "block";

    },
    hide: () => {
        root.style.display = "none";
    }
}