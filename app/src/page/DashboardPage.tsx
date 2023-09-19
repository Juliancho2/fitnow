import React from 'react'
import HeaderApp from '../components/HeaderApp'
import Welcome from '../components/Welcome'
import DashboardMenu from '../components/DashboardMenu'

const DashboarsPage = () => {
  return (
        <div className=' animate-loadPage min-h-[100vh] relative'>
            <HeaderApp />
            <div className='absolute opacity-5'>
                <img src="https://district0x.io/images/hero-blobs.png" alt="" />
            </div>
            <div className='grid md:grid-cols-2 py-40 max-w-screen-xl mx-auto z-10 relative'>
                    <Welcome />
                    <DashboardMenu />
            </div>
        </div >
  )
}

export default DashboarsPage
