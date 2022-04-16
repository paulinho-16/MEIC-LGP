import { useFind } from 'react-pouchdb';
import Program from './Program';

export default function Programs() {
  const docs = useFind({
    selector: {}
  });

  return (
    <div>
      {docs.map(doc => (
        <Program key={doc._id} doc={doc} />
      ))}
    </div>
  );
}