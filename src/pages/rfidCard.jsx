import React from 'react'
import {Table,Button,Dropdown,Input,Icon,DatePicker,Modal} from 'antd'
import styles from './all.less'
import {connect} from 'dva'
import RegisterCard from './forms/registerCard'
const {RangePicker} = DatePicker
const { Search } = Input;
class RfidCard extends React.Component{
  
  constructor(props){
    super(props)
    this.state={
      visible:false,
      us:{}
    }
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    // 提交表单
    e.preventDefault();
    
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.statusCode=0;
      console.log('Received values of form: ', values);
      
     
      if(values.id!=null){
        this.props.dispatch({
          type:"cusers/fetchUpdateUser",payload:values
        })
      }else{
        this.props.dispatch({
          type:"cusers/fetchRegisterUser",payload:values
        })
      }
      // this.props.dispatch({
      //   type:"rfidcard/fetchAllRfid"
      // })
      form.resetFields();
      this.setState({ visible: false });
    });
    this.setState({
        visible: false,
      });
    
};  
onChange(value, dateString) {
  var date = dateString;
  date = date.substring(0,19);    
  date = date.replace(/-/g,'/'); 
  var timestamp1 = new Date(date).getTime();
  

  var a=this.props.cusers.users.filter((item,index)=>{
    var date2 = item.registerTime;
    date2 = date2.substring(0,19);    
    date2 = date2.replace(/-/g,'/'); 
    var timestamp3 = new Date(date2).getTime();
  

    if(date2>=date) return item;
  })
  console.log(a)
  this.props.dispatch({
    type:"cusers/fetchAllUserByName",payload:a
  })
}
    seachUser(value){
      console.log(value)
      var a=this.props.cusers.users.filter((item,index)=>{
        if(item.rfidCard===value) return item;
      })
      
      if(a.length==0){
        this.props.dispatch({
          type:"cusers/fetchAllUsers"
        })
      }else{
        this.props.dispatch({
          type:"cusers/fetchAllUserByName",payload:a
        })
      }
    }
    handleCancel = e => {
      
      this.setState({
        visible: false,
      });
    };
    
    
    componentDidMount(){
      this.props.dispatch({
        type:"cusers/fetchAllUsers"
      })
    }
     onOk(value) {
        console.log('onOk: ', value);
      }
    deleteUser(record){
      console.log(record)
      this.props.dispatch({
        type:"cusers/fetchdeleteUser",payload:{id:record.id}
      })
    }
    editUser(record){
      console.log(record)
      this.setState({
        us:record,
        visible:true
      })
    }
    render(){
        const columns = [
            {
              title: '用户名',
              dataIndex: 'name'
            },
            {
              title: '性别',
              dataIndex: 'gender',
            },
            {
              title: '电话',
              dataIndex:'phone'
            },
            {
              title: '车牌号',
              dataIndex:'carId'
            },
            {
              title: '注册时间',
              dataIndex:'registerTime'
            },
            {
              title: '卡号',
              dataIndex:'rfidCard'
            },
            {
                title: '操作',
                // fixed:'right',
                render: (text, record) => (
                    <div>
                        <Icon type="delete"  onClick={this.deleteUser.bind(this,record)}></Icon>
                        <Icon type="edit" style={{marginLeft:"0.2em"}} onClick={this.editUser.bind(this,record)}></Icon>
                        
                    </div>
                ),
            },
          ];
       
          const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };
        return (<div className={styles.content}>
             <DatePicker  style={{position:"absolute",marginLeft:"2em",marginTop:"1em"}} showTime placeholder="Select Time" onChange={this.onChange.bind(this)}  />
            <Search placeholder="请输入卡号" style={{position:"absolute",marginLeft:"250px",width:300,marginTop:"1em"}}  onSearch={this.seachUser.bind(this)} enterButton />
            <Button type="primary" onClick={this.showModal} style={{position:"absolute",marginLeft:"88%",marginTop:"1em"}}>注册卡片</Button>
           <Table  rowKey="id" style={{marginLeft:"2em",textAlign:"center",marginTop:"5em",width:"100%"}}  
                rowSelection={{rowSelection,columnTitle:"#"}} columns={columns} dataSource={this.props.cusers.users} />
            <Modal

              title="注册卡片信息"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              >
              <RegisterCard wrappedComponentRef={this.saveFormRef} us={this.state.us}/>
            </Modal>
        </div>)
    }
}
export default connect(state=>state)(RfidCard);