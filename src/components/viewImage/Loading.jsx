/*
 * @Author: your name
 * @Date: 2020-11-14 10:58:22
 * @LastEditTime: 2020-11-25 18:13:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\components\viewImage\Loading.jsx
 */
import React, { Component } from "react"

// eslint-disable-next-line react/prefer-stateless-function
export default class loading extends Component {
	render() {
		const cls = "circle-loaidng"
		return (
			<div className="loading-wrap" style={this.props.style}>
				<div className={cls}/>
			</div>
		)
	}
}
