import React, { PureComponent, Children, cloneElement } from "react";
import ReactDom from "react-dom";
import Viewer from "viewerjs";
import 'viewerjs/dist/viewer.css'

class ImageListRender extends PureComponent {
  constructor(props) {
    super(props)
    this.imageListWrapper = React.createRef()
  }
  render() {
    const { imageUrls } = this.props;
    return (
      <div style={{ display: "none" }} ref={this.imageListWrapper}>
        {imageUrls.map((url, index) => {
          return <img src={url} alt={url} key={index} style={{ display: "none" }} />
        })}
      </div>
    );
  }
  componentDidMount() {
    const {index, hide , options:customOptions} = this.props
    console.log('ImageListRender ', index , hide, customOptions)
    const {
      toolbar:customToolbar,
      hidden,
      ...restOptions
    } = customOptions||{toolbar:{}}
    let options = {
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
        hidden&&hidden()
        hide()////关闭的时候通过调用父组件方法触发父组件state来卸载子组件
      }
    }
    console.log('ImageListRender-start')
    console.log(this.imageListWrapper.current)
    console.log(options)
    console.log('ImageListRender-end')
    this.viewer = new Viewer(ReactDom.findDOMNode(this.imageListWrapper.current), options)
    this.viewer.view(index);
  }
  componentWillUnmount() {
    this.this.viewer.destroy();
  }
}

export default ImageListRender;
