import { useContext, useEffect, useState } from 'react';
import { DbContext } from '../../context/db';
import Program from './Program';

export default function SelectProgram() {
  const [selected, setSelected] = useState(0);
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
    setSelected(0)
  }

  return (
    <div>
      <h1>View Program</h1>
      <label>Select program:
        <select name="program" onChange={(e) => setSelected(parseInt(e.target.value))} defaultValue={0}>
          <option value={0}></option>
          {rows.map((row, i) => (<option key={row.id} value={row.id}>{row.name}</option>))}
        </select>
      </label>
      { selected > 0 && <Program id={selected} deleteCallback={deleteCallback} /> }
    </div>
  );
}