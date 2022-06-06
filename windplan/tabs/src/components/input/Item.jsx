import { useContext, useEffect, useState } from 'react';
import { DbContext } from '../../context/db';
import EditItem from './EditItem';
import Select from './Select';

export default function Item({ item, type, changeCallback }) {
  const [state, setState] = useState({})
  const [editing, setEditing] = useState(false)
  const db = useContext(DbContext)

  useEffect(() => {
    setState(item)
  }, [item])

  const handleSave = (newState) => {
    if (editing) {
      db.rel.save(type, newState).then(() => {
        setState(newState)
        setEditing(false)
        changeCallback()
      })
    }
  }

  const handleDelete = () => {
    db.rel.del(type, state)
    changeCallback()
  }

  const handleRestore = async () => {
    const itemId = db.rel.makeDocID({ "type": type, "id": state.id });

    const revisions = (await db.get(itemId, { revs: true }))._revisions
    const firstRev = "1-" + revisions.ids[revisions.ids.length - 1]

    let item = (await db.get(itemId, { rev: firstRev })).data
    item["id"] = state.id
    item["rev"] = state.rev
    
    console.log(item)

    db.rel.save(type, item).then((result) => {
      console.log("Reverted item to default")
    }).catch(err => console.log(err))
  }

  return (
    <>
      { !editing ? (
        <div>
          <h5>Fields</h5>
          { Object.keys(state).filter(key => key !== "rev" && typeof state[key] !== "object").map((key) => (
              <p key={key}>{key}: {state[key]}</p>
          )) }
          <h5>Actions</h5>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleRestore}>Restore</button>
        </div>
      ) : (
        <EditItem defaultDoc={state} type={type} submitFunction={handleSave} cancelFunction={() => setEditing(false)} />
      )}
      { Object.keys(state).filter(key => Array.isArray(state[key]) && state[key].length > 0).map((key) => (
          <Select type={key} ids={state[key]} />
      )) }
    </>
  );
}