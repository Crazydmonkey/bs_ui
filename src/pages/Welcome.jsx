import React from 'react';
import styles from './all.less';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import Clock from './clock'
import { List, Card ,Avatar,Calendar,Comment, Form, Button, Input,Modal,Carousel} from 'antd';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import moment from 'moment';
import {connect} from 'dva'
import Socket from './Socket'



HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
const bgGround={
  backgroundImage:'url('+img1+')',
  backgroundRepeat:'no-repeat',
  borderRadius:"10px",
  height:"100%",
  width:"100%"
}
const bgGround2={
  backgroundImage:'url('+img2+')',
  backgroundRepeat:'no-repeat',
  borderRadius:"10px",
  height:"100%",
  width:"100%"
}
const bgGround3={
  backgroundImage:'url('+img3+')',
  backgroundRepeat:'no-repeat',
  borderRadius:"10px",
  height:"100%",
  width:"100%"
}
class Welcome extends React.Component{
    constructor(props){
      super(props)
      this.taskRemindInterval=null;
      this.state={
        pa:{id:"",status:""}
      }
    }
    success() {
      Modal.success({
        title: '刷卡信息',
        content: '刷卡成功，请拿走卡片',
      });
    }
    componentDidMount(){
      this.props.dispatch({
        type:"cusers/fetchAllUsers"
      })
      this.props.dispatch({
        type:"parkChang/fetchAllParkWei"
      })
      this.props.dispatch({
        type:"parkHistory/fetchAllHistories"
      })
      var mySwiper = new Swiper('.swiper-container', {
        autoplay:true,
        loop : true,
        pagination: {
          el: '.swiper-pagination',
        },
    //   loop: true,
    //   pagination : {
    //       el: '.swiper-pagination',
    //   }
    });
          this.socket = new Socket({
            socketUrl: 'ws://127.0.0.1:8585/websocket/1',
            timeout: 5000,
            socketMessage: (receive) => {
                console.log("---",receive.data);  //后端返回的数据，渲染页面
                let obj=JSON.parse(receive.data);
                console.log("+++",obj);
                if(obj.tagId!=null){
                  this.success()
                }
                this.props.dispatch({
                  type:"parks/fetchAllPark"
                })
               
              },
            socketClose: (msg) => {
                console.log(msg);
            },
            socketError: () => {
                console.log(this.state.taskStage + '连接建立失败');
            },
            socketOpen: () => {
                console.log('连接建立成功');
                // 心跳机制 定时向后端发数据
                this.taskRemindInterval = setInterval(() => {
                    this.socket.sendMessage({ "msgType": 0 })
                }, 3000)
            }
        });
      // 　　　　　重试创建socket连接
        try {
            this.socket.connection();
        } catch (e) {
            // 捕获异常，防止js error
            // donothing
        }
      
    }
    onPanelChange(value, mode) {
      console.log(value, mode);
    }
    loadPaying=()=>{
      if(this.props.parkHistory){
        var sum=0;
        this.props.parkHistory.histories.map((item,index)=>{
                sum+=item.paying; 
        })
        return sum;
      }
      return 0;
    }
  render(){
    
    return (
    <div className="out_div">
      <Clock ></Clock>
    <div className="list">
        <List
        loading={false}
        grid={{ gutter: 26, column: 4 }}
        style={{marginTop:".5em"}}
      >
          <List.Item >
            <Card headStyle={{color:"white"}} style={{backgroundColor:"#fbad4c",textAlign:"center",fontWeight:"bolder",color:"white",borderRadius:"10px"}} title="用户">
            {this.props.cusers.users.length}
            </Card>
          </List.Item>
          <List.Item>
            <Card headStyle={{color:"white"}} style={{backgroundColor:"#59d05d",textAlign:"center",marginLeft:".5em",fontWeight:"bolder",color:"white",borderRadius:"10px"}} title="管理员">
              {this.props.allManager.managers.length}
            </Card>
          </List.Item>
          <List.Item>
            <Card headStyle={{color:"white"}} style={{backgroundColor:"#ff646d",textAlign:"center",marginLeft:".5em",fontWeight:"bolder",color:"white",borderRadius:"10px"}} title="车位">
            {this.props.parkChang.parkWeis.length}
            </Card>
          </List.Item>
          <List.Item>
            <Card headStyle={{color:"white"}} style={{backgroundColor:"#1d62f0",textAlign:"center",marginLeft:".5em",fontWeight:"bolder",color:"white",borderRadius:"10px"}} title="总收入">
             {this.loadPaying()}$
            </Card>
          </List.Item>
      </List>
    </div>
        <div className={styles.content} >
            <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
              <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
            </div>
           
              <div className="swiper-container" style={{flex:"1",marginLeft:"1em",borderRadius:"10px"}}>
              <Carousel autoplay>
                <div>
                  <h3 style={{marginTop:"130px"}}>1</h3>
                </div>
                <div>
                  <h3 style={{marginTop:"130px"}}>2</h3>
                </div>
                <div>
                  <h3 style={{marginTop:"130px"}}>3</h3>
                </div>
                <div>
                  <h3 style={{marginTop:"130px"}}>4</h3>
                </div>
            </Carousel>
              </div>
           
        </div>
    </div>
    )
  }
}
export default connect(state=>state)(Welcome);