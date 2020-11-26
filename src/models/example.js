/*
 * @Author: your name
 * @Date: 2020-11-10 17:55:00
 * @LastEditTime: 2020-11-26 13:46:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactViewer\src\models\example.js
 */

export default {

	namespace: "example",

	state: {},

	subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
		},
	},

	effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
			yield put({ type: "save" })
		},
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload }
		},
	},

}
