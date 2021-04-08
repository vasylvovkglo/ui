import { By } from 'selenium-webdriver';

module.exports = function (tableStructure) {
    // console.log('debug: ', tableStructure);
    var tableRoot = tableStructure['root'] ? tableStructure['root'] : '';
    var headerRoot = tableStructure['header'] ? tableStructure['header']['root'] : '';
    var bodyRoot = tableStructure['body'] ? tableStructure['body']['root'] : '';
    var body__row = tableStructure['body'] ? tableStructure['body']['row']['root'] : false;

    var column_locator = tableRoot + ' ' + bodyRoot + ' ' +  body__row
    var column_selectors = {}
    var field_selectors = {}

    var fields = tableStructure['body']['row']['fields'];
    for (const key in fields) {
        column_selectors[key] = By.css(column_locator + ' ' + fields[key]);
        field_selectors[key] = function (rowIndex) {
            return By.css(column_locator + ':nth-of-type(' + rowIndex + ') ' + fields[key]);
        }
    }
    return {
        tableColumns: column_selectors,
        tableFields: field_selectors
    }
};

// examples table structures
// 
// module.exports = TableComponent;
// 'table' = {
//     'root': '',
//     'header': {},
//     'body': {
//         'root': 'div.projects-content',
//         'row': {
//             'root': 'div.project-card',
//             'fields': {
//                 'name': 'div.project-card__header div.data-ellipsis',
//                 'description': 'div.project-card_description',
//                 'running': 'div.project-card__statistic div.statistics_running',
//                 'failed': 'div.project-card__statistic div.statistics_failed',
//                 'models': 'div.project-card__statistic div.project-data-card__statistics-item:nth-of-type(3) div.statistics_default',
//                 'features': 'div.project-card__statistic div.project-data-card__statistics-item:nth-of-type(4) div.statistics_default',
//                 'ml_functions': 'div.project-card__statistic div.project-data-card__statistics-item:nth-of-type(5) div.statistics_default',
//                 'action_menu': 'div.project-card__actions-menu'
//             }
//         }       
//     }
// }

// 'table_jobs_monitor' = {
//     'root': 'div.table-container div.table',
//     'header': {
//         'root': 'div.table-head',
//         'sorters': {
//             'name': 'div.table-head__item:nth-of-type(1) div.data-ellipsis',
//             'type': 'div.table-head__item:nth-of-type(2) div.data-ellipsis',
//             'duration': 'div.table-head__item:nth-of-type(3) div.data-ellipsis',
//             'owner': 'div.table-head__item:nth-of-type(4) div.data-ellipsis',
//             'label': 'div.table-head__item:nth-of-type(5) div.data-ellipsis',
//             'parameters': 'div.table-head__item:nth-of-type(6) div.data-ellipsis',
//             'results': 'div.table-head__item:nth-of-type(7) div.data-ellipsis',
//             'action_menu': 'div.table-head__item:nth-of-type(8) div.data-ellipsis'
//         }
//     },
//     'body': {
//         'root': 'div.table-body',
//         'row': {
//             'root': '> div.table-body__row',
//             'fields': {
//                 'expand_button': 'div.table-body__cell:nth-of-type(1) svg.expand-arrow',
//                 'name': 'div.table-body__cell:nth-of-type(1) div.item-name',
//                 'type': 'div.table-body__cell:nth-of-type(2) div.data-ellipsis',
//                 'duration': 'div.table-body__cell:nth-of-type(3) div.data-ellipsis',
//                 'owner': 'div.table-body__cell:nth-of-type(4) div.data-ellipsis',
//                 'label': 'div.table-body__cell:nth-of-type(5) div.data-ellipsis',
//                 'parameters': 'div.table-body__cell:nth-of-type(6) div.data-ellipsis',
//                 'results': 'div.table-body__cell:nth-of-type(7) div.chips-wrapper',
//                 'action_menu': 'div.table-body__cell:nth-of-type(8) div.table-actions-container > button'
//             }
//         }
//     }
// }

// 'project_dashbord_realtime_functions_table' = {
//     'root': 'div.project-data-card:nth-of-type(2) div.project-data-card__table',
//     'header': {
//         'root': 'div.project-data-card__table-header',
//         'sorters': {
//             'name': 'div.table-header__item:nth-of-type(1) div.data-ellipsis',
//             'status': 'div.table-header__item:nth-of-type(2) div.data-ellipsis'
//         }
//     },
//     'body': {
//         'root': 'div.project-data-card__table-body',
//         'row': {
//             'root': 'div.project-data-card__table-row',
//             'fields': {
//                 'name': 'div.project-data-card__table-cell:nth-of-type(1) div.data-ellipsis',
//                 'status': 'div.project-data-card__table-cell:nth-of-type(2) div.data-ellipsis',
//             }
//         }
//     }
// }

// with Table('div.project-data-card:nth-of-type(2) div.project-data-card__table') as tb:
//     with tb.header('div.project-data-card__table-header') as hd:
//         hd.namr = component('div.table-header__item:nth-of-type(1) div.data-ellipsis')
//         hd.status = selector