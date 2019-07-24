/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

export const DIAGRAM_SVG_ID = 'topologySvgId'
export const NODE_RADIUS = 28
export const NODE_SIZE = 50
export const TOPOLOGY_PADDING = 30
export const MINIMUM_ZOOM_FIT = 0.4 // auto zoom to fit won't drop below this scale
export const RELATED_OPACITY=0.3 // opacity of elements related to matched elements

export const FilterResults = Object.freeze({
  nosearch: '',     // no search in progress
  match: 'match',   // match
  hidden: 'hidden', // doesn't match
  related: 'related', //related to match
  matched: 'matched', // a previous match--used when out of search mode
})

export const StatusIcon = Object.freeze({
  success: {icon:'success', classType:'success', width: 16, height: 16, dx:16, dy:-16},
  error: {icon:'failure', classType:'failure', width: 16, height: 16, dx:16, dy:-16},
  running: {icon:'running', classType:'success', width: 16, height: 16, dx:16, dy:-16},
  pending: {icon:'pending', classType:'warning', width: 16, height: 16, dx:16, dy:-16},
})

//if controller contains a pod
export const PodIcon = {icon:'circle', classType:'pod', width: 24, height: 24, dx:0, dy:0}