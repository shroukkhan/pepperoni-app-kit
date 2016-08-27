import {connect} from 'react-redux';
import AppView from './AppView';
//debugger;
export default connect(
    state => ({
        isReady: state.getIn(['session', 'isReady']),
        isLoggedIn: state.getIn(['auth', 'isLoggedIn']
        )
    })
)(AppView);
