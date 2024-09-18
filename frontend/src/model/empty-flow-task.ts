import { BaseFlowTask } from './base-flow-task';
import { Flow } from './flow';

export class EmptyFlowTask extends BaseFlowTask {
  private readonly isConsoleInfo: boolean;

  constructor(taskId: string, flow: Flow, isConsoleInfo: boolean = false) {
    super(taskId, flow);
    this.isConsoleInfo = isConsoleInfo;
  }

  override run() {
    if (!this.isConsoleInfo) return;
    console.info(`Running empty task ${this.taskId}`);
    console.info(this.flow);
    console.info(this.flow.getContext());
  }
}
