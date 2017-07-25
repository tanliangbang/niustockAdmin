import * as actionConstant from '../constants/actionConstant';
//定义方法名称，取个名称，action 内使用一个字符串类型的 type 字段来表示将要执行的动作
//初始化数据
const initialState = {
	registState:"1",
	userList:[],
	userDetail:{},
	userInvestList:[],
	userInfo:null
}


export default function user(state = initialState, action) {
	switch(action.type) {
		case actionConstant.SET_REGIST_STATE:
			return Object.assign({}, state, {
				registState:action.registState
			});
		case actionConstant.SET_USERINFO:
			console.log("bbbbbbbbbbbbbbbbbbbbb")
			return Object.assign({}, state, {
				userInfo:action.userInfo
			});
		case actionConstant.GET_USER_DETAIL:
			return Object.assign({}, state, {
				userDetail:action.userDetail
			});
		case actionConstant.GET_USER_INVEST_LIST:
			return Object.assign({}, state, {
				userInvestList:action.userInvestList
			});

		case actionConstant.SET_USER_LIST:
			return Object.assign({}, state, {
				userList:action.userList
			});
		default : return state;
	}
}
