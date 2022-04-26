import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useHttpClient from '../components/hooks/useHttpClient'
import Spinner from '../components/layout/Spinner'
import UsersList from '../components/users/UsersList'

function Home() {
    const [ users, setUsers ] = useState([])
    const { loading, fetchData } = useHttpClient()

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/`)
        .then((data) => {
            setUsers(data)
        })
        .catch((error) => {
            toast.error(error.message, { autoClose: 3000 })
        })
    }, [fetchData])
    return loading ? <Spinner/> : (
        <>
            <UsersList users={users} />
        </>
    )
}

export default Home