import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Input from '../../common/Input/Input'
import Combobox from '../../common/Combobox/Combobox'

import { ReactComponent as Checkmark } from '../../images/checkmark.svg'
import { inputsActions } from '../../components/JobsPanelDataInputs/jobsPanelDataInputsReducer'
import {
  handleSelectedInputPathChange,
  handleSelectedInputPathTypeChange
} from './editableDataInputsRow.utils'

const EditableDataInputsRow = ({
  handleEdit,
  inputsDispatch,
  inputsState,
  match,
  matches,
  selectDropdownList,
  selectedDataInput,
  setEditItem,
  setSelectedDataInput
}) => {
  const [previousInputName, setPreviousInputName] = useState('')
  const [inputPathDefaultValue, setInputPathDefaultValue] = useState('')
  const [selectedSelectValue, setSelectedSelectValue] = useState({
    id: '',
    className: '',
    label: ''
  })
  const [isEmptyValue, setIsEmptyValue] = useState({ name: false, path: false })
  const tableRowRef = useRef(null)
  const inputNameClassNames = classnames(
    'input',
    isEmptyValue.name && 'input_required'
  )
  const inputPathClassNames = classnames(
    'combobox-input-edit',
    isEmptyValue.path && 'combobox-input-edit-required'
  )

  useEffect(() => {
    if (inputsState.newInputUrlPath.length > 0) {
      setInputPathDefaultValue(inputsState.newInputUrlPath)
    } else {
      if (selectedDataInput.data.path.artifact.length > 0) {
        setInputPathDefaultValue(
          `${inputsState.selectedDataInput.data.path.project}/${inputsState.selectedDataInput.data.path.artifact}`
        )
      } else if (
        inputsState.selectedDataInput.selectedInputUrlPath.length > 0
      ) {
        setInputPathDefaultValue(
          inputsState.selectedDataInput.selectedInputUrlPath
        )
      }
    }
  }, [
    inputsState.newInputUrlPath,
    inputsState.selectedDataInput.data.path.artifact,
    inputsState.selectedDataInput.data.path.project,
    inputsState.selectedDataInput.selectedInputUrlPath,
    selectedDataInput.data.path.artifact.length
  ])

  useEffect(() => {
    if (selectedSelectValue.label.length === 0) {
      const selectValue = selectDropdownList.filter(
        item => item.id === selectedDataInput.data.path.pathType
      )[0]
      if (selectValue) {
        setSelectedSelectValue(selectValue)
      }
    }
  }, [
    selectDropdownList,
    selectedDataInput.data.path.pathType,
    selectedSelectValue.label.length
  ])

  useEffect(() => {
    if (previousInputName.length === 0) {
      setPreviousInputName(inputsState.selectedDataInput.data.name)
    }
  }, [inputsState.selectedDataInput.data.name, previousInputName.length])

  const handleDocumentClick = useCallback(
    event => {
      if (!tableRowRef.current?.contains(event.target)) {
        setSelectedDataInput({
          ...selectedDataInput,
          data: {
            ...selectedDataInput.data,
            name: previousInputName
          }
        })
        handleEdit()
        setEditItem(false)
        inputsDispatch({
          type: inputsActions.SET_PATH_PLACEHOLDER,
          payload: ''
        })
      }
    },
    [
      handleEdit,
      inputsDispatch,
      previousInputName,
      selectedDataInput,
      setEditItem,
      setSelectedDataInput
    ]
  )

  useEffect(() => {
    if (tableRowRef.current) {
      document.addEventListener('click', handleDocumentClick)

      return () => {
        document.removeEventListener('click', handleDocumentClick)
      }
    }
  }, [handleDocumentClick, tableRowRef])

  const handleInputsEdit = data => {
    setIsEmptyValue({ path: false, name: false })

    if (!selectedDataInput.data.path.name) {
      setIsEmptyValue(prevState => ({ ...prevState, name: true }))
    }

    if (
      !selectedDataInput.data.path.project &&
      !selectedDataInput.selectedInputUrlPath
    ) {
      setIsEmptyValue(prevState => ({ ...prevState, path: true }))
    }

    if (
      selectedDataInput.data.name &&
      (selectedDataInput.data.path.project ||
        inputsState.selectedDataInput.selectedInputUrlPath)
    ) {
      handleEdit(data, true)
      inputsDispatch({
        type: inputsActions.SET_PATH_PLACEHOLDER,
        payload: ''
      })
    }
  }

  return (
    <div className="table__row edit-row" ref={tableRowRef}>
      {selectedDataInput.isDefault ? (
        <div className="table__cell table__cell_disabled">
          <div className="data-ellipsis">{selectedDataInput.data.name}</div>
        </div>
      ) : (
        <div className="table__cell table__cell_edit">
          <Input
            className={inputNameClassNames}
            onChange={name => {
              setSelectedDataInput({
                ...selectedDataInput,
                newDataInputName: name
              })
            }}
            type="text"
            value={selectedDataInput.data.name}
          />
        </div>
      )}
      <div className="table__cell table__cell_edit ">
        <div className={inputPathClassNames}>
          <Combobox
            matches={matches}
            inputDefaultValue={inputPathDefaultValue}
            inputOnChange={value =>
              handleSelectedInputPathChange(inputsDispatch, inputsState, value)
            }
            inputPlaceholder={inputsState.pathPlaceholder}
            selectDropdownList={selectDropdownList}
            selectOnChange={pathType =>
              handleSelectedInputPathTypeChange(
                inputsDispatch,
                pathType,
                inputsState.pathPlaceholder,
                inputsState.newInputDefaultPathProject,
                match.params.projectName
              )
            }
            selectDefaultValue={selectedSelectValue}
          />
        </div>
      </div>
      <div className="table__cell table__cell-actions">
        <button
          className="apply-edit-btn"
          onClick={() => handleInputsEdit(selectedDataInput)}
        >
          <Checkmark />
        </button>
      </div>
    </div>
  )
}

EditableDataInputsRow.defaultProps = {
  handleEditInput: () => {},
  inputsDispatch: () => {},
  inputsState: null,
  matches: [],
  selectDropdownList: [],
  setEditItem: () => {}
}

EditableDataInputsRow.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleEditInput: PropTypes.func,
  inputsDispatch: PropTypes.func,
  inputsState: PropTypes.shape({}),
  matches: PropTypes.arrayOf(PropTypes.shape({})),
  selectDropdownList: PropTypes.arrayOf(PropTypes.shape({})),
  selectedDataInput: PropTypes.shape({}).isRequired,
  setSelectedDataInput: PropTypes.func.isRequired,
  setEditItem: PropTypes.func
}

export default EditableDataInputsRow
