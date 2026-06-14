import { createContext, useContext, useEffect, useState } from 'react'
import { cloneDefaultContent } from '../data/defaultContent'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(cloneDefaultContent)

  useEffect(() => {
    let active = true
    fetch('/api/content')
      .then((response) => {
        if (!response.ok) throw new Error('Content API unavailable')
        return response.json()
      })
      .then((data) => {
        if (active) setContent(data)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const value = useContext(ContentContext)
  if (!value) throw new Error('useContent must be used inside ContentProvider')
  return value
}
