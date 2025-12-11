import React from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import MobileBottomHeader from './components/MobileBottomHeder'
import ResultBannerLive from './components/ResultBannerLive'

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <ResultBannerLive />
      <MobileBottomHeader />
    </div>
  )
}

export default Root
