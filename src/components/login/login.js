import React,{Component} from "react"
import { Form, Icon, Input, Button, Checkbox,Layout} from 'antd';
import LoginForm from './loginForm'
const { Header, Footer, Sider, Content } = Layout;
class LoginApp extends Component {
    render() {
        var innerHeight = window.innerHeight;
        return (   
                <LoginForm></LoginForm>
        )
    }
}
export default LoginApp
