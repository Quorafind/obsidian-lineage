import {
    Column,
    NavigationHistory,
} from 'src/stores/document/document-state-type';
import { AllDirections } from 'src/stores/document/document-store-actions';
import { updateActiveNode } from 'src/stores/view/reducers/document/helpers/update-active-node';
import { findNextActiveNodeOnKeyboardNavigation } from 'src/stores/view/reducers/document/helpers/find-next-node/find-next-active-node-on-keyboard-navigation';
import { DocumentViewState } from 'src/stores/view/view-state-type';

export type ChangeActiveNodeAction = {
    type: 'DOCUMENT/NAVIGATE_USING_KEYBOARD';
    payload: {
        direction: AllDirections;
        columns: Column[];
    };
};

export const navigateUsingKeyboard = (
    state: DocumentViewState,
    navigationHistory: NavigationHistory,
    action: ChangeActiveNodeAction,
) => {
    const nextNode = findNextActiveNodeOnKeyboardNavigation(
        action.payload.columns,
        state.activeNode,
        action.payload.direction,
        state.activeNodeOfGroup,
    );
    if (nextNode) {
        updateActiveNode(state, nextNode, navigationHistory);
    }
};
