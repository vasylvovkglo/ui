import { By } from 'selenium-webdriver';

module.exports = function (dropdownStructure) {
    return {
        open_button: By.css([dropdownStructure.root, dropdownStructure.dropdownElements.open_button].join(' ')),
        options: By.css([dropdownStructure.root, dropdownStructure.dropdownElements.options].join(' ')),
        option: function (index) {
            return By.css([
                dropdownStructure.root, dropdownStructure.dropdownElements.options + ':nth-of-type(' + index + ')'
            ].join(' '))
        }
    };
}