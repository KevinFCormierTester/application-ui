/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { MultiSelect } from 'carbon-components-react'
import _ from 'lodash'
import msgs from '../../../nls/platform.properties'

class FilterableMultiSelect extends React.Component {
  static propTypes = {
    activeFilters: PropTypes.array,
    availableFilters: PropTypes.array,
    failure: PropTypes.bool,
    fetching: PropTypes.bool,
    filterType: PropTypes.string,
    onChange: PropTypes.func,
    title: PropTypes.string
  };
  /**
   * The <MultiSelect> component uses a shallow compare when computing which items
   * are selected. This function helps to make sure that the array of selected items
   * reference the objects from the items array for the shallow compare to work.
   */
  getSelectedFilters = (items = [], selected = []) =>
    items.filter(i => selected.find(f => i.label === f.label));

  handleFilter = selection => {
    // if menu is still open don't update until its gone
    // unfortunately MultiSelect.Filterable doesn't have an onClose
    const menu = this.multiSelectDiv.getElementsByClassName(
      'bx--list-box__menu'
    )
    if (menu && menu.length > 0) {
      this.selectedItems = selection.selectedItems
      if (!this.observer) {
        this.observer = new MutationObserver(() => {
          this.props.onChange(this.props.filterType, this.selectedItems)
          this.observer.disconnect()
          delete this.observer
        })
        this.observer.observe(menu[0].parentNode, {
          childList: true
        })
      }
    } else {
      this.props.onChange(this.props.filterType, selection.selectedItems)
    }
  };

  sortItems = items => {
    const activeMap = _.keyBy(this.props.activeFilters, 'label')
    return items.sort(({ label: al }, { label: bl }) => {
      if (activeMap[al] && !activeMap[bl]) {
        return -1
      } else if (!activeMap[al] && activeMap[bl]) {
        return 1
      }
      return al.localeCompare(bl)
    })
  };

  componentDidMount() {
    this.handleMouseFunc = this.handleMouse.bind(this)
    window.addEventListener('mouseup', this.handleMouseFunc, true)
    this.updateTooltip()
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseFunc, true)
  }

  handleMouse(event) {
    // make sure dropdown is closed when clicking outside
    if (this.multiSelectDiv && !this.multiSelectDiv.contains(event.target)) {
      this.multiSelectCmp.handleOnOuterClick()
    }
  }

  updateTooltip() {
    if (this.multiSelectCmp) {
      this.multiSelectCmp.inputNode.title = this.tooltip.join('\n')
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      !_.isEqual(this.props.activeFilters, nextProps.activeFilters) ||
      !_.isEqual(this.props.availableFilters, nextProps.availableFilters)
    )
  }

  render() {
    const {
      title,
      availableFilters,
      activeFilters = [],
      fetching,
      failure
    } = this.props

    // if an active filter is not an available filter, add it so user can delete it
    const availMap = _.keyBy(availableFilters, 'label')
    activeFilters.forEach(acf => {
      if (!availMap[acf.label]) {
        availableFilters.push(acf)
      }
    })

    this.tooltip = []
    if (failure) {
      this.tooltip.push(msgs.get('resource.error', this.context.locale))
    } else if (fetching) {
      this.tooltip.push(msgs.get('resource.loading', this.context.locale))
    } else if (!activeFilters.length) {
      this.tooltip.push(msgs.get('resource.filterAll', this.context.locale))
    } else {
      this.tooltip = activeFilters.map(filter => filter.label).sort()
    }
    // set id to title for testing
    return (
      <div
        className="multi-select-filter"
        ref={this.saveMultiSelectDiv}
        role="region"
        aria-label={title}
        id={title}
      >
        <div className="multi-select-filter-title">{title}</div>
        <MultiSelect.Filterable
          ref={this.saveMultiSelectCmp}
          placeholder={this.tooltip.join(', ')}
          items={availableFilters}
          initialSelectedItems={this.getSelectedFilters(
            availableFilters,
            activeFilters
          )}
          sortItems={this.sortItems}
          onChange={this.handleFilter}
          disabled={fetching}
        />
      </div>
    )
  }

  saveMultiSelectDiv = ref => {
    this.multiSelectDiv = ref
  };

  saveMultiSelectCmp = ref => {
    this.multiSelectCmp = ref
  };
}

export default FilterableMultiSelect
