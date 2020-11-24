import React, { Component } from 'react';

class ViewerNav extends Component {
  static defaultProps = {
    activeIndex: 0
  }
  handleChangeImg = (newIndex) => {
    if(this.props.activeIndex === newIndex) {
      return
    }
    this.props.onChangeImg(newIndex)
  }
  render() {
    let marginLeft = `calc(50% - ${this.props.activeIndex + 1} * 31px)`

    let listStyle = {
      marginLeft:marginLeft
    }

    return (
      <div className={`${this.props.prefixCls}-navbar`}>
        <ul className={`${this.props.prefixCls}-list-transition`} style={listStyle}>
          {this.props.images.map((item,index) => <li
            key={index}
            className={index === this.props.activeIndex ? 'active': ''}
            onClick={() => this.handleChangeImg(index)}
          >
            <img src={item.src} alt={item.src}/>
          </li>)}
        </ul>
      </div>
    );
  }
}

export default ViewerNav;
