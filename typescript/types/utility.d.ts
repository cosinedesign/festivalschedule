import { Workflow, WorkflowState } from "./workflow";

export interface IHash<T> {
    [index: string]: T;
}

export interface IUser {
    name: string,
    id: string,
    roles: Array<string>
}

export type Controller {
    initialize: Function;
    get workflow () : Workflow;
    get workflowState () : WorkflowState;
}