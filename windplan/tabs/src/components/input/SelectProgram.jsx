import { useContext, useEffect, useState } from 'react';
import { DbContext } from '../../context/db';
import Program from './Program';

export default function SelectProgram() {
  const [selected, setSelected] = useState(null);
  const [rows, setRows] = useState([])

  const db = useContext(DbContext)

  useEffect(() => {
    async function loadPrograms() {
      const programs = (await db.rel.find('program')).programs
  
      setRows(programs)
    }
    
    loadPrograms();
  }, [db])

  const deleteCallback = () => {
    setSelected(null)
  }

  return (
    <div>
      <h2>View Program</h2>
      <label>Select program:
        <select name="program" onChange={(e) => setSelected(e.target.value)} defaultValue={null}>
          <option value={null}></option>
          {rows.map((row, i) => (<option key={row.id} value={i}>{row.name}</option>))}
        </select>
      </label>
      { selected && <Program doc={rows[selected]} deleteCallback={deleteCallback} /> }
    </div>
  );
}