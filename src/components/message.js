import React ,{ Component } from 'react';
import ReactDOM from 'react-dom';
class App extends Component {  
    render() {  
        var innerHeight = window.innerHeight;  
      return (  
    
              <div>  
                 <Layout>  
                      <Content className="ant-layout-content-back" style={{height: innerHeight}}>  
                          <LoginForm></LoginForm>  
                      </Content>  
                  </Layout>  
              </div>  
    
          );  
    }  
  }  