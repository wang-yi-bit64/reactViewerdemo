/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */

import React, { Component } from "react"
import {connect} from "dva"

class TestDemo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			left: 0,
			top: 0,
			perPosition: {
				x: 0,
				y: 0
			},
			postion: {
				x: 0,
				y: 0
			},
			drag: false
		}
		this.movediv = React.createRef()
	}

  handleisDrag = () => {
  	this.setState({
  		drag: true
  	})
  }

  handleisDragup = () => {
  	this.setState({
  		drag: false
  	})
  }
  componentDidMount() {
  	document.addEventListener("mouseup", (e) => {
  		this.handleisDragup()
  	})
  	document.addEventListener("mousemove", (e) => {
  		this.handleMousemousemove(e)
  	})
  }

  handleMouseDown = (e) => {
  	e.preventDefault()
  	e.stopPropagation()
  	console.log("handleMouseDown start")
  	console.log(e.target.className)
  	console.log("clientX", e.clientX, "screenX", e.screenX)
  	console.log("clientY", e.clientY, "screenY", e.screenY)
  	console.log("handleMouseDown end")
  	this.handleisDrag()
  	const {top, left} = this.state
  	this.setState({
  		perPosition: {
  			x: e.clientX - top,
  			y: e.clientY - left
  		}
  	})
  }

  handleMousemousemove = (e) => {
  	e.preventDefault()
  	e.stopPropagation()
  	const {x, y} = this.state.perPosition
  	if (this.state.drag) {
  		this.setState({
  			postion: {
  				x: e.clientX - x,
  				y: e.clientY - y
  			},
  			top: e.clientX - x,
  			left: e.clientY - y
  		})
  	}
  }


  render() {
  	const {left, top, drag} = this.state

  	const boxstlye = {
  		position: "relative",
  		width: "500px",
  		height: "500px",
  		backgroundColor: "blue",
  		overflow: "hidden"
  	}

  	const style = {
  		position: "absolute",
  		top: left,
  		left: top,
  		width: "200px",
  		height: "200px",
  		backgroundColor: "red",
  		zIndex: 5,
  		cursor: drag ? "move" : "none"
  	}
  	return (
  		<div className="bodys" style={boxstlye}>
  			<h1>这是一个movediv页面</h1>
  			<div className="movediv" ref={this.movediv} draggable={drag} onMouseDown={this.handleMouseDown} style={style}/>
  		</div>
  	)
  }
}

export default connect()(TestDemo)
