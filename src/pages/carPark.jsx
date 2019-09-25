import React from 'react'
import styles from './all.less'
import Bmap from './Bmap';

class carPark extends React.Component{
    state = {pos: null};
    render(){
        const { pos } = this.state;
        return (<div className={styles.content}>
            <Bmap value={pos} onChange={pos => this.setState({pos})}></Bmap>
        </div>)
    }
}
export default carPark;