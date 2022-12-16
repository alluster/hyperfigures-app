import React from 'react'
import { Person } from '@microsoft/mgt-react'
import { Providers } from '@microsoft/mgt-element'

const MSFileList = () => {

  console.log('providers', Providers.client)
  //    const Files = new MgtFileList()
  // console.log('WHAT FILE', Files)
  return (
    <>
      <Person personQuery='me' />
    </>
  )
}

export default MSFileList