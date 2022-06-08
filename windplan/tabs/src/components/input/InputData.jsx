import { useContext, useState } from 'react';
import { DbContext, DbDispatchContext } from '../../context/db'
import { ProgramsContext, ProgramsDispatchContext } from '../../context/programs';
import { SettingsContext } from '../../context/settings';

import { parseFile } from '../FileParser'

import ProgressBar from '../progressBar/ProgressBar';
import { aggregateProgramData, rankPrograms } from '../Ranking';

import StyledDropzone from './StyledDropzone';

export default function InputData() {
  const db = useContext(DbContext)
  const resetDb = useContext(DbDispatchContext)

  const programs = useContext(ProgramsContext)
  const updatePrograms = useContext(ProgramsDispatchContext)

  const settings = useContext(SettingsContext)

  const [progress, setProgress] = useState(0)

  const runTool = async () => {
    const parsedPrograms = await aggregateProgramData(db)

    const rankedPrograms = rankPrograms(settings, parsedPrograms)

    updatePrograms(rankedPrograms)
  }

  const handleFiles = async (files) => {
    files.forEach(async (file) => await parseFile(db, file, progress, setProgress));
  }

  return (
    <div>
      {progress > 0 && <ProgressBar progress={progress}/>}
      <h1>Input Data</h1>
      <StyledDropzone handleFiles={handleFiles} />
      <hr />
      <button onClick={runTool}>Run</button>
      <button onClick={resetDb}>Reset DB</button>
      <br />
      <p>There are currently {programs.length} programs on the tool!</p>
    </div>
  );
}