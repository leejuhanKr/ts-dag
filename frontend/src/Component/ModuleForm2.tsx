import Form from '@rjsf/core';
import { RJSFSchema, UiSchema, FieldProps, RegistryFieldsType } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import React from 'react';

const schema: RJSFSchema = {
  type: 'object',
  required: ['lat', 'lon'],
  properties: {
    lat: { type: 'number' },
    lon: { type: 'number' },
  },
};

// Define a custom component for handling the root position object
interface GeoPositionState {
  lat: number;
  lon: number;
}

class GeoPosition extends React.Component<FieldProps, GeoPositionState> {
  constructor(props: FieldProps) {
    super(props);
    this.state = { ...props.formData } as GeoPositionState;
  }

  onChange(name: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState(
        (prevState) => ({
          ...prevState,
          [name]: parseFloat(event.target.value),
        }),
        // eslint-disable-next-line react/destructuring-assignment
        () => this.props.onChange(this.state),
      );
    };
  }

  render() {
    const { lat, lon } = this.state;
    return (
      <div>
        <input type="number" value={lat} onChange={this.onChange('lat')} />
        <input type="number" value={lon} onChange={this.onChange('lon')} />
      </div>
    );
  }
}

// Define the custom field component to use for the root object
const uiSchema: UiSchema = { 'ui:field': 'geo' };

// Define the custom field components to register; here our "geo"
// custom field component
const fields: RegistryFieldsType = { geo: GeoPosition };

const ModuleForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleSubmit = ({ formData }: any) => {
    console.log('formData', formData);
    const force = formData.mass.value * formData.acceleration.value;
    console.log(`Force: ${force} N`); // 단위 변환 로직 필요
  };

  return <Form schema={schema} uiSchema={uiSchema} validator={validator} fields={fields} />;
};

export default ModuleForm;
