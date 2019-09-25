import React from 'react'
import styles from './all.less'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import {Table,Button,Input,Icon,BackTop,Tag} from 'antd'
import {connect} from 'dva'
import axios from 'axios'
import { func } from 'prop-types';
const { Search } = Input;
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
class Paying extends React.Component{
    constructor(props){
      super(props)
      this.state={
        data:[]
      }
    }
  
    showModal(){

    }
    
    componentDidMount(){
        var arr=new Array(24);
        for(let i=1;i<=24;i++){
          axios({
            url:'http://localhost:8585/parkHistory/query?endtime='+new Date().getFullYear()+"-"+(new Date().getMonth().toString().length==1?"0"+(new Date().getMonth()+1):new Date().getMonth()+1)+"-"+(new Date().getDate().toString().length==1?"0"+new Date().getDate():new Date().getDate())+" "+i+":",
            method:'get'
          }).then(function({data}){
            // console.log(data);
            // console.log(i)
            var sum=0;
            data.data.forEach((item,index)=>{
              sum+=item.paying;
            })
            arr[i-1]=sum;
          })
        }
        // arr[0]=0;
        console.log(arr)
        this.setState({
          data:arr
        })
        
    };
    loadHighCharts(){
     
      Highcharts.chart('container', {
        chart: {
              type: 'line'
          },
  
          title: {
              text: new Date().getFullYear()+"-"+(new Date().getMonth().toString().length==1?"0"+(new Date().getMonth()+1):new Date().getMonth()+1)+"-"+(new Date().getDate().toString().length==1?"0"+new Date().getDate():new Date().getDate())+" 收入"
          },
          xAxis: {
              categories: ['1:00','1:00', '2.00', '3.00', '4.00', '5.00', '7.00', '8.00', '9.00', '10.00', '11.00', '12.00', '13.00','14.00','15.00',
          '16.00','17.00','18.00','19.00','20.00','21.00','22.00','23.00','24.00']
          },
          yAxis: {
              title: {
                  text: '收入'
              }
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      // 开启数据标签
                      enabled: true          
                  },
                  // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                  enableMouseTracking: false
              }
          },
          series: [{
              name: '停车场',
              data: this.state.data
          }]
      });
    }
    componentDidUpdate(){
      
      this.loadHighCharts();
    }
    componentWillMount(){
      console.log(this.state.data)
      this.props.dispatch({
        type:"parkHistory/fetchAllHistories"
      })
    }
    seachUser(value){
     
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
            // {
            //   title: '状态',
            //   render: ( record) => {
            //     if(text=="已完成"){
            //       return <Tag color="green">{text}</Tag>
            //     }else{
            //       return <Tag color="red">{text}</Tag>
            //     }
            //   }
            // },
            {
                title: '操作',
                // fixed:'right',
                render: (text, record) => (
                    <div>
                        <Icon type="smile" onClick={this.showModal.bind(this,record)}></Icon>
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
        return (<div className={styles.content} style={{flexDirection:"column"}}>
         
          <div style={{marginLeft:"2.5em",textAlign:"center"}}><Search
            placeholder="请输入要搜索的用户"
            onSearch={this.seachUser.bind(this)}
            style={{ width: 400 }}
          /></div>
            <div id="container" style={{minWidth:"400px",height:"300px",marginTop:"2em"}}></div>
            <div className="paying">
              {/* {JSON.stringify(this.props.parkHistory.histories)} */}
              <Table  rowKey="id" style={{marginLeft:"2em",textAlign:"center",marginTop:"5em"}}  
                rowSelection={{rowSelection,columnTitle:"#"}} columns={columns} dataSource={this.props.parkHistory.histories} />
              {/* {console.log(this.props.parkHistory.histories)} */}
              </div>
            
                
        </div>)
    }
}
export default connect((state)=>state)(Paying);