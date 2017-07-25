import { Tool, merged } from '../Tool';
import * as actionConstant from '../constants/actionConstant';
import * as fetch from '../utils/fetchData';

export const setRegistStateFn = (registState)=>({
        type: actionConstant.SET_REGIST_STATE,
        registState :registState
})

export const initUserDetail = (response) => ({
    type: actionConstant.GET_USER_DETAIL,
    userDetail: response,
})

export const setUserInfoFn = (response) => ({
    type: actionConstant.SET_USERINFO,
    userInfo: response,
})

export const initInvestList = (response) => ({
    type: actionConstant.GET_USER_INVEST_LIST,
    userInvestList: response,
})

export function setUserListFn(response) {
    return {
        type: actionConstant.SET_USER_LIST,
        userList :response
    }
}

export const getInvestList = (id) => {
    return dispatch => {
        Tool.get(`/api/bondorders/users/`+id, {}, (res) => {
            dispatch(initInvestList(res))
        }, (error) => {
            console.log('error: ', error)
        });
    }
}

export const setUserInfo = (userInfo) => {
    return dispatch => {
        dispatch(setUserInfoFn(userInfo))
    }
}

export const getUserInfo = () => {
    console.log(window.localStorage.userInfo)
    var userInfo = JSON.parse(window.localStorage.userInfo)
    return dispatch => {
        dispatch(setUserInfo(userInfo))
    }
}


export const login = (data,resolve,reject) => {
    var account = data.account;
    var password = Tool.hex_md5(data.password)
    return dispatch => {
        fetch.postData(`/api/employees/login`,{account:account,password:password}).then((res)=> {
            resolve(res);
        }).catch((error)=> {
            reject(error)
        });



    }
}



export const getUserList = () => {
    return dispatch => {
        Tool.get(`/api/bondusers`, {}, (res) => {
            dispatch(setUserListFn(res))
        }, (error) => {
            console.log('error: ', error)
        });
    }
}

export const getUserDetail = (id) => {
    return dispatch => {
        Tool.get(`/api/bondusers/`+id, {}, (res) => {
            dispatch(initUserDetail(res[0]))
        }, (error) => {
            console.log('error: ', error)
        });
    }
}

export const loginOut = () => {
    Tool.setCookie("nguss", "", -1);
    Tool.setCookie("ngtoken", "", -1);
    return dispatch => {
        dispatch(setUserInfo(null))
    }
}




