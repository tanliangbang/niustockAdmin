import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {reduxForm,Field} from 'redux-form';

import { Tool, merged } from '../../Tool';
import Tabs from '../../BUI/Tabs.jsx';
import * as commonAction from '../../actions/common';
import * as productAction from '../../actions/product';

import {nomalTextInput,nomalTextAreaInput,nomalTypeSelect,nomalRateSelect,ImgUpload} from '../../Components/form/form';






class AddProject extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            files:['']
        }
    }
    componentDidMount() {
        UE.getEditor('editor');
    }
    componentWillUnmount(){
        UE.getEditor('editor').destroy();
    }

    componentWillMount() {
        this.props.actions.setMeun("addProject")
    }


    submit(data){
        var content = UE.getEditor("editor").getContent();
        if(content==""){
            alert("请添加产品描叙");
            return;
        }
        var attachment = this.state.files;
        attachment.splice(attachment.length-1,1)
        attachment = JSON.stringify(attachment);
        data.details = content;
        data.attachment = attachment;

        var _this = this;
        var p = new Promise(function(resolve, reject){
            _this.props.actions.addProject(data,resolve, reject);
        });
        p.then((res)=>{
            browserHistory.push("project");
        },(error)=>{
            alert("添加失败")
        })

    }


    handleUpload(opare,index,url){

        var files = this.state.files;
        if(opare=="up"){
            files[index] = url.url;
            if(files[files.length-1]!=""){
                files.push("")
            }
        }else{
            files.splice(index, 1);
        }
        this.setState({
            files:files
        })
        console.log(files);

    }
    render() {
        const { handleSubmit,submit } = this.props
        const {files} = this.state
       return(
           <div className="addProject">

               <form onSubmit={handleSubmit(this.submit)}>
                   <Field name="name"  type="text" component={nomalTextInput} label="产品名称" />
                   <Field  name="type" component={nomalTypeSelect} label="产品类型"></Field>
                   <Field name="annualizedYield" type="text" component={nomalTextInput} label="预期年化收益"  unit="%"/>
                   <Field name="amount" type="text" component={nomalTextInput} label="融资金额"  unit="万"/>
                   <Field name="term" type="text" component={nomalTextInput} label="产品期限" unit="个月" />
                   <Field  name="rate" label="产品评级" component={nomalRateSelect}></Field>
                   <Field name="exchange" type="text" component={nomalTextInput} label="挂牌交易所" />
                   <Field name="entity" type="text" component={nomalTextInput} label="融资主体" />
                   <Field name="purpose" type="text" component={nomalTextInput} label="融资用途" />
                   <Field name="repayment" type="text" component={nomalTextInput} label="还款方式" />
                   <Field name="guarantee" type="text" component={nomalTextInput} label="担保方式" />
                    <div className="title">
                      <hr/> 公司及项目介绍 <hr/>
                   </div>
                   <script  id="editor" className="projectDetailEditor" type="text/plain" style={{height:"500px",width:"1000px"}}></script>



                   {
                       files.map((item, key) => {
                           return (
                               <ImgUpload index={key} url={item} handleUpload={this.handleUpload.bind(this)} key={key}/>
                           )
                       })
                   }


                   <div>
                       <button   className="addProjectBtn" type="submit" >确&nbsp;&nbsp;&nbsp;&nbsp;定</button>
                   </div>
              </form>

           </div>

       )
    }

}


function formValidate(values) {
    const errors = {};
     if (!values.name) {
        errors.name = '请输入产品名称'
    }
    if (!values.type) {
        errors.type = '请选择产品类型'
    }
    if (!values.annualizedYield) {
        errors.annualizedYield = '请输入预期年化收益'
    }
    if (!values.amount) {
        errors.amount = '请输入融资金额'
    }
    if (!values.term) {
        errors.term = '请输入产品期限'
    }
    if (!values.exchange) {
        errors.exchange = '请输入挂牌交易所'
    }
    if (!values.entity) {
        errors.entity = '请输入融资主体'
    }
    if (!values.purpose) {
        errors.purpose = '请输入融资用途'
    }
    if (!values.repayment) {
        errors.repayment = '请输入还款方式'
    }
    if (!values.guarantee) {
        errors.guarantee = '请输入担保方式'
    }
    if (!values.rate) {
        errors.rate = '请选择产品评级'
    }
    return errors;
}




export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction,productAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(reduxForm({
     form:'addProjectForm',
     validate: formValidate,

})(AddProject))