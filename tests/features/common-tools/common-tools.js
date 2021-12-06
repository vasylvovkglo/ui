module.exports = {
  locatorBuilder: function(strings, ...keys) {
    return function(...values) {
      const dict = values[values.length - 1] || {}
      const result = [strings[0]]
      keys.forEach(function(key, i) {
        const value = Number.isInteger(key) ? values[key] : dict[key]
        result.push(value, strings[i + 1])
      })
      return result.join('')
    }
  },
  generateInputGroup: function(
    root,
    label = false,
    hint = false,
    warning = false
  ) {
    const structure = { root, elements: {} }
    structure.elements.input = 'input'
    if (label) {
      structure.elements.label = 'label'
    }
    if (hint) {
      structure.elements.hint =
        typeof hint === 'string' ? hint : 'div.tip-container svg'
    }
    if (warning) {
      structure.elements.warningHint = 'div.input__warning svg'
      structure.elements.warningText = 'div.tooltip div.tooltip__text'
    }

    return structure
  },
  generateNumberInputGroup: function(
    root,
    incDecBtn = false,
    label = false,
    hint = false,
    warning = false
  ) {
    const structure = { root, elements: {} }
    structure.elements.input = 'input'
    if (incDecBtn) {
      structure.elements.inc_btn = incDecBtn.inc_btn
      structure.elements.dec_btn = incDecBtn.dec_btn
    } else {
      structure.elements.inc_btn = '.range__buttons button[class*=increase]'
      structure.elements.dec_btn = '.range__buttons button[class*=decrease]'
    }

    structure.elements.label = label || '.data-ellipsis'

    if (hint) {
      structure.elements.hint =
        typeof hint === 'string' ? hint : 'div.tip-container svg'
    }
    if (warning) {
      structure.elements.warningHint = '.range__warning svg'
      structure.elements.warningText = 'div.tooltip div.tooltip__text'
    }

    return structure
  },
  generateLabelGroup: function(
    root,
    label = false,
    hintButton = false,
    hint = false
  ) {
    const structure = { elements: {} }
    structure.root = root

    structure.elements.label = label || '.data-ellipsis'

    if (hintButton) {
      structure.elements.hintButton =
        typeof hintButton === 'string' ? hintButton : 'div.tip-container svg'
    }

    if (hint) {
      structure.elements.hint = hint
    }

    return structure
  },
  generateDropdownGroup: function(
    root,
    open_button = false,
    options = false,
    option_name = false
  ) {
    const structure = { dropdownElements: {} }
    structure.root = root
    structure.dropdownElements.label = '.data-ellipsis'

    structure.dropdownElements.open_button = open_button || '.select__value'

    structure.dropdownElements.options =
      options || '.select__body .select__item'

    structure.dropdownElements.option_name = option_name || ''

    return structure
  },
  generateCheckboxGroup: function(root, checkbox, name, icon) {
    const structure = { root, elements: {} }

    structure.elements.checkbox = checkbox ? 'svg[class]' : ''

    structure.elements.name = name || ''

    structure.elements.icon = icon ? 'svg:not([class])' : ''

    return structure
  }
}
