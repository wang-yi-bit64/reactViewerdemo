/*
 * @Author: your name
 * @Date: 2020-11-10 17:55:00
 * @LastEditTime: 2020-11-26 10:10:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\index.js
 */

import dva from "dva"
import createLoading from "dva-loading"

import "./index.css"
// 1. Initialize
const app = dva({
	...createLoading({
		effects: true
	})
})

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/example").default)

// 4. Router
app.router(require("./router").default)

// 5. Start
app.start("#root")
