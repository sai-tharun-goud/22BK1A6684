function Analytics({ links }) {
  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <p>Total Active Links: {links.length}</p>
      <ul>
        {links.map(link => {
          const remaining = Math.max(0, Math.floor((link.expiry - Date.now()) / 60000))
          return (
            <li key={link.id}>
              {link.short} - expires in {remaining} min
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Analytics
