// import { MergeExParam, calc3dpmSchemaEx, calcDefaultExParam, geometryDesignFnOutEx } from "../json-schema-parser/example";
import { FlowSchema } from '../types';
import { TsFnFlowTask } from './ts-fn-flow-task';
import { BaseFlowTask } from './base-flow-task';
import { Flow } from './flow';
import { mergeParam, getDefaultParamFromSchema } from './execute-flow-task';
import { calc3dpmSchemaEx, geometryDesignFnOutEx } from './example-data';

class MockExecuteOperator extends BaseFlowTask {
  constructor(
    id: string,
    private executeUrl: string,
    private schema: FlowSchema,
    flow: Flow,
  ) {
    super(id, flow);
  }
  run() {
    console.log(`Running task ${this.taskId}`);
    const defaultParam = getDefaultParamFromSchema(this.schema);
    console.log(defaultParam);
    // -----
    const context = this.flow.getContext();
    const upstreamIds = [...this.upstreamList].map((node) => node.taskId);
    console.log(upstreamIds);
    const param = upstreamIds
      .map((upstreamId) => context.get(upstreamId))
      .reduce((acc, cur) => mergeParam(acc, cur), defaultParam);
    console.log(param);
    context.set(this.taskId, {
      'moapy.data_pre.clac3pdm!!': { concrete: [Object], rebar: [Object], tendon: [Object] },
    });

    // const upstreamIds = [...this.upstream].map(node => node.taskId);
    // const required = this.getRequired();
    // const context = this.flow.getContext();
    // const upstreamInput = upstreamIds.map(id => context.get(id));
    // const input = mergeInput(upstreamInput, this.schema);
    // const result = executeFunc(this.executeUrl, input);
    // context.set(this.taskId, result);
  }

  getRequired() {
    const required = this.schema.required;
    return required;
  }
}

export class SetInputOperator extends BaseFlowTask {
  constructor(
    id: string,
    private input: any,
    flow: Flow,
  ) {
    super(id, flow);
  }
  run() {
    console.log(`Running task ${this.taskId}`);
    const context = this.flow.getContext();
    // this.input.json['moapy.data_pre.Geometry'] = null
    context.set(this.taskId, this.input.json);
  }
}

export class SetOutputOperator extends BaseFlowTask {
  constructor(id: string, flow: Flow) {
    super(id, flow);
  }
  async run() {
    console.log(`Running task ${this.taskId}`);
    const context = this.flow.getContext();
    const upstreamIds = [...this.upstreamList].map((node) => node.taskId);
    // const result = upstreamIds.map(id => context.get(id));
    let calcResult = upstreamIds.reduce((acc, cur) => {
      console.log('cur', cur);
      console.log('cur2', context.get(cur));
      return { ...acc, ...context.get(cur) };
    }, {});
    const result = {
      print: 'print what you want',
      version: 'version',
      json: calcResult,
    };
    context.set(this.taskId, result);
  }
}

const bar = () => {
  const flow = new Flow('just for run');
  const f1 = new TsFnFlowTask(
    '1',
    {
      run: () => {
        console.log('run1');
      },
    },
    flow,
  );
  const f2 = new TsFnFlowTask(
    '2',
    {
      run: () => {
        console.log('run2');
      },
    },
    flow,
  );
  const f3 = new TsFnFlowTask(
    '3',
    {
      run: () => {
        console.log('run3');
      },
    },
    flow,
  );
  const f4 = new TsFnFlowTask(
    '4',
    {
      run: () => {
        console.log('run4');
      },
    },
    flow,
  );
  const f5 = new TsFnFlowTask(
    '5',
    {
      run: () => {
        console.log('run5');
      },
    },
    flow,
  );
  f1.setDownstream(f3);
  f2.setDownstream(f3);
  f3.setDownstream(f4);
  f5.setDownstream(f4);
  flow.run();
};
bar();

const baz = async () => {
  const flow = new Flow('just for run');
  const start = new SetInputOperator(`${flow.id.replaceAll(' ', '_')}__input`, geometryDesignFnOutEx, flow);
  const f1 = new MockExecuteOperator('calc_3dpm', './calc_3dpm', calc3dpmSchemaEx, flow);
  start.setDownstream(f1);
  const leafTasks = flow.leafTaskList;
  console.log(leafTasks);
  const end = new SetOutputOperator(`${flow.id.replaceAll(' ', '_')}__output`, flow);
  console.log(leafTasks);
  leafTasks.map((task) => task.setDownstream(end));
  await flow.run();
  const res = flow.getContext().get(end.taskId);
  console.log('context\n--------------\n', flow.getContext());
  console.log('res\n--------------\n', res);
};
// baz();
