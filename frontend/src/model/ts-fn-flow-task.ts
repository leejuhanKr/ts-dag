/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { Runnable } from './types';
import { BaseFlowTask } from './base-flow-task';
import { Flow } from './flow';

export class TsFnFlowTask extends BaseFlowTask {
  private readonly runnable: Runnable;

  constructor(taskId: string, runnable: Runnable | (() => unknown), flow: Flow) {
    super(taskId, flow);
    this.runnable =
      typeof runnable === 'function'
        ? {
            run: async () => {
              await runnable();
            },
          }
        : runnable;
  }

  override async run() {
    console.log(`Running task ${this.taskId}`);
    await this.runnable.run();
  }
}
