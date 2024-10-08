/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldProps, isObject, RegistryFieldsType, RJSFSchema, WidgetProps } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/core';
import { useEffect, useState } from 'react';

const measurementSchema: RJSFSchema = {
  type: 'object',
  properties: {
    value: { type: 'number' },
    unit: { type: 'string' },
  },
};

const massUnits = ['kg', 'g', 'lb'];
const accelerationUnits = ['m/s²', 'ft/s²', 'g'];
const schema: RJSFSchema = {
  type: 'object',
  properties: {
    mass: {
      ...measurementSchema,
      properties: {
        ...measurementSchema.properties,
        unit: {
          type: 'string',
          enum: massUnits,
          default: 'kg',
        },
      },
    },
    acceleration: {
      ...measurementSchema,
      properties: {
        ...measurementSchema.properties,
        unit: {
          type: 'string',
          enum: accelerationUnits,
          default: 'm/s²',
        },
      },
    },
  },
};

// const MeasurementWidget: React.FC<WidgetProps> = (props) => {
//   const { value, onChange } = props;

//   return (
//     <div className="flex">
//       hi
//       <input
//         type="number"
//         value={value?.value || ''}
//         onChange={(e) => onChange({ ...value, value: parseFloat(e.target.value) })}
//       />
//       <input type="text" value={value?.unit || ''} onChange={(e) => onChange({ ...value, unit: e.target.value })} />
//     </div>
//   );
// };

const MeasurementField: React.FC<FieldProps> = (props) => {
  const { formData, onChange, schema, name } = props;
  // const unitOptions = schema.properties.unit.enum;
  const unit = schema.properties?.unit;
  if (unit !== undefined && unit instanceof Object && unit.enum !== undefined) {
    // do nothing
  } else {
    throw new Error('Unit is required');
  }

  const unitOptions = unit.enum as string[];

  return (
    <div className="flex">
      <label>{name}</label>
      <input
        type="number"
        value={formData?.value || ''}
        onChange={(e) => onChange({ ...formData, value: parseFloat(e.target.value) })}
      />
      <select value={formData?.unit || unit.default} onChange={(e) => onChange({ ...formData, unit: e.target.value })}>
        {unitOptions.map((unit: string) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
};

// const MeasurementField: React.FC<FieldProps> = (props) => {
//   console.log('UnitInput', props);
//   const { onChange, value, options } = props;
//   const [scalarValue, setScalarValue] = useState('');
//   // const [unit, setUnit] = useState(options.defaultUnit || '');
//   const [unit, setUnit] = useState(options.defaultUnit?.toString() || '');

//   useEffect(() => {
//     if (value) {
//       setScalarValue(value.value || '');
//       setUnit(value.unit || options.defaultUnit || '');
//     }
//   }, [value, options.defaultUnit]);

//   const handleScalarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newScalar = e.target.value;
//     setScalarValue(newScalar);
//     onChange({ value: newScalar, unit });
//   };

//   const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newUnit = e.target.value;
//     setUnit(newUnit);
//     onChange({ value: scalarValue, unit: newUnit });
//   };

//   if (!Array.isArray(options.units)) {
//     return <div>Missing units</div>;
//   }

//   return (
//     <div className="flex unit-input-container">
//       <input type="number" value={scalarValue} onChange={handleScalarChange} className="scalar-input" />
//       <select value={unit} onChange={handleUnitChange} className="unit-select">
//         {options.units.map((u: string) => (
//           <option key={u} value={u}>
//             {u}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

const fields: RegistryFieldsType = { measurement: MeasurementField };

const uiSchema = {
  mass: {
    'ui:field': 'measurement',
  },
  acceleration: {
    'ui:field': 'measurement',
  },
};

// const widgets = {
//   measurement: MeasurementWidget,
// };

const ModuleForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = ({ formData }: any) => {
    console.log('formData', formData);
    const force = formData.mass.value * formData.acceleration.value;
    console.log(`Force: ${force} N`); // 단위 변환 로직 필요
  };

  return (
    <Form
      className="schema-form"
      fields={fields}
      validator={validator}
      schema={schema}
      uiSchema={uiSchema}
      // widgets={widgets}
      onSubmit={handleSubmit}
    />
  );
};

export default ModuleForm;
