import { useContext, useEffect, useState } from 'react';
import { Dropdown, Text } from '@fluentui/react-northstar';
import { DbContext } from '../../context/db';
import ProjectOverview from './ProjectOverview';

import './ProjectOverview.css'

export default function SelectProjectOverview() {
  const [selected, setSelected] = useState(null);

  const [state, setState] = useState({
    programs: [],
    items: [],
    projects: [],
    months: [],
  })

  const db = useContext(DbContext)

  useEffect(() => {
    async function loadPrograms() {
      const programs = (await db.rel.find('program'))

      setState({
        programs: programs.programs,
        items: programs.items,
        projects: programs.projects,
        months: programs.months
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

  if (state.items === undefined) {
    return (<div>No programs in tool! Please upload data and click the 'Apply Changes' button on the navbar!</div>)
  }

  if (state.programs.length === 0) return (
    <div>
      <h2>View Programs</h2>
      <Text content="Loading..." />
    </div>
  )

  return (
    <div>
      <h2>View Program</h2>
      <Dropdown
        items={state.programs.map(el => el.name)}
        placeholder={"Select Program"}
        onChange={handleChange}
      />

      <div className='project-overview-content'>
        <ProjectOverview overviewType={"cost"} doc={state.programs[selected]} items={state.items} projects={state.projects} months={state.months} />
        <ProjectOverview overviewType={"capacity"} doc={state.programs[selected]} items={state.items} projects={state.projects} months={state.months} />
      </div>
    </div>
  );
}