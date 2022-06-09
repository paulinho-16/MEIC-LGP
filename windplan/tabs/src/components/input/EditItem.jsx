import { AcceptIcon, Button, CloseIcon, ExclamationTriangleIcon, Form, FormCheckbox, FormInput, TrashCanIcon } from '@fluentui/react-northstar';
import { useState } from 'react';
import ExternalFactorForm from './ExternalFactorForm';

export default function EditItem({ defaultDoc, type, submitFunction, cancelFunction }) {
  const [state, setState] = useState(defaultDoc);

  const handleChange = (name, value) => {
    console.log(name, value)
    setState({ ...state, [name]: value });
  }

  const handleRemove = (e, name) => {
    e.preventDefault()
    setState({ ...state, [name]: undefined });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitFunction(state)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    cancelFunction()
  }

  const markStrategic = (e) => {
    e.preventDefault()
    setState({ ...state, strategic: true });
  }

  const renderField = (name) => {
    if (typeof state[name] === "string") {
      return (
        <div key={name} style={{ display: "flex" }}>
          <Button icon={<TrashCanIcon />} text iconOnly title="Remove" onClick={(e) => handleRemove(e, name)} />
          <FormInput
            inline
            label={name}
            name={name}
            value={state[name]}
            showSuccessIndicator={false}
            onChange={(e) => handleChange(name, e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        </div>
      )
    } else if (typeof state[name] === "number") {
      return (
        <div key={name} style={{ display: "flex" }}>
          <Button icon={<TrashCanIcon />} text iconOnly title="Remove" onClick={(e) => handleRemove(e, name)} />
          <FormInput
            inline
            type="number"
            step={0.01}
            label={name}
            name={name}
            defaultValue={state[name].toString()}
            value={state[name].toString()}
            onChange={(e) => handleChange(name, e.target.value ? parseFloat(e.target.value) : 0)}
            onFocus={(e) => e.target.select()}
          />
        </div>
      )
    } else if (typeof state[name] === "boolean") {
      return (
        <div key={name} style={{ display: "flex" }}>
          <Button icon={<TrashCanIcon />} text iconOnly title="Remove" onClick={(e) => handleRemove(e, name)} />
          <FormCheckbox 
            inline
            label={name} 
            labelPosition="start"
            checked={state[name]}
            onChange={(e, { checked }) => handleChange(name, checked)}
          />
        </div>
      )
    }
  }

  return (
    <Form>
      { Object.keys(state)
          .filter(key => !["id", "rev"].includes(key) && typeof state[key] !== "object")
          .map((key) => renderField(key)) 
      }
      <div style={{ display: "flex", gap: "1em" }}>
        <Button flat onClick={handleSubmit} icon={<AcceptIcon />} content="CONFIRM"/>
        <Button flat onClick={handleCancel} icon={<CloseIcon />} content="CANCEL"/>
      </div>
      { type === "program" && 
        <>
          <Button flat onClick={markStrategic} icon={<ExclamationTriangleIcon />} content="MARK AS STRATEGIC"/>
          <ExternalFactorForm state={state} setState={setState} />
        </>
      }
    </Form>
  );
}