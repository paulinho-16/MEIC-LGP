import { useState } from 'react';
import { useFind } from 'react-pouchdb';
import Program from './Program';

export default function SelectProgram() {
  const [selected, setSelected] = useState(null);

  const docs = useFind({
    selector: {},
  });

  const deleteCallback = () => {
    setSelected(null)
  }

  return (
    <>
      <label>Select program:
        <select name="program" onChange={(e) => setSelected(e.target.value)} defaultValue={null}>
          <option value={null}></option>
          {docs.map((doc, i) => (<option key={doc._id} value={i}>{doc.name}</option>))}
        </select>
      </label>
      { selected && <Program doc={docs[selected]} deleteCallback={deleteCallback} /> }
    </>
  );
}