/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/*
 * @Author: your name
 * @Date: 2020-11-14 13:43:50
 * @LastEditTime: 2020-11-25 18:17:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\components\viewImage\ViewerNav.jsx
 */
import React, { Component } from "react"

class ViewerNav extends Component {
  static defaultProps = {
  	activeIndex: 0
  }
  handleChangeImg = (newIndex) => {
  	if (this.props.activeIndex === newIndex) {
  		return
  	}
  	this.props.onChangeImg(newIndex)
  }
  render() {
  	const marginLeft = `calc(50% - ${this.props.activeIndex + 1} * 31px)`

  	const listStyle = {
  		marginLeft: marginLeft
  	}

  	return (
  		<div className={`${this.props.prefixCls}-navbar`}>
  			<ul className={`${this.props.prefixCls}-list-transition`} style={listStyle}>
  				{this.props.images.map((item, index) => (<li
  					key={index}
  					className={index === this.props.activeIndex ? "active" : ""}
  					onClick={() => this.handleChangeImg(index)}
  				>
  					<img src={item.src} alt={item.src}/>
  				</li>))}
  			</ul>
  		</div>
  	)
  }
}

export default ViewerNav
