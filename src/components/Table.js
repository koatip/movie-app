
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, deleteDoc, getDocs, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

import Select from './Select';
import Radio from './Radio';


export default function Table() {

  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);

  const filmsRef = collection(db, 'films');

  function getData(queryRef) {
    getDocs(queryRef).then((querySnapshot) => {
      const films = {};

      querySnapshot.forEach((doc) => {
        films[doc.id] = {
          ...doc.data(),
          id: doc.id,
        }
      });
      setData(films);
    })
  }

  function getCategories() {
    // const categories = [];
    // getDocs(filmsRef).then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     const docItem = doc.data();
    //     if (!categories.includes(docItem.category)) {
    //       categories.push(docItem.category)
    //     }
    //   })
    // })
    getDocs(filmsRef).then(querySnapshot => {
      const categories = querySnapshot.docs.map(doc => doc.data().category)
      setCategories([...new Set(categories)])
    })
  }

  useEffect(() => {
      getData(filmsRef)
      getCategories()
    }, []);

    function handleDelete(id) {
      deleteDoc(doc(db, 'films', id)).then(getData(filmsRef));
    }

    function handleRadioChange(event) {
      const value = event.target.value;
      if (value === 'all') {
        getData(filmsRef);
      } else {
        const gettingBoolean = value === 'true';
        const queryRef = query(filmsRef, where('hungarian', '==', gettingBoolean))
        getData(queryRef)
      }
    }

    function handleCategoryChange(event) {
      const value = event.target.value;
      if (value === '') {
        getData(filmsRef)
      } else {
        const queryRef = query(filmsRef, where('category', '==', value))
        getData(queryRef)
      }
    }

    return (
      <>
        <div>
          <label className='form-label'>Szinkron</label>
          <Radio
            id="1"
            name="hun"
            label="Magyar szinkron"
            value={true}
            handleChange={handleRadioChange}
          />

          <Radio
            id="2"
            name="hun"
            label="Nincs magyar szinkron"
            value={false}
            handleChange={handleRadioChange}
          />

          <Radio
            id="3"
            name="hun"
            label="Összes film"
            value='all'
            handleChange={handleRadioChange}
          />

        </div>

        <Select
          name='category'
          handleChange={handleCategoryChange}
          label='Kategória'
        >
          <option value=''>Válassz..</option>
          {categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>

        <table className='table'>
          <thead>
            <tr>
              <th>Film címe</th>
              <th>Kategória</th>
              <th>Korhatár</th>
              <th>Magyar szinkron</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(data).map((film) => (
              <tr key={film.id}>
                <td>{film.title}</td>
                <td>{film.category}</td>
                <td>{film.age}</td>
                <td>{film.hungarian ? '✅' : '❌'}</td>
                <td>
                  <button className='btn btn-danger me-3' onClick={() => handleDelete(film.id)}>Törlés</button>
                  <Link className='btn btn-primary' to={`/edit/${film.id}`}>Módosítás</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }