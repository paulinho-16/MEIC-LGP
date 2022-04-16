import { useDB } from 'react-pouchdb';
import EditProgram from './EditProgram';

export default function CreateProgram() {
  const { post } = useDB();

  const handleSubmit = (state) => {
    post(state);
  }

  const defaultDoc = { 
    name: '',
    strategic: false,
    start_date: '',
    due_date: '',
    priority: 0
  };

  return (
    <>
      <h2>Create a New Program</h2>
      <EditProgram defaultDoc={defaultDoc} submitFunction={handleSubmit} />
    </>
  );
}