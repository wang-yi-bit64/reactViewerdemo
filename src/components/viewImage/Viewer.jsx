/*
 * @Author: your name
 * @Date: 2020-11-14 10:57:22
 * @LastEditTime: 2020-11-16 11:17:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\components\viewImage\Viewer.jsx
 */
import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';

import ViewerCore from './ViewerCore';
class Viewer extends Component {
  constructor(props) {
    super(props)
    this.container = null
    this.defaultContainer = null
    if(typeof document !== 'undefined') {
      this.setDefaultContainer();
    }
    this.component = null;
  }
  // 设置默认容器
  setDefaultContainer() {
    this.defaultContainer = document.createElement('div')
  }
  // 渲染 Viewer 组件
  renderViewer() {
    if(this.props.visible || this.component) {
      if(!this.container) {
        if(this.props.container) {
          this.container = this.props.container
        } else {
          if(!this.defaultContainer) {
            this.setDefaultContainer()
          }
          this.container = this.defaultContainer
          document.body.appendChild(this.container)
        }
      }
      let instance = this
      //  手动合并
      console.log('renderViewer', this,ViewerCore, this.container);
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        <ViewerCore {...this.props}/>,
        this.container,
        function() {
          instance.component = this
        }
      )
    }
  }
  // 移除 Viewer 组件
  removerViewer() {
    if(this.container) {
      const container = this.container
      // 从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。
      ReactDOM.unmountComponentAtNode(container);
      this.container = null
      this.component = null
    }
  }
  // 卸载
  componentWillUnmount() {
    if(this.props.visible && this.props.onClose) {
      this.props.onClose()
    }
    this.removerViewer()
  }
  // 挂载
  componentDidMount() {
    console.log('componentDidMount ReactDOM', ReactDOM);
    this.renderViewer()
  }
  // 组件更新
  componentDidUpdate(prevProps) {
    if(this.props.container !== prevProps.container) {
      this.component = null
      if(this.props.container) {
        if(this.props.container && !prevProps.container) {
          document.body.removeChild(this.container)
        }
        this.container = this.props.container
      } else {
        this.container = this.defaultContainer
        document.body.appendChild(this.container)
      }
    }
    this.renderViewer()
  }


  render() {
    return <div>这是viewer组件</div>
  }
}

export default Viewer;