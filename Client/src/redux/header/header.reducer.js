import DashboardActionTypes from './header.types';
const INITIAL_STATE = {
    isProfileDropdownHidden: true,
};

const headerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DashboardActionTypes.TOGGLE_PROFILE_DROPDOWN:
            return {
                ...state,
                isProfileDropdownHidden: !state.isProfileDropdownHidden,
            };

        default:
            return state;
    }
};

export default headerReducer;
