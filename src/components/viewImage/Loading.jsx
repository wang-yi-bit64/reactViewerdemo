import React, { Component } from "react";

export default class loading extends Component {

  render() {
    let cls = 'circle-loaidng'
    return (
      <div className="loading-wrap" style={this.props.style}>
        <div className={cls}></div>
      </div>
    )
  }
}
