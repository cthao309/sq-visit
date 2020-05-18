import React from 'react'
import PropTypes from 'prop-types'

const QueryForm = (props) => {
  const {
    submitFunc,
    setStartingDate,
    setEndingDate,
    selectedForm,
  } = props

  console.log('Props => ', props)
  return (
    // {Object.keys(selectedForm)[0] === 'date' ?
    //   (
    <form className="DateForm" onSubmit={submitFunc}>
      <div className="DateForm_input">
        <label htmlFor="startDate">
          Starting date:
                <input type="date" name="startDate" onChange={e => setStartingDate(e.target.value)} />
        </label>
      </div>
      <div className="DateForm_input">
        <label htmlFor="endDate">
          Ending date:
                <input type="date" name="endDate" onChange={e => setEndingDate(e.target.value)} />
        </label>
      </div>
      <div className="Submit__query-btn Find_submit">
        <input type="submit" value="Find" />
      </div>
    </form>
    // ) 
    // : </

    // }
  )
}

QueryForm.propTypes = {
  submitFunc: PropTypes.func.isRequired,
  setStartingDate: PropTypes.func.isRequired,
  setEndingDate: PropTypes.func.isRequired,
  selectedForm: PropTypes.string.isRequired,
}

export default QueryForm
