import { fetchEventSource } from '@microsoft/fetch-event-source';

const streamCall = async ()=>{
    await fetchEventSource('/api/sse', {
        onmessage(ev) {
            console.log(ev.data);
        }
    });
}