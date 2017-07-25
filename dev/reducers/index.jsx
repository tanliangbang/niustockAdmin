import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

//todos
import product from './product'

import user from './user'
import common from './common'
import systemManage from './systemManage'
//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	common,
	product,
	user, //用户的一些信息
	systemManage,
	form: formReducer,
	routing: routerReducer //整合路由
})

export default rootReducer
