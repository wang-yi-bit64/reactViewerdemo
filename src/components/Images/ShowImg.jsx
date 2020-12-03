import React, { Component } from "react"
import { Icon } from "antd"
import style from "./images.css"

class ShowImg extends Component {
	constructor(props) {
		super(props)
		this.state = {
			f: this.props.firstIndex,
			R: 0,
			S: 1,
			i: 0,
			SS: 1,
			data: this.props.data,
			// eslint-disable-next-line react/no-unused-state
			showimgs: this.props.showimgs,
		}
		this.imgstyle = React.createRef()
	}
	// eslint-disable-next-line camelcase
	UNSAFE_componentWillReceiveProps(props) {
		this.setState({ f: props.firstIndex })
	}

  // 向左预览
  leftshow = () => {
  	if (this.state.f === 0) {
  		this.setState({
  			f: 4,
  			R: 0,
  			S: 1,
  			i: 0,
  			SS: 1,
  		})
  	} else {
  		this.setState({ f: this.state.f - 1, R: 0, S: 1, i: 0, SS: 1 })
  	}
  	this.imgstyle.current.setAttribute("src", this.props.data[this.state.f])
  };
  //  向右预览
  rightshow = () => {
  	if (this.state.f === 4) {
  		this.setState({ f: 0, R: 0, S: 1, i: 0, SS: 1 })
  	} else {
  		this.setState({ f: this.state.f + 1, R: 0, S: 1, i: 0, SS: 1 })
  	}
  	this.imgstyle.current.setAttribute("src", this.props.data[this.state.f])
  };
  // 顺时针旋转

  rotateright = () => {
  	this.setState({ R: this.state.R + 90 })
  	this.imgstyle.current.style.transform = `translate(-50% ,-50%) rotate(${this.state.R}deg) scale(${this.state.SS},${this.state.SS})`
  };
  //逆时针旋转
  rotateleft = () => {
  	this.setState({ R: this.state.R - 90 })
  	this.imgstyle.current.style.transform = `translate(-50% ,-50%) rotate(${this.state.R}deg) scale(${this.state.SS},${this.state.SS})`
  };
  //放大
  showbig = () => {
  	if (this.state.i >= 0) {
  		this.setState({
  			S: this.state.S + 1,
  			i: this.state.i + 1,
  			SS: 1 * (this.state.S + 1),
  		})
  	} else {
  		this.setState({
  			S: this.state.S - 1,
  			i: this.state.i + 1,
  			SS: 1 / (this.state.S - 1),
  		})
  	}
  	this.imgstyle.current.style.transform = `translate(-50% ,-50%) rotate(${this.state.R}deg) scale(${this.state.SS},${this.state.SS})`
  };
  //缩小
  showmin = () => {
  	console.log(this.state.i, "this.state.i")
  	if (this.state.i <= 0) {
  		this.setState({
  			S: this.state.S + 1,
  			i: this.state.i - 1,
  			SS: 1 / (this.state.S + 1),
  		})
  	} else {
  		this.setState({
  			S: this.state.S - 1,
  			i: this.state.i - 1,
  			SS: 1 * (this.state.S - 1),
  		})
  	}
  	this.imgstyle.current.style.transform = `translate(-50% ,-50%) rotate(0deg) scale(${this.state.SS}, ${this.state.SS})`
  };
  // 重置
  reload = () => {
  	this.setState({ f: this.state.f, R: 0, S: 1, i: 0, SS: 1 })
  	this.imgstyle.current.style.transform = ""
  };
  render() {
  	const { toggleshow, showimgs } = this.props
  	const { data, f, R, SS } = this.state
  	const IconStyles = {
  		fontSize: "30px",
  		color: "white",
  		...this.props.IconStyles,
  	}

  	return (
  		<div className={style.viewer}>
  			{showimgs ? (
  				<div>
  					<div className={style.mask}/>
  					<div
  						className={`${style.dilong} toggleshow`}
  						onClick={toggleshow}
  					/>
  					<Icon
  						className={style.close}
  						style={{
  							fontSize: "30px",
  						}}
  						type="close"
  						onClick={toggleshow}
  					/>
  					<div className={`${style.bigimg} toggleshow`}>
  						<img
  							className="imgstyle"
  							ref={this.imgstyle}
  							alt={data[f]}
  							src={data[f]}
  							style={{
  								transform: `
                    translate(-50%, -50%) route(${R}deg) scale("${SS}", "${SS}")
                  `,
  							}}
  						/>
  					</div>
  					{/* 底部组件 */}
  					<div className={style.footer}>
  						<ul className={style.toolbar}>
  							<li>
  								<Icon
  									type="left"
  									style={IconStyles}
  									className={style.left}
  									onClick={this.leftshow}
  								/>
  							</li>
  							<li>
  								<Icon
  									type="right"
  									style={IconStyles}
  									className={style.right}
  									onClick={this.rightshow}
  								/>
  							</li>
  							<li>
  								{/* 左旋转 */}
  								<Icon
  									type="undo"
  									style={IconStyles}
  									className={style.rotateleft}
  									onClick={this.rotateleft}
  								/>
  							</li>
  							<li>
  								<Icon
  									type="reload"
  									style={IconStyles}
  									onClick={this.reload}
  								/>
  							</li>
  							<li>
  								{/* 右旋转 */}
  								<Icon
  									type="redo"
  									style={IconStyles}
  									className={style.rotateright}
  									onClick={this.rotateright}
  								/>
  							</li>
  							<li>
  								{/* 放大 */}
  								<Icon
  									type="plus-circle"
  									theme="filled"
  									style={IconStyles}
  									className={style.showbig}
  									onClick={this.showbig}
  								/>
  							</li>
  							<li>
  								{/* 缩小 */}
  								<Icon
  									className={style.showmin}
  									theme="filled"
  									style={IconStyles}
  									type="minus-circle"
  									onClick={this.showmin}
  								/>
  							</li>
  						</ul>
  					</div>
  				</div>
  			) : null}
  		</div>
  	)
  }
}

export default ShowImg
