import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';

export default function Statistic() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getDocs(collection(db, 'films')).then(snapshot => {
            const films = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setData(films);
        })
    }, []);


    return(
        <table className='table'>
            <thead>
                <tr>
                    <th>Filmek száma</th>
                    <th>+80 filmek</th>
                    <th>Összes oscar díj</th>
                    <th>Magyar szinkron</th>
                    <th>Magyar szinkron aránya</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.length}</td>
                    <td>{data.filter(film => film.age === 80).length}</td>
                    <td>{data.reduce((sum, film) => sum + film.oscar, 0)}</td>
                    <td>{data.filter(film => film.hungarian).length}</td>
                    <td>{(data.filter(film => film.hungarian).length / data.length * 100) + '%'}</td>
                </tr>
            </tbody>
        </table>
    )
}