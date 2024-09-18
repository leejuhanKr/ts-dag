import { type Node } from '@xyflow/react';
import { Flow } from '../model/flow';
import { TsFnFlowTaskV2 } from '../model/ts-fn-flow-task2';

export type TsNodeData = {
  label: string;
  description: string;
  sourceHandles: { id: string; label: string; type: string }[];
  targetHandles: { id: string; label: string; type: string }[];
};

export type TsNode = Node<TsNodeData, 'ts'>;

const funcString = `function mul(input1: number, input2: number): number {
  return input1 * input2;
};`;
const flow = new Flow('flow1');
const node = new TsFnFlowTaskV2('TsFnFlowTaskV2', funcString, flow);
node.setInput('input1', 3);
node.setInput('input2', 4);
await node.run();
console.log(node.getOutput());

const NodeToData = (TsNodeImpl: TsFnFlowTaskV2): TsNode => ({
  id: TsNodeImpl.id,
  data: {
    label: TsNodeImpl.functionName,
    description: TsNodeImpl.getFunctionString(),
    sourceHandles: TsNodeImpl.inputParams.map((param) => ({
      id: `${TsNodeImpl.id}-input-${param.name}`,
      label: param.name,
      type: param.type?.toString() ?? 'unknown',
    })),
    targetHandles: [TsNodeImpl.outputParam].map((param) => ({
      id: `${TsNodeImpl.id}-output-${param.name}`,
      label: param.name,
      type: param.type?.toString() ?? 'unknown',
    })),
  },
  position: { x: 0, y: 0 },
  type: 'ts',
});

export const nodes: TsNode[] = [
  NodeToData(node),
  // {
  //   id: 'ts-1',
  //   data: {
  //     label: 'ts-1',
  //     // we need unique ids for the handles (called 'ports' in elkjs) for the layouting
  //     // an id is structured like: nodeid-source/target-id
  //     sourceHandles: [{ id: 'a-s-a' }, { id: 'a-s-b' }, { id: 'a-s-c' }],
  //     targetHandles: [],
  //   },
  //   position: { x: 0, y: 0 },
  //   type: 'ts',
  // },
];

console.log(nodes);
