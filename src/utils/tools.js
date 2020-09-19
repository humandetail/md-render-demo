/**
 * 工具类函数集合
 */

/**
 * 元素到浏览器左上角的距离
 * getElementDocPosition
 * 
 * @param { Object } el 需要查询的元素节点
 * @returns { Object } 返回一个包含了Left和Top距离的对象
 * 
 * scrollLeft/scrollTop
 */
export function getElementDocPosition (el) {
  var parentNode = el.offsetParent, // 最近的，有定位属性的祖先元素
      left = el.offsetLeft,
      top = el.offsetTop;

  while (parentNode) { // 如果存在父级定位元素，则加上父级定位元素的offset值
    left += parentNode.offsetLeft + parentNode.clientLeft;
    top += parentNode.offsetTop + parentNode.clientTop;
    parentNode = parentNode.offsetParent;
  }

  return {
    left: left,
    top: top
  }
}

/**
 * 获取滚动条距离
 * getScrollOffset
 * 
 * @returns { Object } 返回一个包含垂直和水平方向滚动条的距离的对象
 * 
 * 常规：
 *   window.pageXOffset/pageYOffset
 * IE9/IE8及以下：
 *   document.documentElement.scrollLeft/scrollTop
 *   document.body.scrollLeft/scrollTop
 * 不常见：(不用这个)
 *   window.scrollX/scrollY
 */
export function getScrollOffset () {
  if (window.pageXOffset) { // 如果window.pageXOffset存在，则使用
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    };
  } else {
    // 由于document.documentElement.scrollLeft与document.body.scrollLeft有下面这种现象
    // 一个有值，另一个为0
    // 所以可以将两者相加来取值
    return {
      left: document.documentElement.scrollLeft + document.body.scrollLeft,
      top: document.documentElement.scrollTop + document.body.scrollTop
    }
  }
}

/**
 * 获取页面（HTML文档）尺寸
 * getScrollSize
 * 
 * @returns { Object } 返回一个包含页面尺寸的对象
 * 
 * document.body.scrollWidth/scrollHeight
 * document.documentElement.scrollWidth/scrollHeight
 */
export function getScrollSize () {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}

/**
 * 获取浏览器可视区域（窗口）的尺寸
 * getViewportSize
 * 
 * @returns { Object } 返回一个包含了浏览器可视区域（窗口）的尺寸的对象
 *
 * 常规：
 *   window.innerWidth/innerHeight
 * IE9/IE8及以下:
 *   标准模式：document.documentElement.clientWidth/clientHeight
 *   怪异模式：document.body.clientWidth/clientHeight
 */
export function getViewportSize () {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    if (document.compatMode === 'BackCompat') {
      // 怪异模式
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      // 标准模式
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}

/**
 * 移除class类名
 * @param { Array<HTMLElement> | HTMLElement } target - 需要移除class的DOM元素、或由DOM元素组成的数组、DOM元素集合
 * @param { string } className - 添加移除的类名
 */
export function removeClass (target, className) {
  if (target instanceof HTMLElement) {
    target.classList.remove(className);
  } else {
    let _tar = Array.prototype.slice.call(target),
        len = _tar.length,
        item;

    for (let i = 0; i < len; i ++) {
      item = _tar[i];

      item.classList.remove(className);
    }
  }
}

/**
 * 添加class类名
 * @param { Array<HTMLElement> | HTMLElement } target - 需要添加class的DOM元素、或由DOM元素组成的数组、DOM元素集合
 * @param { string } className - 添加移除的类名
 */
export function addClass (target, className) {
  if (target instanceof HTMLElement) {
    target.classList.add(className);
  } else {
    let _tar = Array.prototype.slice.call(target),
        len = _tar.length,
        item;

    for (let i = 0; i < len; i ++) {
      item = _tar[i];

      item.classList.add(className);
    }
  }
}