import { useState } from 'react';

export default function ExternalFactorForm({ state, setState }) {
  const [factorName, setFactorName] = useState("");

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

  return (
    <div>
    <h5>New External Factor</h5>
    <div>
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
    </div>
    <div>
        <span>Quick Factors:</span>
        <button onClick={(e) => createExternalFactor(e, 0, "yearVolume")}>Year Volume</button>
        <button onClick={(e) => createExternalFactor(e, 0, "cmNew")}>CM New</button>
        <button onClick={(e) => createExternalFactor(e, 0, "cmUpside")}>CM Upside</button>
        <button onClick={(e) => createExternalFactor(e, 2022, "plPeriod")}>P&L Period</button>
    </div>
    </div>
  );
}