class Dialog {
  constructor() {
    this.time = 3000
  }
  static title() {
    return 'xxx'
  }
  $show() {
    console.log('show')
  }
  $hide() {
    console.log('hide')
  }
}
module.exports = Dialog
