import { Icon, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';
import { Button } from 'antd';
import { render } from 'react-dom';

class GlobalHeaderRight extends React.Component{
 
  /**
   * constructor
   */
  gohome=()=>{
    this.props.history.push("/index")
  }
  render(){
    const { theme, layout,user} = this.props;
    let className = styles.right;
    if (theme === 'dark' && layout === 'topmenu') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
       
        <Button onClick={this.gohome}>首页</Button>
        <Avatar />
        <SelectLang className={styles.action} />
      </div>
    );
  }
  
};

export default connect(({ settings}) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  
}))(GlobalHeaderRight);
