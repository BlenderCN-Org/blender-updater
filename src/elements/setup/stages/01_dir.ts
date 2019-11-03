import { InputDirectory } from "../../input"
import { remote } from "electron";
const { app } = remote;
import { join } from "path";

let initialized = false;
let root = document.createElement("setup-stage-wrapper");

let cb: Function;

const init = (wrapper: HTMLElement) => {
    initialized = true;

    wrapper.appendChild(root);

    InputDirectory(root, { title: "Where should I store blender?", _path: join(app.getPath('home'), "blender") }).on("change", (ev: string) => {
        cb("dir", ev);
    })

};

export default {
    name: "02",
    show: (wrapper: HTMLElement, _cb: Function) => {
        cb = _cb;
        if (!initialized) init(wrapper);
        root.style.display = "block";
    },
    hide: () => {
        root.style.display = "none";
    }
}