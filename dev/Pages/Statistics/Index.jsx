import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool, merged } from '../../Tool';
import Tabs from '../../BUI/Tabs.jsx';
import * as commonAction from '../../actions/common';
import ProjectStatistics from './ProjectStatistics.jsx';
import UserStatistics from './UserStatistics.jsx';



export class Statistics extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.actions.setMeun("statistics");
    }
    componentDidMount(){

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
        return (
        <div className="Statistics">
            <div className="commonTop">
                <p>项目管理>项目列表</p>
            </div>
            <Tabs {...tabsData}>
                <div title="项目统计" >
                     <ProjectStatistics></ProjectStatistics>
                 </div>
                <div title="会员统计" >
                    <UserStatistics></UserStatistics>
                </div>
            </Tabs>
        </div>

        );
    }
};


export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(Statistics);