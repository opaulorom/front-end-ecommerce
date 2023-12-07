import React, { useState } from 'react'
import "./UpdataPassword.css"
import { updatePasswordUser } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const UpdataPassword = () => {
    const {oldPassword, setOldPassword} = useState('')
    const {newPassword, setNewPassword} = useState('')
    const dispatch = useDispatch()

    const {isUpdated, loading } = useSelector(state => state.userAuth)

  return (
    <div>UpdataPassword</div>
  )
}

export default UpdataPassword