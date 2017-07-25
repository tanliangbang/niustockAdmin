import './style.scss';
import LeftMenu from './common/leftMenu'
import React ,{Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory,Link } from 'react-router'
import Mask from './../../BUI/Mask'
import * as commonAction from '../../actions/common';
import * as userAction from '../../actions/user';
import Menu from './../Common/Menu'

class Components extends Component {

    componentWillMount() {
        this.props.actions.getUserInfo();
    }

  render() {
  		return (
  			<div className="component" >
                <Menu />

                <Mask ref="mask"/>

                <LeftMenu/>
  				<div className="pageContent">
                    <div className="cleft">

                    </div>
                    <div className="cright">
                        {this.props.children}
                    </div>
                </div>
  			</div>
  		);

  }
}

export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        userInfo:state.user.userInfo
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction,userAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(Components);