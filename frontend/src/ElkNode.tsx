/* eslint-disable no-console */
import { Handle, NodeProps, Position } from '@xyflow/react';

import { ElkNode as ElkNodeType } from './data/elkNodes';

// const ModuleInput = () => {
//   console.log(data);
//   return (
//     <div className="flex flex-col">
//       <input type="text" />
//       <Handle key={handle.id} id={handle.id} type="target" position={Position.Left} />
//     </div>
//   );
// };

// eslint-disable-next-line react/function-component-definition

// eslint-disable-next-line react/function-component-definition
export default function ElkNode({ data }: NodeProps<ElkNodeType>) {
  return (
    <div className="bg-white rounded shadow">
      <div className="border-b border-gray-900/10">
        <h2 className="text-base font-semibold leading-7 text-gray-900">{`module ${data.label}`}</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">description</p>
      </div>
      {data.targetHandles.map((handle) => (
        <div key={handle.id} className="relative h-4">
          <span className="absolute left-1 text-xs">input</span>
          <Handle
            id={handle.id}
            type="target"
            position={Position.Left}
            style={{ left: -8, top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>
      ))}
      {data.sourceHandles.map((handle) => (
        <div key={handle.id} className="relative h-4">
          <span className="absolute right-1 text-xs">output</span>
          <Handle
            id={handle.id}
            type="source"
            position={Position.Right}
            style={{ right: -8, top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>
      ))}
    </div>
  );
}
