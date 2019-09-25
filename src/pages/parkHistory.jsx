import React from 'react'
import {Table,Button,Dropdown,Input,Icon,DatePicker,Tag} from 'antd'
import styles from './all.less'
import {connect} from 'dva'
const {RangePicker} = DatePicker
const { Search} = Input;
class parkHistory extends React.Component{
    
    componentDidMount(){
      this.props.dispatch({
        type:"parkHistory/fetchAllHistories"
      })
    }
    showModal(record){
        alert(record);
    }
    onChange(value, dateString) {
      var date = dateString[0];
      date = date.substring(0,19);    
      date = date.replace(/-/g,'/'); 
      var timestamp1 = new Date(date).getTime();

      var date1 = dateString[1];
      date1 = date1.substring(0,19);    
      date1 = date1.replace(/-/g,'/'); 
      var timestamp2 = new Date(date1).getTime();
      

      var a=this.props.parkHistory.histories.filter((item,index)=>{
        var date2 = item.startTime;
        date2 = date2.substring(0,19);    
        date2 = date2.replace(/-/g,'/'); 
        var timestamp3 = new Date(date2).getTime();

        var date3 = item.endTime;
        date3 = date3.substring(0,19);    
        date3 = date3.replace(/-/g,'/'); 
        var timestamp4 = new Date(date3).getTime();

        if(date2>=date && date3<=date1) return item;
      })
      console.log(a)
      this.props.dispatch({
        type:"parkHistory/fetchHistoriesByUser",payload:a
      })
     }
      

    seachUser(value){
      console.log(value)
      var a=this.props.parkHistory.histories.filter((item,index)=>{
        if(item.user.name===value) return item;
      })
      
      if(a.length==0){
        this.props.dispatch({
          type:"parkHistory/fetchAllHistories"
        })
      }else{
        this.props.dispatch({
          type:"parkHistory/fetchHistoriesByUser",payload:a
        })
      }
    }
    refersh(){
      this.props.dispatch({
        type:"parkHistory/fetchAllHistories"
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
              dataIndex:'startTime'
            },
            {
              title: '结束时间',
              dataIndex: 'endTime',
            },
            {
              title: '产生费用',
              dataIndex: 'paying',
              render: (text, record) => {

                return text+"元"
              
            }
            },
            {
              title: '状态',
              render: (text, record) => {

                  return <Tag color="green" >已完成</Tag>
                
              }
            },
            {
                title: '操作',
                // fixed:'right',
                render: (text, record) => (
                    <div>
                        <Icon type="delete" onClick={this.showModal.bind(this,record)}></Icon>
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
            <RangePicker
            style={{position:"absolute",marginLeft:"2em",marginTop:"1em"}}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['Start Time', 'End Time']}
            onChange={this.onChange.bind(this)}
            />
            <Search placeholder="请输入用户名" style={{position:"absolute",marginLeft:"400px",width:300,marginTop:"1em"}}  onSearch={this.seachUser.bind(this)} enterButton />
           <Table  rowKey="id" style={{marginLeft:"2em",textAlign:"center",marginTop:"5em",width:"100%"}}  
                rowSelection={rowSelection} columns={columns} dataSource={this.props.parkHistory.histories} />
        </div>)
    }
}
export default connect((state)=>state)(parkHistory);