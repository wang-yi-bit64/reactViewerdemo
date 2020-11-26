/* eslint-disable import/first */
/* eslint-disable react/jsx-filename-extension */
/*
 * @Author: your name
 * @Date: 2020-11-13 16:32:16
 * @LastEditTime: 2020-11-25 18:20:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\routes\demo.js
 */
import React from "react"
import {RViewer, RViewerTrigger} from "../components/Viewer"
import {connect} from "dva"


const Demolist = () => {
	const sourceImageUrls = [
		"http://img.s.youfenba.com/material_thumb/BYX6Mm67ba.jpg",
		"http://img.s.youfenba.com/material_thumb/8nzxJwpsPX.jpg",
		"http://img.s.youfenba.com/material_thumb/SaNktASjmp.jpg",
		"http://img.s.youfenba.com/material_thumb/cTma2FTPEC.jpg",
		"http://img.s.youfenba.com/material_thumb/KnNc6D4sGs.jpg"
	]
	const thumbImageUrls = sourceImageUrls
	console.log(RViewer)
	return (
		<RViewer imageUrls={sourceImageUrls}>
			<ul>
				{thumbImageUrls.map((pic, index) => (
					<li key={index} style={{marginBottom: "20PX"}}>
						{console.log(pic, index)}
						<span>image {index + 1}</span>
						{/*By default, the index value is 0,So it is necessary to set the index prop*/}
						{/* <RViewerTrigger index={index}> */}
						<img src={pic} alt={pic} style={{width: "50px", verticalAlign: "middle"}}/>
						{/* </RViewerTrigger> */}
					</li>
				))
				}
			</ul>
		</RViewer>
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

