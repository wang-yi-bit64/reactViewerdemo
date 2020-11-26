/*
 * @Author: your name
 * @Date: 2020-11-10 17:55:00
 * @LastEditTime: 2020-11-25 18:22:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\services\example.js
 */
import request from "../utils/request"

export function query() {
	return request("/api/users")
}
