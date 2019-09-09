import {DCUI,SDK_EVENTS} from '../src/DCUI';
import {ContentItem, ContentItemObject} from '../src/ContentItem';
import {MIO_EVENTS, ServerConnection} from 'message.io';

declare global {
  interface Window {
    ampsdk: DCUI;
    dcui: any;
  }
}

describe("DCUI", () => {
  it("connects to parent window", (done) => {
    const iframe = document.createElement('iframe');
    iframe.src = './base/test/child.html'
    const connection: ServerConnection = new ServerConnection(iframe, {onload: false});
    iframe.addEventListener('load', ()=>{
      const ampsdk:DCUI = new DCUI({window: iframe.contentWindow});
      ampsdk.init();
      connection.startInit();
      ampsdk.connection.on(MIO_EVENTS.CONNECTED, ()=>{
        document.body.removeChild(iframe);
        done();
      })
    })
    document.body.appendChild(iframe);
  })

  it("makes a request for content-item", (done) => {
    const iframe = document.createElement('iframe');
    iframe.src = './base/test/child.html';
    let ampsdk:DCUI;
    const connection: ServerConnection = new ServerConnection(iframe, {onload: false});
    connection.on(SDK_EVENTS.CONTENT_ITEM, (_payload, resolve, _reject) => {
      const cItem: ContentItemObject = {
        id: "id",
        label: "label",
        body: {
          _meta: {
            name: "contentItem",
            schema: "hello"
          }
        },
        deliveryId: "deliveryId"
      }
      resolve(cItem);
      done();
    })
    iframe.addEventListener('load', ()=>{
      ampsdk = new DCUI({window: iframe.contentWindow});
      ampsdk.init();
      connection.startInit();
    })
    document.body.appendChild(iframe);
  })
})
