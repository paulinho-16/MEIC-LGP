import { useContext, useEffect, useState } from 'react';
import { Dropdown } from '@fluentui/react-northstar';
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
      const programs_aux = (await db.rel.find('program'))
      const programs = programs_aux.programs

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

  const handleChange = (_, e) => {
    console.log(e)
    if (e.value != null) {
      setSelected(e.highlightedIndex)
    } else setSelected(0)
  }

  return (
    <div>
      <h2>View Program</h2>
      <Dropdown
        items={rows.map(el => el.name)}
        placeholder={"Select Program"}
        onChange={handleChange}
      />
      
      <div className='project-overview-content'>
        <ProjectOverview overviewType={"cost"} doc={rows[selected]} items={state.items} projects={state.projects} months={state.months} />
        <ProjectOverview overviewType={"capacity"}doc={rows[selected]} items={state.items} projects={state.projects} months={state.months} />
      </div>
    </div>
  );
}