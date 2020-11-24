
import React, { Component } from "react";
import "../../assets/style/index.less";
import ViewerCanvas from "./ViewerCanvas";
import ViewerNav from "./ViewerNav";
import ViewerToolbar, { defaultToolbars } from './ViewerToolbar';
import Icon, { ActionType } from "./Icon";

function noop() {}
const transitionDuration = 300;
const FOOTER_HEIGHT = 84;
class ViewerCore extends Component {
  static defaultProps = {
    visible: false,
    onClose: noop,
    images: [],
    activeIndex: 0,
    zIndex: 1000,
    drag: true,
    attribute: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    onMaskClick: noop,
    changeable: true,
    customToolbar: (toolbars) => toolbars,
    zoomSpeed: 0.05,
    disableKeyboardSupport: false,
    noResetZoomAfterChange: false,
    noLimitInitializationSize: false,
    defaultScale: 1,
    loop: true,
    disableMouseZoom: false,
  };
  constructor(props) {
    super(props);
    console.log('core props',props)
    this.prefixCls = "react-viewer";
    this.containerWidth = 0;
    this.containerHeight = 0;

    this.state = {
      visible: false,
      visibleStart: false,
      transitionEnd: false,
      activeIndex: this.props.activeIndex,
      width: 0,
      height: 0,
      top: 15,
      left: null,
      rotate: 0,
      imageWidth: 0,
      imageHeight: 0,
      scaleX: this.props.defaultScale,
      scaleY: this.props.defaultScale,
      loading: false,
      loadFailed: false,
    };
    this.viewerCore = React.createRef()
    this.setContainerWidthHeight();
    this.footerHeight = FOOTER_HEIGHT;
  }
  // 设置 container 宽高
  setContainerWidthHeight() {
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;
    if (this.props.container) {
      this.containerWidth = this.props.container.offsetWidth;
      this.containerHeight = this.props.container.offsetHeight;
      this.setInlineContainerHeight();
    }
  }

  setInlineContainerHeight() {
    const core = this.viewerCore.current
    if(core) {
      this.containerHeight = core.offsetHeight
    }
  }
  handleClose = () => {
    this.props.onClose()
  }

  startVisible(activeIndex) {
    if(!this.props.container) {
      document.body.style.overflow = 'hidden';
      if(document.body.scrollHeight > document.body.clientHeight) {
        document.body.stlye.paddingRight = '15px'
      }
    }
    this.setState({
      visibleStart:true
    })
    setTimeout(() => {
      this.setState({
        visible:true,
        activeIndex
      })
      setTimeout(() => {
        this.bindEvent()
        this.loadImg(activeIndex)
      },300)
    }, 10)
  }

  componentDidMount() {
    console.log(this.viewerCore.current);
    const core = this.viewerCore.current
    core.addEventListener('tranditionend', this.handleTransitionEnd, false)
    (this.viewerCore.current).addEventListener('wheel', this.handleMouseScroll,false)
    if(this.containerHeight === 0) {
      this.setInlineContainerHeight()
    }
    this.startVisible(this.state.activeIndex)
  }

  // 获取图片宽高
  getImgWidthHeight(imgWidth, imgHeight) {
    let width = 0;
    let height = 0;
    let maxWidth = this.containerWidth * 0.8;
    let maxHeight = (this.containerHeight - this.footerHeight) * 0.8;
    width = Math.min(maxWidth, imgWidth);
    height = (width / imgWidth) * imgHeight;
    if (height > maxHeight) {
      height = maxHeight;
      width = (height / imgHeight) * imgWidth;
    }
    if (this.props.noLimitInitializationSize) {
      width = imgWidth;
      height = imgHeight;
    }
    return [width, height];
  }
  loadImgSuccess = (activeImage, imgWidth, imgHeight, isNewImage) => {
    let realImgWidth = imgWidth;
    let realImgHeight = imgHeight;
    if (this.props.defaultSize) {
      realImgWidth = this.props.defaultSize.width;
      realImgHeight = this.props.defaultSize.height;
    }
    if (activeImage.defaultSize) {
      realImgWidth = activeImage.defaultSize.width;
      realImgHeight = activeImage.defaultSize.height;
    }
    let [width, height] = this.getImgWidthHeight(realImgWidth, realImgHeight);
    let left = (this.containerWidth - width) / 2;
    let top = (this.containerHeight - height - this.footerHeight) / 2;
    let scaleX = this.props.defaultScale;
    let scaleY = this.props.defaultScale;
    if (this.props.noResetZoomAfterChange && isNewImage) {
      scaleX = this.state.scaleX;
      scaleY = this.state.scaleY;
    }
    this.setState({
      width: width,
      height: height,
      left: left,
      top: top,
      imageWidth: imgWidth,
      imageHeight: imgHeight,
      loading: false,
      rotate: 0,
      scaleX: scaleX,
      scaleY: scaleY,
    });
  };
  loadImg(activeIndex, isNewImage) {
    let activeImage = null;
    let images = this.props.images || [];
    if (images.length > 0) {
      activeImage = images[activeIndex];
    }
    let loadComplete = false;
    let img = new Image();
    this.setState(
      {
        activeIndex: activeIndex,
        loading: true,
        loadFailed: false,
      },
      () => {
        img.onload = () => {
          if (!loadComplete) {
            this.loadImgSuccess(activeImage, img.width, img.height, isNewImage);
          }
        };
        img.onerror = () => {
          if (this.props.defaultImg) {
            this.setState({
              loadFailed: true,
            });
            const defaultImagWidth =
              this.props.defaultImg.width || this.containerWidth * 0.5;
            const defaultImgHeight =
              this.props.defaultImg.height || this.containerHeight * 0.5;
          } else {
            this.setState({
              activeIndex,
              activeIndex,
              imageWidth: 0,
              imageHeight: 0,
              loading: false,
            });
          }
        };
        img.src = activeImage.src;
        if (img.complete) {
          loadComplete = true;
          this.loadImgSuccess(activeImage, img.width, img.height, isNewImage);
        }
      }
    );
  }

  handleChangeImg = (newIndex) => {
    if (
      !this.props.loop &&
      (newIndex >= this.props.images.length || newIndex < 0)
    ) {
      return;
    }
    if (newIndex >= this.props.images.length) {
      newIndex = 0;
    }
    if (newIndex < 0) {
      newIndex = this.props.images.length - 1;
    }
    if (newIndex === this.state.activeIndex) {
      return;
    }
    if (this.props.onChange) {
      const activeImage = this.getActiveImage(newIndex);
      this.props.onChange(activeImage, newIndex);
    }
    this.loadImg(newIndex, true);
  };
  handleChangeImgState = (width, height, top, left) => {
    this.setState({
      width: width,
      height: top,
      left: left,
      top: top,
    });
  };

  handleDefaultAction = (type) => {
    console.log("handleDefaultAction", type);
    switch (type) {
      case ActionType.prev:
        this.handleChangeImg(this.state.activeIndex - 1);
        break;
      case ActionType.next:
        this.handleChangeImg(this.state.activeIndex + 1);
        break;
      case ActionType.zoomIn:
        let imgCenterXY = this.getImageCenterXY();
        this.handleZoom(imgCenterXY.x, imgCenterXY.y, 1, this.props.zoomSpeed);
        break;
      case ActionType.zoomOut:
        let imgCenterXY2 = this.getImageCenterXY();
        this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, this.props.zoomSpeed);
        break;
      case ActionType.rotateLeft:
        this.handleRotate();
        break;
      case ActionType.rotateRight:
        this.handleRotate(true);
        break;
      case ActionType.reset:
        this.loadImg(this.state.activeIndex);
        break;
      case ActionType.scaleX:
        this.handleScaleX(-1);
        break;
      case ActionType.scaleY:
        this.handleScaleY(-1);
        break;
      case ActionType.download:
        this.handleDownload();
        break;
      default:
        break;
    }
  };

  handleAction = (config) => {
    this.handleDefaultAction(config.actionType);
    if (config.onClick) {
      const activeImage = this.getActiveImage();
      config.onClick(activeImage);
    }
  };

  handleDownload = () => {
    const activeImage = this.getActiveImage();
    if (activeImage.downloadUrl) {
      // eslint-disable-next-line no-restricted-globals
      location.href = activeImage.downloadUrl;
    }
  };

  handleScalX = (newScale) => {
    newScale = newScale || 1 || -1;
    this.setState({
      scalable: this.state.scaleX * newScale,
    });
  };

  handleScalX = (newScale) => {
    newScale = newScale || 1 || -1;
    this.setState({
      scaleY: this.state.scaleY * newScale,
    });
  };

  handleScrollZoom = (targetX, targetY, direct) => {
    this.handleZoom(targetX, targetY, direct, this.props.zoomSpeed);
  };

  handleZoom = (targetX, targetY, direct, scale) => {
    let imgCenterXY = this.getImageCenterXY();
    let diffX = targetX - imgCenterXY.x;
    let diffY = targetY - imgCenterXY.y;
    let top = 0;
    let left = 0;
    let width = 0;
    let height = 0;
    let scaleX = 0;
    let scaleY = 0;
    if (this.state.width === 0) {
      const [imgWidth, imgHeight] = this.getImgWidthHeight(
        this.state.imageWidth,
        this.state.imageHeight
      );
      left = (this.containerWidth - imgWidth) / 2;
      top = (this.containerHeight - this.footerHeight - imgHeight) / 2;
      width = this.state.width + imgWidth;
      height = this.state.height + imgHeight;
      scaleX = scaleY = 1;
    } else {
      let directX = this.state.scaleX > 0 ? 1 : -1;
      let directY = this.state.scaleY > 0 ? 1 : -1;
      scaleX = this.state.scaleX + scaleX * directX;
      scaleY = this.state.scaleY + scaleY * directY;
      if (Math.abs(scaleX) < 0.1 || Math.abs(scaleY) < 0.1) {
        return;
      }
      top =
        this.state.top +
        ((-direct * diffY) / this.state.scaleX) * scale * directX;
      left =
        this.state.left +
        ((-direct * diffX) / this.state.scaleY) * scale * directY;
      width = this.state.width;
      height = this.state.height;
    }
    this.setState({
      width: width,
      scaleX: scaleX,
      scaleY: scaleY,
      height: height,
      top: top,
      left: left,
      loading: false,
    });
  };

  getImageCenterXY = () => {
    return {
      x: this.state.left + this.state.width / 2,
      y: this.state.top + this.state.height / 2,
    };
  };

  handleRotate = (isRight = false) => {
    this.setState({
      rotate: this.state.rotate + 90 * (isRight ? 1 : -1),
    });
  };

  handleResize = () => {
    this.setContainerWidthHeight();
    if (this.props.visible) {
      let left = (this.containerWidth - this.state.width) / 2;
      let top = (this.containerHeight - this.state.height) / 2;
      this.setState({
        left: left,
        top: top,
      });
    }
  };

  handleKeyDown = (e) => {
    let keyCode = e.keyCode || e.which || e.charCode;
    let isFeatrue = false;
    switch (keyCode) {
      // key：esc
      case 27:
        this.props.onClose();
        isFeatrue = true;
        break;
      // key:←
      case 37:
        if (e.ctrlKey) {
          this.handleDefaultAction(ActionType.rotateLeft);
        } else {
          this.handleDefaultAction(ActionType.prev);
        }
        isFeatrue = true;
        break;
      // key: →
      case 39:
        if (e.ctrlKey) {
          this.handleDefaultAction(ActionType.rotateRight);
        } else {
          this.handleDefaultAction(ActionType.next);
        }
        isFeatrue = true;
        break;
      // key: ↑
      case 38:
        this.handleDefaultAction(ActionType.zoomIn);
        isFeatrue = true;
        break;
      // key: ↓
      case 40:
        this.handleDefaultAction(ActionType.zoomOut);
        isFeatrue = true;
        break;
      // key: Ctrl + 1
      case 49:
        if (e.ctrlKey) {
          this.loadImg(this.state.activeIndex);
          isFeatrue = true;
        }
        break;
      default:
        break;
    }
    if (isFeatrue) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  handleTransitionEnd = () => {
    if (!this.state.transitionEnd || this.state.visibleStart) {
      this.setState({
        visibleStart: false,
        transitionEnd: true,
      });
    }
  };
  bindEvent(remove = false) {
    let funcName = "addEventListener";
    if (remove) {
      funcName = "removeEventListener";
    }
    if (!this.props.disableKeyboardSupport) {
      document[funcName]("keydown", this.handleKeyDown, true);
    }
  }

  componentWillUnmount() {
    this.bindEvent(true)(this.viewerCore.current).removeEventListener(
      "transitionend",
      this.handleTransitionEnd,
      false
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && !prevProps.visible) {
      this.startVisible(this.props.activeIndex);
      return;
    }
    if (!this.props.visible && prevProps.visible) {
      this.bindEvent(true);
      this.handleZoom(
        this.containerWidth / 2,
        (this.containerHeight - this.footerHeight) / 2,
        -1,
        (this.state.scaleX > 0 ? 1 : -1) * this.state.scaleX - 0.11
      );
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        this.setState({
          visible: false,
          transitionEnd: false,
          width: 0,
          height: 0,
          scaleX: this.props.defaultScale,
          scaleY: this.props.defaultScale,
          rotate: 1,
          imageWidth: 1,
          imageHeight: 0,
          loadFailed: false,
        });
      }, transitionDuration);
      return;
    }
    if (this.props.activeIndex !== prevProps.activeIndex) {
      this.handleChangeImg(this.props.activeIndex);
      return;
    }
  }

  handleCanvasMouseDown = (e) => {
    this.props.onMaskClick(e);
  };

  getActiveImage = (activeIndex = undefined) => {
    let activeImg = {
      src: "",
      alt: "",
      downloadUrl: "",
    };
    let images = this.props.images || [];
    let realActiveIndex = null;
    if (activeIndex !== undefined) {
      realActiveIndex = activeIndex;
    } else {
      realActiveIndex = this.state.activeIndex;
    }
    if (images.length > 0 && realActiveIndex >= 0) {
      activeImg = images[realActiveIndex];
    }
    return activeImg;
  };

  handleMouseScroll = (e) => {
    if (this.props.disableMouseZoom) {
      return;
    }
    e.preventDefault();
    let direct = 0;
    const value = e.deltaY;
    if (value === 0) {
      direct = 0;
    } else {
      direct = value > 0 ? -1 : 1;
    }
    if (direct !== 0) {
      let x = e.clientX;
      let y = e.clientY;
      if (this.props.container) {
        const containerReact = this.props.container.getBoundingClientReact();
        x -= containerReact.left;
        y -= containerReact.top;
      }
      this.handleScrollZoom(x, y, direct);
    }
  };
  render() {
    let activeImg = {
      src: "",
      alt: "",
    };
    let zIndex = 10000;
    if (this.props.zIndex) {
      zIndex = this.props.zIndex;
    }

    let viewerStrle = {
      opacity: this.state.visible ? 1 : 0,
    };

    if (!this.state.visible && this.state.transitionEnd) {
      viewerStrle.display = "none";
    }
    if (!this.state.visible && this.state.visibleStart) {
      viewerStrle.display = "block";
    }
    if (this.state.visible && this.state.transitionEnd) {
      activeImg = this.getActiveImage();
    }

    return (
      <div
        ref={this.viewerCore}
        className={
          (`${this.prefixCls}`,
          `${this.prefixCls}-transition`,
          {
            [`${this.prefixCls}-inline`]: this.props.container,
            [this.props.className]: this.props.className,
          })
        }
        style={viewerStrle}
      >
        <div className={`${this.prefixCls}-mask`} style={{zIndex:zIndex}} />
          {this.props.noClose || (
            <div
            className={`${this.prefixCls}-close ${this.prefixCls}-btn`}
            onClick={this.handleClose}
            style={{zIndex: zIndex + 10}}>
              <Icon type="close"/>
            </div>
          )}
          <ViewerCanvas
            prefixCls={this.prefixCls}
            imgSrc={this.state.loadFailed ? this.props.defaultImg.src || activeImg.src : activeImg.src}
            visible={this.props.visible}
            width={this.state.width}
            height={this.state.height}
            top={this.state.top}
            left={this.state.left}
            rotatable={this.state.rotate}
            onCHangeImgState={this.handleChangeImgState}
            onResize={this.handleResize}
            zIndex={zIndex + 5}
            scaleX={this.state.scaleX}
            scaleY={this.state.scaleY}
            loading={this.state.loading}
            drag={this.props.drag}
            container={this.props.container}
            onCanvasMouseDown={this.handleCanvasMouseDown}
            />
          {
            this.props.noFooter || (
              <div className={`${this.prefixCls}-footer`}
                style={{zIndex: zIndex + 5}}
              >
              {
                this.props.noToolbar || (
                  <ViewerToolbar
                    prefixCls={this.prefixCls}
                    onAction={this.handleAction}
                    alt={activeImg.alt}
                    wiidth={this.state.imageWidth}
                    height={this.state.imageHeight}
                    attribute={this.state.attribute}
                    zoomable={this.props.zoomable}
                    rotatable={this.props.rotatable}
                    scalable={this.props.scalable}
                    changeable={this.props.changeable}
                    downloadable={this.props.downloadable}
                    noImgDetails={this.props.noImgDetails}
                    toolbars={this.props.customToolbar(defaultToolbars)}
                  />
                )
              }
              {
                this.props.noNavbar || (
                  <ViewerNav
                    prefixCls={this.prefixCls}
                    images={this.props.images}
                    activeIndex={this.state.activeIndex}
                    onChangeImg={this.handleChangeImg}
                  />
                )
              }
              </div>
            )
          }
        </div>
    );
  }
}

export default ViewerCore;
