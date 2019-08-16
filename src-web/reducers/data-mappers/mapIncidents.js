/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

export const mapIncidents = incidents => {
  if (incidents instanceof Array && incidents.length > 0) {
    return incidents.map(elem => ({
      id: elem.id || '',
      summary: elem.summary || '',
      description: elem.description || '',
      priority: elem.priority || '',
      escalated:
        elem.escalated === 'true'
          ? 'Yes'
          : elem.escalated === 'false' ? 'No' : '',
      owner: elem.owner || '',
      team: elem.team || '',
      state: elem.state || '',
      createdTime: elem.createdTime || '',
      lastChanged: elem.lastChanged || ''
    }))
  }
  return []
}