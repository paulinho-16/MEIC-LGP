import { useState } from 'react';

export default function EditProgram({ defaultDoc, submitFunction, cancelFunction }) {
  const [state, setState] = useState(defaultDoc);
  const [factorName, setFactorName] = useState("");

  const handleChange = (name, value) => {
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

  const createExternalFactor = (e, defaultValue, nameOverride = null) => {
    e.preventDefault()

    const name = nameOverride ? nameOverride : factorName

    if (name === "") {
      console.log("Factor name cannot be empty!")
      return
    }

    if (state[name]) {
      console.log("Already exists a field with the name: " + name)
      return
    }

    setState({...state, [name]: defaultValue})
    setFactorName("")
  }

  const renderField = (name) => {
    if (typeof state[name] === "string") {
      return (
        <div key={name}>
          <label>
            {name}
            <input
              name={name}
              type="text"
              value={state[name]}
              onChange={(e) => handleChange(name, e.target.value)} />
          </label>
          <button onClick={(e) => handleRemove(e, name)}>Remove</button>
        </div>
      )
    } else if (typeof state[name] === "number") {
      return (
        <div key={name}>
          <label>
            {name}
            <input
              name={name}
              type="number"
              step={0.01}
              value={state[name]}
              onInput={(e) => handleChange(name, e.target.value ? parseFloat(e.target.value) : 0)} />
          </label>
          <button onClick={(e) => handleRemove(e, name)}>Remove</button>
        </div>
      )
    } else if (typeof state[name] === "boolean") {
      return (
        <div key={name}>
          <label>
            {name}
            <input
              name={name}
              type="checkbox"
              checked={state[name]}
              onChange={(e) => handleChange(name, e.target.checked)} />
          </label>
          <button onClick={(e) => handleRemove(e, name)}>Remove</button>
        </div>
      )
    }
  }

  return (
    <form>
      <div id="program-fields">
        <h5>Fields</h5>
        { Object.keys(state).filter(key => !["id", "rev", "items"].includes(key)).map((key) => renderField(key)) }
      </div>
      <div>
        <h5>New External Factor</h5>
        <label>
          Field name:
          <input
            name="name"
            type="text"
            value={factorName}
            onChange={(e) => setFactorName(e.target.value)} />
        </label>
        <button onClick={(e) => createExternalFactor(e, "")}>String</button>
        <button onClick={(e) => createExternalFactor(e, 0)}>Number</button>
        <button onClick={(e) => createExternalFactor(e, false)}>Boolean</button>
        <div>
          <span>Quick Factors:</span>
          <button onClick={(e) => createExternalFactor(e, 0, "year volume")}>Year Volume</button>
          <button onClick={(e) => createExternalFactor(e, 0, "cm new")}>CM New</button>
          <button onClick={(e) => createExternalFactor(e, 0, "cm upside")}>CM Upside</button>
          <button onClick={(e) => createExternalFactor(e, 2022, "p&l period")}>P&L Period</button>
        </div>
      </div>
      <div>
        <h5>Actions</h5>
        <input type="submit" value="Confirm" onClick={handleSubmit} />
        <input type="submit" value="Cancel" onClick={handleCancel} />
      </div>
    </form>
  );
}