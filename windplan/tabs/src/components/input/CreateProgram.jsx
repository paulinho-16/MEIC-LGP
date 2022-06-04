import { useContext, useEffect, useState } from 'react';
import { DbContext, DbDispatchContext } from '../../context/db'

import { parseFile } from '../FileParser'

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
  
  const getData = async () => {
    const program = (await db.rel.find('program', 1))

    console.log(program)
    
    if (!program.programs) {
      setState(DefaultState)
      return
    }
    
    setState({
      programs: program.programs,
      items:  program.items,
      projects:  program.projects,
      months:  program.months
    })
  } 

  useEffect(() => { getData() }, [db])

  const handleFiles = (files) => {
    // NOTE: IT ONLY ACCEPTS THE FILE PROJECT_DEM_BOOK_COST_20.05.2022.xlsx
    for (let file of files)
      parseFile(db, file);
  }

  return (
    <div>
      <h2>Input Data</h2>
      <StyledDropzone handleFiles={handleFiles} />
      <br />
      <button onClick={getData}>Refresh DB</button>
      <button onClick={resetDb}>Reset DB</button>
      <br />
      <p>Example program:</p>
      <ul>
        { state.programs.map((row, i) => <li key={i} >{JSON.stringify(row)}</li>)}
      </ul>
    </div>
  );
}