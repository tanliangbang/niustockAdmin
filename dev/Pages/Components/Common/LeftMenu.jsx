import '../style.scss';
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonAction from '../../../actions/common';
import {Tool} from '../../../Tool';

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state ={
            meunList:{
                vipManageModel:false,
                projectModel:false,
                statisticsModel:false,
                systemManageModel:false,
            },
            currModel:null
        }
    }

    showChildMeun(currMenu){
        var menuList = this.state.meunList;
        var currModel = this.state.currModel;
        if(currModel!=null){
            menuList[currModel] = false;
        }
        menuList[currMenu] = !this.state.meunList[currMenu];
        menuList.currModel = currMenu;
       this.setState({
           menuList:menuList,
           currModel:currMenu
       })
        console.log(this.state)
    }


  render() {
      const meunList = this.state.meunList;
      const {menu,powerList,userInfo} = this.props;
      var powers = JSON.parse(userInfo.powers);
      return (
    	<aside className="leftmenu">
    		 <ul className="menu">
                 <li className={Tool.hasModelPower(userInfo,"user")?"":"none"}>
                     <a  onClick={this.showChildMeun.bind(this,"vipManageModel")} >会员管理</a>
                     <ul className={meunList.vipManageModel?"showTables":"none"}>
                          <li className={Tool.hasPower(userInfo,'user','user-List')?"":"none"}><Link to="/vipManage">会员列表</Link></li>
                     </ul>
                 </li>
                 <li className={Tool.hasModelPower(userInfo,"project")?"":"none"}>
                  <a   onClick={this.showChildMeun.bind(this,"projectModel")}>项目管理</a>
                  <ul className={meunList.projectModel?"showTables":"none"}>
                      <li  className={Tool.hasPower(userInfo,'project','project-List')?"":"none"}><Link to="/project">项目列表</Link></li>
                      <li  className={Tool.hasPower(userInfo,'project','project-Add')?"":"none"}><Link to="/addProject">新增项目</Link></li>
                  </ul>
              </li>

              <li className={Tool.hasModelPower(userInfo,"statistics")?"":"none"}>
                  <a  onClick={this.showChildMeun.bind(this,"statisticsModel")}>数据统计</a>
                  <ul className={meunList.statisticsModel?"showTables":"none"}>
                      <li><Link to="/statistics">数据统计列表</Link></li>
                  </ul>
              </li>
              <li  className={Tool.hasModelPower(userInfo,"systemManage")?"":"none"}>
                  <a   onClick={this.showChildMeun.bind(this,"systemManageModel")}>系统管理</a>
                  <ul className={meunList.systemManageModel?"showTables":"none"}>
                      <li><Link to="/systemManage">员工列表</Link></li>
                  </ul>
              </li>
          </ul>
    	</aside>
    );
  }
};

export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        menu:state.common.menu,
        userInfo:state.user.userInfo,
        powerList:state.common.powerList
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(LeftMenu);