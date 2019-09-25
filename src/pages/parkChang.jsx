import React from 'react'
import styles from './all.less'
import { List, Card,Tag, Button, Modal,Radio} from 'antd';
import {connect} from 'dva'
class parkChang extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            upCheWei:{}
        }
    }
    showModal = (item) => {
        this.setState({
          visible: true,
          upCheWei:item
        });
    
    };  
    handleOk = e => {

        this.setState({
            visible:false
        })
    };
    onChange=(e)=>{
        let toUp={id:this.state.upCheWei.id,status:e.target.value}
        this.props.dispatch({
            type:"parkChang/UpdateParkWei",payload:toUp
        })
    }
    
      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };

    todelete(item){
        this.props.dispatch({
            type:"parkChang/fetchDeleteParkWei",payload:item.id
        })
    }
    componentDidMount(){
        this.props.dispatch({
            type:"parkChang/fetchAllParkWei"
        })
    }
    refersh(){
        this.props.dispatch({
            type:"parkChang/fetchAllParkWei"
        })
    }
    render(){
       
        return (<div className={styles.content}>

            <List
                grid={{ gutter: 16, column: 4 }}
                style={{width:"100%"}}
                dataSource={this.props.parkChang.parkWeis}
                renderItem={item => {
                    if(item.status=="有车"){
                      return  (<List.Item>
                            <Card headStyle={{color:"#ffffff"}} title={"车位编号:"+item.id} style={{textAlign:"center",backgroundColor:"#ff646d",borderRadius:"10px"}}>
                                <Tag color="red" style={{cursor:"not-allowed"}}>{item.status}</Tag>
                                {/* <Tag color="cyan" onClick={this.toEdit.bind(this,item)}>修改</Tag> */}
                            </Card>
                        </List.Item>)
                    }else if(item.status=="出售"){
                       return (<List.Item>
                            <Card headStyle={{color:"#ffffff"}} title={"车位编号:"+item.id} style={{textAlign:"center",backgroundColor:"#fbad4c",borderRadius:"10px"}}>
                                <Tag color="orange" style={{cursor:"not-allowed"}}>{item.status}</Tag>
                                <Tag color="cyan" onClick={this.showModal.bind(this,item)} >修改</Tag>
                                <Tag color="red" onClick={this.todelete.bind(this,item)}>删除</Tag>
                            </Card>
                        </List.Item>)
                    }else{
                       return  (<List.Item>
                            <Card headStyle={{color:"#ffffff"}} title={"车位编号:"+item.id} style={{textAlign:"center",backgroundColor:"#59d05d",borderRadius:"10px"}}>
                                <Tag color="green" style={{cursor:"not-allowed"}}>{item.status}</Tag>
                                <Tag color="cyan" onClick={this.showModal.bind(this,item)}>修改</Tag>
                                <Tag color="red" onClick={this.todelete.bind(this,item)}>删除</Tag>
                            </Card>
                        </List.Item>)
                    }
                }}
            />
            <Modal

                title="修改车位状态"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
  
           
                    <Radio.Group style={{textAlign:"center"}} defaultValue={this.state.upCheWei.status} onChange={this.onChange}>
                        <Radio value={"出售"}>出售</Radio>
                        <Radio value={"无车"}>无车</Radio>
                    </Radio.Group>
              
           
            </Modal>
            <Button type="danger" size="big" onClick={this.refersh.bind(this)}  style={{position:"absolute",left:"92%",top:"90%"}}>刷新</Button>
        </div>)
    }
}
const mapPropsToFields = (state) =>{
   
    return state.upCheWei;
  }
export default connect(state=>state)(parkChang);