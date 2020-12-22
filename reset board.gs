function SouthResetButton() {
    resetdialog('South')
    }
  
  function NorthResetButton() {
    resetdialog('North')
    }
  
  function EastResetButton() {
    resetdialog('East')
    }
  
  function WestResetButton() {
    resetdialog('West')
    }
  
  
  function SoutheastResetButton() {
    resetdialog('Southeast')
    }
  
  function SouthwestResetButton() {
    resetdialog('Southwest')
    }
  
  function NorthwestResetButton() {
    resetdialog('Northwest')
    }
  
  function NortheastResetButton() {
    resetdialog('Northeast')
    }
  
  
  // confirm dialog
  function resetdialog(division){
    var warningtext = ('Are you sure you want to reset the ' + division + ' division board?!')
    var ui = SpreadsheetApp.getUi();
    var response = ui.alert('Confirm', warningtext, ui.ButtonSet.YES_NO);
  
    if (response == ui.Button.YES) {
      //  using string as object name!
      eval(division).Reset()
    } else {
      SpreadsheetApp.getUi().alert('okay be careful next time');
    }
  }