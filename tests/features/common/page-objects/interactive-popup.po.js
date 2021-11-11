import inputGroup from '../components/input-group.component'
import dropdownComponent from '../components/dropdown.component'
import commonTable from '../components/table.component'
import labelComponent from '../components/label.component'
import checkboxComponent from '../components/checkbox.component'

import {
  generateLabelGroup,
  generateInputGroup,
  generateDropdownGroup
} from '../../common-tools/common-tools'

const { By } = require('selenium-webdriver')

const memberOverviewLabelsTable = {
  root: '#overlay_container .pop-up-dialog .info-row',
  header: {},
  body: {
    root: 'members-overview',
    row: {
      root: '.member-overview',
      fields: {
        name: ''
      }
    }
  }
}

const membersTable = {
  root: ' #overlay_container .pop-up-dialog .members-table',
  header: {},
  body: {
    root: '.table-body',
    offset: 0,
    row: {
      root: '.table-row',
      fields: {
        name: '.member-name',
        role_dropdown: {
          componentType: dropdownComponent,
          structure: generateDropdownGroup(
            '.member-roles .select',
            false,
            false,
            false
          )
        },
        delete_btn: '.member-actions button'
      }
    }
  }
}

// Common components

const commonCancelButton = By.css(
  'div.pop-up-dialog button.pop-up-dialog__btn_cancel'
)
const commonCrossCancelButton = By.css(
  'div.pop-up-dialog div.pop-up-dialog__header-close svg'
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
    Description: By.css('div.pop-up-dialog > div:not([class])'),
    Cross_Cancel_Button: commonCrossCancelButton,
    Cancel_Button: commonCancelButton,
    Archive_Button: By.css('div.pop-up-dialog button.btn-primary')
  },
  deleteProject: {
    Title: commonTitle,
    Description: By.css('div.pop-up-dialog > div:not([class])'),
    Cross_Cancel_Button: commonCrossCancelButton,
    Cancel_Button: commonCancelButton,
    Delete_Button: By.css('div.pop-up-dialog button.btn-danger')
  },
  deleteFunction: {
    Title: commonTitle,
    Description: By.css('div.pop-up-dialog > div:not([class])'),
    Cross_Cancel_Button: commonCrossCancelButton,
    Cancel_Button: commonCancelButton,
    Delete_Button: By.css('div.pop-up-dialog button.btn-danger')
  },
  registerDataset: {
    Title: commonTitle,
    Cross_Cancel_Button: commonCrossCancelButton,
    Name_Input: inputGroup(
      generateInputGroup(
        'div.pop-up-dialog div.artifact-register-form div.input-wrapper:nth-of-type(1)',
        true,
        true,
        true
      )
    ),
    Target_Path_Input: inputGroup(
      generateInputGroup(
        'div.pop-up-dialog div.artifact-register-form div.input-wrapper:nth-of-type(2)',
        true,
        false,
        true
      )
    ),
    Description_Input: inputGroup(
      generateInputGroup(
        'div.pop-up-dialog div.artifact-register-form div.input-wrapper:nth-of-type(3)',
        true,
        false,
        false
      )
    ),
    Cancel_Button: commonCancelButton,
    Archive_Button: By.css('div.pop-up-dialog button.btn-primary')
  },
  createFeatureSetPopupDialog: {
    Cross_Cancel_Button: commonCrossCancelButton,
    Description: By.css('div.pop-up-dialog > div:not([class])'),
    OK_Button: By.css('div.pop-up-dialog button.btn-primary')
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
    Continue_Button: By.css(
      '.pop-up-dialog .pop-up-dialog__footer-container .btn.btn-primary'
    )
  },
  changeProjectOwnerPopup: {
    Cross_Cancel_Button: commonCrossCancelButton,
    Title: commonTitle,
    Search_Input_Dropdown: dropdownComponent(
      generateDropdownGroup(
        '.pop-up-dialog .owner-table',
        '.input-wrapper .input', //open component subLocator
        '.members-list .member-row', // options sublocator
        '.member-name' // option name subLocator
      )
    ),
    Discard_Button: commonCancelButton,
    Apply_Button: By.css('.pop-up-dialog .data-ellipsis button.btn-secondary'),
    Fotter_Annotation_Label: By.css(
      '.change-owner__pop-up > .pop-up-dialog .footer-annotation'
    )
  },
  projectMembersPopup: {
    Cross_Cancel_Button: commonCrossCancelButton,
    Title: commonTitle,
    Member_Overview_Labels_Table: commonTable(memberOverviewLabelsTable),
    Member_Overview_Tooltip: labelComponent(
      generateLabelGroup(
        '#overlay_container .pop-up-dialog .info-row', // root
        '', // empty sublocator
        true // for single hint
      )
    ),
    Invate_New_Members_Button: By.css(
      ' #overlay_container .pop-up-dialog .info-row .invite-new-members-btn'
    ),
    Members_Table: commonTable(membersTable),
    Members_Filter_Input: inputGroup(
      generateInputGroup(
        ' #overlay_container .pop-up-dialog .members-table .table-header .input-wrapper',
        true,
        false,
        false
      )
    ),
    Role_Filter_Dropdown: dropdownComponent(
      generateDropdownGroup(
        '.member-roles .select', //root
        false, // open component default subLocator
        false, // options default sublocator
        false // option name default subLocator
      )
    ),
    Notify_by_Email_Checbox: checkboxComponent({
      root:
        '#overlay_container .pop-up-dialog .footer-actions .notify-by-email',
      elements: {
        checkbox: 'svg[class]',
        name: '',
        icon: ''
      }
    }),
    Discard_Button: commonCancelButton,
    Apply_Button: By.css(
      ' #overlay_container .pop-up-dialog .data-ellipsis button.btn-secondary'
    ),
    Fotter_Annotation_Label: By.css(
      ' #overlay_container .pop-up-dialog .footer-annotation'
    )
  }
}
