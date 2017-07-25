import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool, merged } from '../../Tool';
import Tabs from '../../BUI/Tabs.jsx';
import * as commonAction from '../../actions/common';
import * as systemManageAction from '../../actions/systemManage';
import EmployeeList from './../../Components/systemManage/EmployeeList';
import RoleManage from './RoleManage';
import AddEmployee from '../../Components/systemManage/AddEmployee';




export class SystemManage extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        this.props.actions.setMeun("systemManage")
        this.props.actions.getEmployeeList()
    }



    showAddEmploy(){
        this.props.actions.setMask(true)
        this.props.actions.setShowAddEmployee(true)
    }

    render() {
        var tabsData = {
            className : 'modelTableOpear',
            defaultVal : 0,
            animate : true,
            callBack: function(index,title){ //切换后的回调函数
                console.log("tabs为：",index);
                console.log("title为：",title);
            }
        }
        const {employeeList} = this.props;
        return (
            <div className="SystemManage">
                <AddEmployee   />
                <div className="addEmployeeBtn" onClick={this.showAddEmploy.bind(this)}>+</div>
                <div className="commonTop">
                    <p>项目管理>员工账号</p>
                </div>
                <Tabs {...tabsData}>
                    <div title="员工账号" >
                        <EmployeeList  employeeList={employeeList} ></EmployeeList>
                    </div>
                    <div title="角色权限" >
                        <RoleManage></RoleManage>
                    </div>
                </Tabs>
            </div>

        );
    }
};


export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        employeeList:state.systemManage.employeeList
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction,systemManageAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(SystemManage);