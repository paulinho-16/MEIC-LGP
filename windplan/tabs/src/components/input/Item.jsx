import { Button, Divider, EditIcon, Text, TrashCanIcon, UndoIcon } from '@fluentui/react-northstar';
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

    db.rel.save(type, item).then(async (result) => {
      item["rev"] = result["rev"]
      setState(item)
    }).catch(err => console.log(err))
  }

  return (
    <div style={{ marginTop: "1em", display: "flex", gap: "2em" }}>
      { !editing ? (
        <>
          <div>
            <div style={{ display: "flex", gap: "0.5em", marginBottom: "1em" }}>
              <Button flat onClick={() => setEditing(true)} icon={<EditIcon />} content="EDIT"/>
              <Button flat onClick={handleRestore} icon={<UndoIcon />} content="RESTORE"/>
              <Button flat onClick={handleDelete} icon={<TrashCanIcon />} content="DELETE"/>
            </div>
            <Divider content="Fields"/>
            { Object.keys(state).filter(key => key !== "rev" && typeof state[key] !== "object").map((key) => (
                <div key={key}>
                  <Text weight="bold" size="large" content={key + ": "}/>
                  <Text size="large" content={state[key].toString()}/>
                </div>
            )) }
          </div>
          <div style={{ flexGrow: 1 }}>
            { Object.keys(state).filter(key => Array.isArray(state[key]) && state[key].length > 0).map((key) => (
              <div key={key} style={{ marginBottom: "1em" }}>
                <Select type={key} ids={state[key]} />
              </div>
            )) }
          </div>
        </>
      ) : (
        <div>
          <EditItem defaultDoc={state} type={type} submitFunction={handleSave} cancelFunction={() => setEditing(false)} />
        </div>
      )}
    </div>
  );
}