import { By } from 'selenium-webdriver';

module.exports = function (rootLocator) {
    return {
        open_button: By.css(rootLocator + ' button'),
        options: By.css(rootLocator + ' div.project-card__actions-menu-body div.project-card__actions-menu-item'),
        option: function (index) {
            return By.css(
                rootLocator + 
                ' div.project-card__actions-menu-body div.project-card__actions-menu-item:nth-of-type(' + index + ')'
            );
        }
    };
}