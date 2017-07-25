import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute} from 'react-router' // 路由
import * as fetch from './utils/fetchData';
import { browserHistory } from 'react-router'
import * as userAction from './actions/user';

import Components from './Pages/Components/Index';

//帮助
import Index from './Pages/Index/Index';
import VipList from './Pages/vipManage/vipList';
import Project from './Pages/Project/Index';
import ProjectDetail from './Pages/Project/ProjectDetail';
import VipIndex from './Pages/VipManage/vipIndex';
import Login from './Pages/User/Login';
import Statistics from './Pages/Statistics/Index';
import SystemManage from './Pages/SystemManage/Index';
import AddProject from './Pages/Project/AddProject';


//App为入口
import App from './Pages/App';

export const routes = {
	path: '/',
	component: App,
	indexRoute: {component: Login},
	childRoutes: [{
		component: Components,
		onEnter:checkLogin,
		childRoutes: [{
			path: 'index',
			component: Index,
		},{
			path: 'vipManage',
			component: VipList,
		},{
			path: 'project',
			component: Project,
		},{
			path: 'projectDetail',
			component: ProjectDetail,
		},{
			path: 'vipIndex',
			component: VipIndex,
		},{
			path: 'systemManage',
			component: SystemManage,
		},{
			path: 'statistics',
			component: Statistics,
		},{
			path: 'addProject',
			component: AddProject,
			onEnter:removeEditor,
}]
	},{
		path: 'login',
		component: Login,
	}
	]
}

function removeEditor(){

	//UE.getEditor('editor').destroy();
}

function checkLogin(nextState, replace,next) {
	   if(window.localStorage.userInfo){
		   next()
	   }else{
		   fetch.getData(`/api/employees/current`,{}).then((res)=> {
			   window.localStorage.userInfo =JSON.stringify(res.data);
			   next()
		   }).catch((error)=> {
			   replace('/login')//重定向
			   next()
		   });
	   }
}



class Routers extends Component {

	render() {
		return (
			<Router history={this.props.history} routes={routes}>

			</Router>
		);
	}
}

export default Routers;