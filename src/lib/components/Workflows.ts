import { WORKFLOWS } from '../constants/Events';
import { WorkflowModel } from '../models/Workflow';
import { ClientConnection } from 'message-event-channel';

export class Workflows {
  constructor(private connection: ClientConnection) {}

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
  async getAll(): Promise<WorkflowModel[]> {
    return this.connection.request(WORKFLOWS.GET_ALL_WORKFLOWS);
  }
}
