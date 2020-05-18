import fetchData from './fetchData'
import config from '../config/data'

import {
  VISITOR_URL,
} from '../config/urls'

const HOST = process.env.NODE_ENV === 'production'
  ? config.host_prod
  : config.host_dev

export const getVisitors = (startingDate = null, endingDate = null, queryByCompany = null, queryByLastName = null) => new Promise((resolve, reject) => {
  fetchData(`${HOST}${VISITOR_URL}?startingDate=${startingDate}&endingDate=${endingDate}&company=${queryByCompany}&lastName=${queryByLastName}`)
    .then(resolve)
    .catch(reject)
})

export const postVisitor = visitorRecord => new Promise((resolve, reject) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(visitorRecord),
  }
  fetchData(`${HOST}${VISITOR_URL}`, options)
    .then(resolve)
    .catch(reject)
})

export const getSuccess = () => new Promise((resolve, reject) => {
  fetchData(`${HOST}${VISITOR_URL}`)
    .then(resolve)
    .catch(reject)
})
