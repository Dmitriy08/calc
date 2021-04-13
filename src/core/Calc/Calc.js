export default class Calc {
  constructor(selector) {
    this.calc = document.querySelector(selector)
    this.inputPrevState = this.calc.querySelector('#prev-state')
    this.inputCurrentState = this.calc.querySelector('#current-state')
    this.init()
  }

  init() {
    this.clear();
    this.eventHandler();
  }

  clear() {
    this.currentState = '0'
    this.prevState = ''
    this.operation = undefined
  }

  eventHandler() {
    this.calc.addEventListener('click', (event)=>{
      if (event.target.hasAttribute('data-num')) {
        this.appendNumber(event.target.getAttribute('data-num'))
        this.updateDisplay()
      } else if (event.target.hasAttribute('data-ops')) {
        this.chooseOperation(event.target.getAttribute('data-ops'))
        this.updateDisplay()
        console.log(event.target.getAttribute('data-ops'))
      } else if (event.target.hasAttribute('data-result')) {
        this.calculate()
        this.updateDisplay()
      } else if (event.target.hasAttribute('data-clear')) {
        this.clear()
        this.updateDisplay()
      }
    })
  }

  appendNumber(number) {
    if (number === '.' && this.currentState.includes('.')) return
    this.currentState = this.currentState + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentState === '') return
    if (this.prevState !== '') {
      this.calculate()
    }
    this.operation = operation
    this.prevState = this.currentState
    this.currentState = ''
  }

  calculate() {
    let result
    const prev = parseFloat(this.prevState)
    const current = parseFloat(this.currentState)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
        result = prev * current
        break
      case '/':
        // eslint-disable-next-line no-unused-vars
        result = prev / current
        break
      case '%':
        // eslint-disable-next-line no-unused-vars
        result = (prev / 100) * current
        break
      default:
        return
    }
    this.currentState = result
    this.operation = undefined
    this.prevState = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    console.log(integerDigits)
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits
          .toLocaleString('en', {maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.inputCurrentState.innerText =
          this.getDisplayNumber(this.currentState)
    if (this.operation != null) {
      this.inputPrevState.innerText =
              `${this.getDisplayNumber(this.prevState)} ${this.operation}`
    } else {
      this.inputPrevState.innerText = ''
    }
  }
}
