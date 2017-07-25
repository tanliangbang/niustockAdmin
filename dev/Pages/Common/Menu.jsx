import './style.scss';
import React,{Component, PropTypes} from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router'
import {ModalShow , Modal} from '../../MTUI/index'
import { bindActionCreators } from 'redux';
import * as userAction from '../../actions/user';
import { browserHistory } from 'react-router'

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    loginOut(){
        this.props.actions.loginOut();
        browserHistory.push("login")
        window.localStorage.removeItem("userInfo");
    }

  render() {
     const {userInfo} = this.props;
      return (
        <header className="navbar-wrapper">
                <div className="navbar" role="navigation" aria-expanded="false">
                    <Link to="/index">牛骨债券后台管理系统</Link>
                    <div className="userInfo">
                        <a >{userInfo.account}</a>/
                        <a onClick={this.loginOut.bind(this)}>退出</a>
                    </div>
                </div>


        </header>
    );
  }
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
})(Menu);
