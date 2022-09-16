import { Button, Input, Text } from '@fluentui/react-northstar';
import { useState } from 'react';

export default function ExternalFactorForm({ state, setState }) {
  const [factorName, setFactorName] = useState("");

  const createExternalFactor = (e, defaultValue, nameOverride = null) => {
    e.preventDefault()

    const name = nameOverride ? nameOverride : factorName

    if (name === "") {
      console.log("Factor name cannot be empty!")
      return
    }

    if (state[name]) {
      console.log("Already exists a field with the name: " + name)
      return
    }

    setState({...state, [name]: defaultValue})
    setFactorName("")
  }

  return (
    <div>
      <Text weight='bold' size="large">Create External Factor</Text>
      <div style={{ margin: "0.5em 0" }}>
        <Text>Quick Factors:</Text>
        <div style={{ display: "flex", gap: "1em" }}>
          <Button flat onClick={(e) => createExternalFactor(e, 0, "year volume")} content="Year Volume"/>
          <Button flat onClick={(e) => createExternalFactor(e, 0, "cm new")} content="CM New"/>
          <Button flat onClick={(e) => createExternalFactor(e, 0, "cm upside")} content="CM Upside"/>
          <Button flat onClick={(e) => createExternalFactor(e, 2022, "p&l period")} content="P&L Period"/>
        </div>
      </div>
      <div style={{ margin: "0.5em 0" }}>
        <Input 
          inline
          label="New Factor: "
          value={factorName}
          onChange={(e) => setFactorName(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", gap: "1em" }}>
        <Button flat onClick={(e) => createExternalFactor(e, "")} content="String"/>
        <Button flat onClick={(e) => createExternalFactor(e, 0)} content="Number"/>
        <Button flat onClick={(e) => createExternalFactor(e, false)} content="Boolean"/>
      </div>
    </div>
  );
}