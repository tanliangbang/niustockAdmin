//这个叫做action，用于更新reduer中的state
import { getData } from '../utils/fetchData'
import { Tool, merged } from '../Tool';
import * as actionConstant from '../constants/actionConstant';
import * as fetch from '../utils/fetchData';



export function setPowerFn(powerList) {
    return {
        type: actionConstant.POWERLIST,
        powerList :powerList
    }
}

export function setEmployeeListFn(employeeList) {
    return {
        type: actionConstant.EMPLOYELIST,
        employeeList :employeeList
    }
}

export function setShowAddEmployeeFn(showAddEmployee) {
    return {
        type: actionConstant.SHOWADDEMPLOYEE,
        showAddEmployee :showAddEmployee
    }
}

export function setCurrEmployeeFn(currEmployee) {
    return {
        type: actionConstant.CURREMPLOYEE,
        currEmployee :currEmployee
    }
}

export function setCurrEmployee(currEmployee) {
    return dispatch => {
        dispatch(setCurrEmployeeFn(currEmployee))
    }
}

export function setEmployeeList(employeeList) {
    return dispatch => {
        dispatch(setEmployeeListFn(employeeList))
    }
}


export function setShowAddEmployee(showAddEmployee) {
    return dispatch => {
        dispatch(setShowAddEmployeeFn(showAddEmployee))
    }
}

export const setPowerList = (powerList) => {
    return dispatch => {
        dispatch(setPowerFn(powerList))
    }
}


export const getPowerList = () => {
    return dispatch => {
        fetch.getData(`/api/power`, {}).then((res)=> {
            dispatch(setPowerList(res.data))
        }) .catch((error)=> {
            console.log(error);
        });
    }
}


export const getEmployeeList = () => {
    return dispatch => {
        fetch.getData(`/api/employees`, {}).then((res)=> {
            dispatch(setEmployeeList(res.data))
        }) .catch((error)=> {
            console.log(error);
        });
    }
}


export const addRole = (data,resolve) => {
   var powerList =  dealDate(data)
    return dispatch => {
        if(data.id&&data.id!=0){
            fetch.putData(`/api/power/`+data.id, {powerName:data.powerName,powerDetails:data.powerDetails,powers:powerList,_method:"PUT"}).then((res)=> {
                resolve();
            }) .catch((error)=> {
                console.log(error);
            });
        }else{
            fetch.postData(`/api/power/`, {powerName:data.powerName,powerDetails:data.powerDetails,powers:powerList}).then((res)=> {
                resolve();
            }) .catch((error)=> {
                console.log(error);
            });
        }

    }
}

export const addUser = (data,resolve) => {
    return dispatch => {
        if(data.id){
            data._method="PUT"
            fetch.putData(`/api/employees/`+data.id, data).then((res)=> {
                resolve();
            }) .catch((error)=> {
                console.log(error);
            });
        }else{
            fetch.postData(`/api/employees/`, data).then((res)=> {
                resolve();
            }) .catch((error)=> {
                console.log(error);
            });
        }

    }
}

export const deleteEmployee = (id,resolve) => {
    return dispatch => {
        fetch.postData(`/api/employees/`+id,{}).then((res)=> {
            resolve();
        }).catch((error)=> {
            console.log(error);
        });
    }
}






function dealDate(data){
   var  formDate ={user:[],project:[]};
   for(var curr in data){
       if(data[curr]===true){
           var modular = curr.split("-")[0]
           switch(modular){
               case "user":
                   formDate.user.push(curr);
                   break;
               case "project":
                   formDate.project.push(curr);
                   break;
           }
       }
   }
   return JSON.stringify(formDate);
}