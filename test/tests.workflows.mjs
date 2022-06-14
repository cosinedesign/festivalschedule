import { loadWorkflow, WorkflowStateMachine } from "../client/lib/admin/controllers/workflows";

const workflowConfig = {
    "authentication": {
        "initialState": "guest",
        "states": {
            "guest": { "id": 1, "name": "Guest" },
            "authenticating": { "id": 2, "name": "Authenticating"},
            "authorizing": { "id": 3, "name": "Authorizing"}
        },
        "transitions": {}
    },
    "guestApproval": {        
        "initialState": "new",
        "states": {
            "new": { "id": 1, "name": "New"}, 
            "requested": { "id": 2, "name": "Requested" },
            "approved":  { "id": 3, "name": "Approved" },
            "denied": { "id": 4, "name": "Denied" }
        },
        "transitions": {
            "request": { "id": 1, "name": "Request Approval", "fromId": "new", "toId": "requested" },
            "approve": { "id": 2, "name": "Approve Request", "fromId": "requested", "toId": "approved" },
            "reject": { "id": 3, "name": "Reject Request", "fromId": "requested", "toId": "denied" }
        }
    }
};

describe('Workflow tests', () => {
    test('LoadWorkflow', () => {
        const wf = JSON.parse(JSON.stringify(workflowConfig.guestApproval));
        const workflow = loadWorkflow(wf);

        expect(Object.keys(workflow.states).length).toBe(4);
        expect(Object.keys(workflow.transitions).length).toBe(3);
        
        expect(workflow.transitions.request.to).toBe(workflow.states['requested']);
    });

    test('LoadWorkflow correcly associates transitions to and from', () => {
        const wf = JSON.parse(JSON.stringify(workflowConfig.guestApproval));
        const workflow = loadWorkflow(wf);
        const rt = workflow.transitions.request;

        expect(rt).not.toBeNull();
        expect(rt.to).toBeDefined();
        expect(rt.from).toBeDefined();        
        expect(workflow.transitions.request.to).toBe(workflow.states['requested']);
        expect(workflow.transitions.request.from).toBe(workflow.states['new']);
    });
});

describe('Workflow StateMachine', () => {
    test('State Machine initializes to default', () => {
        const wf = loadWorkflow(workflowConfig.guestApproval);
        const stateMachine = WorkflowStateMachine(wf);

        expect(stateMachine.current).toBeDefined();
    });
});