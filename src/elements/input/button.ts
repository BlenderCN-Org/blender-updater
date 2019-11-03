
export default (root: HTMLElement, { icon = "", text = "button", align = "right" }) => {

    const callbacks: Map<string, Function[]> = new Map();

    const wrapper = document.createElement("button");
    wrapper.style.cssFloat = align;
    wrapper.classList.add("input-button");

    if (text.length) {
        const textElement = document.createElement("p");
        textElement.innerHTML = text;
        wrapper.appendChild(textElement);
    }

    if (icon.length) {
        const iconElement = document.createElement("img");
        iconElement.src = "assets/icons/" + icon + ".svg";
        wrapper.append(iconElement);
    }

    root.appendChild(wrapper);

    return {
        on: function (type: string, cb: Function) {
            if (!callbacks.has(type)) {
                callbacks.set(type, [cb]);
                wrapper.addEventListener(type, ev => callbacks.has(type) && callbacks.get(type).forEach(cb => cb(ev)))
            } else {
                callbacks.get(type).push(cb);
            }
            return this;
        },
        hide: () => {
            wrapper.style.display = "none";
        },
        show: () => {
            wrapper.style.display = "";
        }
    }
};