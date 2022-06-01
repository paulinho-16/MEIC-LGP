import React from 'react';

import CreateProgram from '../../components/input/CreateProgram';
import SelectProgram from '../../components/input/SelectProgram';

import "./Input.css";

export default function Input() {
  return (
    <div className="input">
      <CreateProgram />
      <SelectProgram />
    </div>
  );
}
