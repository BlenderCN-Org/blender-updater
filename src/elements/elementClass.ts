import { EventEmitter } from "events"

interface ElementConfig {
    title?: string,
    href?: string,
    on?: {
        click?: Function
        complete?: Function
        change?: Function
    }
}

class Element {


    private emitter: EventEmitter;
    wrapper: HTMLDivElement;

    constructor(config?: ElementConfig) {
        this.wrapper = document.createElement("div");

    }

    show() {

    }

    hide() {

    }

    private emit(type: string | symbol, val: any) {
        this.emitter && this.emitter.emit(type, val)
    }

    on(type: string | symbol) {
        if (!this.emitter) this.emitter = new EventEmitter();
        let _cb: Function;
        this.emitter.on(type, args => _cb(args));
        return {
            then: (cb: Function) => _cb = cb
        }
    }

};

const d = new Element({
    on: {
        click: ev => {
            console.log(ev);
        }
    }
});

d.on("click").then(ev => {

});

export default Element;