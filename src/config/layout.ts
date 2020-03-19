import * as Store from "electron-store";
import { join } from "path";
import { app } from "electron";
const store = new Store();

import validate from "../helpers/validate";
import stateManager from "../elements/stateManager";

export default {
    main: {
        type: "stage",
        default: (!store.has("settings.dir") || !store.has("settings.versions")) ? 1 : 0,
        children: [
            {
                title: "setup",
                type: "stage",
                default: 0,
                on: {
                    complete: () => stateManager.setActive("main")
                },
                children: [
                    {
                        title: "Directory",
                        children: [
                            {
                                type: "title",
                                text: "Where should I keep blender?"
                            },
                            {
                                type: "input-directory",
                                default: join(app.getPath('home'), "blender"),
                                on: {
                                    change: (path: string) => {
                                        if (validate.blenderPath(path)) {
                                            store.set("settings.path", path);
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },

                            }
                        ]
                    },
                    {
                        title: "Versions",
                        children: []
                    },
                    {
                        title: "Miscellanious",
                    }
                ]
            },
            {
                title: "main",
                children: [
                    ...store.get("versions").map(e => {
                        return {
                            type: "blender-version"
                        }
                    }),
                    {
                        type: "footer"
                    }
                ]
            },
            {
                title: "settings",
                children: [

                ]
            }
        ]
    }
}