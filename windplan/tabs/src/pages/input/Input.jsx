import React, { useContext, useEffect, useState } from 'react';

import { Button, Text, TrashCanIcon, UndoIcon } from "@fluentui/react-northstar";

import InputData from '../../components/input/InputData';
import Select from '../../components/input/Select';

import "./Input.css";
import { DbContext, DbDispatchContext } from '../../context/db';

export default function Input() {
  const db = useContext(DbContext)
  const resetDb = useContext(DbDispatchContext)

  const [uploaded, setUploaded] = useState(false)

  useEffect(() => {
    const checkDbStatus = async () => {
      db.info().then((result) => {
        if (result["doc_count"] > 0) setUploaded(true) 
      })
    }

    checkDbStatus()
  }, [db])

  const uploadCallback = () => setUploaded(true)

  

  const clearDatabase = () => {
    setUploaded(false)
    resetDb()
  }

  return (
    <div className="input">
      <div style={{ display: "flex", gap: "3em" }}>
        <div className="db-actions">
          <h3>Database Actions</h3>
          <Button flat onClick={clearDatabase} icon={<UndoIcon />} content="RESTORE DATA (TODO)"/>
          <Button flat onClick={clearDatabase} icon={<TrashCanIcon />} content="CLEAR DATABASE"/>
        </div>
        <InputData uploadCallback={uploadCallback} />
      </div>
      <div>
        <h3>Database Data</h3>
      </div>
      <div>
        { uploaded ? (
          <Select type="programs" />
        ) : (
          <Text size="large">No data to show.</Text>
        )}
      </div>
    </div>
  );
}
