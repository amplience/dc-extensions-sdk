export default class Bling {
  $:Function;
  $$:Function;
  constructor(window: Window) {
    this.$ = window.document.querySelector.bind(document);
    this.$$ = window.document.querySelectorAll.bind(document);
  }
  public on(node: Node | NodeList, event:string, method:EventListenerOrEventListenerObject) {
    if (node instanceof Node) {
      node.addEventListener(event, method);
    } else if (node instanceof NodeList) {
      node.forEach(function (elem) {
        elem.addEventListener(event, method);
      });
    }
  }
}