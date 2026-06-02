import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [apiState, setApiState] = useState({
    loading: true,
    error: '',
    data: null,
  })

  useEffect(() => {
    const loadBackendData = async () => {
      try {
        const response = await axios.get('/api/data')
        setApiState({
          loading: false,
          error: '',
          data: response.data,
        })
      } catch (error) {
        setApiState({
          loading: false,
          error: 'Could not connect to the backend API.',
          data: null,
        })
      }
    }

    loadBackendData()
  }, [])

  return (
    <main style={{ padding: '48px 24px' }}>
      <h1>Frontend connected to backend</h1>
      {apiState.loading && <p>Loading API data...</p>}
      {apiState.error && <p>{apiState.error}</p>}
      {apiState.data && (
        <div>
          <p>{apiState.data.message}</p>
          <p>{new Date(apiState.data.timestamp).toLocaleString()}</p>
        </div>
      )}
    </main>
  )
}

export default App
