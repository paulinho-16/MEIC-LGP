import React from 'react';
import CreateProgram from '../components/CreateProgram';
import EditScoringVars from '../components/EditScoringVars/EditScoringVars';
import SelectProgram from '../components/SelectProgram';

export default function Input() {
  return (
    <>
      <h1>Input</h1>
      <CreateProgram />
      <SelectProgram />
      <EditScoringVars />
    </>
  );
}
