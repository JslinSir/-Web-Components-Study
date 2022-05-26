/**
 * web components 的基本使用
 */
class Demo1Components extends HTMLElement {
    constructor() {
        super()
        /** 
          * @mode open:允许外部通过element.shadowRoot获取到shadowRoot;closed:与前者相反。
         */
        const shadowRoot = this.attachShadow({ mode: "closed" })
        /**
          * shadowRoot 可以通过<template>、<slot>或者append,innerHtml等方法添加子元素。
        */
        shadowRoot.innerHTML = `<div>我是 web components </div>`
        this.shadow = shadowRoot
    }


}

customElements.define('demo1-components', Demo1Components)

