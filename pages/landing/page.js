import React from 'react'
import Header from '../../components/header/Header'
import CosmicCard from '../../components/landing/CosmicCard'
import ClassicCard from '../../components/landing/ClassicCard'
import AtomicCards from '../../components/landing/AtomicCards'

function Landing() {
  return (
      <>
          <Header />
          <div className='Landing_Wrapper'>
              <p className='Landing_Heading'>Latest Results</p>
              <CosmicCard />
              <ClassicCard />
              <AtomicCards/>
          </div>
      </>
  )
}

export default Landing