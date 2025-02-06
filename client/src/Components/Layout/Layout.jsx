import React from 'react'
import { Outlet } from "react-router-dom"

import ThemeProvider from '../ThemeProvider/ThemeProvider'

function Layout() {
  return (
    <ThemeProvider>
      <Outlet/>
    </ThemeProvider>
  )
}

export default Layout
