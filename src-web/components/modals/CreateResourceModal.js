/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import jsYaml from 'js-yaml'
import {
  Button,
  InlineNotification,
  Loading,
  Modal
} from 'carbon-components-react'
import resources from '../../../lib/shared/resources'
import msgs from '../../../nls/platform.properties'
import getResourceDefinitions from '../../definitions'
import YamlEditor from '../common/YamlEditor'

resources(() => {
  require('../../../scss/modal.scss')
})

const initialState = {
  modalOpen: false,
  processing: false,
  yaml: '',
  yamlParsingError: null,
  createError: null
}

class CreateResourceModal extends React.PureComponent {
  static propTypes = {
    headingTextKey: PropTypes.string,
    onCreateResource: PropTypes.func,
    resourceDescriptionKey: PropTypes.string,
    resourceType: PropTypes.object,
    submitBtnTextKey: PropTypes.string
  };

  state = initialState;

  handleModalOpen = () => {
    this.setState({ modalOpen: true })
  };
  handleModalCancel = () => {
    this.setState(initialState)
  };
  handleModalSubmit = () => {
    let resources
    try {
      // the next line code will split the yaml content into multi-parts
      // if '---' found in the content
      resources = jsYaml.safeLoadAll(this.state.yaml)
    } catch (e) {
      this.setState({ yamlParsingError: e })
      return
    }
    this.setState({ yamlParsingError: null, processing: true })

    this.props.onCreateResource(resources).then(result => {
      if (
        result &&
        result.data &&
        result.data.createResources &&
        result.data.createResources.errors &&
        result.data.createResources.errors.length > 0
      ) {
        this.setState({
          createError: {
            message: result.data.createResources.errors[0].message
          },
          processing: false
        })
      } else {
        this.setState(initialState)
      }
    })
  };

  handleEditorChange = yaml => this.setState({ yaml });

  handleParsingError = yamlParsingError => this.setState({ yamlParsingError });

  handleNotificationClosed = () => this.setState({ yamlParsingError: null });

  isSubmitDisabled = () => this.state.processing === true;

  render() {
    const { resourceType } = this.props
    const { validator } = getResourceDefinitions(resourceType)
    return (
      <div>
        <Button
          icon="add--glyph"
          small
          id={msgs.get(this.props.submitBtnTextKey, this.context.locale)}
          key="create-resource"
          onClick={this.handleModalOpen}
        >
          {msgs.get(this.props.submitBtnTextKey, this.context.locale)}
        </Button>
        {this.state.modalOpen && (
          <Modal
            className="modal-with-editor"
            open={this.state.modalOpen}
            modalHeading={msgs.get(
              this.props.headingTextKey,
              this.context.locale
            )}
            primaryButtonText={msgs.get(
              this.props.submitBtnTextKey,
              this.context.locale
            )}
            primaryButtonDisabled={this.isSubmitDisabled()}
            secondaryButtonText={msgs.get(
              'actions.cancel',
              this.context.locale
            )}
            onRequestSubmit={this.handleModalSubmit}
            onRequestClose={this.handleModalCancel}
          >
            <div className="bx--modal-content-desc">
              {msgs.get(this.props.resourceDescriptionKey, this.context.locale)}
              <br />
              {/* TODO: Zack Layne - Awaiting actual documentation link
            <Link to={''}>
              {msgs.get('link.more.info', this.context.locale)}
            </Link> */}
            </div>
            {this.state.yamlParsingError && (
              <InlineNotification
                kind="error"
                title={msgs.get('error.parse', this.context.locale)}
                iconDescription=""
                subtitle={this.state.yamlParsingError.reason}
                onCloseButtonClick={this.handleNotificationClosed}
              />
            )}
            {this.state.createError && (
              <InlineNotification
                kind="error"
                title={msgs.get('error.create', this.context.locale)}
                iconDescription=""
                subtitle={this.state.createError.message}
                onCloseButtonClick={this.handleNotificationClosed}
              />
            )}
            <YamlEditor
              validator={validator}
              onYamlChange={this.handleEditorChange}
              handleParsingError={this.handleParsingError}
              yaml={this.state.yaml}
            />
            {this.state.processing && <Loading />}
          </Modal>
        )}
      </div>
    )
  }
}

CreateResourceModal.contextType = {
  locale: PropTypes.locale
}

const mapDispatchToProps = (dispatch, { onCreateResource }) => {
  return {
    onCreateResource: yaml => onCreateResource(dispatch, yaml)
  }
}

export default connect(() => ({}), mapDispatchToProps)(CreateResourceModal)
