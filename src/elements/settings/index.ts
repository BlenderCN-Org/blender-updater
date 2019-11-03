import { EventEmitter } from "events";

const event = new EventEmitter();

export default {
    on: event.on
}