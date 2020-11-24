/*
 * @Author: your name
 * @Date: 2020-11-14 11:01:34
 * @LastEditTime: 2020-11-17 16:30:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\components\viewImage\Icon.jsx
 */

import React, { Component } from "react";
export const ActionType = {
  1: "zoomIn",
  2: "zoomOut",
  3: "prev",
  4: "next",
  5: "rotateLeft",
  6: "rotateRight",
  7: "reset",
  8: "close",
  9: "scaleX",
  10: "scaleY",
  11: "download",
  close: 8,
  download: 11,
  next: 4,
  prev: 3,
  reset: 7,
  rotateLeft: 5,
  rotateRight: 6,
  scaleX: 9,
  scaleY: 10,
  zoomIn: 1,
  zoomOut: 2,
};
export default class Icon extends Component {
  render() {
    let prefixCls = "react-viewer-cion";
    return (
      <i
        className={`${this.props.prefiCls} ${this.props.prefiCls}-${this.props.type}`}
      ></i>
    );
  }
}
