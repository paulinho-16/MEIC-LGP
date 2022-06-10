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
  const [resetting, setResetting] = useState(false)
  const [restoring, setRestoring] = useState(false)

  useEffect(() => {
    const checkDbStatus = async () => {
      db.info().then((result) => {
        if (result["doc_count"] > 0) setUploaded(true) 
      })
    }

    checkDbStatus()
  }, [db])

  const uploadCallback = () => setUploaded(true)

  const restoreDatabase = async () => {
    setRestoring(true)

    const restoreDoc = async (itemId, rev) => {
      const { type, id } = db.rel.parseDocID(itemId)
      
      if (type === 'item' && rev.startsWith("2-")) return Promise.resolve()
      
      console.log(itemId, rev)

      const revisions = (await db.get(itemId, { revs: true }))._revisions
      const firstRev = "1-" + revisions.ids[revisions.ids.length - 1]
  
      let newItem = (await db.get(itemId, { rev: firstRev })).data
      newItem["id"] = id
      newItem["rev"] = rev
  
      await db.rel.save(type, newItem).catch(err => console.log(err))
    }

    const changedDocs = (await db.find({ 
      selector: { "_rev": { "$regex": "^(?!1-).*$"} },
      fields: ["_id", "_rev"]
    })).docs

    const promises = changedDocs.map(doc => restoreDoc(doc._id, doc._rev))
    
    await Promise.all(promises)

    setRestoring(false)
  }

  const clearDatabase = async () => {
    setResetting(true)
    setUploaded(false)
    await resetDb()
    setResetting(false)
  }

  return (
    <div className="input">
      <div style={{ display: "flex", gap: "3em" }}>
        <div className="db-actions">
          <h3>Database Actions</h3>
          <Button flat onClick={restoreDatabase} loading={restoring} disabled={restoring} icon={<UndoIcon />} content={restoring ? "RESTORING" : "RESTORE DATA"}/>
          <Button flat onClick={clearDatabase} loading={resetting} disabled={resetting} icon={<TrashCanIcon />} content={resetting ? "RESETTING" : "CLEAR DATABASE"}/>
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
