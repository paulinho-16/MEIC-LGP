import { useContext, useEffect, useState } from 'react';
import { DbContext } from '../../context/db';
import ProjectOverview from './ProjectOverview';

import './ProjectOverview.css'

export default function SelectProjectOverview() {
  const [selected, setSelected] = useState(null);
  const [rows, setRows] = useState([])

  const [state, setState] = useState({
    items: [],
    projects: [],
    months: [],
  })

  const db = useContext(DbContext)

  useEffect(() => {
    async function loadPrograms() {
      const programs = (await db.rel.find('program')).programs

      setRows(programs)

      const items = (await db.rel.find('item')).items

      const projects = (await db.rel.find('project')).projects

      const months = (await db.rel.find('month')).months

      setState({
        items:items,
        projects:projects,
        months:months
      })
    }
    
    loadPrograms();
  }, [db])

  function handleChange(e) {
    setSelected(e.target.value);
  }

  return (
    <div>
      <h2>View Program</h2>
      <label>Select program:
        <select name="program" onChange={handleChange} defaultValue={null}>
          <option value={null}></option>
          {rows.map((row, i) => (<option key={row.id} value={i}>{row.name}</option>))}
        </select>
      </label>
      <div className='project-overview-content'>
        <ProjectOverview overviewType={"cost"} doc={rows[selected]} items={state.items} projects={state.projects} months={state.months} />
        <ProjectOverview overviewType={"capacity"}doc={rows[selected]} items={state.items} projects={state.projects} months={state.months} />
      </div>
    </div>
  );
}