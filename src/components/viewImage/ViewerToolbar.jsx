

import React, { Component } from "react";
import Icon, { ActionType } from './Icon';
/**
 * @description 过略掉不存的功能图标
 * @param {*} toolbars
 */
function deleteToolbarFromKey(toolbars) {
  console.log('deleteToolbarFromKey',toolbars);
  
  const targetToolbar = toolbars ? toolbars.filter(item => ActionType.includes(item)) : ActionType
  return targetToolbar
}

export default class ViewerToolbar extends Component {
  handleAction(config) {
    this.props.onAction(config)
  }
  // 渲染 单个 Icon 组件
  renderAction = config => {
    let content = null
    // default toolbar
    console.log('ViewerToolbar renderAction config-',config);
    console.log('ViewerToolbar renderAction !ActionType.includes(config.actionType)',!ActionType.includes(config.actionType));
    if(!ActionType.includes(config.actionType)) {
      console.log('viewtoolbar,renderAction,config.actionType',config.actionType);
      content = <Icon type={config.actionType}/>

    }
    if(config.render) {
      content = config.render
    }
    console.log('ViewerToolbar renderAction content',content);
    return (
      <li
        key={config.key}
        className={`${this.props.prefixCls}-btn`}
        onClick={() => this.handleAction(config)}
        data-key={config.key}
      >
        {content}
      </li>
    )
  }

  render() {
    console.log('toolbar render props',this.props)
    let attributeNode = this.props.attribute ? (
      <p className={`${this.props.prefixCls}-attribute`}>
        {this.props.alt && `${this.props.alt}`}
        {this.props.noImgDetails || <span className={
          `${this.props.prefixCls}-img-details`
        }>
          {`(${this.props.width} x ${this.props.height})`}
        </span>}
      </p>
    ) : null;
    let toolbars = this.props.toolbars || ActionType
    if(!this.props.zoomble) {
      toolbars = deleteToolbarFromKey(toolbars, ['zoomIn', 'zoomOut'])
      console.log('toolbars render !this.props.zoomble', toolbars);
    }
    if(!this.props.changeable) {
      toolbars = deleteToolbarFromKey(toolbars, ['prev', 'next'])
      console.log('toolbars render !this.props.changeable', toolbars);

    }
    if(!this.props.rotatable) {
      toolbars = deleteToolbarFromKey(toolbars, ['rotateLeft', 'rotateRight'])
      console.log('toolbars render !this.props.rotatable', toolbars);

    }
    if(!this.props.scalable) {
      toolbars = deleteToolbarFromKey(toolbars, ['scaleX', 'scaleY'])
      console.log('toolbars render !this.props.scalable', toolbars);

    }
    if(!this.props.downloadable) {
      toolbars = deleteToolbarFromKey(toolbars,['download'])
      console.log('toolbars render !this.props.downloadable', toolbars);

    }
    console.log('toolbar render attributeNode-', attributeNode);
    return (
      <div>
        {attributeNode}
        <ul className={`${this.props.prefixCls}-toolbar`}>
          {toolbars.map(item => {
            return this.renderAction(item)
          })}
        </ul>
      </div>
    )
  }
}
