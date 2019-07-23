/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import { getChannelsList } from './utils'

describe('getChannelsList', () => {
  const channelList = {
    items: [
      {
        metadata: {
          name: 'name1',
          pending: 1,
          inprogress: 2,
          failed: 3,
        },
      },
      {
        metadata: {
          name: 'name3',
          pending: 1,
          failed: 2,
        },
      },
    ],
  }
  const channelDud = {
    itteemmss: [{ channel: [{}, {}] }, { deployables: [{}] }],
  }
  it('should return channel list to be displayed in cards on overview tab', () => {
    const result = [
      {
        counts: {
          failed: { total: 3 },
          'in progress': { total: 2 },
          pending: { total: 1 },
        },
        name: 'name1',
      },
      {
        counts: {
          failed: { total: 2 },
          'in progress': { total: 'N/A' },
          pending: { total: 1 },
        },
        name: 'name3',
      },
    ]
    expect(getChannelsList(channelList)).toEqual(result)
  })
  it('should return blank array', () => {
    expect(getChannelsList(channelDud)).toEqual([])
  })
})