# Web Components
Web Components 用原生 js  的方式 构建模块化组件

# Web Components 三板斧
- Custom elements（自定义元素):允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们
- Shadow DOM（影子DOM）：用于将封装的Shadow DOM树附加到元素（并控制其关联的功能。可以将CSS样式与外部隔开，防止外部的样式影响，类似Vue的组件私有样式。
- HTML templates（HTML模板）：`<template>` 和 `<slot>` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用，使用过Vue和React等热门框架的应该熟悉。

# 组件的声明
声明一个 class 继承 HTMLElement 
```js
 class Demo extends HTMLElement {
    constructor() {
      super()
    }
  } 
```
# 组件的注册
- 自主定制元素：独立元素; 它们不会从内置HTML元素继承。
- 自定义内置元素：这些元素继承自 - 并扩展 - 内置HTML元素
customElements.define(name, constructor, options)
- 参数：
  * name: 自定义元素名
  * constructor: 自定义元素构造器
  * options(可选) 如果有 options 则是自定义内置元素
  ```js
    // 存在浏览器兼容问题
    customElements.define(name, constructor, {extens:'div'})
  ```




# 影子节点封装
调用 attachShadow 将一个shadow DOM附加到自定义元素上。使用通常的DOM方法向shadow DOM中添加子元素、事件监听器等等
```js
 class Demo extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: "closed" })
      shadowRoot.innerHTML = `<div>我是 web components </div>`
     this.shadow = shadowRoot

    }
  } 
```
 ## 影子节点添加子元素方式
 ### innerHTML 方式
 innerHTML 方式 向影子节点 赋值 一个字符串式的标签
 ```js
  ...
  shadowRoot.innerHTML = `<div></div>`
  this.shadow = shadowRoot
 ```
 ### appendChild 方式
 appendChild 方式 向影子节点块后增加一个 element 节点
 ```js
  const pElem = document.createElement('p');
  shadowRoot.appendChild(pElem);
 ```

 ### template 方式
 - 通过html 的方式 
  1. 在 html中创建一个模板
 ```html
 <template id="person-template">
  <div>
    <h2>Personal ID Card</h2>
    <slot name="person-name">NAME MISSING</slot>
    <ul>
      <li><slot name="person-age">AGE MISSING</slot></li>
      <li><slot name="person-occupation">OCCUPATION MISSING</slot></li>
    </ul>
  </div>
</template>

 ```
 2. 使用模板
 ```js
 class Demo extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('person-template');
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({mode: 'open'});

      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
 }

 ```
 - 通过 createElement 创建的方式
 ```js
 const template = document.createElement('template')
 template.innerHTML = `<div>test</div>`
class TestComponents extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: "close" })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
customElements.define('test-components', TestComponents)
 ```

# 向影子节点添加CSS
## createElement 的方式
```js
 const style = document.createElement('style')
 style.textContent = `
          .wrapper {
            color: red;
          }`
shadow.appendChild(style)

```
## adoptedStyleSheet 的方式
```js
const style2 = new CSSStyleSheet();
style2.replaceSync(`.wrapper {font-weight:bold;}`)
shadow.adoptedStyleSheets = [style2]

```
`注意adoptedStyleSheet与style标签混合使用都会生效，互相影响`



# 生命周期
- connectedCallback: 当元素被添加到文档的时候调用
- disconnectedCallback：当元素从文档删除的时候调用
- adoptedCallback: 当元素被移动到新文档的时候调用
- attributeChangedCallback: 当元素属性添加，删除，修改的时候调用 ,需搭配observedAttributes()使用


 