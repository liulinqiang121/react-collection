import React,{Component} from "react"
import { Form, Icon, Input, Button, Checkbox,Layout} from 'antd';
import LoginForm from './loginForm'
class LoginApp extends Component {
    componentWillMount() {
    }
    render() {
        var innerHeight = window.innerHeight;
        return (   
                <LoginForm store={this.props.store}></LoginForm>
        )
    }
}
export default LoginApp
