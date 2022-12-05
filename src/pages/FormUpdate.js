import { Link, useParams } from 'react-router-dom';
import Form from '../components/Form';

export default function FormUpdate() {
  const { id } = useParams();

  return (
    <main className='container'>
      <h1>Karácsonyi film módosítása</h1>
      <Form id={id} />
      <Link className='btn btn-danger' to='/'>Vissza a főoldalra</Link>
    </main>
  )
}