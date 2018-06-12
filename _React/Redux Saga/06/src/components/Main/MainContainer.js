import { connect } from 'react-redux'
import {
    MainDisplay
} from './MainDisplay';

import {
    
} from './../../actions'

import {
    isCheckingOutSelector
} from './../../selectors'

const mapStateToProps = (state) => {
    return {
        isCheckingOut:isCheckingOutSelector(state)
    }
};
const mapDispatchToProps = (dispatch) => ({
    
});

export const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainDisplay);