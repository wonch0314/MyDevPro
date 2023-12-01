import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundView() {
  const navigate = useNavigate()
  // navigate('/error')
  return <div>Error</div>
}
