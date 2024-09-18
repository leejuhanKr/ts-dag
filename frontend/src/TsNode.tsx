/* eslint-disable no-console */
import { Handle, NodeProps, Position } from '@xyflow/react';

import { TsNode as TsNodeType } from './data/tsNodes';

// eslint-disable-next-line react/function-component-definition
export default function TsNode({ data }: NodeProps<TsNodeType>) {
  return (
    <div className="bg-gray-100 rounded shadow">
      <div className="border-b border-gray-900/10">
        <h2 className="text-base font-semibold leading-7 text-gray-900">{`module ${data.label}`}</h2>
        {data.description.length > 10 ? (
          <details>
            <summary className="mt-1 text-sm leading-6 text-gray-600 cursor-pointer">
              {data.description.slice(0, 10)}...
            </summary>
            <p className="mt-1 text-sm leading-6 text-gray-600">{data.description}</p>
          </details>
        ) : (
          <p className="mt-1 text-sm leading-6 text-gray-600">{data.description}</p>
        )}
        {/* <p className="mt-1 text-sm leading-6 text-gray-600">{data.description}</p> */}
      </div>
      {data.sourceHandles.map((handle) => (
        <div key={handle.id} className="relative h-4">
          <div className="flex flex-row justify-between">
            <span className="left-1 text-xs">{handle.label}</span>
            <span className="left-1 text-xs">{handle.type}</span>
          </div>
          <Handle
            id={handle.id}
            type="target"
            position={Position.Left}
            style={{ left: -8, top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>
      ))}
      <div className="border-t border-gray-200 my-2" />
      {data.targetHandles.map((handle) => (
        <div key={handle.id} className="relative h-4">
          <div className="flex flex-row justify-between">
            <span className="right-1 text-xs">{handle.label}</span>
            <span className="right-1 text-xs">{handle.type}</span>
          </div>
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
