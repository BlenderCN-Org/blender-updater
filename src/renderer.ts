import "./index.scss";

import header from "./elements/header";
import setup from "./elements/setup";
import main from "./elements/main";
import settings from "./elements/settings";

import * as Store from "electron-store";
const store = new Store();

const init = () => {

    header.init();

    if (!store.has("settings.dir") || !store.has("settings.versions")) setup.show();
    else main.show();

    setup.emitter.on("complete", config => {
        console.log(config.settings);
        store.set("settings", config);
        main.show();
    })

    settings.on("hide", () => {
        main.show();
    })
}

init();