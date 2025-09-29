import { WorkflowModel } from '../models/Workflow';
import { ClientConnection } from 'message-event-channel';
export declare class Workflows {
    private connection;
    constructor(connection: ClientConnection);
    /**
     *
     * @returns Workflow
     *
     * Used to fetch all workflows for a given hub. Returns a promise which will resolve to a [[WorkflowModel[]]]
     *
     * ### Example
     *
     * ```typescript
     * const workflows = await sdk.workflows.getAll()
     *
     * console.log(workflows)
     * ```
     *
     */
    getAll(): Promise<WorkflowModel[]>;
}
