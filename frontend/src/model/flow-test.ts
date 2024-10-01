/* eslint-disable import/extensions */
import { BaseFlowTask } from './base-flow-task';
import { Flow } from './flow.ts';

class TestTask extends BaseFlowTask {
  readonly isConsoleInfo: boolean;

  constructor(taskId: string, flow: Flow, isConsoleInfo: boolean = false) {
    super(taskId, flow);
    this.isConsoleInfo = isConsoleInfo;
  }

  async run() {
    if (!this.isConsoleInfo) return;
    console.info(`Running empty task ${this.taskId}`);
    console.info(`finished task ${this.taskId}`);
    // console.info(this.flow);
    // console.info(this.flow.getContext());
  }
}

const flow = new Flow('test');
const t1 = new TestTask('t1', flow, true);
const t2 = new TestTask('t2', flow, true);
const t3 = new TestTask('t3', flow, true);
const t4 = new TestTask('t4', flow, true);

flow.addTask(t1);
flow.addTask(t2);
flow.addTask(t3);
flow.addTask(t4);

t1.setDownstream(t2);
t1.setDownstream(t3);
t2.setDownstream(t4);
t3.setDownstream(t4);

flow.run();
