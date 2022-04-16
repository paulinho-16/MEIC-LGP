import { useState } from 'react';
import { useAllDocs } from 'react-pouchdb';
import Program from './Program';

export default function SelectProgram() {
  const [selected, setSelected] = useState(null);

  const rows = useAllDocs({
    include_docs: true
  });

  const deleteCallback = () => {
    setSelected(null)
  }

  return (
    <>
      <h2>View Program</h2>
      <label>Select program:
        <select name="program" onChange={(e) => setSelected(e.target.value)} defaultValue={null}>
          <option value={null}></option>
          {rows.map((row, i) => (<option key={row.id} value={i}>{row.doc.name}</option>))}
        </select>
      </label>
      { selected && <Program doc={rows[selected].doc} deleteCallback={deleteCallback} /> }
    </>
  );
}