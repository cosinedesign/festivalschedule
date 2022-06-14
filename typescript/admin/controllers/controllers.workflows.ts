import { workflows, WorkflowStateMachine } from "./workflows";
import { IUser } from '../../types/utility';

const internal = Symbol();

// TODO: Does this make this any more secure?
type secureUser = {
    [internal]: IUser,   
}

const appState = (function () {
    let _user: IUser; 

    return {
        setUser(su: secureUser) {
            if (_user) throw new Error('User already authenticated');
            if (!su[internal]) throw new Error('Login Failed');
            
            _user = Object.freeze(structuredClone(su[internal])); 
        },
        get user(): IUser {
            return _user;
        }
    };
})();

export const Controller = (function () {
    const stateMachine = WorkflowStateMachine(workflows.guestApproval);

    //console.log('Guest Approval', workflows.guestApproval);

    return {
        initialize: async function ( user: IUser ) {
            // detect user workflow state 
            
        },
        get workflow() {
            return workflows.guestApproval;
        },
        get currentState() {
            return stateMachine.current;
        },
        actions: {
            // User needs to request access
            request: function () {},
            // User is submitting/has submitted a request
            submitRequest: function () {},
            // "We've found these records for you"
            confirm: function () {},
            // "Your request has been denied, please contact ..."
            denied: function () {}            
        }    
    };
})();

export const guestController = (function () {
    const stateMachine = WorkflowStateMachine(workflows.guestApproval);

    //console.log('Guest Approval', workflows.guestApproval);

    return {
        initialize: async function ( user: IUser ) {
            // detect user workflow state 
            
        },
        get workflow() {
            return workflows.guestApproval;
        },
        get currentState() {
            return stateMachine.current;
        },
        actions: {
            // User needs to request access
            request: function () {},
            // "We've found these records for you"
            confirm: function () {},
            // "Your request has been denied, please contact ..."
            denied: function () {}            
        }    
    };
})();


export const authController = (function () {
    const stateMachine = WorkflowStateMachine(workflows.authentication);
    
    return {

    };
})();

// Controller for a stage feature, allowing edits of stage events / lineups
export const stageController = (function () {
    const stateMachine = WorkflowStateMachine(workflows.stageEdit);
    
    return {
        initialize: async function ( ) {
            // detect user workflow state 
            
        },
        get workflow() {
            return workflows.guestApproval;
        },
        get currentState() {
            return stateMachine.current;
        },
        actions: {
            main: async function () {
                //const list = await stageService.getStageList(user);
            },
            list: function () {
                // TODO: Contact 
            },

        }    
    };
})();
