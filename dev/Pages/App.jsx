/**
* 整个项目的入口
* @author : Mantou
* @date : 2016-03-01
*/
import React ,{Component} from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from './Common/Footer'
import * as userAction from '../actions/user';


class App extends Component {
	constructor(props) {
		super(props);
	}

  render() {
	  return (
				<div className="app">
					{this.props.children}
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
	const allAction =Object.assign({},userAction);
	return {
		actions: bindActionCreators(allAction, dispatch)
	}
})(App);

