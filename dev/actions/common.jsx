import { Tool, merged } from '../Tool';
import * as actionConstant from '../constants/actionConstant';

export function setMenuFn(menu) {
    return {
        type: actionConstant.SET_MENU,
        menu :menu
    }
}

export function setMaskFn(mask) {
    return {
        type: actionConstant.SET_MASK,
        mask :mask
    }
}


export const setMask = (mask) => {
    return dispatch => {
        dispatch(setMaskFn(mask))
    }
}

export const setMeun = (menu) => {
    return dispatch => {
        dispatch(setMenuFn(menu))
    }
}






