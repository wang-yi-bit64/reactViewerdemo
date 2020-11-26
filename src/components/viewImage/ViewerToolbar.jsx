/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/*
 * @Author: your name
 * @Date: 2020-11-14 11:14:42
 * @LastEditTime: 2020-11-25 18:18:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\components\viewImage\ViewerToolbar.jsx
 */


import React, { Component } from "react"
import Icon, { ActionType } from "./Icon"
/**
 * @description 过略掉不存的功能图标
 * @param {*} toolbars
 */
function deleteToolbarFromKey(toolbars) {
	const targetToolbar = toolbars ? toolbars.filter(item => ActionType.includes(item)) : ActionType
	return targetToolbar
}

export default class ViewerToolbar extends Component {
	handleAction(config) {
		this.props.onAction(config)
	}
  // 渲染 单个 Icon 组件
  renderAction = (config) => {
  	let content = null
  	// default toolbar
  	if (!ActionType.includes(config.actionType)) {
  		content = <Icon type={config.actionType}/>
  	}
  	if (config.render) {
  		content = config.render
  	}
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
  	const attributeNode = this.props.attribute ? (
  		<p className={`${this.props.prefixCls}-attribute`}>
  			{this.props.alt && `${this.props.alt}`}
  			{this.props.noImgDetails || <span className={
  				`${this.props.prefixCls}-img-details`
  			}>
  				{`(${this.props.width} x ${this.props.height})`}
  			</span>}
  		</p>
  	) : null
  	let toolbars = this.props.toolbars || ActionType
  	if (!this.props.zoomble) {
  		toolbars = deleteToolbarFromKey(toolbars, ["zoomIn", "zoomOut"])
  	}
  	if (!this.props.changeable) {
  		toolbars = deleteToolbarFromKey(toolbars, ["prev", "next"])
  	}
  	if (!this.props.rotatable) {
  		toolbars = deleteToolbarFromKey(toolbars, ["rotateLeft", "rotateRight"])
  	}
  	if (!this.props.scalable) {
  		toolbars = deleteToolbarFromKey(toolbars, ["scaleX", "scaleY"])
  	}
  	if (!this.props.downloadable) {
  		toolbars = deleteToolbarFromKey(toolbars, ["download"])
  	}
  	return (
  		<div>
  			{attributeNode}
  			<ul className={`${this.props.prefixCls}-toolbar`}>
  				{toolbars.map(item => this.renderAction(item))}
  			</ul>
  		</div>
  	)
  }
}
