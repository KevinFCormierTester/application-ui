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
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchResource } from '../../actions/common'
import { fetchTopology } from '../../actions/topology'
import { getSingleResourceItem, resourceItemByName } from '../../reducers/common'
import { Loading  } from 'carbon-components-react'
import msgs from '../../../nls/platform.properties'
import * as Actions from '../../actions'
import resources from '../../../lib/shared/resources'
import DiagramViewer from '../diagrams/DiagramViewer'
import FilterBar from './FilterBar'
import _ from 'lodash'

resources(() => {
  require('../../../scss/resource-diagram.scss')
  require('../../../scss/topology-details.scss')
  require('../../../scss/topology-diagram.scss')
})

class ResourceDiagram extends React.Component {
    static propTypes = {
      activeFilters: PropTypes.object,
      clusters: PropTypes.array,
      designLoaded: PropTypes.bool,
      diagramFilters: PropTypes.array,
      fetchDesign: PropTypes.func,
      fetchTopology: PropTypes.func,
      links: PropTypes.array,
      nodes: PropTypes.array,
      onDiagramFilterChange: PropTypes.func,
      requiredFilters: PropTypes.object,
      restoreSavedDiagramFilters: PropTypes.func,
      staticResourceData: PropTypes.object,
      topologyLoaded: PropTypes.bool,
      yaml: PropTypes.string,
    }

    constructor (props) {
      super(props)
      this.state = {
        clusters: [],
        links: [],
        nodes: [],
        designLoaded:false,
        topologyLoaded:false,
      }
      this.setContainerRef = elem => {
        this.containerRef = elem
      }
    }

    componentWillMount() {
      // when mounting, load design
      // that will figure out what topology labels we need
      // when topologyLabels changes we fetch the topology
      this.props.restoreSavedDiagramFilters()
      this.props.fetchDesign()

      //      if (parseInt(config['featureFlags:liveUpdates']) === 2) {
      //        var intervalId = setInterval(this.reload.bind(this), config['featureFlags:liveUpdatesPollInterval'])
      //        this.setState({ intervalId: intervalId })
      //      }

    }

    componentWillReceiveProps(nextProps) {
      this.setState((prevState) => {
        const links = _.cloneDeep(nextProps.links||[])
        const nodes = _.cloneDeep(nextProps.nodes||[])
        const clusters = _.cloneDeep(nextProps.clusters||[])
        const diagramFilters = _.cloneDeep(nextProps.diagramFilters||[])
        const yaml = nextProps.yaml || ''

        // when the labels required by the design have been loaded, load the topology
        if (!prevState.designLoaded && nextProps.designLoaded) {
          this.props.fetchTopology(nextProps.requiredFilters)
        }

        return { clusters, links, nodes, yaml, diagramFilters,
          isMulticluster: clusters.length>1,
          designLoaded: nextProps.designLoaded,
          topologyLoaded: nextProps.topologyLoaded }
      })
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !_.isEqual(this.state.nodes.map(n => n.uid), nextState.nodes.map(n => n.uid)) ||
        !_.isEqual(this.state.links.map(n => n.uid), nextState.links.map(n => n.uid)) ||
        !_.isEqual(this.state.diagramFilters, nextState.diagramFilters) ||
        this.props.topologyLoaded !== nextProps.topologyLoaded ||
        this.props.yaml !== nextProps.yaml
    }


    reload() {
      this.props.fetchTopology(this.props.activeFilters)
    }

    render() {
      if (!this.state.designLoaded)
        return <Loading withOverlay={false} className='content-spinner' />

      const { staticResourceData, onDiagramFilterChange } = this.props
      const {designTypes, topologyTypes, typeToShapeMap} = staticResourceData
      const { links,  clusters, yaml, diagramFilters, topologyLoaded, isMulticluster } = this.state
      const { nodes } = this.state
      const {locale} = this.context
      let title
      if (!topologyLoaded) {
        title = msgs.get('clusters.loading', locale)
      } else if (clusters.length===0) {
        title = msgs.get('clusters.none', locale)
      } else {
        title = msgs.get('cluster.names', [clusters.map(c=>c.name).sort().join(', ')], locale)
      }

      // set up type filter bar
      const availableFilters = [...designTypes, ...topologyTypes].map(label=>{
        return {label}
      })

      const typeFilterTitle = msgs.get('type', this.context.locale)
      return (
        <div className="resourceDiagramContainer"  ref={this.setContainerRef} >
          <DiagramViewer
            title={title}
            id={'application'}
            nodes={nodes}
            links={links}
            isMulticluster={isMulticluster}
            yaml={yaml}
            context={this.context}
            secondaryLoad={!topologyLoaded}
            staticResourceData={staticResourceData}
            activeFilters={{type:diagramFilters}}
          />

          {/*type filter bar*/}
          <div className='diagram-type-filter-bar' role='region' aria-label={typeFilterTitle} id={typeFilterTitle}>
            <FilterBar
              availableFilters={availableFilters}
              activeFilters={diagramFilters}
              typeToShapeMap={typeToShapeMap}
              onChange={onDiagramFilterChange}
            />
          </div>
        </div>
      )
    }

}

const mapStateToProps = (state, ownProps) => {
  const { resourceType, staticResourceData, params } = ownProps
  const name = decodeURIComponent(params.name)
  const item = getSingleResourceItem(state, { storeRoot: resourceType.list, resourceType, name, predicate: resourceItemByName,
    namespace: params.namespace ? decodeURIComponent(params.namespace) : null })
  const {clusters, links, nodes, requiredFilters, yaml, designLoaded, topologyLoaded} = staticResourceData.getDiagramElements(item, state.topology)
  const {diagram: {diagramFilters}} = state
  return {
    clusters,
    links,
    nodes,
    yaml,
    diagramFilters,
    requiredFilters,
    designLoaded,
    topologyLoaded
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { resourceType, params: {namespace, name}, staticResourceData } = ownProps
  const {designTypes, topologyTypes} = staticResourceData
  return {
    fetchDesign: () => {
      // in topology page, the filter dropdowns would be setting activeFilters
      // but here we need to set the activeFilters based on the design
      // and design hasn't loaded yet, so no active topology filters yet
      dispatch({type: Actions.TOPOLOGY_SET_ACTIVE_FILTERS, activeFilters: {}})

      dispatch(fetchResource(resourceType, namespace, name))
    },
    fetchTopology: (requiredFilters) => {
      const f = _.cloneDeep(requiredFilters)
      f.label = f.label.map(l => ({ name: l.name, value: l.value }))

      // in topology page, the filter dropdowns would be setting the active topology filters
      // but here we need to set the activeFilters based on the design
      dispatch({type: Actions.TOPOLOGY_SET_ACTIVE_FILTERS, activeFilters: requiredFilters})

      // fetch topology with these types and labels
      dispatch(fetchTopology({ filter: {...f}}, requiredFilters))
    },
    restoreSavedDiagramFilters: () => {
      // initial filter is everything
      const initialDiagramFilters = [...designTypes, ...topologyTypes].map(label=>{
        return {label}
      })
      dispatch({type: Actions.DIAGRAM_RESTORE_FILTERS, namespace, name, initialDiagramFilters})
    },
    onDiagramFilterChange: (filterType, diagramFilters) => {
      dispatch({type: Actions.DIAGRAM_SAVE_FILTERS, namespace, name, diagramFilters})
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourceDiagram))
