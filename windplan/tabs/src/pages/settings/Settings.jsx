import { Input, Text } from "@fluentui/react-northstar";
import React, { useContext } from "react";
import { SettingsContext, SettingsDispatchContext } from "../../context/settings";

export default function Matrix() {
  const settings = useContext(SettingsContext)
  const setSettings = useContext(SettingsDispatchContext)

  const handleChange = (key, name, value) => {
    setSettings({ ...settings, [key]: { ...settings[key], [name]: value } })
  }

  return(
    <div style={{ padding: "2em 3em" }}>
      { Object.keys(settings).map((key, i) => (
        <div key={i} style={{marginBottom: '1em', display: "flex", gap: "3em", alignItems: "center" }}>
          <Text weight="bold" size="large" content={key}/>
          {
            Object.keys(settings[key]).map((name, i) => (
              <div key={i} style={{marginBottom: '1em'}}>
                <Input
                  type="number"
                  step={0.01}
                  label={name}
                  name={name}
                  defaultValue={settings[key][name].toString()}
                  value={settings[key][name].toString()}
                  onChange={(e) => handleChange(key, name, e.target.value ? parseFloat(e.target.value) : 0)}
                  onFocus={(e) => e.target.select()}
                />
              </div>
            ))
          }
          {/* <label>{key}: 
            <input name={key} value={settings[key]} onChange={handleChange} />
          </label> */}
        </div>
      ))}            
    </div>
  )
}
