import { useContext, useEffect, useState } from 'react';
import { DbContext, DbDispatchContext } from '../../context/db'

import { parseFile } from '../FileParser'

import ProgressBar from '../progressBar/ProgressBar';

import StyledDropzone from './StyledDropzone';

const DefaultState = {
  programs: [],
  items: [],
  projects: [],
  months: []
}

export default function InputData() {
  const db = useContext(DbContext)
  const resetDb = useContext(DbDispatchContext)

  const [state, setState] = useState(DefaultState)
  const [progress, setProgress] = useState(0)
  
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

  const handleFiles = async (files) => {
    files.forEach(async (file) => await parseFile(db, file, progress, setProgress));
    getData()
  }

  return (
    <div>
      {progress > 0 && <ProgressBar progress={progress}/>}
      <h1>Input Data</h1>
      <StyledDropzone handleFiles={handleFiles} />
      <hr />
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