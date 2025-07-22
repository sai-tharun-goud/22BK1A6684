import { useState } from 'react'

function UrlShortener({ onShorten }) {
  const [url, setUrl] = useState('')
  const [shortcode, setShortcode] = useState('')
  const [validity, setValidity] = useState('')
  const [error, setError] = useState('')

function handleSubmit(e) {
  e.preventDefault()

  try {
    new URL(url) // this will throw if the URL is invalid
  } catch (e) {
    setError('Please enter a valid URL')
    return
  }

  if (validity && !/^\d+$/.test(validity)) {
    setError('Validity must be a valid number of minutes')
    return
  }

  const payload = { url: url.trim() }

  if (shortcode.trim()) {
    payload.shortcode = shortcode.trim()
  }

  if (validity.trim()) {
    payload.validity = parseInt(validity)
  }

  fetch('http://localhost:5000/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      onShorten(data)
      setUrl('')
      setShortcode('')
      setValidity('')
      setError('')
    })
    .catch((err) => {
      setError(err.message)
    })
}


  return (
    <form onSubmit={handleSubmit} className="shortener-form">
      <input
        type="text"
        placeholder="Enter full URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Optional: custom shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Optional: validity in minutes"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <button type="submit">Shorten</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default UrlShortener
