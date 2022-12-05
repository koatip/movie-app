export default function Radio({
  label,
  value,
  name,
  id,
  checked,
  handleChange,
  wasValidated = false,
  errorMessages = [],
  showMessage = false
}) {

  function getValidationClassName() {
    if (!wasValidated) return '';
    return errorMessages.length ? 'is-invalid' : 'is-valid';
  }

  return (
    <div className="form-check mb-1">
      <input
        checked={checked}
        name={name}
        type="radio"
        onChange={handleChange}
        id={name + id}
        value={value}
        className={"form-check-input " + getValidationClassName()}
      />
      <label htmlFor={name + id} className="form-check-label">
        {label}
      </label>

      {showMessage && (
        <div className="invalid-feedback">
          {errorMessages.length === 1 ? (
            <>{errorMessages[0]}</>
          ) : (
            <ul>
              {errorMessages.map(errorMessage => (
                <li key={errorMessage}>{errorMessage}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
