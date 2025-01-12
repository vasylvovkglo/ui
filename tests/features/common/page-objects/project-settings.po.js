import { By } from 'selenium-webdriver'
import commonTable from '../components/table.component'
import inputGroup from '../components/input-group.component'
import { generateInputGroup } from '../../common-tools/common-tools'

const tabSelector = {
  root: '.content-menu',
  header: {},
  body: {
    root: 'ul.content-menu__list',
    row: {
      root: '.content-menu__item',
      fields: {
        tab: 'a'
      }
    }
  }
}

const parametersTable = {
  root: '.key-value-table.settings__params',
  header: {
    root: '.table-row__header ',
    sorters: {
      key: '.table-cell__key',
      value: '.table-cell__value'
    }
  },
  body: {
    offset: 1,
    add_row_btn: '.table-row .add-new-item-btn',
    row: {
      root: '.table-row',
      fields: {
        key: '.table-cell__key',
        value: '.table-cell__value',
        remove_btn: '.table-cell__actions .key-value-table__btn'
      }
    }
  }
}

module.exports = {
  generalTab: {
    Project_Settings_Tab_Selector: commonTable(tabSelector),
    Source_URL_Edit_Button: By.css(
      '.settings__card-content .settings__source .settings__source-edit'
    ),
    Artifact_Path_Input: inputGroup(
      generateInputGroup(
        '.settings__card-content .settings__artifact-path .input-wrapper',
        true,
        false,
        true
      )
    ),
    Parameters_Table: commonTable(parametersTable),
    Parameters_Table_Key_Input: inputGroup(
      generateInputGroup(
        '.key-value-table.settings__params .table-row .table-cell__key.input-wrapper',
        true,
        false,
        true
      )
    ),
    Parameters_Table_Value_Input: inputGroup(
      generateInputGroup(
        '.key-value-table.settings__params .table-row .table-cell__value.input-wrapper',
        true,
        false,
        true
      )
    ),
    Parameters_Table_Add_Row_Button: By.css(
      '.key-value-table.settings__params .table-row.no-hover button:nth-of-type(1)'
    ),
    Parameters_Table_Discard_Row_Button: By.css(
      '.key-value-table.settings__params .table-row.no-hover button:nth-of-type(2)'
    )
  }
}
