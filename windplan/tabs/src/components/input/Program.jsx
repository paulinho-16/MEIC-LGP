import { useContext, useEffect, useState } from 'react';
import { DbContext } from '../../context/db';
import EditProgram from './EditProgram';

export default function Program({ id, deleteCallback }) {
  const [data, setData] = useState(null)
  const [editing, setEditing] = useState(false)
  const db = useContext(DbContext)

  useEffect(() => {
    const updateProgram = async (programId) => {
      const program = (await db.rel.find('program', programId))
      
      if (program.programs.length === 1) {
        setData({
          program: program.programs[0],
          items:  program.items,
          projects:  program.projects,
          months:  program.months
        })
      }

    }
    
    updateProgram(id)
  }, [id, editing, db])

  const handleSave = (state) => {
    if (editing) {
      db.rel.save('program', state).then(() => {
        setEditing(false)
      })
    }
  }

  const handleDelete = () => {
    db.rel.del('program', data.program)
    deleteCallback()
  }

  const handleRestore = async () => {
    const programId = db.rel.makeDocID({ "type": "program", "id": data.program.id });

    const revisions = (await db.get(programId, { revs: true }))._revisions
    const firstRev = "1-" + revisions.ids[revisions.ids.length - 1]

    let program = (await db.get(programId, { rev: firstRev })).data
    program["id"] = data.program.id
    program["rev"] = data.program.rev
    
    console.log(program)

    db.rel.save('program', program).then((result) => {
      console.log("Reverted program to default")
    }).catch(err => console.log(err))
  }

  if (!data) {
    return (
      <div>
        Loading Program...
      </div>
    )
  }

  return (
    <>
      <h2>{data.program.name} {data.program.strategic && '(!)'}</h2>
      <div>
        { !editing ? (
          <div>
            <p>ID: {data.program.id}</p>
            <p>Name: {data.program.name}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleRestore}>Restore</button>
          </div>
        ) : (
          <EditProgram defaultDoc={data.program} submitFunction={handleSave} cancelFunction={() => setEditing(false)} />
        )}
        <h4>Items</h4>
        <pre>{JSON.stringify(data.items, null, 2)}</pre>
        <h4>Projects</h4>
        <pre>{JSON.stringify(data.projects, null, 2)}</pre>
        <h5>Months</h5>
        <pre>{JSON.stringify(data.months, null, 2)}</pre>
      </div>
    </>
  );
}