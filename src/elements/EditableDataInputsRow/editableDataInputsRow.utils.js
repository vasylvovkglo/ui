import { inputsActions } from '../../components/JobsPanelDataInputs/jobsPanelDataInputsReducer'
import { isNil } from 'lodash'
import {
  AZURE_STORAGE_INPUT_PATH_SCHEME,
  GOOGLE_STORAGE_INPUT_PATH_SCHEME,
  HTTP_STORAGE_INPUT_PATH_SCHEME,
  HTTPS_STORAGE_INPUT_PATH_SCHEME,
  S3_INPUT_PATH_SCHEME,
  V3IO_INPUT_PATH_SCHEME
} from '../../components/JobsPanelDataInputs/jobsPanelDataInputs.util'

export const handleSelectedInputPathChange = (
  inputsDispatch,
  inputsState,
  path
) => {
  if (
    [
      AZURE_STORAGE_INPUT_PATH_SCHEME,
      GOOGLE_STORAGE_INPUT_PATH_SCHEME,
      S3_INPUT_PATH_SCHEME,
      V3IO_INPUT_PATH_SCHEME
    ].includes(inputsState.selectedDataInput.data.path.pathType)
  ) {
    return inputsDispatch({
      type: inputsActions.SET_SELECTED_INPUT_URL_PATH,
      payload: path
    })
  }

  const pathItems = path.split('/')
  const artifactIsEntered = inputsState.artifacts.find(
    artifact => artifact.id === pathItems[1]
  )

  if (isNil(pathItems[1]) && inputsState.artifacts.length > 0) {
    inputsDispatch({
      type: inputsActions.SET_ARTIFACTS,
      payload: []
    })
  }

  if (
    pathItems[0] !== inputsState.selectedDataInput.data.path.project ||
    (!isNil(pathItems[1]) &&
      pathItems[1] !== inputsState.selectedDataInput.data.path.artifact)
  ) {
    inputsDispatch({
      type: inputsActions.SET_SELECTED_INPUT_PATH,
      payload: {
        ...inputsState.selectedDataInput.data.path,
        project: pathItems[0],
        artifact:
          pathItems[1] ?? inputsState.selectedDataInput.data.path.artifact
      }
    })
  }

  inputsDispatch({
    type: inputsActions.SET_SELECTED_INPUT_PROJECT_PATH_ENTERED,
    payload: typeof pathItems[1] === 'string'
  })
  inputsDispatch({
    type: inputsActions.SET_SELECTED_INPUT_ARTIFACT_PATH_ENTERED,
    payload: !!artifactIsEntered
  })
}

export const handleSelectedInputPathTypeChange = (
  inputsDispatch,
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
    type: inputsActions.SET_SELECTED_INPUT_URL_PATH,
    payload: ''
  })
  inputsDispatch({
    type: inputsActions.SET_SELECTED_INPUT_PATH,
    payload: {
      pathType: pathType,
      project: '',
      artifact: ''
    }
  })
}
