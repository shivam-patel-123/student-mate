import { createSelector } from 'reselect';

const selectHeader = (state) => state.header;

export const selectToggleProfileDropdown = createSelector(
    [selectHeader],
    (header) => header.isProfileDropdownHidden
);
