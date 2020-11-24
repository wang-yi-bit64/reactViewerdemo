import React, { Component } from 'react';
import  {RViewer, RViewerTrigger} from 'react-viewerjs'
import {connect} from 'dva'
class Rviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        "http://img.s.youfenba.com/material_thumb/BYX6Mm67ba.jpg",
        "http://img.s.youfenba.com/material_thumb/8nzxJwpsPX.jpg",
        "http://img.s.youfenba.com/material_thumb/SaNktASjmp.jpg",
        "http://img.s.youfenba.com/material_thumb/cTma2FTPEC.jpg",
        "http://img.s.youfenba.com/material_thumb/KnNc6D4sGs.jpg"
      ],
    };
  }



  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
      1231
          <RViewer imageUrls={data}>
            <ul>
              {
                data && data.map((pic, index) => {
                  return (
                    <li key={index} style={{marginBottom: '20px'}}>
                    <span>image {index+1}</span>
                    <RViewerTrigger index={index}>
                      <img src={pic} alt={pic} style={{width:"50px",verticalAlign:"middle"}}  />
                    </RViewerTrigger>
                    </li>
                  )
                })
              }
            </ul>
          </RViewer>
          {/*这里需要设置index值，告知触发图片预览该显示哪张图片*/}
      </div>
    );
  }
}

const modelPorps = ({example}) => ({example})

export default connect(modelPorps)(Rviewer)


