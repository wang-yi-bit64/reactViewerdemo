/* eslint-disable react/jsx-filename-extension */
/*
 * @Author: your name
 * @Date: 2020-11-17 16:43:49
 * @LastEditTime: 2020-12-02 17:20:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\routes\ImgZoom.js
 */
import React from "react"
import {connect} from "dva"
import ImageZoom from "../components/ImgZoom"


const Demolist = () => {
	const sourceImageUrls = [
		"http://img.s.youfenba.com/material_thumb/BYX6Mm67ba.jpg",
		"http://img.s.youfenba.com/material_thumb/8nzxJwpsPX.jpg",
		"http://img.s.youfenba.com/material_thumb/SaNktASjmp.jpg",
		"http://img.s.youfenba.com/material_thumb/cTma2FTPEC.jpg",
		"http://img.s.youfenba.com/material_thumb/KnNc6D4sGs.jpg"
	]
	console.log(sourceImageUrls)
	const thumbImageUrls = sourceImageUrls
	return (
		<div>
			<ImageZoom srcs={thumbImageUrls} zIndex={1000}/>
		</div>
	)
}


const modelPorps = ({example}) => ({example})

export default connect(modelPorps)(Demolist)

