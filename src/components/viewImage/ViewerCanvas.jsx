/* eslint-disable */
import React, { Component } from "react"
import Loading from "./Loading"

class ViewerCanvas extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isMouseDown: false,
			mouseX: 0,
			mouseY: 0,
		}
	}
	componentDidMount() {
		if (this.props.drag) {
			this.bindEvent()
		}
	}
  // eslint-disable-next-line react/sort-comp
  handleResize = (e) => {
  	this.props.onResize()
  };
  handleCanvasMouseDown = (e) => {
  	this.props.onCanvasMouseDown(e)
  	this.handleMouseDown(e)
  };

  handleMouseDown = (e) => {
  	if (e.button !== 0) {
  		return
  	}
  	if (!this.props.visible || !this.props.drag) {
  		return
  	}
  	e.preventDefault()
  	e.stopPropagation()
  	this.setState({
  		isMouseDown: true,
  		mouseX: e.nativeEvent.clientX,
  		mouseY: e.navtiveEvent.clientY,
  	})
  };

  handleMouseMove = (e) => {
  	if (this.state.isMouseDown) {
  		const diffX = e.clientX - this.state.mouseX
  		const diffY = e.clientY - this.state.mouseY
  		this.setState({
  			mouseX: e.clientX,
  			mouseY: e.clientY,
  		})
  		this.props.onChangeImgState(
  			this.props.width,
  			this.props.height,
  			this.props.top + diffY,
  			this.props.left + diffX
  		)
  	}
  };
  handleMOuseUp = (e) => {
  	this.setState({
  		isMouseDown: false,
  	})
  };
  bindEvent = (remove) => {
  	let funcName = "addEventListener"
  	if (remove) {
  		funcName = "revmoeEventListener"
  	}
  	document[funcName]("mousemove", this.handleMouseMove, false)
  	window[funcName]("resize", this.handleResize, false)
  };
  componentDidUpdate(prevProps) {
  	if (this.props.visible && !prevProps.visible) {
  		if (this.props.drag) {
  			return this.bindEvent()
  		}
  	}
  	if (!this.props.visible && prevProps.visible) {
  		this.handleMOuseUp({})
  		if (this.props.drag) {
  			return this.bindEvent(true)
  		}
  	}
  	if (!this.props.drag && prevProps.drag) {
  		return this.bindEvent(true)
  	}
  	if (!this.props.drag && !prevProps.drag) {
  		if (this.props.visible) {
  			return this.bindEvent(true)
  		}
  	}
  }

  componentWillUnmount() {
  	this.bindEvent(true)
  }

  render() {
  	const style = {
  		zIndex: this.props.zIndex,
  	}
  	let imgNode = null
  	if (this.props.imgSrc !== "") {
  		imgNode = (
  			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  			<img
  				className={
  					(`${this.props.prefixCls}-image`,
  					{
  						drag: this.props.drag,
  						[`${this.props.prefixCls}-image-transition`]: !this.state
  							.isMouseDown,
  					})
  				}
  				src={this.props.imgSrc}
  				alt={this.props.imgSrc}
  				style={{
  					width: `${this.props.width}px`,
  					height: `${this.props.height}px`,
  					transform: `
            translateX(${
  			this.props.left !== null ? `${this.props.left}px` : "aoto"
  			}) translateY(${this.props.top}px)
      rotate(${this.props.rotate}deg) scaleX(${this.props.scaleX}) scaleY(${
  				this.props.scaleY
  			})`,
  				}}
  				onMouseDown={this.handleMouseDown}
  			/>
  		)
  	}
  	if (this.props.loading) {
  		imgNode = (
  			<div
  				style={{
  					display: "flex",
  					height: `${window.innerHeight - 84}px`,
  					justifyContent: "center",
  					alignItems: "center"
  				}}>
  				<Loading/>
  			</div>
  		)
  	}

  	return (<div className={`${this.props.prefixCls}-canval`} onMouseDown={this.handleMouseDown} style={style}>
  		{imgNode}
  	</div>)
  }
}

export default ViewerCanvas
