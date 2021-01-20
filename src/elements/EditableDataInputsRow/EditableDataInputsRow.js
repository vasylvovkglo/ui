import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Input from '../../common/Input/Input'
import Combobox from '../../common/Combobox/Combobox'

import { inputsActions } from '../../components/JobsPanelDataInputs/jobsPanelDataInputsReducer'

import { ReactComponent as Checkmark } from '../../images/checkmark.svg'

const EditableDataInputsRow = ({
  handleEdit,
  inputOnChange,
  inputsDispatch,
  inputsState,
  matches,
  selectDropdownList,
  selectedDataInput,
  selectOnChange,
  setEditItem,
  setInputPlaceholder,
  setSelectedDataInput
}) => {
  const [previousInputValueState, setPreviousInputValueState] = useState('')
  const [inputPathDefaultValue, setInputPathDefaultValue] = useState('')
  const [selectedInputValue, setSelectedInputValue] = useState(null)
  const [newInputPathState, setNewInputPathState] = useState(null)
  const [inputName, setInputName] = useState(selectedDataInput.data.name)
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
    const value = selectDropdownList.filter(
      item => item.id === selectedDataInput.data.path.split('://')[0] + '://'
    )[0]

    setInputPathDefaultValue(selectedDataInput.data.path.split('://')[1])
    setSelectedInputValue(value)
    setNewInputPathState({ ...inputsState.newInput.path })
  }, [
    inputsState.newInput.path,
    selectDropdownList,
    selectedDataInput.data.path
  ])

  useEffect(() => {
    if (selectedInputValue) {
      if (!inputsState.newInput.name) {
        inputsDispatch({
          type: inputsActions.SET_NEW_INPUT_NAME,
          payload: selectedDataInput.data.name
        })
      }
      if (!inputsState.newInput.path.pathType) {
        inputsDispatch({
          type: inputsActions.SET_NEW_INPUT_PATH,
          payload: {
            ...newInputPathState,
            pathType: selectedInputValue.id
          }
        })
      }
    }
  }, [
    inputsDispatch,
    inputsState.newInput.name,
    inputsState.newInput.path.pathType,
    newInputPathState,
    selectedDataInput.data.name,
    selectedInputValue
  ])

  const handleEditInput = useCallback(() => {
    if (selectedDataInput) {
      setPreviousInputValueState(selectedDataInput.data.path)
    }
  }, [selectedDataInput])

  const handleDocumentClick = useCallback(
    event => {
      if (!tableRowRef.current.contains(event.target)) {
        setSelectedDataInput({
          ...selectedDataInput,
          data: { ...selectedDataInput.data, path: previousInputValueState }
        })
        setEditItem(false)
        setInputPlaceholder('')
      }
    },
    [
      previousInputValueState,
      selectedDataInput,
      setEditItem,
      setInputPlaceholder,
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

  const handleInputsEdit = () => {
    setIsEmptyValue({ path: false, name: false })
    if (!inputName) {
      setIsEmptyValue(prevState => ({ ...prevState, name: true }))
    }
    if (!inputPathDefaultValue) {
      setIsEmptyValue(prevState => ({ ...prevState, path: true }))
    }
    if (inputName && inputPathDefaultValue) {
      handleEdit(selectedDataInput, true)
      setInputPlaceholder('')
    }
  }

  return (
    <div
      className="table__row edit-row"
      onClick={handleEditInput}
      ref={tableRowRef}
    >
      {selectedDataInput.isDefault ? (
        <div className="table__cell table__cell_disabled">
          <div className="data-ellipsis">{selectedDataInput.data.name}</div>
        </div>
      ) : (
        <div className="table__cell table__cell_edit">
          <Input
            className={inputNameClassNames}
            onChange={name => {
              setInputName(name)
              setSelectedDataInput({
                ...selectedDataInput,
                newDataInputName: name
              })
            }}
            type="text"
            value={inputName}
          />
        </div>
      )}
      <div className="table__cell table__cell_edit ">
        <div className={inputPathClassNames}>
          <Combobox
            matches={matches}
            inputDefaultValue={inputPathDefaultValue}
            inputOnChange={inputOnChange}
            inputPlaceholder={inputsState.pathPlaceholder}
            selectDropdownList={selectDropdownList}
            selectOnChange={selectOnChange}
            selectedInputValue={selectedInputValue}
            setDataChanges={data =>
              setSelectedDataInput({
                ...selectedDataInput,
                data: { ...selectedDataInput.data, path: data }
              })
            }
          />
        </div>
      </div>
      <div className="table__cell table__cell-actions">
        <button className="apply-edit-btn" onClick={handleInputsEdit}>
          <Checkmark />
        </button>
      </div>
    </div>
  )
}

EditableDataInputsRow.defaultProps = {
  inputOnChange: () => {},
  handleEditInput: () => {},
  inputsDispatch: () => {},
  inputsState: null,
  matches: [],
  selectDropdownList: [],
  selectOnChange: () => {},
  setEditItem: () => {},
  setInputPlaceholder: () => {}
}

EditableDataInputsRow.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleEditInput: PropTypes.func,
  inputOnChange: PropTypes.func,
  inputsDispatch: PropTypes.func,
  inputsState: PropTypes.shape({}),
  matches: PropTypes.arrayOf(PropTypes.shape({})),
  selectDropdownList: PropTypes.arrayOf(PropTypes.shape({})),
  selectedDataInput: PropTypes.shape({}).isRequired,
  setSelectedDataInput: PropTypes.func.isRequired,
  selectOnChange: PropTypes.func,
  setEditItem: PropTypes.func,
  setInputPlaceholder: PropTypes.func
}

export default EditableDataInputsRow
