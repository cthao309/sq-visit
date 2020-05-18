import React from 'react'
import PropTypes from 'prop-types'

const ListElement = (props) => {
  const { info } = props
  const {
    firstName,
    lastName,
    company,
    purpose,
    dateOfVisit,
  } = info
  return (
    <tr key={`${lastName}${firstName}`}>
      <td>{lastName}</td>
      <td>{firstName}</td>
      <td>{company}</td>
      <td>{purpose}</td>
      <td>{`${new Date(dateOfVisit).toDateString()}, ${new Date(dateOfVisit).toLocaleTimeString()}`}</td>
    </tr>
  )
}

ListElement.propTypes = {
  info: PropTypes.shape({}).isRequired,
}
export default ListElement
