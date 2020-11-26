/* eslint-disable react/jsx-filename-extension */
/*
 * @Author: your name
 * @Date: 2020-11-10 17:55:00
 * @LastEditTime: 2020-11-25 18:22:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\router.js
 */
import React from "react"
import { Router, Route, Switch } from "dva/router"
import IndexPage from "./routes/IndexPage"
import Rviewer from "./routes/rviewer"
import Demolist from "./routes/demo"
import ViewerDemo from "./routes/ViewerDemo"
import ImgZoom from "./routes/ImgZoom"
import TestDemo from "./routes/TestDemo"

function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact component={IndexPage}/>
				<Route path="/list" exact component={Rviewer}/>
				<Route path="/demo" exact component={Demolist}/>
				<Route path="/viewer" exact component={ViewerDemo}/>
				<Route path="/zoom" exact component={ImgZoom}/>
				<Route path="/moves" exact component={TestDemo}/>
				{/* <Route path="/" exact component={TestDemo} /> */}
			</Switch>
		</Router>
	)
}

export default RouterConfig
