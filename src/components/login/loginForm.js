/**
 * Created by liulinqiang on 2018/7/3.
 */
 
import React from "react"
import axios from "axios"
import PropTypes from "proptypes"
//import '../data/user'
import { message,Form, Icon, Input, Button, Checkbox} from 'antd';
import { isAbsolute } from "path";
require('../../styles/login.scss')
require('../../mock/mock')
 
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    constructor(){
        super();
    }
    handleSubmit(e){
        e.preventDefault();
        let data = this.props.form.getFieldsValue()
        let history = this.context.router.history
        axios.post("/users",data).then((res) =>{
            let resMsg = res.data;
            if(data.name === "liulinqiang" && data.password==="liulinqiang"){
                localStorage.setItem('username',data.name)
                history.push('/index');
            }else{
                message.error('用户或密码不正确')
            }
        })
    }
    render() {
        let top = window.innerHeight/2;
        let left = window.innerWidth/2; 
        let message = this.message
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-wrap">
                <Form onSubmit={(e)=>this.handleSubmit(e)} className="loginForm">
                    <h5>用户登陆</h5>
                    <FormItem>
                        {
                            getFieldDecorator(
                                'name',{
                                    rules:[{required: true, message:'用户名不能为空！'}],
                                    initialValue: 'liulinqiang'
                                }
                            )(
                                <Input size="large"  prefix={<Icon type="user"  style={{ color: 'rgba(0,0,0,.5)' }}  />} placeholder="请输入用户名"  />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator(
                                "password",{
                                    rules:[{required: true, message:"密码不能为空！",trigger:'blur'}],
                                    initialValue: 'liulinqiang'
                                }
                            )(
                                <Input size="large"  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />} type="password" placeholder="请输入密码" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                    <Button size="large"  type="primary" htmlType="submit" className="login-form-button" >
                            登陆
                        </Button>
                    </FormItem>
                    <p>用React仿建的催收系统</p>
                    <p>By LiulinQiang</p>
                </Form>
            </div>
        );
    }
}
 
NormalLoginForm.contextTypes = {
    router: PropTypes.object.isRequired
};
let WrapForm = Form.create()(NormalLoginForm)
export default WrapForm
