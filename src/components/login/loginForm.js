/**
 * Created by liulinqiang on 2018/7/3.
 */
 
import React from "react"
import axios from "axios"
import PropTypes from "proptypes"
//import '../data/user'
import { message,Form, Icon, Input, Button, Checkbox} from 'antd';
console.log(message)
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
        axios.post("/users",data).then(function(res){
            let resMsg = res.data;
            if(data.name === "llq" && data.password==="llq"){
                history.push('/message');
            }else{
                message.info('用户或密码失败')
            }
        })
    }
    err() {
        alert(1)
        message.error('用户民或者密码错误');
    }
    render() {
 
        let top = window.innerHeight/2;
        let left = window.innerWidth/2;
        let message = this.message
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{marginLeft:left, marginTop: top}}>
               <p onClick= {this.err} >2323</p>
                <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form">
                    <FormItem>
                        {
                            getFieldDecorator(
                                'userName',{
                                    rules:[{required: true, message:'姓名不能为空！'}],
                                }
                            )(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )
                        }
 
 
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator(
                                "password",{
                                    rules:[{required: true, message:"密码不能为空！"}]
                                }
                            )(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )
                        }
 
 
                    </FormItem>
                    <FormItem>
                    <Button  type="primary" htmlType="submit" className="login-form-button" >
                            Log in
                        </Button>
                    </FormItem>
                    {/* <FormItem>
 
                            <Checkbox>Remember me</Checkbox>
 
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </FormItem> */}
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
