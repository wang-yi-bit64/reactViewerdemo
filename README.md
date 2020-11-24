<!--
 * @Author: your name
 * @Date: 2020-11-24 16:57:43
 * @LastEditTime: 2020-11-24 17:42:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\README.md
-->


## 前言
暂时还没想好怎么写些什么东西好

## 为什么要做
看看大佬写的库实现了非常多的功能,萌生了尝试一下的想法,最终在朋友和我自己的努力之下,只实现了一些功能,但是还有bug和体验上的差别,在那时还没有文档,文档还未完善。目前还是草稿阶段


## 实现思路

### 图片拖动
目前是基于 给元素添加 `dragging`属性来实现 通过 `mouseup` 和 `mousemove`来控制 `dragging`的值来实现图片的拖动

当鼠标点击时 记录 `e.clientX` 和 `e.clientY` , 鼠标移动时, 使用当前的`clientX`和`clientY` 减去点击时记录的点, 最后元素通过 `position` 定位 `top`和`left` 的值 实现元素的移动

ps：大佬写的库是通过`transform`的 `transiation`来实现的, 目前还没整明白实现逻辑,暂时是通过定位来实现

## 放大
大佬是通过 `scaleX` 实现图片放大缩小

我这边通过 百分比大小的方式来实现，可能图片失真

以后会添加 鼠标滚轮事件

## 缩小

缩小同放大实现方式

以后会添加 鼠标滚轮事件
## 旋转

实现思路为 `transform` 中的 `rotate`来实现 旋转


## 未来




### Keyboard support
技术添加 键盘按键的支持

- `Esc`: Close viewer.
- `←`: View the previous image.
- `→`: View the next image.
- `↑`: Zoom in the image.
- `↓`: Zoom out the image.
- `Ctrl + 1`: Reset the image.
- `Ctrl + ←`: Rotate left the image.
- `Ctrl + →`: Rotate right the image.


## 补充
目前就想到这些，后面还会补充,暂时主要考虑 react 16.2版本的 。关于 hooks,还在学习中, react也是 用了一个月，看着还是很懵逼，也是学习中

小伙伴们奥利给

