import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm,Field} from 'redux-form';
import LoadingBox from '../../MTUI/LoadingBox'
import { Tool, merged } from '../../Tool';
import * as userAction from '../../actions/user';
import { browserHistory } from 'react-router'
import {nomalTextInput} from '../../Components/form/form';


export  class Login extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
        this.state = {
            loginFalse:false
        }
    }

    componentWillMount() {
        if(window.localStorage.userInfo){
            browserHistory.push('/index')//重定向
        }
    }





submit(data){
        var _this = this;
        var p = new Promise(function(resolve, reject){
            _this.props.actions.login(data,resolve,reject);
        });
        p.then((res)=>{
            Tool.setCookie("ngtoken",res.data.ngtoken)
            Tool.setCookie("nguss",res.data.nguss)
            browserHistory.push("index");
        },(error)=>{
            _this.setState({
                loginFalse:true
            })
            setTimeout(function(){
                _this.setState({
                    loginFalse:false
                })
            },3000)
        })

    }

    render() {
        const { handleSubmit,submit } = this.props
        const {loginFalse} = this.state;
        const {userInfo} = this.props;
        return (
            <div   className="login">
                <form onSubmit={handleSubmit(this.submit)}>
                 <div>
                     <p>债券资产云交易开放平台管理后台</p>
                     <div>
                         <Field name="account"  type="text" component={nomalTextInput} label="账号" />


                     </div>
                     <div>
                         <Field name="password" autocomplete="off"  type="password" component={nomalTextInput} label="密码" />
                     </div>

                     <div className={loginFalse?"errorPromit":"none"}>用户名密码错误</div>

                     <button className="btn" >
                         登入
                     </button>
                 </div>
               </form>
            </div>
        );
    }

}



function loginValidate(values) {
    const errors = {};
    if (!values.account) {
        errors.account = '请输入账号'
    }
    if (!values.password) {
        errors.password = '请输入密码'
    }

    return errors;
}



export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        userInfo:state.user.userInfo
    }
}, (dispatch)=>{
    const allAction =Object.assign({},userAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(reduxForm({
    form:'addProjectForm',
    initialValues:{account:"",password:""},
    validate:loginValidate
})(Login))



