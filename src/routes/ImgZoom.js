/*
 * @Author: your name
 * @Date: 2020-11-17 16:43:49
 * @LastEditTime: 2020-11-24 13:59:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\routes\ImgZoom.js
 */
import React from 'react';
import {connect} from 'dva'
import ImageZoom from '../components/ImgZoom'


const Demolist = () => {
  let sourceImageUrls = [
    "http://img.s.youfenba.com/material_thumb/BYX6Mm67ba.jpg",
    "http://img.s.youfenba.com/material_thumb/8nzxJwpsPX.jpg",
    "http://img.s.youfenba.com/material_thumb/SaNktASjmp.jpg",
    "http://img.s.youfenba.com/material_thumb/cTma2FTPEC.jpg",
    "http://img.s.youfenba.com/material_thumb/KnNc6D4sGs.jpg"
  ]
  let thumbImageUrls = sourceImageUrls
  // let thumbImageUrls = ["http://img.s.youfenba.com/material_thumb/BYX6Mm67ba.jpg"]
  return (
    <div>
      <ImageZoom srcs={thumbImageUrls} />
    </div>
  )
}

// class Demolist extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [
//         "http://img.s.youfenba.com/material_thumb/BYX6Mm67ba.jpg",
//         "http://img.s.youfenba.com/material_thumb/8nzxJwpsPX.jpg",
//         "http://img.s.youfenba.com/material_thumb/SaNktASjmp.jpg",
//         "http://img.s.youfenba.com/material_thumb/cTma2FTPEC.jpg",
//         "http://img.s.youfenba.com/material_thumb/KnNc6D4sGs.jpg"
//       ],
//     };
//   }



//   render() {
//     const { data } = this.state;
//     console.log(data);
//     return (
//       <div>
//           <RViewer imageUrls={data}>
//             <ul>
//               {
//                 data.map((pic, index) => {
//                   return (
//                     <li key={index} style={{marginBottom: '20px'}}>
//                     <span>image {index+1}</span>
//                     <RViewerTrigger index={index}>
//                       <img src={pic} alt={pic} style={{width:"50px",verticalAlign:"middle"}}  />
//                     </RViewerTrigger>
//                     </li>
//                   )
//                 })
//               }
//             </ul>
//           </RViewer>
//           {/*这里需要设置index值，告知触发图片预览该显示哪张图片*/}
//       </div>
//     );
//   }
// }

const modelPorps = ({example}) => ({example})

export default connect(modelPorps)(Demolist)


