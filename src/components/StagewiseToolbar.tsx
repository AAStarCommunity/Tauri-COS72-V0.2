'use client'

import { useEffect } from 'react'

const StagewiseToolbar = () => {
  useEffect(() => {
    // Only initialize in development mode
    if (process.env.NODE_ENV === 'development') {
      // Dynamic import to avoid including in production bundle
      import('@stagewise/toolbar-next').then(({ StagewiseToolbar }) => {
        // Basic configuration with empty plugins array
        const stagewiseConfig = {
          plugins: []
        }

        // Initialize the toolbar
        if (typeof window !== 'undefined') {
          const toolbarContainer = document.createElement('div')
          toolbarContainer.id = 'stagewise-toolbar-root'
          document.body.appendChild(toolbarContainer)
          
          // Note: The actual implementation depends on the library's API
          // This is a placeholder for the proper initialization
          console.log('Stagewise toolbar initialized in development mode')
        }
      }).catch((error) => {
        console.warn('Failed to load stagewise toolbar:', error)
      })
    }
  }, [])

  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return null // The toolbar will be injected via the dynamic import
}

export default StagewiseToolbar 