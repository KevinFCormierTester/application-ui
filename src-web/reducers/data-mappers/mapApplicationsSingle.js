/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/

import {
  getRelatedItems,
  filterRemoteClusterSubscriptions,
  getRemoteClusterSubscriptions
} from './utils'

// @flow
export const mapSingleApplication = application => {
  if (application && application.items && application.related) {
    const remoteSubs = getRemoteClusterSubscriptions(application.related)

    //now filter out remote cluster subscriptions
    filterRemoteClusterSubscriptions(application.related)

    const items = application.items[0]
    return [
      {
        name: items.name || '',
        namespace: items.namespace || '',
        dashboard: items.dashboard || '',
        selfLink: items.selfLink || '',
        _uid: items._uid || '',
        created: items.created || '',
        apigroup: items.apigroup || '',
        cluster: items.cluster || '',
        kind: items.kind || '',
        label: items.label || '',
        _hubClusterResource: items._hubClusterResource || '',
        _rbac: items._rbac || '',
        related: application.related || [],
        deployments: getRelatedItems(application.related, 'deployment'),
        deployables: getRelatedItems(application.related, 'deployable'),
        placementRules: getRelatedItems(application.related, 'placementrule'),
        subscriptions: getRelatedItems(application.related, 'subscription'),
        remoteSubs: remoteSubs
      }
    ]
  }
  return [
    {
      name: '',
      namespace: '',
      dashboard: '',
      selfLink: '',
      _uid: '',
      created: '',
      apigroup: '',
      cluster: '',
      kind: '',
      label: '',
      _hubClusterResource: '',
      _rbac: '',
      related: []
    }
  ]
}
