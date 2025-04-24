import React from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import MobileBottomHeader from './components/MobileBottomHeder'

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <MobileBottomHeader />
    </div>
  )
}

export default Root
