export default function useValidation() {

  const validators = {
    title: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres'
      },
      {
        fn: isLongerThan3,
        errorMessage: 'Minimum 3 karakter hosszúnak kell lennie'
      }
    ],
    category: [
      {
        fn: isNotEmpty,
        errorMessage: 'Választani kell'
      }
    ],
    age: [
      {
        fn: isNotEmpty,
        errorMessage: 'Választani kell'
      }
    ],
    oscar: [
      {
        fn: isNotEmpty,
        errorMessage: 'Választani kell'
      }
    ],
    auth: [
      {
        fn: isItChecked,
        errorMessage: 'Kötelező bejelölni'
      }
    ],
    email: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres'
      },
      {
        fn: emailFormat,
        errorMessage: 'Nem megfelelő formátum'
      },
    ],
    description: [
      {
        fn: isNotaEmpty,
        errorMessage: 'Nem lehet üres'
      },
    ]
  }

  function isLongerThan3(value) {
    return value.length >= 3
  }

  function isNotEmpty(value) {
    return value !== ''
  }

  function isNotaEmpty(value) {
    console.log(value);
    return value !== ''
  }

  function isItChecked(value) {
    return value === true
  }

  function emailFormat(value) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(value)
  }

  function reportFieldValidity(inputName, inputValue, setErrorMessages) {
    const inputValidators = validators[inputName]
    const inputValidationResults = inputValidators
      .map(inputValidator => {
        const { fn: validatorFn, errorMessage: validatorErrorMessage } = inputValidator
        const isValid = validatorFn(inputValue)
        return isValid ? '' : validatorErrorMessage
      })
      .filter(errorMessage => errorMessage !== '')

    setErrorMessages(data => ({
      ...data,
      [inputName]: inputValidationResults
    }))

    return inputValidationResults.length === 0
  }

  function reportFormValidity(formData, setErrorMessages) {
    const inputNames = Object.keys(validators)
    const inputValidations = inputNames.map(inputName => reportFieldValidity(inputName, formData[inputName], setErrorMessages))

    let isValid = inputValidations.every(isValid => isValid)
    
    return isValid
  }

  return reportFormValidity;
}