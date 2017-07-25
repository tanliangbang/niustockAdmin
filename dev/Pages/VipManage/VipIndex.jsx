import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm,Field} from 'redux-form';
import {browserHistory } from 'react-router';
import { Tool, merged } from '../../Tool';
import Tabs from '../../BUI/Tabs.jsx';
import UserInfo from '../../Components/vipManage/UserInfo';
import InvestState from '../../Components/vipManage/InvestState';
import * as commonAction from '../../actions/common';
import * as userAction from '../../actions/user';

export  class VipIndex extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.setMeun("vipManage")
        var id = Tool.getQueryString(this.props.location.search,"id");
        this.props.actions.getUserDetail(id);
        this.props.actions.getInvestList(id);

    }


    render() {
      const {userDetail,userInvestList} = this.props;
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
            <div  className="vipIndex">
                <div className="commonTop">
                    <p>会员管理>会员列表>会员详情</p>
                </div>

                <div className="vipUserInfo">
                    <div>
                        <p>会员编号:&nbsp;&nbsp;{userDetail.uid}</p>
                        <p>会员名称:&nbsp;&nbsp;{userDetail.company_name}</p>
                        <p>会员账号:&nbsp;&nbsp;{userDetail.username}</p>
                    </div>

                    <div>
                        <p>状态:&nbsp;&nbsp;{userDetail.reviewStatus}</p>
                        <p>提交次数:&nbsp;&nbsp;2</p>
                        <p>上次提交时间:&nbsp;&nbsp;{userDetail.lastModifiedTime}</p>
                        <p>上次审核:</p>
                        <p>注册来源:&nbsp;&nbsp;后台添加</p>
                    </div>


                    <br className="clear"/>
                </div>


                <div className="userInfoContent">
                    <Tabs {...tabsData}>
                        <div title="认证信息" className='communityList'>
                            <UserInfo userDetail={userDetail}></UserInfo>
                        </div>
                        <div title="投资情况" className='communityList'>
                            <InvestState userInvestList={userInvestList}></InvestState>

                        </div>
                        <div title="操作历史" className='communityList'>
                            <div className="otherInfo">
                                <p>操作</p>
                                 <table>
                                     <tbody>
                                     <tr>
                                         <td>修改密码</td>
                                         <td>武汉某国企厂房建设...</td>
                                         <td>基础资产交易类</td>
                                         <td>1000万</td>
                                         <td>3%-4.8%</td>
                                         <td>2Y</td>
                                         <td>已锁定</td>
                                         <td>五金所</td>
                                         <td>2016/8/15</td>
                                     </tr>
                                     <tr>
                                         <td>修改密码</td>
                                         <td>武汉某国企厂房建设...</td>
                                         <td>基础资产交易类</td>
                                         <td>1000万</td>
                                         <td>3%-4.8%</td>
                                         <td>2Y</td>
                                         <td>已锁定</td>
                                         <td>五金所</td>
                                         <td>2016/8/15</td>
                                     </tr>
                                     <tr>
                                         <td>修改密码</td>
                                         <td>武汉某国企厂房建设...</td>
                                         <td>基础资产交易类</td>
                                         <td>1000万</td>
                                         <td>3%-4.8%</td>
                                         <td>2Y</td>
                                         <td>已锁定</td>
                                         <td>五金所</td>
                                         <td>2016/8/15</td>
                                     </tr>
                                     <tr>
                                         <td>修改密码</td>
                                         <td>武汉某国企厂房建设...</td>
                                         <td>基础资产交易类</td>
                                         <td>1000万</td>
                                         <td>3%-4.8%</td>
                                         <td>2Y</td>
                                         <td>已锁定</td>
                                         <td>五金所</td>
                                         <td>2016/8/15</td>
                                     </tr>
                                     <tr>
                                         <td>修改密码</td>
                                         <td>武汉某国企厂房建设...</td>
                                         <td>基础资产交易类</td>
                                         <td>1000万</td>
                                         <td>3%-4.8%</td>
                                         <td>2Y</td>
                                         <td>已锁定</td>
                                         <td>五金所</td>
                                         <td>2016/8/15</td>
                                     </tr>
                                     </tbody>
                                 </table>
                            </div>
                        </div>
                        <div title="子账号信息" className='communityList'>
                            <div className="otherInfo">
                                <p>操作</p>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>账号名称</td>
                                        <td>手机号码</td>
                                        <td>上次登入</td>
                                        <td>操作</td>
                                    </tr>

                                    <tr>
                                        <td>ZC20160928</td>
                                        <td>13910021002</td>
                                        <td>2017-2-08 18:20:29</td>
                                        <td><a>密码重置</a><a>冻结</a><a>删除</a></td>
                                    </tr>
                                    <tr>
                                        <td>ZC20160928</td>
                                        <td>13910021002</td>
                                        <td>2017-2-08 18:20:29</td>
                                        <td><a>密码重置</a><a>冻结</a><a>删除</a></td>
                                    </tr>

                                    <tr>
                                        <td>ZC20160928</td>
                                        <td>13910021002</td>
                                        <td>2017-2-08 18:20:29</td>
                                        <td><a>密码重置</a><a>冻结</a><a>删除</a></td>
                                    </tr>

                                    <tr>
                                        <td>ZC20160928</td>
                                        <td>13910021002</td>
                                        <td>2017-2-08 18:20:29</td>
                                        <td><a>密码重置</a><a>冻结</a><a>删除</a></td>
                                    </tr>

                                    <tr>
                                        <td>ZC20160928</td>
                                        <td>13910021002</td>
                                        <td>2017-2-08 18:20:29</td>
                                        <td><a>密码重置</a><a>冻结</a><a>删除</a></td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        )

    }

}


/*<div className="resetPasswrod">
    会员密码重置
</div>*/


export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        userDetail:state.user.userDetail,
        userInvestList:state.user.userInvestList
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction,userAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(VipIndex);