import React from 'react'
import styles from './all.less'
import {Avatar,Descriptions,Badge, Button, Modal} from 'antd'
import {connect} from 'dva'

import EditForm from './forms/EditForm';
class ownInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }
    saveorForm=(form)=>{
        this.setState({
          form
        })
      }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
        parse(date) {  
        var t = Date.parse(date);  
        if (!isNaN(t)) {  
            return new Date(Date.parse(date.replace(/-/g, "/")));  
        } else {  
            return new Date();  
        }  
    };  
      handleOk = e => {
        // 提交表单
        e.preventDefault();
        
        
        this.state.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            // var timestamp=this.parse(values.bornTime).getTime()
            // values.bornTime = "/Date("+timestamp+"+0800)/";
            this.props.dispatch({type:"allManager/setLogin_Manager",payload: values});
            this.props.dispatch({type:"allManager/UpdateManager",payload: values});
          }
        });
        this.setState({
            visible: false,
          });
        
    };
    
      handleCancel = e => {
        
        this.setState({
          visible: false,
        });
      };
    componentDidMount(){
       
        this.props.dispatch({
            type:"allManager/fetchAllManager"
        })
            // var time1 = this.props.allManager.login_manager.bornTime;
            // var time2=this.myTime(time1)
            // console.log("时间1="+time2);

            // console.log("时间2=="+this.formatDateTime(time2));
            // this.props.allManager.login_manager.bornTime=this.formatDateTime(time2)
            // this.props.dispatch({type:"allManager/setLogin_Manager",payload:  this.props.allManager.login_manager})

    }
//     myTime(date){
//         var arr=date.split("T");
//         var d=arr[0];
//         var darr = d.split('-');
    
//         var t=arr[1];
//         var tarr = t.split('.000');
//         var marr = tarr[0].split(':');
    
//         var dd = parseInt(darr[0])+"/"+parseInt(darr[1])+"/"+parseInt(darr[2])+" "+parseInt(marr[0])+":"+parseInt(marr[1])+":"+parseInt(marr[2]);
//     return dd;
//    }
//    addZero(num) {
//     return num < 10 ? '0' + num : num;
// } 
// formatDateTime (date) {
//     var time = new Date(Date.parse(date));
//     time.setTime(time.setHours(time.getHours() + 8));
//     var Y = time.getFullYear() + '-';
//     var  M = this.addZero(time.getMonth() + 1) + '-';
//     var D = this.addZero(time.getDate()) + ' ';
//     var h = this.addZero(time.getHours()) + ':';
//     var m = this.addZero(time.getMinutes()) + ':';
//     var  s = this.addZero(time.getSeconds());
//     return Y + M + D;
//     // }
//   }

    render(){

        let {login_manager}=this.props.allManager;
        return (<div className={styles.content}>

            
            <Descriptions title="Serati ma"  style={{marginLeft:"2em",marginTop:"18px",width:"100%"}} bordered>
                    <Descriptions.Item label="头像">
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </Descriptions.Item>
                    <Descriptions.Item label="用户名称">{login_manager.realname}</Descriptions.Item>
                    <Descriptions.Item label="业余爱好">{login_manager.hobbies}</Descriptions.Item>
                    <Descriptions.Item label="性别">{login_manager.gender}</Descriptions.Item>
                    <Descriptions.Item label="出生日期">{login_manager.bornTime}</Descriptions.Item>
                    {/* <Descriptions.Item label="创建日期" span={3}>
                    2019-04-24 18:00:00
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Status" span={3}>
                    <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    <Descriptions.Item label="电话">{login_manager.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{login_manager.emailAddress}</Descriptions.Item>
                    <Descriptions.Item label="完成停车数">100次</Descriptions.Item>
                    <Descriptions.Item label="详细信息">
                    <br />
                    地址 : {login_manager.address}
                    <br />
                    公司网站 : {login_manager.companyCom}
                    <br />
                    所属公司 :{login_manager.comName}
                    <br />
                    工作时间 :{login_manager.goTime}<br />
                    <br />
                    </Descriptions.Item>
             </Descriptions>
             <Button type="primary" style={{position:"absolute",marginLeft:"90%",marginTop:"1em"}} onClick={this.showModal}>编辑</Button>
             <Modal

                title="修改个人信息"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
            <EditForm ref={this.saveorForm} login_manager={login_manager} />
            </Modal>
        </div>)
    }
}
export default connect(state=>state)(ownInfo);