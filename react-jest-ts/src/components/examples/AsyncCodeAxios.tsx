import axios from 'axios'
import React, { useState } from 'react'

const URL = "https://hn.algolia.com/api/v1/search"

const AsyncCodeAxios = () => {
  const [news, setNews] = useState([])
  const [error, setError] = useState(null)

  const handleFetch = async () => {
    try {
      const { data } = await axios.get(`${URL}?query=React`)
      setNews(data.hits)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      <button onClick={handleFetch}>Fetch News</button>

      {error && <span>Something went wrong..</span>}

      <ul>
        {news.map(({ objectID, url, title }) => {
          return <li key={objectID}>
            <a href={url}>{title}</a>
          </li>
        })}
      </ul>

    </div>
  )
}

export default AsyncCodeAxios
