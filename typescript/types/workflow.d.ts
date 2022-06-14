
interface IWorkflowItem {
    id?: number, 
    name?: string
}

export interface IWorkflow extends IWorkflowItem {
    initialState: string | IWorkflowState;
    readonly states: Array<IWorkflowState>;
    readonly transitions: Array<WorkflowTransition>;
}

export interface IWorkflowState extends IWorkflowItem {
    transitions: Array<WorkflowTransition>;
}

export type WorkflowTransition = IWorkflowItem & {
    from: IWorkflowState,
    fromId: string,
    to: IWorkflowState,
    toId: string
}