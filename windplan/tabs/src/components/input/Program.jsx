import { useState } from 'react';
import { useDB } from 'react-pouchdb';
import EditProgram from './EditProgram';

export default function Program({ doc, deleteCallback }) {
  const [editing, setEditing] = useState(false)
  const { put, remove } = useDB();

  const handleSave = (state) => {
    if (editing) {
      put(state).then(() => {
        setEditing(false)
      })
    }
  }

  const handleDelete = () => {
    deleteCallback()
    remove(doc)
  }

  return (
    <>
      <h2>{doc.name} {doc.strategic && '(!)'}</h2>
      { !editing ? (
        <>
          <p>ID: {doc._id}</p>
          <p>{doc.start_date} to {doc.due_date}</p>
          <p>Priority: {doc.priority}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <EditProgram defaultDoc={doc} submitFunction={handleSave} />
      )}
    </>
  );
}