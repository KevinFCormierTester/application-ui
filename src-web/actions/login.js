/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
import * as Actions from './index'
import loginClient from '../../lib/client/login-client'

export const receiveLoginSuccess = (user) => ({
  type: Actions.USER_LOGIN_RECEIVE_SUCCESS,
  loggedIn: Actions.USER_LOGIN_STATUS.LOGGED_IN,
  user
})

export const logoutStart = () => ({
  type: Actions.USER_LOGOUT_REQUEST,
  loggedIn: Actions.REQUEST_STATUS.IN_PROGRESS,
})

export const receiveLogoutSuccess = () => ({
  type: Actions.USER_LOGOUT_RECEIVE_SUCCESS,
  loggedIn: Actions.USER_LOGIN_STATUS.LOGGED_OUT
})

export const receiveLogoutError = () => ({
  type: Actions.USER_LOGOUT_RECEIVE_FAILURE,
  loggedIn: Actions.USER_LOGIN_STATUS.LOGGED_IN
})

export const requestLogout = () => {
  return function (dispatch) {
    dispatch(logoutStart())

    loginClient.logout(
      (res) => {
        dispatch(receiveLogoutSuccess())
        window.location.replace(res.redirectUrl)
      },
      () => dispatch(receiveLogoutError())
    )
  }
}