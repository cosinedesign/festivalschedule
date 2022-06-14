const workflowConfig = {
    "authentication": {
        "initialState": "guest",
        "states": {
            "guest": { "id": 1, "name": "Guest" },
            "authenticating": { "id": 2, "name": "Authenticating" },
            "authorizing": { "id": 3, "name": "Authorizing" }
        },
        "transitions": {}
    },
    "stageEdit": {
        "initialState": "list",
        "states": {
            "list": { "id": 1, "name": "list" }
        },
        "transitions": {}
    },
    "guestApproval": {
        "initialState": "new",
        "states": {
            "new": { "id": 1, "name": "New" },
            "requested": { "id": 2, "name": "Requested" },
            "approved": { "id": 3, "name": "Approved" },
            "denied": { "id": 4, "name": "Denied" }
        },
        "transitions": {
            "request": { "id": 1, "name": "Request Approval", "fromId": "new", "toId": "requested" },
            "approve": { "id": 2, "name": "Approve Request", "fromId": "requested", "toId": "approved" },
            "reject": { "id": 3, "name": "Reject Request", "fromId": "requested", "toId": "denied" }
        }
    }
};
export function loadWorkflows(config) {
    const workflowMap = new Map(Object.entries(config));
    workflowMap.forEach(loadWorkflow);
    return config;
}
export function loadWorkflow(workflow, name) {
    const cfg = workflow;
    // load each state from config, add transitions property and associate 
    const statesMap = new Map(Object.entries(cfg.states)), transitionsMap = new Map(Object.entries(cfg.transitions));
    cfg.name = name;
    if (typeof cfg.initialState == 'string')
        cfg.initialState = cfg.states[cfg.initialState];
    transitionsMap.forEach((t) => {
        // set from and to states for each transition
        if (t.fromId)
            t.from = statesMap.get(t.fromId);
        if (t.toId)
            t.to = statesMap.get(t.toId);
        // Add t to from state's transitions
        (t.from.transitions = t.from.transitions || []).push(t);
    });
    return cfg;
}
// @ts-ignore this is dumb, TS can't understand hydrating objects without creating them completely first
export const workflows = loadWorkflows(workflowConfig);
export function WorkflowStateMachine(workflow, actions) {
    let _current = workflow.initialState;
    return {
        get current() {
            return _current;
        },
        get next() {
            return _current.transitions;
        },
        moveTo: function (state) {
        }
    };
}
