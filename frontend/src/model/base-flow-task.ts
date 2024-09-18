/* eslint-disable no-underscore-dangle */
import { Runnable } from './types';
import { DAGNode } from './dag';
import type { Flow } from './flow';

// eslint-disable-next-line import/prefer-default-export
export abstract class BaseFlowTask extends DAGNode<BaseFlowTask> implements Runnable {
  public readonly taskId: string;

  private _flow: Flow | null = null;

  constructor(taskId: string, flow: Flow) {
    super();
    this.taskId = taskId;
    this.flow = flow;
  }

  abstract run(): Promise<void>;

  get flow() {
    if (!this._flow) {
      throw new Error('flow is not set');
    }
    return this._flow;
  }

  set flow(flow: Flow) {
    if (!flow) {
      this._flow = null;
      return;
    }
    if (flow.getTask(this.taskId) !== this) {
      flow.addTask(this);
    }
    this._flow = flow;
  }
}
