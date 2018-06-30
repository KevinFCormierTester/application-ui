/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import React from 'react'
import renderer from 'react-test-renderer'

import { DashboardCard } from '../../../src-web/components/DashboardCard'

describe('DashboardCard component 1', () => {
  const table = [
    {
      'status': 'critical',
      'link': '1.1.1.1',
      'resourceName': 'auth-idp-platform-auth-cert-gen-h2rt4',
      'percentage': 0
    },
    {
      'status': 'warning',
      'link': '',
      'resourceName': 'db2-stock-trader-ibm-db2oltp-dev-5b77c44d4-b7tbz',
      'percentage': 0
    },
    {
      'status': 'healthy',
      'link': '',
      'resourceName': 'db2-stock-trader-ibm-db2oltp-dev-5b77c44d4-b7tbz',
      'percentage': 0
    }
  ]
  it('renders as expected', () => {
    const component = renderer.create(
      <DashboardCard critical={1} healthy={1} warning={1} title='unit test' table={table} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})


describe('DashboardCard component 2', () => {
  const table = [
    {
      'status': 'warning',
      'link': '',
      'resourceName': 'db2-stock-trader-ibm-db2oltp-dev-5b77c44d4-b7tbz',
      'percentage': 0
    }
  ]
  it('renders as expected', () => {
    const component = renderer.create(
      <DashboardCard critical={0} healthy={0} warning={1} title='unit test 2' table={table} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})


describe('DashboardCard component 3', () => {
  const table = [
    {
      'link': '',
      'resourceName': 'db2-stock-trader-ibm-db2oltp-dev-5b77c44d4-b7tbz',
      'percentage': 0
    }
  ]
  it('renders as expected', () => {
    const component = renderer.create(
      <DashboardCard critical={0} healthy={1} warning={0} title='unit test 3' table={table} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('DashboardCard component 4', () => {
  const table = []
  it('renders as expected', () => {
    const component = renderer.create(
      <DashboardCard critical={0} healthy={0} warning={0} title='unit test 4' table={table} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})