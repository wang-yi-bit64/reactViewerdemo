/*
 * @Author: your name
 * @Date: 2020-11-15 15:04:49
 * @LastEditTime: 2020-11-25 18:22:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\routes\ViewerDemo.js
 */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-filename-extension */

import React, { Component } from "react"
import Viewer from "../components/viewImage"

class ViewerDemo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				"http://img.s.youfenba.com/material_thumb/BYX6Mm67ba.jpg",
				"http://img.s.youfenba.com/material_thumb/8nzxJwpsPX.jpg",
				"http://img.s.youfenba.com/material_thumb/SaNktASjmp.jpg",
				"http://img.s.youfenba.com/material_thumb/cTma2FTPEC.jpg",
				"http://img.s.youfenba.com/material_thumb/KnNc6D4sGs.jpg"
			],
			visible: false,
			activeIndex: 0,
			mode: "modal",
		}
	}
  handleChangeModal = (e) => {
  	this.setState({
  		mode: "modal",
  	})
  }

  handleChangeInline = (e) => {
  	this.setState({
  		mode: "inline",
  		visible: true,
  	})
  }

  render() {
  	const images = [{
  		src: this.state.data[0],
  		alt: "lake",
  		downloadUrl: "",
  	}, {
  		src: this.state.data[1],
  		alt: "mountain",
  		downloadUrl: "",
  	}, {
  		src: this.state.data[2],
  		alt: "mountain1",
  		downloadUrl: "",
  	}, {
  		src: this.state.data[3],
  		alt: "mountain2",
  		downloadUrl: "",
  	}, {
  		src: this.state.data[4],
  		alt: "mountain3",
  		downloadUrl: "",
  	}]
  	const inline = this.state.mode === "inline"

  	return (
  		<div>
  			{images.map((item, index) => (
  				<div key={index.toString()} className="img-item">
  					<img
  						src={item.src}
  						onClick={() => {
  						this.setState({
  							visible: true,
  							activeIndex: index,
  						})
  						}}
  						style={{ width: "200px", height: "200px" }}/>
  				</div>
  			))}
  			<Viewer
  				visible={this.state.visible}
  				onClose={() => { this.setState({ visible: false }) }}
  				images={images}
  				activeIndex={this.state.activeIndex}
  				downloadable
  				// customToolbar={(toolbars) => {
  				//   return toolbars.concat([{
  				//     key: 'test',
  				//     render: <div>C</div>,
  				//     onClick: (activeImage) => {
  				//       console.log(activeImage);
  				//     },
  				//   }]);
  				// }}
  			/>
  		</div>
  	)
  }
}

export default ViewerDemo
