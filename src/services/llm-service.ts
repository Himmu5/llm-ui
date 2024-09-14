import { fetchEventSource } from '@microsoft/fetch-event-source';
import { eventChannel } from "redux-saga";

const streamCall = (query:string, fileName: string)=>{
    var emit: any;
    const chan = eventChannel((emitter) => {
        emit = emitter;
        return () => ("");
    });
    const URL = 'http://localhost:8000/llm/search'+`?query=${query}&fileName=${fileName}`;
    fetchEventSource(URL, {
        onmessage(ev) {
            emit(ev.data);
        }
    });

    return chan;
}

export { streamCall }