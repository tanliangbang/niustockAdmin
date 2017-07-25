//这个叫做action，用于更新reduer中的state
import * as fetch from '../utils/fetchData';
import { Tool, merged } from '../Tool';
import * as actionConstant from '../constants/actionConstant';

export const initProductList = (response) => ({
    type: actionConstant.GET_PRODUCT_LIST,
    productList: response,
})

export const initProductDetail = (response) => ({
    type: actionConstant.GET_PRODUCT_DETAIL,
    productDetail: response,
})

export const initProductRecord = (response) => ({
    type: actionConstant.GET_PRODUCT_RECORD,
    productRecord: response,
})

export const getProductList = () => {
    return dispatch => {
        Tool.get(`/api/bond/projects`, {}, (res) => {
            dispatch(initProductList(res))
        }, (error) => {
            console.log('error: ', error)
        });
    }
}

export const getProductRecord = (id) => {
    return dispatch => {
        Tool.get(`/api/bondorders/projects/`+id, {}, (res) => {
            console.log(res)
            dispatch(initProductRecord(res))
        }, (error) => {
            console.log('error: ', error)
        });
    }
}


export const addProject = (data,resolve, reject) => {
    return dispatch => {
        fetch.postData(`/api/bond/projects`,data).then((res)=> {
            resolve(res)
        }).catch((error)=> {
            reject();
        });
    }
}


export const getProductDetail = (id) => {
    return dispatch => {
        Tool.get(`/api/bond/projects/`+id, {}, (res) => {
            dispatch(initProductDetail(res[0]))
        }, (error) => {
            console.log('error: ', error)
        });
    }
}
export const getSelectDate = (data) => {
    return dispatch => {
        Tool.get(`/api/bond/projects`, data, (res) => {
            dispatch(initProductList(res))
        }, (error) => {
            console.log('error: ', error)
        });
    }
}
