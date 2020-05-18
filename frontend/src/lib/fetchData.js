export default function fetchData(url, options = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => response.json())
      .then(resolve)
      .catch(reject)
  })
}
