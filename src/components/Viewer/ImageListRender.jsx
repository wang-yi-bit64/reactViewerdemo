/*
 * @Author: your name
 * @Date: 2020-11-13 10:10:49
 * @LastEditTime: 2020-12-02 17:11:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\components\Viewer\ImageListRender.jsx
 */
/* eslint-disable  */
/* eslint-disable react/sort-comp */

import React, { PureComponent, Children, cloneElement } from "react"
import ReactDom from "react-dom"
import Viewer from "viewerjs"
import "viewerjs/dist/viewer.css"

class ImageListRender extends PureComponent {
	constructor(props) {
		super(props)
		this.imageListWrapper = React.createRef()
	}
	render() {
		const { imageUrls } = this.props
		return (
			<div style={{ display: "none" }} ref={this.imageListWrapper}>
				{imageUrls.map((url) => <img src={url} alt={url} key={url} style={{ display: "none" }}/>)}
			</div>
		)
	}
	componentDidMount() {
		const {index, hide, options: customOptions} = this.props
		const {
			toolbar: customToolbar,
			hidden,
			...restOptions
		} = customOptions || {toolbar: {}}
		const options = {
			toolbar: {
				zoomIn: true,
				zoomOut: true,
				oneToOne: true,
				reset: true,
				prev: true,
				play: true,
				next: true,
				rotateLeft: true,
				rotateRight: 4,
				flipHorizontal: true,
				flipVertical: true,
				...customToolbar
			},
			navbar: false,
			...restOptions,
			hidden: () => {
				hidden && hidden()
				hide()////关闭的时候通过调用父组件方法触发父组件state来卸载子组件
			}
		}
		this.viewer = new Viewer(ReactDom.findDOMNode(this.imageListWrapper.current), options)
		this.viewer.view(index)
	}
	componentWillUnmount() {
		this.this.viewer.destroy()
	}
}

export default ImageListRender
