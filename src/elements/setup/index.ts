import { InputButton } from "../input";

import stages from "./stages";
import { EventEmitter } from "events";

const config: any = {};

const emitter = new EventEmitter();

let i = 0;

const root = document.getElementById("setup-wrapper");

const buttonWrapper = document.createElement("div");
buttonWrapper.className = "setup-button-wrapper";
document.getElementById("setup-wrapper").appendChild(buttonWrapper);

const previous = () => i - 1 >= 0 && show(i - 1);
const next = () => i + 1 <= stages.length - 1 && show(i + 1);
const hide = () => root.style.display = "none";

const buttons = {
    next: InputButton(buttonWrapper, {
        text: "next",
        align: "right"
    }).on("click", next),
    previous: InputButton(buttonWrapper, {
        text: "previous",
        align: "left"
    }).on("click", previous),
    finish: InputButton(buttonWrapper, {
        text: "finish",
        align: "right"
    }).on("click", () => {
        hide();
        emitter.emit("complete", config);
    })
}


const show = (_i: number) => {

    stages[i].hide();

    i = _i;

    //Show current stage
    if (_i >= 0 && _i <= stages.length - 1)
        stages[_i].show(root, (type: string, val: any) => config[type] = val);

    //Update buttons
    if (_i === stages.length - 1) {
        buttons["next"].hide();
        buttons["previous"].show();
        buttons["finish"].show();
    } else if (_i < stages.length && _i > 0) {
        buttons["next"].show();
        buttons["previous"].show();
        buttons["finish"].hide();
    } else {
        buttons["next"].show();
        buttons["previous"].hide();
        buttons["finish"].hide();
    }

};

export default {
    show: (stageIndex = i) => {
        document.title = "Setup";
        root.classList.add("stage-visible");
        show(stageIndex);
    },
    hide: () => {
        root.classList.remove("stage-visible");
    },
    emitter: emitter
}