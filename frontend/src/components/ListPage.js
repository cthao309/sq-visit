// ? Import required modules
import React, { useEffect, useState } from 'react'
import { getVisitors } from '../lib/asyncFunctions'
import ListElement from './ListElement'
import './ListPage.css'
import Logo from '../img/TLM-Logo.png'

const ListPage = () => {
  const columnHeaders = [
    { text: 'LAST NAME', field: 'lastName' },
    { text: 'FIRST NAME', field: 'firstName' },
    { text: 'COMPANY', field: 'company' },
    { text: 'PURPOSE', field: 'purpose' },
    { text: 'DATE', field: 'dateOfVisit' },
  ]
  const [visitorList, setVisitorList] = useState([])
  const [queryParams, setQueryParams] = useState({})
  const [startingDate, setStartingDate] = useState('')
  const [endingDate, setEndingDate] = useState('')
  const [queryByCompany, setQueryByCompany] = useState('')
  const [queryByLastName, setQueryByLastName] = useState('')
  const [formBoolean, setFormBoolean] = useState({})
  const [sortColumn, setSortColumn] = useState('dateOfVisit')
  const [sortAscending, setSortAscending] = useState(false)

  useEffect(() => {
    getVisitors()
      .then((data) => {
        const newData = [...data].sort((a, b) => new Date(b.dateOfVisit) - new Date(a.dateOfVisit))
        setVisitorList([...newData])
      })
      .catch(() => new Error('Error getting visitor data'))
  }, [])

  const SubmitDateQuery = (event) => {
    setQueryParams(
      {
        searchByDate: {
          startingDate,
          endingDate,
        },
      },
    )

    event.preventDefault()
    getVisitors(startingDate, endingDate, queryByCompany, queryByLastName)
      .then((data) => {
        setStartingDate('')
        setEndingDate('')
        setQueryByCompany('')
        setQueryByLastName('')
        setVisitorList([...data])
      })
      .catch(err => err);
  }

  const selectionHandler = (selectionType) => {
    switch (selectionType) {
      case 'date':
        setFormBoolean({})
        setFormBoolean({ date: true })
        break
      case 'lastName':
        setFormBoolean({})
        setFormBoolean({ lastName: true })
        break
      case 'company':
        setFormBoolean({})
        setFormBoolean({ company: true })
        break
      case 'showAll':
        getVisitors()
          .then((data) => {
            const newData = [...data].sort(
              (a, b) => new Date(b.dateOfVisit) - new Date(a.dateOfVisit),
            )
            setVisitorList(newData)
          })
          .catch(() => new Error('Error getting visitor data'))
        setFormBoolean({})
        break
      default:
        break;
    }
  }

  const sortBy = () => {
    switch (sortColumn) {
      case 'lastName':
      case 'company':
        if (sortAscending) {
          setVisitorList([...visitorList].sort(
            (a, b) => a[sortColumn].localeCompare(b[sortColumn]),
          ))
        } else {
          setVisitorList([...visitorList].sort(
            (a, b) => b[sortColumn].localeCompare(a[sortColumn]),
          ))
        }
        break
      default:
        if (sortAscending) {
          setVisitorList([...visitorList].sort(
            (a, b) => new Date(a[sortColumn]) - new Date(b[sortColumn]),
          ))
        } else {
          setVisitorList([...visitorList].sort(
            (a, b) => new Date(b[sortColumn]) - new Date(a[sortColumn]),
          ))
        }
        break;
    }
  }

  useEffect(sortBy, [sortAscending, sortColumn])

  const handleSortChange = (columnName) => {
    if (columnName === sortColumn) {
      setSortAscending(!sortAscending)
    } else {
      setSortAscending(true)
      setSortColumn(columnName)
    }
  }


  return (
    <div className="List_Page">
      <div className="List_Page_Header--container">
        <div className="List_Page--header">
          <img src={Logo} alt="Logo" />
          <h1>Visitors List</h1>
        </div>
        <div className="Select_container">
          <div className="Select__option">
            <h4>Search By: </h4>
            <h5 onClick={e => selectionHandler('date')}>Date</h5>
            <h5 onClick={e => selectionHandler('company')}> Company</h5>
            <h5 onClick={e => selectionHandler('lastName')}> Last Name</h5>
            <h5 onClick={e => selectionHandler('showAll')}> Show All</h5>
          </div>
          <div className="Select__option--search">

            {formBoolean.date
              ? (
                <div className="Form">
                  <form className="DateForm" onSubmit={SubmitDateQuery}>
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
                  <div>
                    {/* <p>{status.msg}</p> */}
                  </div>
                </div>
              ) : <div />
      }
            {formBoolean.company
              ? (
                <div className="Form">
                  <form className="DateForm" onSubmit={SubmitDateQuery}>
                    <div className="DateForm_input">
                      <label htmlFor="company">
                  Company:
                        <input type="text" name="company" onChange={e => setQueryByCompany(e.target.value)} />
                      </label>
                    </div>
                    <div className="Submit__query-btn Find_submit">
                      <input type="submit" value="Find" />
                    </div>
                  </form>
                  <div>
                    {/* <p>{status.msg}</p> */}
                  </div>
                </div>
              ) : <div />
      }
            {formBoolean.lastName
              ? (
                <div className="Form">
                  <form className="DateForm" onSubmit={SubmitDateQuery}>
                    <div className="DateForm_input">
                      <label htmlFor="last_name">
                  Last Name:
                        <input type="text" name="last_name" onChange={e => setQueryByLastName(e.target.value)} />
                      </label>
                    </div>
                    <div className="Submit__query-btn Find_submit">
                      <input type="submit" value="Find" />
                    </div>
                  </form>
                  <div>
                    {/* <p>{status.msg}</p> */}
                  </div>
                </div>
              ) : <div />
      }
          </div>
        </div>
      </div>
      {visitorList.length
        ? (
          <table>
            <thead>
              <tr>
                {
                  columnHeaders.map((header) => {
                    const sortArrow = sortAscending ? <span className="spanArrow">&uarr;</span> : <span className="spanArrow">&darr;</span>
                    return (
                      <th key={header.text}>
                        <button
                          onClick={() => handleSortChange(header.field)}
                          type="button"
                        >
                          {header.text}
                        </button>
                        { header.field === sortColumn
                          ? sortArrow
                          : null
                        }
                      </th>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody>
              {visitorList.map(el => <ListElement key={el._id} info={el} />)}
            </tbody>
          </table>
        )
        : (<h1>No Record Found</h1>)
      }
    </div>
  )
}
export default ListPage
