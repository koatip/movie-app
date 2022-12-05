import { Link } from 'react-router-dom';
import Statistic from '../components/Statistic';

export default function MyStat() {

    return(
        <div className='container'>
            <h1>Karácsonyi filmek statisztikája</h1>
            <Statistic />
            <Link className='btn btn-danger' to='/'>Vissza a főoldalra</Link>
        </div>
    )
}