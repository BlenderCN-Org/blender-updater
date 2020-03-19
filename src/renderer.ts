import "./index.scss";
import stateManager from "./elements/stateManager";
import layout from "./config/layout";



const init = () => {

    header.init();

    stateManager.loadConfig(layout);

}

init();