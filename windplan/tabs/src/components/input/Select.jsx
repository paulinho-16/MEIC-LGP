import { useContext, useEffect, useState } from 'react';
import { DbContext } from '../../context/db';
import Item from './Item';

const Singulars = {
  "programs": "program",
  "items": "item",
  "milestones": "milestone",
  "projects": "project",
  "teams": "team",
  "months": "month"
}

export default function Select({ type, ids }) {
  const [selected, setSelected] = useState(0);
  const [rows, setRows] = useState([])

  const db = useContext(DbContext)

  async function loadRows() {
    let newRows;

    if (ids) newRows = (await db.rel.find(Singulars[type], ids))
    else newRows = (await db.rel.find(Singulars[type]))

    setRows(newRows[type] ? newRows[type] : [])
  }

  useEffect(() => {
    loadRows();

    return function cleanup() {
      setSelected(0)
    };
  }, [db, type, ids])

  const changeCallback = (deleted) => {
    if (deleted) setSelected(0)
    loadRows()
  }

  return (
    <div>
      <h1>View {type}</h1>
      <label>Select {Singulars[type]}:
        <select name={type} onChange={(e) => setSelected(parseInt(e.target.value))} defaultValue={0}>
          <option value={0}></option>
          {rows.map((row, i) => (<option key={row.id} value={i + 1}>{row.name}</option>))}
        </select>
      </label>
      { selected > 0 && <Item item={rows[selected - 1]} type={Singulars[type]} changeCallback={changeCallback} /> }
    </div>
  );
}