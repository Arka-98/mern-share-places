import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AppContext from '../components/context/AppContext'
import useHttpClient from '../components/hooks/useHttpClient'
import Card from '../components/layout/Card'
import Spinner from '../components/layout/Spinner'
import PlacesList from '../components/places/PlacesList'

function UserPlaces() {
  const params = useParams()
  const { token } = useContext(AppContext)
  const { loading, fetchData } = useHttpClient()
  const [userPlaces, setUserPlaces] = useState(null)
  useEffect(() => {
    loadPlaces()
  }, [])

  const loadPlaces = async () => {
    try {
      const data = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/places/user/${params.userId}`)
      setUserPlaces(data)
    } catch (error) {
      setUserPlaces(null)
      toast.error(error.message, { autoClose: 3000 })
    }
  }

  const handleDelete = async (placeId) => {
    try {
      const responseData = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/places/${placeId}`, 'DELETE', { Authorization: `Bearer ${token}` })
      loadPlaces()
      toast.success('Place deleted', { autoClose: 3000 })
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete place', { autoClose: 3000 })
    }
  }

  return loading ? <Spinner/> : (
    <>
      {
        userPlaces ? <PlacesList places={userPlaces} handleDelete={handleDelete} /> :
        <Card>No places found for user</Card>
      }
    </>
  )
}

export default UserPlaces