import React, { useContext } from "react";
import { SettingsContext, SettingsDispatchContext } from "../../context/settings";

export default function Matrix() {
  const settings = useContext(SettingsContext)
  const setSettings = useContext(SettingsDispatchContext)

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  return(
    <div>
      { Object.keys(settings).map((key, i) => (
        <div key={i} style={{marginBottom: '1rem'}}>
          <label>{key}: 
            <input name={key} value={settings[key]} onChange={handleChange} />
          </label>
        </div>
      ))}            
    </div>
  )
}
