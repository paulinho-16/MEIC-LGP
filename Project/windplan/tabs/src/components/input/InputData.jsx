import { useContext, useState } from 'react';
import { DbContext } from '../../context/db'

import { parseFile } from '../FileParser'

import ProgressBar from '../progressBar/ProgressBar';

import StyledDropzone from './StyledDropzone';

export default function InputData({ uploadCallback }) {
  const db = useContext(DbContext)

  const [progress, setProgress] = useState(0)

  const updateProgress = (newVal) => {
    setProgress(newVal)
    if (newVal === 0) uploadCallback()
  }

  const handleFiles = async (files) => {
    files.forEach(async (file) => await parseFile(db, file, progress, updateProgress));
  }

  return (
    <div style={{ flexGrow: 1 }}>
      {progress > 0 && <ProgressBar progress={progress} />}
      <h3>Input Data</h3>
      <StyledDropzone handleFiles={handleFiles} />
    </div>
  );
}