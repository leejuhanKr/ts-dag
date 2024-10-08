import React, { useState, useEffect } from 'react';
import { FieldProps } from '@rjsf/utils';

const UnitInput: React.FC<FieldProps> = (props) => {
  console.log('UnitInput', props);
  const { onChange, value, options } = props;
  const [scalarValue, setScalarValue] = useState('');
  // const [unit, setUnit] = useState(options.defaultUnit || '');
  const [unit, setUnit] = useState(options.defaultUnit?.toString() || '');

  useEffect(() => {
    if (value) {
      setScalarValue(value.value || '');
      setUnit(value.unit || options.defaultUnit || '');
    }
  }, [value, options.defaultUnit]);

  const handleScalarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScalar = e.target.value;
    setScalarValue(newScalar);
    onChange({ value: newScalar, unit });
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
    onChange({ value: scalarValue, unit: newUnit });
  };

  if (!Array.isArray(options.units)) {
    return <div>Missing units</div>;
  }

  return (
    <div className="flex unit-input-container">
      <input type="number" value={scalarValue} onChange={handleScalarChange} className="scalar-input" />
      <select value={unit} onChange={handleUnitChange} className="unit-select">
        {options.units.map((u: string) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UnitInput;
