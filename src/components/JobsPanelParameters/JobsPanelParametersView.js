import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import JobsPanelSection from '../../elements/JobsPanelSection/JobsPanelSection'
import Input from '../../common/Input/Input'
import Tooltip from '../../common/Tooltip/Tooltip'
import TextTooltipTemplate from '../../elements/TooltipTemplate/TextTooltipTemplate'
import JobsPanelTableAddItemRow from '../../elements/JobsPanelTableAddItemRow/JobsPanelTableAddItemRow'
import JobsPanelParametersTable from '../../elements/JobsPanelParametersTable/JobsPanelParametersTable'
import Select from '../../common/Select/Select'

import panelData from '../JobsPanel/panelData'
import { parametersActions } from './jobsPanelParametersReducer'
import { selectOptions } from './jobsPanelParameters.util'
import { isNameNotUnique } from '../JobsPanel/jobsPanel.util'
import { SELECT_OPTIONS } from '../../types'

import { ReactComponent as Plus } from '../../images/plus.svg'
import { ReactComponent as Delete } from '../../images/delete.svg'

const JobsPanelParametersView = ({
  checkParameter,
  handleAddNewItem,
  handleDeleteParameter,
  handleEditParameter,
  isHyperTypeExist,
  parameterTypeOptions,
  parameters,
  parametersDispatch,
  parametersState,
  selectorCriteria,
  setNewJobSelectorCriteria,
  setNewJobSelectorResult,
  setTuningStrategy,
  setUrl,
  setValidation,
  tableContent,
  tuningStrategy,
  undoParameterCreation,
  url,
  validation
}) => {
  const urlTypeClassName = classnames(
    'parameters-additional-settings__input-wrapper',
    isHyperTypeExist && 'disabled'
  )
  const tuningStrategyClassName = classnames(
    'parameters-additional-settings__select-wrapper',
    !isHyperTypeExist && !url && 'disabled'
  )
  const nameIsNotUnique = isNameNotUnique(
    parametersState.newParameter.name,
    parameters
  )

  return (
    <div className="job-panel__item new-item-side-panel__item">
      <JobsPanelSection title="Parameters">
        <JobsPanelParametersTable
          addNewItem={parametersState.addNewParameter}
          checkParameter={checkParameter}
          content={parameters}
          handleDeleteParameter={handleDeleteParameter}
          handleEditParameter={handleEditParameter}
          headers={panelData.parameters['table-headers']}
          parameterTypeOptions={parameterTypeOptions}
          selectedItem={parametersState.selectedParameter}
          setSelectedItem={selectedParam =>
            parametersDispatch({
              type: parametersActions.SET_SELECTED_PARAMETER,
              payload: selectedParam
            })
          }
          tableContent={tableContent}
        >
          {parametersState.addNewParameter ? (
            <div className="table__row-add-item">
              <div className="input-row-wrapper">
                <Input
                  className="input-row__item"
                  density="chunky"
                  floatingLabel
                  invalid={nameIsNotUnique || !validation.isNameValid}
                  invalidText={
                    nameIsNotUnique
                      ? 'Name already exists'
                      : 'This field is invalid'
                  }
                  label="Name"
                  onChange={value =>
                    parametersDispatch({
                      type: parametersActions.SET_NEW_PARAMETER_NAME,
                      payload: value
                    })
                  }
                  setInvalid={value =>
                    setValidation(state => ({
                      ...state,
                      isNameValid: value
                    }))
                  }
                  type="text"
                  required
                />
                <Select
                  className="parameters-value-type"
                  density="chunky"
                  label={parametersState.newParameter.valueType}
                  onClick={value =>
                    parametersDispatch({
                      type: parametersActions.SET_NEW_PARAMETER_VALUE_TYPE,
                      payload: value
                    })
                  }
                  options={selectOptions.parametersValueType}
                />
                <Select
                  className="select-parameters-type"
                  density="chunky"
                  label={parametersState.newParameter.parameterType}
                  onClick={value =>
                    parametersDispatch({
                      type: parametersActions.SET_NEW_PARAMETER_TYPE,
                      payload: value
                    })
                  }
                  options={parameterTypeOptions}
                />
                <Input
                  className="input-row__item parameter-value"
                  density="chunky"
                  floatingLabel
                  invalid={!validation.isValueValid}
                  label="Value/s"
                  onChange={value =>
                    parametersDispatch({
                      type: parametersActions.SET_NEW_PARAMETER_VALUE,
                      payload: value
                    })
                  }
                  setInvalid={value =>
                    setValidation(state => ({
                      ...state,
                      isValueValid: value
                    }))
                  }
                  type="text"
                  required
                />
              </div>
              <div className="table__cell-actions">
                <button
                  className="btn-add"
                  disabled={
                    nameIsNotUnique ||
                    !validation.isNameValid ||
                    !validation.isValueValid
                  }
                  onClick={() => handleAddNewItem()}
                >
                  <Tooltip template={<TextTooltipTemplate text="Add item" />}>
                    <Plus />
                  </Tooltip>
                </button>
                <button onClick={undoParameterCreation}>
                  <Tooltip template={<TextTooltipTemplate text="Delete" />}>
                    <Delete />
                  </Tooltip>
                </button>
              </div>
            </div>
          ) : (
            <JobsPanelTableAddItemRow
              onClick={value => {
                parametersDispatch({
                  type: parametersActions.SET_ADD_NEW_PARAMETER,
                  payload: value
                })
              }}
              text="custom parameter"
            />
          )}
        </JobsPanelParametersTable>
        <div className="parameters-additional-settings-container">
          <div className="parameters-additional-settings__header">
            <span className="parameters-additional-settings__header-text">
              Hyper Parameters
            </span>
          </div>
          <div className="parameters-additional-settings">
            <div className={urlTypeClassName}>
              <Input
                wrapperClassName="default-input-wrapper"
                density="chunky"
                floatingLabel
                label="Read hyper params from a file"
                onChange={setUrl}
                placeholder="v3io:///projects/my-proj/param.txt"
                type="text"
              />
            </div>
            <div className={tuningStrategyClassName}>
              <Select
                density="chunky"
                label="Tuning Strategy:"
                onClick={setTuningStrategy}
                options={selectOptions.hyperStrategyType}
                selectedId={tuningStrategy}
              />
            </div>
          </div>
          <div className="parameters-additional-settings">
            <div className="parameters-additional-settings__input-wrapper">
              <Input
                wrapperClassName="default-input-wrapper"
                density="chunky"
                floatingLabel
                label="Result"
                onChange={setNewJobSelectorResult}
                type="text"
              />
            </div>
            <div className="parameters-additional-settings__select-wrapper">
              <Select
                density="chunky"
                label="Criteria:"
                onClick={setNewJobSelectorCriteria}
                options={selectOptions.selectorCriteria}
                selectedId={selectorCriteria}
              />
            </div>
          </div>
        </div>
      </JobsPanelSection>
    </div>
  )
}

JobsPanelParametersView.propTypes = {
  checkParameter: PropTypes.func.isRequired,
  handleAddNewItem: PropTypes.func.isRequired,
  handleDeleteParameter: PropTypes.func.isRequired,
  handleEditParameter: PropTypes.func.isRequired,
  isHyperTypeExist: PropTypes.bool.isRequired,
  parameterTypeOptions: SELECT_OPTIONS.isRequired,
  parameters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  parametersDispatch: PropTypes.func.isRequired,
  parametersState: PropTypes.shape({}).isRequired,
  selectorCriteria: PropTypes.string.isRequired,
  setNewJobSelectorCriteria: PropTypes.func.isRequired,
  setNewJobSelectorResult: PropTypes.func.isRequired,
  setTuningStrategy: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  tableContent: PropTypes.shape({}).isRequired,
  tuningStrategy: PropTypes.string,
  undoParameterCreation: PropTypes.func.isRequired,
  url: PropTypes.string
}

export default JobsPanelParametersView
