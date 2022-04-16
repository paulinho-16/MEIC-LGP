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
      <label>
        Start Date:
        <input
          name="start_date"
          type="date"
          value={state.start_date}
          onChange={handleChange} />
      </label>
      <br />
      <label>
        Due Date:
        <input
          name="due_date"
          type="date"
          value={state.due_date}
          onChange={handleChange} />
      </label>
      <br />
      <label>
        Priority:
        <input
          name="priority"
          type="number"
          value={state.priority}
          onChange={handleChange} />
      </label>
      <br />
      <input type="submit" value="Confirm" onClick={handleSubmit} />
    </form>
  );
}