import React from 'react'
import styles from './all.less'
import {Table,Icon,Button,Input,DatePicker,Tag} from 'antd'
import {connect} from 'dva'
const {RangePicker} = DatePicker
const { Search } = Input;

class Parking extends React.Component{
    
    componentDidMount(){
      this.props.dispatch({
        type:"parking/fetchAllPark"
      })
    }
    showModal(record){
        alert("正在停车的详细信息")
    }
    onChange(value, dateString) {
      var date = dateString;
      date = date.substring(0,19);    
      date = date.replace(/-/g,'/'); 
      var timestamp1 = new Date(date).getTime();

      var a=this.props.parking.parks.filter((item,index)=>{
        var date2 = item.startTime;
        date2 = date2.substring(0,19);    
        date2 = date2.replace(/-/g,'/'); 
        var timestamp3 = new Date(date2).getTime();
      

        if(date2>=date) return item;
      })
      console.log(a)
      this.props.dispatch({
        type:"parking/fetchParkByUser",payload:a
      })
    }
    
    onOk(value) {
      console.log('onOk: ', value);
    }
    seachUser(value){
      console.log(value)
      var a=this.props.parking.parks.filter((item,index)=>{
        if(item.user.name===value) return item;
      })
      if(a.length==0){
        this.props.dispatch({
          type:"parking/fetchAllPark"
        })
      }else{
        this.props.dispatch({
          type:"parking/fetchParkByUser",payload:a
        })
      }
    }
    refersh(){
      this.props.dispatch({
        type:"parking/fetchAllPark"
      })
    }
    render(){
        const columns = [
            {
              title: '用户名',
              dataIndex: 'user.name'
            },
            {
              title: '性别',
              dataIndex: 'user.gender',
            },
            {
              title: '电话',
              dataIndex:'user.phone'
            },
            {
              title: '车牌号',
              dataIndex:'user.carId'
            },
            {
              title: '开始时间',
              dataIndex:'startTime',
              render: (text,record) => {
                
                
                return (text)
              }
            },
            {
              title: '已产生费用',
              dataIndex:'costMoney',
              render: (text, record) => {
                
          
              var date2=new Date();
              var date3=new Date(record.startTime)
              var a =parseInt(date2-date3)/36000000;
              // console.log(date2,date3,a)
               if(a>1){
                    return (<div>
                        
                        {a*5} 元
                    </div>);
               }else{
                return (<div>
                      
                      {5.0} 元
                  </div>);
               }
              
            },
            },
            {
              title: '状态',
              dataIndex:'status',
              render: (text, record) => (
                <Tag color="#108ee9">正在停车</Tag>
              )
            },
            {
                title: '操作',
               
                render: (text, record) => (
                    <div>
                        <Icon type="eye" onClick={this.showModal.bind(this,record)}></Icon>
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
            <Button onClick={this.refersh.bind(this)}  style={{position:"absolute",left:"92%",top:"30px"}}>刷新</Button>
            <DatePicker  style={{position:"absolute",marginLeft:"2em",marginTop:"1em"}} showTime placeholder="Select Time" onChange={this.onChange.bind(this)}  />
            <Search placeholder="请输入用户名" style={{position:"absolute",marginLeft:"250px",width:300,marginTop:"1em"}}  onSearch={this.seachUser.bind(this)} enterButton />
            <Table   rowKey="id" style={{marginLeft:"2em",textAlign:"center",marginTop:"5em",width:"100%"}}
                rowSelection={rowSelection} columns={columns} dataSource={this.props.parking.parks} />
        </div>)
    }
}
export default connect((state)=>state)(Parking);