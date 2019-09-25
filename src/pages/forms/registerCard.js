import React from 'react'
import {
    Form,
    Input,
    Radio,
    Select
  } from 'antd'
import {connect} from 'dva'
const {Option}=Select
class RegisterCard extends React.Component{

    componentDidMount(){
      this.props.dispatch({
        type:"rfidcard/fetchAllRfid"
      })
    }
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
        getFieldDecorator('registerTime')
        getFieldDecorator('statusCode')
        return (
            <div className="ownInfoForm">
            
            <Form  {...formItemLayout} className="ownInfoForm-form">
              <Form.Item  label="姓名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="姓名" />,
                )}
              </Form.Item>
           
              <Form.Item  label="电话">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="电话" />,
                )}
              </Form.Item>
              
              <Form.Item  label="车牌号">
                {getFieldDecorator('carId', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input placeholder="车牌号" />,
                )}
              </Form.Item>
              <Form.Item  label="卡号">
                {getFieldDecorator('rfidCard', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Select   >
                     {this.props.rfidcard.rfidcards.map((item,index)=>{
                      return   (<Option value={item.rfidCard}>{item.rfidCard}</Option>)
                         
                     })}
                    </Select>
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
             
            </Form>
            
            </div>
        );
    }
}
const mapPropsToFields = (props) =>{
   
    let obj = {};
    for(let key in props.us){
      obj[key] = Form.createFormField({
        value: props.us[key]
      })
    }
    return obj;
  }
export default connect(state=>state)(Form.create({
    mapPropsToFields}
)(RegisterCard))