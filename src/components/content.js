import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Button, Switch } from "antd";
require("../styles/head.scss");

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class ContentComponent extends Component {
  state = {
    theme: "dark",
    current: "1"
  };
  componentWillMount() {
   
  }
  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light"
    });
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <aside className="aside-wrap">
        <div style={{ width: 200 }}>
          <div>
            <Menu
              onClick={this.handleClick}
              style={{ width: 200 }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["1"]}
              theme={'dark'}
              mode="inline"
            >
              <Menu.Item key="1">
                <Link to="/index" replace>
                  <Icon type="home" />首页
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/case" replace>
                  <Icon type="mail" />案件列表
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/repay" replace>
                  <Icon type="table" />还款列表
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/bi-report" replace>
                  <Icon type="bar-chart" />案件报表
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/user" replace>
                  <Icon type="team" />用户列表
                </Link>
              </Menu.Item>  
            </Menu>
          </div>
        </div>
      </aside>
    );
  }
}
export default ContentComponent;
