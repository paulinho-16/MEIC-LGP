import React from 'react';

import InputData from '../../components/input/InputData';
import Select from '../../components/input/Select';
import EditScoringVars from '../../components/EditScoringVars/EditScoringVars';

import "./Input.css";

export default function Input() {
  return (
    <div className="input">
      <InputData />
      <Select type="programs" />
      <EditScoringVars />
    </div>
  );
}
