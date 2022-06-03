import { IHash } from "../../types/utility";
import { IWorkflow, IWorkflowState, WorkflowTransition } from "../../types/workflow";

const workflowConfig = {
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

function loadWorkflows (config: { [s: string]: IWorkflow; } | ArrayLike<IWorkflow>) {
    const workflowMap = new Map<string, IWorkflow>(Object.entries(config));

    workflowMap.forEach(loadWorkflow);

    return config;
}

function loadWorkflow (workflowConfig: IWorkflow, name: string) : IWorkflow {
    const cfg = workflowConfig;
    
    // load each state from config, add transitions property and associate 
    const 
        statesMap = new Map<string, IWorkflowState>(Object.entries(cfg.states)),
        transitionsMap = new Map<string, WorkflowTransition>(Object.entries(cfg.transitions));
    
    cfg.name = name;
    
    if (typeof cfg.initialState == 'string') cfg.initialState = cfg.states[cfg.initialState as string];

    transitionsMap.forEach((t: WorkflowTransition) => {
        // set from and to states for each transition
        if (t.fromId) t.from = statesMap.get(t.fromId);
        if (t.toId) t.to = statesMap.get(t.toId);

        // Add t to from state's transitions
        (t.from.transitions = t.from.transitions || []).push(t);
    });

    return cfg;
}

// @ts-ignore this is dumb, TS can't understand hydrating objects without creating them completely first
export const workflows: { [s: string]: IWorkflow; } = loadWorkflows(workflowConfig);

