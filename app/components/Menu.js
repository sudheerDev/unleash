import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MaterialUIMenu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionSupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import { blueGrey50, blueGrey800 } from 'material-ui/styles/colors';
import LogoImg from '../assets/logo.png';
import KeyIcon from 'material-ui/svg-icons/communication/vpn-key';
import config from '../../config';

const styles = {
  titleBar: {
    fontStyle: 'italic',
    fontWeight: '600',
  },
  drawer: {
    backgroundColor: blueGrey800,
    boxShadow: 'none',
  },
  menuItem: {
    color: blueGrey50,
    fontSize: 14,
  },
};

class Menu extends Component {
  handleMenuClick(path) {
    this.props.router.push(path);
  }

  render() {
    const { userId, userLogoutProcess } = this.props;
    const unleashLogo = <img src={LogoImg} alt="Unleash" width="40" />;
    const iconProps = { color: blueGrey50 };
    return (
      <Drawer containerStyle={styles.drawer} docked>
        <AppBar
          title="UNLEASH"
          iconElementLeft={unleashLogo}
          titleStyle={styles.titleBar}
        />
        <MaterialUIMenu>
          <MenuItem
            leftIcon={<ActionHome {...iconProps} />}
            onTouchTap={() => this.handleMenuClick('/')}
            style={styles.menuItem}
          >
            Home
          </MenuItem>
          <MenuItem
            leftIcon={<ActionAccountCircle {...iconProps} />}
            onTouchTap={() => this.handleMenuClick(`/profiles/${userId}`)}
            style={styles.menuItem}
          >
            My Path
          </MenuItem>
          <MenuItem
            leftIcon={<ActionSupervisorAccount {...iconProps} />}
            onTouchTap={() => this.handleMenuClick('/profiles')}
            style={styles.menuItem}
          >
            Profiles
          </MenuItem>
          <MenuItem
            leftIcon={<ActionDashboard {...iconProps} />}
            onTouchTap={() => this.handleMenuClick('/goals')}
            style={styles.menuItem}
          >
            Goals
          </MenuItem>
          <MenuItem
            leftIcon={<ActionGrade {...iconProps} />}
            onTouchTap={() => this.handleMenuClick('/skills')}
            style={styles.menuItem}
          >
            Skills
          </MenuItem>
          <MenuItem
            leftIcon={<ActionReceipt {...iconProps} />}
            onTouchTap={() => this.handleMenuClick('/curated-paths')}
            style={styles.menuItem}
          >
            Curated Paths
          </MenuItem>
          <MenuItem
            leftIcon={<KeyIcon {...iconProps} />}
            onTouchTap={() => userLogoutProcess()}
            style={styles.menuItem}
          >
            Log Out
          </MenuItem>
          <MenuItem
            disabled
          >
            Version: {config.unleash_app_version}
          </MenuItem>
        </MaterialUIMenu>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  userId: React.PropTypes.string,
  router: React.PropTypes.object,
  userLogoutProcess: React.PropTypes.func,
};

export default Menu;
