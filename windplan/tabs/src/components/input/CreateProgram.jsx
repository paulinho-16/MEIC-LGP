import { useContext, useEffect, useState } from 'react';
import { DbContext, DbDispatchContext } from '../../context/db'

import { parseFile } from '../FileParser'

import ProgressBar from '../progressBar/ProgressBar';

// import EditProgram from './EditProgram';

import StyledDropzone from './StyledDropzone';

const DefaultState = {
  programs: [],
  items: [],
  projects: [],
  months: []
}

export default function CreateProgram() {
  const db = useContext(DbContext)
  const resetDb = useContext(DbDispatchContext)

  const [state, setState] = useState(DefaultState)
  const [progress, setProgress] = useState(0)
  
  const getData = async () => {
    const newPrograms = (await db.rel.find('program')).programs
    console.log("Got " + newPrograms.length + " programs")
    
    if (!newPrograms.length) {
      setState(DefaultState)
      return
    }
    
    const newItems = (await db.rel.find('item', newPrograms[0].items)).items
    console.log("Got " + newItems.length + " items from the first program")
    
    const newProjects = (await db.rel.find('project', newItems[0].projects)).projects
    console.log("Got " + newProjects.length + " projects from the first item")
    
    const newMonths = (await db.rel.find('month', newProjects[0].months)).months
    console.log("Got " + newMonths.length + " months from the first project")
    
    setState({
      programs: newPrograms,
      items: newItems,
      projects: newProjects,
      months: newMonths
    })
  } 

  useEffect(() => { getData() }, [db])

  const handleFiles = async (files) => {
    files.forEach(async (file) => await parseFile(db, file, progress, setProgress));
    getData()
  }

  return (
    <div>
      {progress > 0 && <ProgressBar progress={progress}/>}
      <h2>Input Data</h2>
      <StyledDropzone handleFiles={handleFiles} />
      <br />
      <button onClick={getData}>Refresh DB</button>
      <button onClick={resetDb}>Reset DB</button>
      <br />
      <p>There are {state.programs.length} programs in the db.</p>
      <ul>
        { state.programs.map((row, i) => <li key={i} >{JSON.stringify(row)}</li>)}
      </ul>
      <p>There are {state.items.length} items in the first program.</p>
      <ul>
        { state.items.map((row, i) => <li key={i} >{JSON.stringify(row)}</li>)}
      </ul>
      <p>There are {state.projects.length} projects in the first item.</p>
      <ul>
        { state.projects.map((row, i) => <li key={i} >{JSON.stringify(row)}</li>)}
      </ul>
      <p>There are {state.months.length} months in the first project.</p>
      <ul>
        { state.months.map((row, i) => <li key={i} >{JSON.stringify(row)}</li>)}
      </ul>
    </div>
  );
}