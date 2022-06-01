import { useContext, useState } from 'react';
import { DbContext } from '../../context/db';
import EditProgram from './EditProgram';

export default function Program({ doc, deleteCallback }) {
  const [editing, setEditing] = useState(false)
  const db = useContext(DbContext)

  const handleSave = (state) => {
    if (editing) {
      db.rel.save('program', state).then(() => {
        setEditing(false)
        console.log("Save")
      })
    }
  }

  const handleDelete = () => {
    db.rel.del('program', doc).then(() => {
      deleteCallback()
      console.log("Delete")
    })
  }

  return (
    <>
      <h2>{doc.name} {doc.strategic && '(!)'}</h2>
      { !editing ? (
        <>
          <p>ID: {doc.id}</p>
          <p>Name: {doc.name}</p>
          <p>Items: {JSON.stringify(doc.items)}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <EditProgram defaultDoc={doc} submitFunction={handleSave} />
      )}
    </>
  );
}