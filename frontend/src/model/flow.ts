/* eslint-disable import/prefer-default-export */
import { Runnable } from './types';
import { BaseFlowTask } from './base-flow-task';
import { DAG } from './dag';

export class Flow implements Runnable {
  private readonly taskMap: DAG<BaseFlowTask> = new DAG();

  private readonly context: Map<string, unknown> = new Map();

  constructor(public readonly id: string) {}

  async run() {
    const leafs = this.leafTaskList;
    await Promise.all(leafs.map((v) => this.runWithDeps(v)));
    // const rootTaskList = this.rootTaskList;
    // await Promise.all(rootTaskList.map((v) => this.runWithDeps(v)));
  }

  get taskList() {
    return this.taskMap.nodeList;
  }

  get rootTaskList() {
    return this.taskMap.rootNodeList;
  }

  get leafTaskList() {
    return this.taskMap.leafNodeList;
  }

  getTask(id: string) {
    return this.taskMap.getNode(id);
  }

  getContext() {
    return this.context;
  }

  addTask(task: BaseFlowTask) {
    const { taskId } = task;
    const existingTask = this.getTask(taskId);

    if (existingTask && existingTask !== task) {
      throw new Error(`Task with ID ${taskId} already exists in this DAG`);
    }

    this.taskMap.addNode(taskId, task);
    this.getTask(taskId)!.flow = this;
  }

  private async runWithDeps(task: BaseFlowTask) {
    const deps = task.getDirectRelatives(true);
    await Promise.all([...deps.values()].map((v) => this.runWithDeps(v)));
    await task.run();
  }

  getInfoString() {
    return {
      id: this.id,
      tasks: this.taskList.map((task) => task.taskId),
      links: this.taskList.flatMap((upstreamTask) =>
        [...upstreamTask.downstreamList].map((downStreamTask) => ({
          source: upstreamTask.taskId,
          target: downStreamTask.taskId,
        })),
      ),
    };
  }
}
