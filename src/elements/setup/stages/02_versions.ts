import { InputDirectory, InputButton } from "../../input"

let initialized = false;
let root = document.createElement("setup-stage-wrapper");

const versions = ["2.80", "2.81", "2.82", "functions-branch"];

let cb: Function;

const init = (wrapper: HTMLElement) => {
    initialized = true;

    wrapper.appendChild(root);

    let config: any = {};


    versions.map(v => {
        const d = InputButton(root, {
            text: v
        }).on("click", () => {
            config[v] = !!!config[v];
        })

        cb("versions", config);
    })

};

export default {
    name: "01",
    show: (wrapper: HTMLElement, _cb: Function) => {
        cb = _cb;
        if (!initialized) init(wrapper);
        root.style.display = "block";
    },
    hide: () => {
        root.style.display = "none";
    }
}