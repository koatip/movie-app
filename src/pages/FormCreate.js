import { Link } from 'react-router-dom';
import Form from '../components/Form';

export default function FormCreate() {

    return(
        <main className='container'>
            <h1>Karácsonyi film felvétele</h1>
            <Form />
            <Link className='btn btn-danger' to='/'>Vissza a főoldalra</Link>
        </main>
    )
}