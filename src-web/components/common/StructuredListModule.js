/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { StructuredListWrapper, StructuredListHead, StructuredListRow, StructuredListCell, StructuredListBody, Module, ModuleHeader, ModuleBody } from 'carbon-components-react'
import msgs from '../../../nls/platform.properties'
import resources from '../../../lib/shared/resources'
import { transform } from '../../../lib/client/resource-helper'
import { Link } from 'react-router-dom'

resources(() => {
  require('../../../scss/structured-list.scss')
})

const StructuredListModule = ({
  title,
  headerRows,
  rows,
  data,
  url
}, context) =>
  <Module className='structured-list-module'>
    <ModuleHeader>{msgs.get(title, context.locale)}</ModuleHeader>
    <ModuleBody>
      <StructuredListWrapper className='bx--structured-list--condensed' aria-label={msgs.get(title, context.locale)}>
        <StructuredListHead>
          <StructuredListRow head>
            {headerRows.map(row =>
              <StructuredListCell head key={row+'Header'}>
                {msgs.get(row, context.locale)}
              </StructuredListCell>
            )}
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {rows.map(({cells}) =>
            <StructuredListRow key={cells[0].resourceKey+'Row'}>
              {cells.map(cell =>
                <StructuredListCell key={cell.resourceKey+'Cell'}>
                  <p>{cell.link && url ? <Link to={url} className='bx--link'>{transform(data, cell, context.locale)}</Link> : transform(data, cell, context.locale)}</p>
                </StructuredListCell>
              )}
            </StructuredListRow>
          )}
        </StructuredListBody>
      </StructuredListWrapper>
    </ModuleBody>
  </Module>

StructuredListModule.contextTypes = {
  locale: PropTypes.string
}

StructuredListModule.propTypes = {
  data: PropTypes.object,
  headerRows: PropTypes.array,
  rows: PropTypes.array,
  title: PropTypes.string,
  url: PropTypes.string,
}

export default StructuredListModule