import "./style.scss"
import React, { Component, PropTypes } from 'react'
import { Tool, merged } from '../../Tool';

export const nomalTextInput = ({ input, label, type,unit, meta: { touched, error, warning } }) => (
    <div className="nomalInput">
       <span>{label}</span>
       <input {...input} placeholder={label}  type={type}/>{unit}
        <div className="reError">{touched && ((error && <span>{error}</span>))}</div>
    </div>
)


export const nomalTextAreaInput = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="nomalInput">
        <span>{label}</span>
        <textarea {...input} placeholder={label}  type={type}/>
        <div className="reError">{touched && ((error && <span>{error}</span>))}</div>
    </div>
)




export const nomalTypeSelect = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="nomalInput">
        <span>{label}</span>
        <select {...input}>
          <option value="">--请选择--</option>
          <option value="基础资产交易类">基础资产交易类</option>
           <option value="权益资产交易类">权益资产交易类</option>
        </select>
        <div className="reError">{touched && ((error && <span>{error}</span>))}</div>
    </div>
)


export const nomalRateSelect = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="nomalInput">
        <span>{label}</span>
        <select {...input} >
            <option value="">--请选择--</option>
            <option value="AAA">AAA</option>
            <option value="AA+">AA+</option>
            <option value="AA">AA</option>
            <option value="AA-">AA-</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="BBBB">BBBB</option>
        </select>
        <div className="reError">{touched && ((error && <span>{error}</span>))}</div>
    </div>
)


export const nomalRoleSelect = ({ input, label,dataSet, type, meta: { touched, error, warning } }) => (
    <div className="nomalInput">
        <span>{label}</span>
        <select className="form-control"  {...input}>
            <option value="">--请选择{label}--</option>
            {
                dataSet.map((role, key) => {
                    return (
                        <option value={role.id} key={key}>{role.powerName}</option>
                    )
                })
            }

        </select>
        <div className="reError">{touched && ((error && <span>{error}</span>))}</div>
    </div>
)


export class ImgUpload extends Component {
    constructor(props) {
        super(props);
        this.showBtn = this.showBtn.bind(this)
        this.state = {
            showBtn:false,
            showDel:false
        }
    }

    upFile(index){
        var _this = this;
        _this.setState({
            showBtn:false
        })
        var p = new Promise(function(resolve, reject){
            Tool.uploadImg(resolve, reject);
            _this.setState({
                showDel:true
            })
        });
        p.then((url)=>{
            _this.props.handleUpload("up",index,url)
        },(error)=>{
            alert("上传失败")
        });

    }

    delFile(index){
        this.props.handleUpload("del",index)
    }

    showBtn(){
        this.setState({
            showBtn:true
        })
    }

    selectFile(){
        this.refs.fileInput.click();
    }
    render() {
        const {showBtn,showDel} = this.state
        const {index,url} = this.props;
        if(url!=""){
            return (
                <div className="imgUpload">
                    <a href={url} className="urlShow" target="_blank">{url}</a>
                    <a className={showDel?"delBtn":"none"} onClick={this.delFile.bind(this,index)}>删除</a>
                </div>
            )
        }
        return (
           <div className="imgUpload">
               <input ref="fileInput"  id="attachment"  name="attachment"  onChange={()=>this.showBtn()}   type="file" />
               <a className={showBtn?"upBtn":"none"} onClick={this.upFile.bind(this,index)}>上传</a>
           </div>
        )
    }
}



