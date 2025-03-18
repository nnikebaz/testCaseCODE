import React from 'react'
import './Details.css'
import { useLocation } from 'react-router'

const Details:React.FC = () => {
  const location = useLocation()
  const parameters = new URLSearchParams(location.search)
  const profileId = parameters.get('id')
  console.log(profileId)
  return (
    <></>
  )
}

export default Details