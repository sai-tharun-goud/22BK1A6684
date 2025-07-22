import { useState } from 'react'
import Analytics from './Components/Analytics'
import UrlShortener from './Components/UrlShortener'
import './App.css'


function App() {
  const [links, setLinks] = useState([])

  function handleShorten(newLink) {
    setLinks([...links, newLink])
  }

  const validLinks = links.filter(link => Date.now() < link.expiry)

  return (
    <div className="app">
      <h1>URL Shortener</h1>
      <UrlShortener onShorten={handleShorten} />
      <Analytics links={validLinks} />
      <ul>
        {validLinks.map(link => (
          <li key={link.id}>
            <p>Original: {link.original}</p>
            <p>Short: <a href={link.original} target="_blank">{link.short}</a></p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
