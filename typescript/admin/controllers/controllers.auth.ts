import { IWorkflow, IWorkflowState, WorkflowTransition } from '../../types/workflow';
import { IUser, Controller } from '../../types/utility';

import { workflows } from './workflows';

const guestController: Controller = {
    initialize: async function ( user: IUser ) {
        // detect user workflow state 
        
    },
    get workflow () : IWorkflow {
        return workflows.guestApproval;
    },
    get workflowState () : IWorkflowState {
        return null;
    }
};