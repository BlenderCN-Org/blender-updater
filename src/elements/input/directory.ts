import { remote } from "electron";

const { dialog } = remote.require("electron");
const fs = remote.require("fs");

export default (root: HTMLElement, { title = "", _path = "C:\\Blender" }) => {

    let path = _path;

    const callbacks: Map<string, Function[]> = new Map();

    const wrapper = document.createElement("div");
    wrapper.classList.add("input-directory-wrapper");

    function updatePath(p: string) {
        path = p;
        fs.access(p, (err: Error) => {
            console.log(p, err);
            if (err) {
                console.log(err);
            } else {
                callbacks.has("change") && callbacks.get("change").forEach(cb => cb(pathElement.value));
            }
        })
    }

    if (title.length) {
        const titleElement = document.createElement("h3");
        titleElement.innerHTML = title;
        root.appendChild(titleElement);
    }

    const pathElement = document.createElement("input");
    pathElement.type = "text";
    pathElement.value = path;
    pathElement.addEventListener("change", function () {
        updatePath(pathElement.value);
    })
    pathElement.addEventListener("focus", function () {
        this.select();
    })
    wrapper.appendChild(pathElement);



    const folderElement = document.createElement("img");
    folderElement.addEventListener("click", _ => dialog.showOpenDialog({
        properties: ['openDirectory'],
        options: {
            default: path
        }
    }).then((v: any) => {
        if (!v.canceled) {
            pathElement.value = v.filePaths[0];
            updatePath(v.filePaths[0]);
        }
    }));
    folderElement.src = "assets/icons/folder.svg";
    wrapper.appendChild(folderElement);

    root.appendChild(wrapper);

    const errorElement = document.createElement("p");
    root.appendChild(errorElement);


    return {
        on: (type: string, cb: Function) => {
            callbacks.has(type) ? callbacks.get(type).push(cb) : callbacks.set(type, [cb]);
            cb(path);
        }
    }
};