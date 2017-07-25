import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool, merged } from '../../Tool';
import {reduxForm,Field} from 'redux-form';
import * as commonAction from '../../actions/common';
import * as systemManageAction from '../../actions/systemManage';
import {nomalTextInput,nomalRoleSelect} from '../../Components/form/form';

export class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.props.actions.getPowerList();
    }






    closeShow(){
        this.props.actions.setMask(false)
        this.props.actions.setShowAddEmployee(false);
        this.props.actions.setCurrEmployee(null);
    }

    submit(data){
        var _this = this;
        var p = new Promise(function(resolve, reject){
            _this.props.actions.addUser(data,resolve);
        });
        p.then(function(res){
            _this.props.actions.getEmployeeList();
            _this.props.actions.setMask(false)
            _this.props.actions.setShowAddEmployee(false);
            _this.props.initialize(null)
           alert("添加成功")
        });
    }


    render() {
        const { handleSubmit,submit,powerList,showAddEmployee } = this.props;
        if(!showAddEmployee){
            return null;
        }

        return (
           <div className="addEmployee" >
                <form>
                    <Field name="name"  type="text" component={nomalTextInput} label="姓名" />
                    <Field name="account"  type="text" component={nomalTextInput} label="登入号" />
                    <Field name="mobile"  type="text" component={nomalTextInput} label="手机号" />
                    <Field name="power_id"  component={nomalRoleSelect}  dataSet={powerList} label="角色"/>


                    <div className="employeeBtn">
                         <a onClick={handleSubmit(this.submit)}>确定</a> <a onClick={this.closeShow.bind(this)}>取消</a>
                    </div>
                </form>
           </div>
        )

    }
}


function formValidate(values) {
    const errors = {};
    if (!values.name) {
        errors.name = '请输入名字'
    }
    if (!values.account) {
        errors.account = '请输入登入号'
    }
    if (!values.mobile) {
        errors.mobile = '请输入手机号码'
    }
    if (!values.power_id) {
        errors.power_id = '请选择角色'
    }
    return errors;
}



export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        powerList:state.systemManage.powerList,
        showAddEmployee:state.systemManage.showAddEmployee,
        currEmployee:state.systemManage.currEmployee
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction,systemManageAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(reduxForm({
    form:'addEmployeeForm',
    validate: formValidate
})(AddEmployee))