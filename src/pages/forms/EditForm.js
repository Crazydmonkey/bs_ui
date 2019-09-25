import React from 'react'
import {
    Form,
    Input,
    Radio
  } from 'antd'


class EditForm extends React.Component{

   
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
        };
        getFieldDecorator('id')
        return (
            <div className="ownInfoForm">
           
            <Form  {...formItemLayout} className="ownInfoForm-form">
              <Form.Item  label="姓名">
                {getFieldDecorator('realname', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="姓名" />,
                )}
              </Form.Item>
              <Form.Item  label="出生日期">
                {getFieldDecorator('bornTime', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="出生日期" />,
                )}
              </Form.Item>
              
              <Form.Item  label="账号">
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="账号" />,
                )}
              </Form.Item>
              <Form.Item  label="密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input type="password" placeholder="密码" />,
                )}
              </Form.Item>
              <Form.Item  label="电话">
                {getFieldDecorator('phoneNumber', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="电话" />,
                )}
              </Form.Item>
              
              <Form.Item  label="爱好">
                {getFieldDecorator('hobbies', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input placeholder="爱好" />,
                )}
              </Form.Item>
              <Form.Item  label="邮箱">
                {getFieldDecorator('emailAddress', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="邮箱" />,
                )}
              </Form.Item>
              <Form.Item label='gender'>
                        {getFieldDecorator('gender', {
                            rules:[{
                                required: true,
                                message: 'Please input your E-mail!',
                            }]
                        })( 
                        <Radio.Group  >
                            <Radio value={"男"}>男</Radio>
                            <Radio value={"女"}>女</Radio>
                          </Radio.Group>)}
             </Form.Item>
             <Form.Item  label="地址">
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="地址" />,
                )}
              </Form.Item>
              <Form.Item  label="工作时间">
                {getFieldDecorator('goTime', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                    <Radio.Group  >
                    <Radio value={"白天"}>白天</Radio>
                    <Radio value={"晚上"}>晚上</Radio>
                  </Radio.Group>)}
              </Form.Item>
            </Form>
            
            </div>
        );
    }
}
const mapPropsToFields = (props) =>{
   
    let obj = {};
    for(let key in props.login_manager){
      obj[key] = Form.createFormField({
        value: props.login_manager[key]
      })
    }
    return obj;
  }
export default Form.create({
    mapPropsToFields}
)(EditForm)