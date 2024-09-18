import { Handle, NodeProps, Position } from '@xyflow/react';
import React, { memo } from 'react';
// import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeProps extends NodeProps {
  data: {
    inputs: string[];
    outputs: string[];
    label: string;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => (
  <div className="custom-node">
    {data.inputs.map((input: string, index: number) => (
      <Handle
        // eslint-disable-next-line react/no-array-index-key
        key={`input-${index}__${input}`}
        type="target"
        position={Position.Left}
        id={`input-${index}`}
        style={{ top: `${25 + index * 20}%` }}
      />
    ))}

    <div className="node-content">
      <strong>{data.label}</strong>
    </div>

    {data.outputs.map((output: string, index: number) => (
      <Handle
        // eslint-disable-next-line react/no-array-index-key
        key={`output-${index}__${output}`}
        type="source"
        position={Position.Right}
        id={`output-${index}`}
        style={{ top: `${25 + index * 20}%` }}
      />
    ))}
  </div>
);

export default memo(CustomNode);
