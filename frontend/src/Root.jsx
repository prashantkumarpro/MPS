import React from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import MobileBottomHeader from './components/MobileBottomHeder'
import ResultBanner from './components/ResultBanner'

const Root = () => {
  return (
    <div>
      <ResultBanner />
      <Header />
      <Outlet />
      <MobileBottomHeader />
    </div>
  )
}

export default Root
