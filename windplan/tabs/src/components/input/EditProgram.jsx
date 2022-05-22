import { useState } from 'react';

export default function EditProgram({ defaultDoc, submitFunction }) {
  const [state, setState] = useState(defaultDoc);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setState({ ...state, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitFunction(state)
  }

  return (
    <form>
      <label>
        Program name:
        <input
          name="name"
          type="text"
          value={state.name}
          onChange={handleChange} />
      </label>
      <br />
      <label>
        Strategic:
        <input
          name="strategic"
          type="checkbox"
          checked={state.strategic}
          onChange={handleChange} />
      </label>
      <br />
      <input type="submit" value="Confirm" onClick={handleSubmit} />
    </form>
  );
}