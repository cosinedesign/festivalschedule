
interface IWorkflowItem {
    id?: number, 
    name?: string
}

export interface IWorkflow extends IWorkflowItem {
    get initialState(): string | IWorkflowState;
    set initialState(value: string | IWorkflowState);
    get states(): Array<IWorkflowState>;
    get transitions(): Array<WorkflowTransition>;
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