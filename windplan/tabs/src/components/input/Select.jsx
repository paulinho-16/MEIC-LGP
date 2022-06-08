import { Divider, Dropdown, Text } from '@fluentui/react-northstar';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DbContext } from '../../context/db';
import Item from './Item';

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

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
  const [rows, setRows] = useState(null)

  const db = useContext(DbContext)

  const loadRows = useCallback(async () => {
    let newRows;

    if (ids) newRows = (await db.rel.find(Singulars[type], ids))
    else newRows = (await db.rel.find(Singulars[type]))

    setRows(newRows[type] ? newRows[type] : [])
  }, [type, ids, db])

  useEffect(() => {
    loadRows();

    return function cleanup() {
      setSelected(0)
    };
  }, [db, type, ids, loadRows])

  const changeCallback = (deleted) => {
    if (deleted) setSelected(0)
    loadRows()
  }

  if (rows === null) {
    return (
      <Text>Loading...</Text>
    )
  }

  const handleChange = (_, e) => {
    if (e.value != null) {
      setSelected(rows.findIndex(el => el.name === e.value) + 1)
    } else setSelected(0)
  }

  return (
    <div>
      <Dropdown
        items={rows.map(el => el.name)}
        clearable
        placeholder={"Select " + titleCase(Singulars[type])}
        onChange={handleChange}
      />
      { selected > 0 && 
        <>
          <Divider content={rows[selected - 1].name}/>
          <Item item={rows[selected - 1]} type={Singulars[type]} changeCallback={changeCallback} />
        </> }
    </div>
  );
}