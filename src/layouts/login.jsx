import React from 'react'
import { Button,Form,Input,Icon,Checkbox,message} from 'antd';
import style from './login.less'
import {connect} from 'dva'

class Login extends React.Component{
    componentDidMount(){
        this.props.dispatch({
            type:"allManager/fetchAllManager"
        })
        this.props.dispatch({
            type:"allManager/fetchAllTest"
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        var user;
        this.props.form.validateFields((err, values) => {
            user=values;
            if (!err) {
            console.log('Received values of form: ', values);
          }
          var flag;
          for(let i=0;i<this.props.allManager.managers.length;i++){
             
             if(this.props.allManager.managers[i].account===values.username){
                 if(this.props.allManager.managers[i].password===values.password)
                  {
                    this.props.dispatch({type:"allManager/setLogin_Manager",payload:this.props.allManager.managers[i]});
                      flag=1;break;
                  }
                 else
                  {flag=2;break;}
             }
             else{
                 flag=3;
                 break;
             }
             
           }
           switch(flag){
               case 1:
                    {message.success('登录成功');
                     this.props.history.push("index");
                     break;}
               case 2:
                    { message
                     .loading('Action in progress..', 2.5)
                     .then(() => message.error('密码错误', 1));
                     break;}
               case 3:     
                    {message
                     .loading('Action in progress..', 2.5)
                     .then(() => message.error('账号错误', 1));
                     break;}
              default:
                  break;
           }
        });
      };
    render(){
        const { getFieldDecorator } = this.props.form;
        return <div id={style.content}>

            <h1 className={style.park_text}>停&nbsp;车&nbsp;有&nbsp;位&nbsp;&nbsp;&nbsp;&nbsp;自 动 收 费</h1>
            <div id={style.login}>
                {console.log(this.props.allManager.test)}
            <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住密码</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        忘记密码
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                        Log in
                    </Button>
                    </Form.Item>
            </Form>
            </div>
        </div>
    }
}
export default Form.create(state=>state)(connect(state=>state)(Login));