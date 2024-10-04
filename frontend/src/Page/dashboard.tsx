import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
// import './index.css';

import { nodes as elkInitNodes } from '../data/elkNodes';
import { nodes as tsInitNodes } from '../data/tsNodes';
import { edges as elkInitEdges } from '../data/elkEdges';
import useLayoutNodes from '../useLayoutNodes';
import CustomNode from '../renderer/Components/CustomNode';
import ElkNode from '../ElkNode';
import TsNode from '../TsNode';

const nodeTypes = {
  elk: ElkNode,
  custom: CustomNode,
  ts: TsNode,
};

const initNodes = [...elkInitNodes, ...tsInitNodes];
const initEdges = elkInitEdges;

const FlowMap = () => {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);

  useLayoutNodes();

  const a = useReactFlow();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const res = a.toObject();

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      fitView
      nodeTypes={nodeTypes}
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};

const Dashboard = () => (
  <ReactFlowProvider>
    <div className="App" style={{ height: '100vh', width: '100vw' }}>
      <FlowMap />
    </div>
  </ReactFlowProvider>
);

export default Dashboard;
