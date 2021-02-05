import { inputsActions } from './jobsPanelDataInputsReducer'
import { isNil } from 'lodash'

export const handleAddItem = (
  currentTableData,
  inputsDispatch,
  newItemObj,
  newJobData,
  panelDispatch,
  previousData,
  removeNewItemObj,
  setAddNewItem,
  setCurrentTableData,
  setPreviousData,
  setNewJobData,
  setPathPlaceholder,
  newInputUrlPath,
  setNewInputUrl,
  setComboboxMatches,
  setProjectEntered,
  setArtifactEntered
) => {
  if (
    newItemObj.name.length === 0 ||
    ((newItemObj.path.pathType.length === 0 ||
      newItemObj.path.project.length === 0 ||
      newItemObj.path.artifact.length === 0) &&
      !newInputUrlPath)
  ) {
    inputsDispatch({
      type: removeNewItemObj
    })
    inputsDispatch({
      type: setPathPlaceholder,
      payload: ''
    })
    inputsDispatch({
      type: setNewInputUrl,
      payload: ''
    })

    return inputsDispatch({
      type: setAddNewItem,
      payload: false
    })
  }

  panelDispatch({
    type: setPreviousData,
    payload: [
      ...previousData,
      {
        isDefault: false,
        data: {
          name: newItemObj.name,
          path:
            newItemObj.path.pathType === AZURE_STORAGE_INPUT_PATH_SCHEME ||
            newItemObj.path.pathType === GOOGLE_STORAGE_INPUT_PATH_SCHEME ||
            newItemObj.path.pathType === S3_INPUT_PATH_SCHEME ||
            newItemObj.path.pathType === V3IO_INPUT_PATH_SCHEME
              ? `${newItemObj.path.pathType}${newInputUrlPath}`
              : `${newItemObj.path.pathType}${newItemObj.path.project}/${newItemObj.path.artifact}`
        }
      }
    ]
  })
  panelDispatch({
    type: setCurrentTableData,
    payload: [
      ...currentTableData,
      {
        isDefault: false,
        data: {
          name: newItemObj.name,
          path:
            newItemObj.path.pathType === AZURE_STORAGE_INPUT_PATH_SCHEME ||
            newItemObj.path.pathType === GOOGLE_STORAGE_INPUT_PATH_SCHEME ||
            newItemObj.path.pathType === S3_INPUT_PATH_SCHEME ||
            newItemObj.path.pathType === V3IO_INPUT_PATH_SCHEME
              ? newItemObj.path.pathType + newInputUrlPath
              : `${newItemObj.path.pathType}${newItemObj.path.project}/${newItemObj.path.artifact}`
        }
      }
    ]
  })
  inputsDispatch({
    type: setAddNewItem,
    payload: false
  })
  inputsDispatch({
    type: removeNewItemObj
  })
  inputsDispatch({
    type: setPathPlaceholder,
    payload: ''
  })
  inputsDispatch({
    type: setComboboxMatches,
    payload: []
  })
  inputsDispatch({
    type: setProjectEntered,
    payload: false
  })
  inputsDispatch({
    type: setArtifactEntered,
    payload: false
  })
  inputsDispatch({
    type: setNewInputUrl,
    payload: ''
  })
  setNewJobData({
    ...newJobData,
    [newItemObj.name]:
      newItemObj.path.pathType === AZURE_STORAGE_INPUT_PATH_SCHEME ||
      newItemObj.path.pathType === GOOGLE_STORAGE_INPUT_PATH_SCHEME ||
      newItemObj.path.pathType === S3_INPUT_PATH_SCHEME ||
      newItemObj.path.pathType === V3IO_INPUT_PATH_SCHEME
        ? newItemObj.path.pathType + newInputUrlPath
        : `${newItemObj.path.pathType}${newItemObj.path.project}/${newItemObj.path.artifact}`
  })
}

export const handleEdit = (
  currentPanelData,
  currentTableData,
  inputsDispatch,
  newName,
  panelDispatch,
  setSelectedItem,
  selectedItem,
  setCurrentPanelData,
  setCurrentTableData,
  setPreviousPanelData,
  setPathPlaceholder
) => {
  const currentDataObj = { ...currentPanelData }
  const { pathType, project, artifact } = selectedItem.data.path

  if (
    selectedItem.data.name.length === 0 ||
    ((pathType.length === 0 || project.length === 0 || artifact.length === 0) &&
      !selectedItem.selectedInputUrlPath)
  ) {
    inputsDispatch({
      type: setPathPlaceholder,
      payload: ''
    })
    inputsDispatch({
      type: setSelectedItem,
      payload: {
        isDefault: false,
        data: {
          name: '',
          path: {
            pathType: '',
            project: '',
            artifact: ''
          }
        },
        selectedInputUrlPath: ''
      }
    })

    const dataArray = currentTableData.map(dataItem => {
      if (dataItem.data.name === selectedItem.data.name) {
        dataItem.data.name = newName || selectedItem.data.name
        dataItem.data.path = currentPanelData[selectedItem.data.name]
      }

      return dataItem
    })

    return panelDispatch({
      type: setCurrentTableData,
      payload: dataArray
    })
  }

  if (newName) {
    delete currentDataObj[selectedItem.data.name]
    currentDataObj[newName] = selectedItem.data.path
  } else {
    currentDataObj[selectedItem.data.name] = selectedItem.data.path
  }

  if (selectedItem.selectedInputUrlPath.length > 0) {
    setCurrentPanelData({
      [selectedItem.data.name]: pathType + selectedItem.selectedInputUrlPath
    })
  } else if (artifact) {
    setCurrentPanelData({
      [selectedItem.data.name]: pathType + project + '/' + artifact
    })
  } else {
    setCurrentPanelData({
      [selectedItem.data.name]: currentPanelData[selectedItem.data.name]
    })
  }

  const newDataArray = currentTableData.map(dataItem => {
    if (dataItem.data.name === selectedItem.data.name) {
      dataItem.data.name = newName || selectedItem.data.name

      if (project.length === 0) {
        dataItem.data.path = pathType + selectedItem.selectedInputUrlPath
      } else {
        dataItem.data.path = pathType + project + '/' + artifact
      }
    }

    return dataItem
  })

  panelDispatch({
    type: setPreviousPanelData,
    payload: newDataArray
  })
  panelDispatch({
    type: setCurrentTableData,
    payload: newDataArray
  })
  inputsDispatch({
    type: setSelectedItem,
    payload: {
      isDefault: false,
      data: {
        name: '',
        path: {
          pathType: '',
          project: '',
          artifact: ''
        }
      },
      selectedInputUrlPath: ''
    }
  })
}

export const handleDelete = (
  currentPanelData,
  currentTableData,
  panelDispatch,
  previousPanelData,
  selectedItem,
  setCurrentPanelData,
  setCurrentTableData,
  setPreviousPanelData
) => {
  const newInputs = { ...currentPanelData }
  delete newInputs[selectedItem.data.name]

  setCurrentPanelData({ ...newInputs })

  panelDispatch({
    type: setPreviousPanelData,
    payload: previousPanelData.filter(
      dataItem => dataItem.data.name !== selectedItem.data.name
    )
  })
  panelDispatch({
    type: setCurrentTableData,
    payload: currentTableData.filter(
      dataItem => dataItem.data.name !== selectedItem.data.name
    )
  })
}

export const comboboxSelectList = [
  {
    className: 'path-type-store',
    label: 'MLRun store',
    id: 'store://'
  },
  {
    className: 'path-type-v3io',
    label: 'V3IO',
    id: 'v3io://'
  },
  {
    className: 'path-type-s3',
    label: 'S3',
    id: 's3://'
  },
  {
    className: 'path-type-http',
    label: 'HTTP',
    id: 'http://'
  },
  {
    className: 'path-type-https',
    label: 'HTTPS',
    id: 'https://'
  },
  {
    className: 'path-type-az',
    label: 'Azure storage',
    id: 'az://'
  },
  {
    className: 'path-type-gs',
    label: 'Google storage',
    id: 'gs://'
  }
]

export const AZURE_STORAGE_INPUT_PATH_SCHEME = 'az://'
export const GOOGLE_STORAGE_INPUT_PATH_SCHEME = 'gs://'
export const HTTP_STORAGE_INPUT_PATH_SCHEME = 'http://'
export const HTTPS_STORAGE_INPUT_PATH_SCHEME = 'https://'
export const MLRUN_STORAGE_INPUT_PATH_SCHEME = 'store://'
export const S3_INPUT_PATH_SCHEME = 's3://'
export const V3IO_INPUT_PATH_SCHEME = 'v3io://'

export const handleInputPathTypeChange = (
  inputsDispatch,
  // newInput,
  pathType,
  pathPlaceholder,
  newInputDefaultPathProject,
  currentProject
) => {
  if (
    newInputDefaultPathProject.length > 0 &&
    (pathType === AZURE_STORAGE_INPUT_PATH_SCHEME ||
      pathType === GOOGLE_STORAGE_INPUT_PATH_SCHEME ||
      pathType === HTTP_STORAGE_INPUT_PATH_SCHEME ||
      pathType === HTTPS_STORAGE_INPUT_PATH_SCHEME ||
      pathType === S3_INPUT_PATH_SCHEME ||
      pathType === V3IO_INPUT_PATH_SCHEME)
  ) {
    inputsDispatch({
      type: inputsActions.SET_NEW_INPUT_DEFAULT_PATH_PROJECT,
      payload: ''
    })
  } else if (newInputDefaultPathProject.length === 0) {
    inputsDispatch({
      type: inputsActions.SET_NEW_INPUT_DEFAULT_PATH_PROJECT,
      payload: `${currentProject}/`
    })
  }

  inputsDispatch({
    type: inputsActions.SET_PATH_PLACEHOLDER,
    payload:
      pathType === S3_INPUT_PATH_SCHEME ||
      pathType === GOOGLE_STORAGE_INPUT_PATH_SCHEME
        ? 'bucket/path'
        : pathType === AZURE_STORAGE_INPUT_PATH_SCHEME
        ? 'container/path'
        : pathType === V3IO_INPUT_PATH_SCHEME
        ? '/container-name/file'
        : ''
  })
  inputsDispatch({
    type: inputsActions.SET_NEW_INPUT_URL_PATH,
    payload: ''
  })
  inputsDispatch({
    type: inputsActions.SET_NEW_INPUT_PATH,
    payload: {
      pathType: pathType,
      project: '',
      artifact: ''
    }
  })
}

export const handleInputPathChange = (inputsDispatch, inputsState, path) => {
  if (
    [
      AZURE_STORAGE_INPUT_PATH_SCHEME,
      GOOGLE_STORAGE_INPUT_PATH_SCHEME,
      S3_INPUT_PATH_SCHEME,
      V3IO_INPUT_PATH_SCHEME
    ].includes(inputsState.newInput.path.pathType)
  ) {
    return inputsDispatch({
      type: inputsActions.SET_NEW_INPUT_URL_PATH,
      payload: path
    })
  }

  const pathItems = path.split('/')
  const artifactIsEntered = inputsState.artifacts.find(
    artifact => artifact.id === pathItems[1]
  )

  if (path.length === 0 && inputsState.newInputDefaultPathProject.length > 0) {
    inputsDispatch({
      type: inputsActions.SET_NEW_INPUT_DEFAULT_PATH_PROJECT,
      payload: ''
    })
  }

  if (isNil(pathItems[1]) && inputsState.artifacts.length > 0) {
    inputsDispatch({
      type: inputsActions.SET_ARTIFACTS,
      payload: []
    })
  }

  if (
    pathItems[0] !== inputsState.newInput.path.project ||
    (!isNil(pathItems[1]) &&
      pathItems[1] !== inputsState.newInput.path.artifact)
  ) {
    inputsDispatch({
      type: inputsActions.SET_NEW_INPUT_PATH,
      payload: {
        ...inputsState.newInput.path,
        project: pathItems[0],
        artifact: pathItems[1] ?? inputsState.newInput.path.artifact
      }
    })
  }

  inputsDispatch({
    type: inputsActions.SET_NEW_INPUT_PROJECT_PATH_ENTERED,
    payload: typeof pathItems[1] === 'string'
  })
  inputsDispatch({
    type: inputsActions.SET_NEW_INPUT_ARTIFACT_PATH_ENTERED,
    payload: !!artifactIsEntered
  })
}

export const setProjectsList = (inputsDispatch, match, projectStore) => {
  const projectsList = projectStore.projects.map(project => ({
    label:
      project.metadata.name === match.params.projectName
        ? 'Current project'
        : project.metadata.name,
    id: project.metadata.name
  }))
  inputsDispatch({
    type: inputsActions.SET_PROJECTS,
    payload: projectsList
  })
}
