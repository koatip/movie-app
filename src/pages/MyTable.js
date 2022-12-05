import { Link } from 'react-router-dom';
import Table from '../components/Table';

export default function MyTable() {

    return(
        <div className='container'>
            <h1>Karácsonyi film lista</h1>
            <Table />
            <Link className='btn btn-danger' to='/'>Vissza a főoldalra</Link>
        </div>
    )
}