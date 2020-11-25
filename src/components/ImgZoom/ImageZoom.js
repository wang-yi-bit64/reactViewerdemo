import React from 'react'
import classes from './ImageZoom.css'
let time = null
export default class ImageZoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coefficient: 1,
      showSrc: null,
      index: 0,
      glassLimit: {
        x: null,
        y: null,
        isClick: false,// 是否被点击
        initX: null, // 初始坐标
        initY: null // 初始坐标
      },
      perPosition:{
        x:0,
        y:0
      },
      drag:false,
      translateX: 0,
      translateY: 0,
      time: null,
      rotate: 0
    }
  }
  componentDidMount() {
    document.addEventListener('mouseup',this.holdUp())
    document.addEventListener('mousemove' , this.mouseMove)

  }
  componentWillUnmount() {
    document.current.removeEventListener('mousemove' , this.mouseDown)
  }
  // 监听 onket enter

  onKeyEnter = e => {
    if(e.target.keyCode === 27) {

    }
  }
  // 鼠标按下
  holdDown = () => {
    this.setState({
      drag:true
    })
  }
  // 鼠标松开
  holdUp = () => {
    this.setState({
      drag:false
    })
  }
  // 选择图片重置
  selectImg = (src, index) => {
    this.setState({
      showSrc: src,
      index: index,
      coefficient: 1,
      translateX: 0,
      translateY: 0,
      rotate: 0
    })
  }

  // 上一步
  preStep = () => {
    const { srcs } = this.props
    const { index } = this.state
    const preIndex = index - 1
    index !== 0 && this.setState({showSrc: srcs[preIndex], index: preIndex, coefficient: 1, translateX: 0, translateY: 0})
  }
  // 下一步
  nextStep = () => {
    const { srcs } = this.props
    const { index, rotate } = this.state
    const preIndex = index + 1
    console.log('srcs list',index !== srcs.length);
    index !== srcs.length && this.setState({showSrc: srcs[preIndex], index: preIndex, coefficient: 1, translateX: 0, translateY: 0, rotate: 0})
  }

  fangda = () => {
    // 极限放大2倍  可动态
    // this.state.coefficient !== 1.4 && this.setState({
    //   coefficient: Number(this.state.coefficient + 0.2)
    // })
    this.setState({
      coefficient: Number(this.state.coefficient + 0.1)
    })
  }

  suoxiao = () => {
    // 最小不放大正常显示
    console.log(this.state.coefficient);
    if(this.state.coefficient.toFixed(1) < .4) return false
    this.state.coefficient.toFixed(1) !== 0.4 && this.setState({
      coefficient: Number(this.state.coefficient.toFixed(1) - 0.1)
    })
  }

  // 鼠标点击事件
  mouseDown = e => {
    e.preventDefault()
    e.stopPropagation()
    this.holdDown()
    const {translateX,translateY}= this.state
    this.setState({
      perPosition: {
        x:e.clientX - translateX,
        y:e.clientY - translateY
      }
    })
  }
  mouseMove = e => {
    e.preventDefault()
    e.stopPropagation()
    const {x,y} = this.state.perPosition
    if(this.state.drag) {
      this.setState({
        translateX:e.clientX - x,
        translateY:e.clientY - y
      })
    }
  }
  leftRotate = () => {
    let {rotate} = this.state
    this.setState({
      rotate:rotate - 90
    })
  }
  rightRotate = () => {
    let {rotate} = this.state
    this.setState({
      rotate:rotate + 90
    })
  }
  render() {
    const { srcs } = this.props
    const { showSrc , drag ,translateX,translateY,index,rotate} = this.state
    const imgStyle = {
      position:'absolute',
      top:translateY,
      left:translateX,
      cursor:drag ? 'move': 'move',
      transform:`rotate(${rotate}deg)`
    }
    return (
      <div>
        {
          srcs.map((src, key) =>  <div className={classes.imageZoom} key={key}>
          <img src={src} alt={src} className={classes.img} onClick={(el) => this.selectImg(src, key)} />
          {/* 放大盒子 */}
          {
             showSrc && <div className={classes.glassBox}>
             {/* 显示区域 */}
             <div className={classes.glass}   onMouseUp={this.holdUp}>
               <img onMouseDown={this.mouseDown} src={showSrc} onMouseUp={this.holdUp} alt={showSrc} dragging={drag.toString()} className={classes.glassImg} width={100 * this.state.coefficient  + '%'} height={100 * this.state.coefficient + '%'} style={imgStyle}/>
             </div>
             {/* 操作按钮 */}

           </div>
          }
        </div>)
        }
        <div className={classes.footer} style={{display: showSrc ? 'block': 'none'}}>
          <div className={classes.footetnav}>
            <span onClick={() => this.preStep(index)}>上一张</span>
            <span onClick={() => this.nextStep(index)}>下一张</span>
            <span onClick={() => this.fangda()}>放大</span>
            <span onClick={() => this.suoxiao()}>缩小</span>
            <span onClick={this.leftRotate}>左旋</span>
            <span onClick={this.rightRotate}>右旋</span>
          </div>
        </div>
      </div>

    )
  }
}
