/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react"
import { Icon } from "antd"
import classes from "./ImageZoom.css"

export default class ImageZoom extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			coefficient: 1,
			showSrc: null,
			index: 0,
			perPosition: {
				x: 0,
				y: 0
			},
			drag: false,
			translateX: 0,
			translateY: 0,
			rotate: 0,
			list: this.props.srcs || [],
			show: false
		}
		this.container = React.createRef()
	}
	componentDidMount() {
		document.addEventListener("mouseup", this.holdUp())
		document.addEventListener("mousemove", this.mouseMove)
	}
	componentWillUnmount() {
		document.removeEventListener("mouseup", this.holdUp())
		document.removeEventListener("mousemove", this.mouseDown)
	}


  // 鼠标按下
  holdDown = () => {
  	if (!this.state.drag) {
  		this.setState({
  			drag: true
  		})
  	}
  }
  // 鼠标松开
  holdUp = () => {
  	if (this.state.drag) {
  		this.setState({
  			drag: false
  		})
  	}
  }
  // 选择图片重置
  selectImg = (src, index) => {
  	this.setState({
  		showSrc: src,
  		index: index,
  		coefficient: 1,
  		translateX: 0,
  		translateY: 0,
  		rotate: 0,
  		show: true
  	})
  }

  // 上一步
  preStep =() => {
  	const { srcs } = this.props
  	const { index } = this.state
  	const preIndex = index - 1
  	if (index !== 0) {
  		this.setState({
  			showSrc: srcs[preIndex],
  			index: preIndex,
  			coefficient: 1,
  			translateX: 0,
  			translateY: 0,
  			rotate: 0
  		})
  	}
  	if (preIndex < 0) {
  		this.setState({
  			show: false,
  			showSrc: null
  		})
  	}
  }
  // 下一步
  nextStep = () => {
  	const { srcs } = this.props
  	const { index } = this.state
  	const preIndex = index + 1
  	if (index !== srcs.length) {
  		this.setState({
  			showSrc: srcs[preIndex],
  			index: preIndex,
  			coefficient: 1,
  			translateX: 0,
  			translateY: 0,
  			rotate: 0
  		})
  	}
  	if (preIndex > srcs.length) {
  		this.setState({
  			show: false,
  			showSrc: null
  		})
  	}
  }

  fangda =() => {
  	// 极限放大2倍  可动态
  	// this.state.coefficient !== 1.4 && this.setState({
  	//   coefficient: Number(this.state.coefficient + 0.2)
  	// })
  	this.setState({
  		coefficient: Number(this.state.coefficient + 0.1)
  	})
  }
  // eslint-disable-next-line consistent-return
  suoxiao = () => {
  	// 最小不放大正常显示
  	if (this.state.coefficient.toFixed(1) < 0.4) return false
  	if (this.state.coefficient.toFixed(1) !== 0.4) {
  		this.setState({
  			coefficient: Number(this.state.coefficient.toFixed(1) - 0.1)
  		})
  	}
  }

  // 鼠标点击事件
  mouseDown = (e) => {
  	e.preventDefault()
  	e.stopPropagation()
  	this.holdDown()
  	const {translateX, translateY} = this.state
  	this.setState({
  		perPosition: {
  			x: e.clientX - translateX,
  			y: e.clientY - translateY
  		}
  	})
  }
  mouseMove = (e) => {
  	e.preventDefault()
  	e.stopPropagation()
  	const {perPosition} = this.state
  	const {x, y} = perPosition
  	if (this.state.drag) {
  		this.setState({
  			translateX: e.clientX - x,
  			translateY: e.clientY - y
  		})
  	}
  }
  leftRotate = () => {
  	const {rotate} = this.state
  	this.setState({
  		rotate: rotate - 90
  	})
  }
  rightRotate = () => {
  	const {rotate} = this.state
  	this.setState({
  		rotate: rotate + 90
  	})
  }
	// 关闭
	handlerClose = () => {
		this.setState({
			show: false,
			showSrc: null
		})
	}

	render() {
  	const { zIndex } = this.props
  	const { show, showSrc, drag, translateX, translateY, index, rotate, list} = this.state
  	return (
  		// eslint-disable-next-line react/jsx-filename-extension
  	 <div ref={this.container} className="ImageZoom" style={{zIndex: zIndex}}>
  			{
  				list.map((src, key) => (
  					<div className={classes.imageZoom} key={src} style={{zIndex: zIndex + 10}}>
  					<img
  						src={src}
  						alt={src}
  						className={classes.img}
  						onClick={() => this.selectImg(src, key)}
  							style={{zIndex: zIndex + 10}}/>
  					{
  						showSrc && <div
  								className={classes.glassBox}
  								style={{
  										zIndex: zIndex + 20
  									}}>
  							 {!show ? null : <div
  									className={classes.glass}
  									onMouseUp={this.holdUp}
  									style={{
  										zIndex: zIndex + 20
  									}}>
  								<img
  									src={showSrc}
  									onMouseUp={this.holdUp}
  									alt={showSrc}
  									dragging={drag.toString()}
  									className={classes.glassImg}
  									width={`${100 * this.state.coefficient}%`}
  									height={`${100 * this.state.coefficient}%`}
  									onMouseDown={this.mouseDown}
  									style={{
  											position: "absolute",
  											top: translateY,
  											left: translateX,
  											cursor: drag ? "move" : "move",
  											transform: `rotate(${rotate}deg)`,
  											zIndex: zIndex + 30
  										}}
  								/>
  							</div>}
  						</div>
  					}
  				</div>))
  			}
  			{!show ? null : <div className={classes.footer} style={{display: showSrc ? "block" : "none", zIndex: zIndex + 20}}>
  				<div className={classes.footetnav} style={{zIndex: zIndex + 20}}>
  					<span onClick={() => this.preStep(index)}>上一张</span>
  					<span onClick={() => this.nextStep(index)}>下一张</span>
  					<span onClick={this.fangda}>放大</span>
  					<span onClick={this.suoxiao}>缩小</span>
  					<span onClick={this.leftRotate}>左旋</span>
  					<span onClick={this.rightRotate}>右旋</span>
  				</div>
  			</div>}
  			{
  				!show ? null : <div className={classes.glassBoxClose} style={{zIndex: zIndex + 20}}>
  					<Icon
  						type="close"
  						style={{
  							marginLeft: "10px",
  						}}
							onClick={this.handlerClose}
						/>
  				</div>
  			}
  		</div>
  	)
	}
}
