import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'

function ShopapplicationWapper() {
  return (
    <div>
      <Navigation></Navigation>
      <Outlet/>
    </div>
  )
}

export default ShopapplicationWapper
