import inputGroup from '../components/input-group.component'
import dropdownComponent from '../components/dropdown.component'

import {
  generateInputGroup,
  generateDropdownGroup
} from '../../common-tools/common-tools'

const { By } = require('selenium-webdriver')

const commonCancelButton = By.css(
  'div.pop-up-dialog button.pop-up-dialog__btn_cancel'
)

const commonDeleteButton = By.css('div.pop-up-dialog button.btn-danger')

const commonDescription = By.css('div.pop-up-dialog > div:not([class])')

const commonCrossCancelButton = By.css(
  'div.pop-up-dialog div.pop-up-dialog__header-close svg'
)
const commonNameInput = generateInputGroup(
  '.pop-up-dialog .artifact-register-form .input-wrapper:nth-of-type(1)',
  true,
  true,
  true
)

const commonTargetPathInput = generateInputGroup(
  '.pop-up-dialog .artifact-register-form .input-wrapper:nth-of-type(2)',
  true,
  false,
  true
)

const commonDescriptionInput = generateInputGroup(
  '.pop-up-dialog .artifact-register-form .input-wrapper:nth-of-type(3)',
  true,
  false,
  true
)

const commonConfirmButton = By.css(
  '.pop-up-dialog .pop-up-dialog__footer-container .btn.btn-primary'
)

const commonTitle = By.css('div.pop-up-dialog div.pop-up-dialog__header-text')

module.exports = {
  createNewProject: {
    Title: commonTitle,
    Name_Input: inputGroup(
      generateInputGroup(
        'div.pop-up-dialog div.input-wrapper:nth-of-type(1)',
        true,
        true,
        true
      )
    ),
    Description_Input: inputGroup(
      generateInputGroup(
        'div.pop-up-dialog div.input-wrapper:nth-of-type(2)',
        true,
        false,
        true
      )
    ),
    Cross_Cancel_Button: commonCrossCancelButton,
    Cancel_Button: commonCancelButton,
    Create_Button: By.css('div.pop-up-dialog button.btn-secondary'),
    Error_Message: By.css('div.pop-up-dialog div.error-container')
  },
  archiveProject: {
    Title: commonTitle,
    Description: commonDescription,
    Cross_Cancel_Button: commonCrossCancelButton,
    Cancel_Button: commonCancelButton,
    Archive_Button: commonConfirmButton
  },
  deleteProject: {
    Title: commonTitle,
    Description: commonDescription,
    Cross_Cancel_Button: commonCrossCancelButton,
    Cancel_Button: commonCancelButton,
    Delete_Button: commonDeleteButton
  },
  deleteFunction: {
    Title: commonTitle,
    Description: commonDescription,
    Cross_Cancel_Button: commonCrossCancelButton,
    Cancel_Button: By.css('div.pop-up-dialog button.btn-label'),
    Delete_Button: commonDeleteButton
  },
  deleteScheduledJob: {
    Title: commonTitle,
    Description: commonDescription,
    Cross_Cancel_Button: commonCrossCancelButton,
    Cancel_Button: commonCancelButton,
    Delete_Button: commonDeleteButton
  },
  registerDataset: {
    Title: commonTitle,
    Cross_Cancel_Button: commonCrossCancelButton,
    Name_Input: inputGroup(commonNameInput),
    Target_Path_Input: inputGroup(commonTargetPathInput),
    Description_Input: inputGroup(commonDescriptionInput),
    Cancel_Button: commonCancelButton,
    Archive_Button: commonConfirmButton
  },
  createFeatureSetPopupDialog: {
    Cross_Cancel_Button: commonCrossCancelButton,
    Description: commonDescription,
    OK_Button: commonConfirmButton
  },
  createMLFunctionPopup: {
    Cross_Cancel_Button: commonCrossCancelButton,
    Title: commonTitle,
    New_Function_Name_Input: inputGroup(
      generateInputGroup(
        '.pop-up-dialog .new-function__pop-up-inputs .name.input-wrapper',
        true,
        true,
        true
      )
    ),
    New_Function_Tag_Input: inputGroup(
      generateInputGroup(
        '.pop-up-dialog .new-function__pop-up-inputs .tag.input-wrapper',
        true,
        false,
        true
      )
    ),
    New_Function_Runtime_Dropdown: dropdownComponent(
      generateDropdownGroup('.pop-up-dialog .select', false, false, false)
    ),
    Cancel_Button: commonCancelButton,
    Continue_Button: commonConfirmButton
  },
  registerFilePopup: {
    Title: commonTitle,
    Cross_Cancel_Button: commonCrossCancelButton,
    New_File_Name_Input: inputGroup(commonNameInput),
    New_File_Target_Path_Input: inputGroup(commonTargetPathInput),
    New_File_Description_Input: inputGroup(commonDescriptionInput),
    New_File_Type_Dropdown: dropdownComponent(
      generateDropdownGroup('.pop-up-dialog .artifact-register-form .select')
    ),
    Cancel_Button: commonCancelButton,
    Register_Button: commonConfirmButton
  },
  registerModelPopup: {
    Title: commonTitle,
    Cross_Cancel_Button: commonCrossCancelButton,
    New_File_Name_Input: inputGroup(commonNameInput),
    New_File_Target_Path_Input: inputGroup(commonTargetPathInput),
    New_File_Description_Input: inputGroup(commonDescriptionInput),
    Cancel_Button: commonCancelButton,
    Register_Button: commonConfirmButton
  },
  viewYamlPopup: {
    Title: By.css('div.pop-up-dialog div.pop-up-dialog__header'),
    Cross_Cancel_Button: commonCrossCancelButton,
    YAML_Modal_Container: By.css(
      'div.pop-up-dialog div.yaml-modal-container pre'
    )
  },
  createNewSecretPopup: {
    Title: commonTitle,
    Cross_Cancel_Button: commonCrossCancelButton,
    New_Secret_Key_Input: inputGroup(
      generateInputGroup(
        '.secrets__form-input:nth-of-type(2) .input-wrapper',
        true,
        false,
        true
      )
    ),
    New_Secret_Value_Input: inputGroup(
      generateInputGroup(
        '.secrets__form-input:nth-of-type(3) .input-wrapper',
        true,
        false,
        true
      )
    ),
    Cancel_Button: By.css('div.pop-up-dialog button.btn-label'),
    Save_Button: By.css(
      '.pop-up-dialog .secrets__footer-container .btn.btn-primary'
    )
  },
  addToFeatureVectorPopup: {
    Title: commonTitle,
    Cross_Cancel_Button: commonCrossCancelButton,
    Project_Name_Dropdown: dropdownComponent(
      generateDropdownGroup('.pop-up-dialog .select-row .project-name')
    ),
    Vector_Name_Dropdown: dropdownComponent(
      generateDropdownGroup('.pop-up-dialog .select-row .vector-name')
    ),
    Vector_Tag_Dropdown: dropdownComponent(
      generateDropdownGroup('.pop-up-dialog .select-row .vector-tag')
    ),
    Cancel_Button: commonCancelButton,
    Select_Button: commonConfirmButton,
    Create_Feature_Vector_Button: By.css(
      '.pop-up-dialog .create-feature-vector__btn'
    )
  },
  createFeatureVectorPopup: {
    Title: commonTitle,
    Cross_Cancel_Button: commonCrossCancelButton,
    Name_Input: By.css('.pop-up-dialog .vector-name-wrapper input'),
    Tag_Input: By.css('.pop-up-dialog .vector-tag-wrapper input'),
    Description_Input: By.css('.pop-up-dialog .text-area-wrapper textarea'),
    Labels_Input: By.css('.pop-up-dialog .labels-container .chips-wrapper'),
    Cancel_Button: commonCancelButton,
    Select_Button: commonConfirmButton
  }
}
