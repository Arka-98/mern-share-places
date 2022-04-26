import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import Button from './Button'
import Map from './Map'
import ButtonOutline from './ButtonOutline'
import { MdInfoOutline } from 'react-icons/md'
import Draggable from 'react-draggable'

export function TimerModal({ minutes, seconds, completed }) {
  return createPortal(
    <div className={`fixed flex justify-center items-center gap-2 p-2 ${!completed ? 'bg-green-500' : 'bg-red-500' } text-white text-sm rounded-md duration-200 font-semibold left-1/4 w-1/2 h-fit top-14 md:top-11 z-30 animate__animated animate__slideInDown`}>
      <MdInfoOutline className='text-lg' />
      {
        !completed ? <p>Complete the process by - {minutes}:{seconds}</p> : <p>Request timed out. Please refresh the page and try again</p>
      }
    </div>,
    document.getElementById('modal')
  )
}

export function ConfirmationModal({ onClick, handleDelete }) {
  return createPortal(
    <div className='fixed flex flex-col gap-4 p-3 items-center rounded-md overflow-auto left-1/4 w-1/2 top-[35vh] z-50 animate__animated animate__slideInDown bg-stone-100 text-black'>
        <div className='font-semibold text-xl text-slate-600 text-center'>Confirmation</div>
        <div className='text-base'>Are you sure you want to delete? (This action cannot be reverted)</div>
        <div className="flex gap-4 justify-center">
          <Button onClick={handleDelete}>Delete</Button>
          <ButtonOutline onClick={onClick}>Close</ButtonOutline>
        </div>
    </div>,
    document.getElementById('modal')
  )
}

ConfirmationModal.defaultProps = {
  onClick: null,
  handleDelete: null
}

ConfirmationModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

function MapModal({ address, onClick, location }) {
  return createPortal(
      <div className='fixed flex flex-col items-center rounded-md overflow-hidden left-1/4 w-1/2 top-[17vh] z-50 animate__animated animate__slideInDown bg-stone-100 text-black'>
          <div className='w-full h-fit font-semibold sm:text-lg text-slate-600 py-2 px-5 text-center'>{address}</div>
          <Map center={location} zoom={16} />
          <Button onClick={onClick} customClass='w-full'>Close</Button>
      </div>,
    document.getElementById('modal')
  )
}

MapModal.propTypes = {
    address: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default MapModal