import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import useValidation from '../useValidation'

import Input from './Input'
import Select from './Select'
import CheckBox from './CheckBox'
import Radio from './Radio'
import Textarea from './Textarea'

export default function Form({ id = null }) {
  const navigate = useNavigate()
  const categories = ['családi', 'vígjáték', 'animáció', 'akció', 'romantikus']
  const reportFormValidity = useValidation();

  const initalValues = {
    title: '',
    category: '',
    age: '',
    oscar: 0,
    hungarian: false,
    auth: false,
    email: '',
    description: ''
  }

  const [formData, setFormData] = useState(initalValues)
  const [errorMessages, setErrorMessages] = useState({})
  const [wasValidated, setWasValidated] = useState(false)
  const [alert, setAlert] = useState({ text: '', type: '' })

  useEffect(() => {
    if (id) {
      const docRef = doc(db, 'films', id)
      getDoc(docRef).then(docSnap => {
        setFormData(docSnap.data())
      })
    }
  }, [id])

  function handleSubmit(event) {
    event.preventDefault()
    const formIsValid = reportFormValidity(formData, setErrorMessages)
    setWasValidated(true)

    if (formIsValid) {
      const data = {
        title: formData.title,
        category: formData.category,
        age: parseInt(formData.age ? formData.age : 0),
        oscar: parseInt(formData.oscar),
        hungarian: formData.hungarian,
        auth: formData.auth
      }
      if (id) {
        updateDoc(doc(db, 'films', id), data)
      } else {
        addDoc(collection(db, 'films'), data)
      }

      setFormData(initalValues)
      setErrorMessages({})
      setWasValidated(false)

      setAlert({ text: 'Sikeres mentés', type: 'success' })
      navigate('/table')
    } else {
      setAlert({ text: 'Sikertelen küldés', type: 'danger' })
    }
  }

  const handleChange = ({ target: { name, value, checked, type } }) => {
    if (type === 'checkbox') value = checked
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        name='title'
        label='Film címe'
        handleChange={handleChange}
        errorMessages={errorMessages.title}
        wasValidated={wasValidated}
        value={formData.title}
      />

      <Select
        name='category'
        label='Kategória'
        handleChange={handleChange}
        errorMessages={errorMessages.category}
        wasValidated={wasValidated}
        value={formData.category}
      >
        <option value=''>Válassz..</option>
        {categories.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>

      <div className='mb-3'>
        <label className='form-label'>Korhatár</label>
        <Radio
          id='1'
          name='age'
          label='+6'
          value='6'
          checked={parseInt(formData.age) === 6}
          handleChange={handleChange}
          wasValidated={wasValidated}
          errorMessages={errorMessages.age}
        />

        <Radio
          id='2'
          name='age'
          label='+12'
          value='12'
          checked={parseInt(formData.age) === 12}
          handleChange={handleChange}
          wasValidated={wasValidated}
          errorMessages={errorMessages.age}
        />

        <Radio
          id='3'
          name='age'
          label='+18'
          value='18'
          checked={parseInt(formData.age) === 18}
          handleChange={handleChange}
          wasValidated={wasValidated}
          errorMessages={errorMessages.age}
          showMessage={true}
        />
      </div>

      <CheckBox label='Magyar szinkron' name='hungarian' checked={formData.hungarian} handleChange={handleChange} />

      <CheckBox
        label='Igazolom, hogy a fent megadott adatok a valóságnak megfelelnek.*'
        name='auth'
        checked={formData.auth}
        handleChange={handleChange}
        wasValidated={wasValidated}
        errorMessages={errorMessages.auth}
      />

      <Input
        type='number'
        name='oscar'
        handleChange={handleChange}
        label='Oscar díjak száma'
        errorMessages={errorMessages.oscar}
        wasValidated={wasValidated}
        value={formData.oscar}
      />

      <Input
        type='email'
        name='email'
        handleChange={handleChange}
        label='Email'
        errorMessages={errorMessages.email}
        wasValidated={wasValidated}
        value={formData.email}
      />

      <Textarea 
        name='description'
        handleChange={handleChange}
        label='Film tartalma'
        errorMessages={errorMessages.description}
        wasValidated={wasValidated}
        value={formData.description}
      />

      <button className='btn btn-success'>Küldés</button>
      {alert.text && <div className={`alert alert-${alert.type}`}>{alert.text}</div>}
    </form>
  )
}
