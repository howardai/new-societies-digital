function GLArequestEast() {
    East.GLArequest()
  }
  
  function GLArequestWest() {
    West.GLArequest()
  }
  
  function GLArequestSouth() {
    South.GLArequest()
  }
  
  function GLArequestNorth() {
    North.GLArequest()
  }
  
  function GLArequestSoutheast() {
    Southeast.GLArequest()
  }
  
  function GLArequestSouthwest() {
    Southwest.GLArequest()
  }
  
  function GLArequestNortheast() {
    Northeast.GLArequest()
  }
  
  function GLArequestNorthwest() {
    Northwest.GLArequest()
  }
  
  // ---------------------------------------------------------------
  
  function GLArequestsort(reqval, GLArequests, div, sheet) {
  
    // arrays to track failed GLA requests
    var newheader = []
    var newvalue = []
  
    // array within an array because getValues
    var arrayLength = reqval[0].length;
    for (var i = 0; i < arrayLength; i++) {
      //    check for upper & lower case
      var p = reqval[0][i].toUpperCase();
      try{
        var abbrev = new Abbrev(p)
        }
      catch(error){
        SpreadsheetApp.getUi().alert('Oops! "' + error)
        console.log(error)
      }
      var cell = GLAIteEmpty(abbrev.division)
      if (cell !== null){ 
        var id = abbrev.player + div
        var value = reqval[1][i]
        cell.setValues([[id],[value]])
        
        //  add onto sheet global tally
        var range = sheet.getRange("AB2")
        var GLAtally = range.getValue()
        range.setValue(GLAtally+ +1)  
        
      } else {
        newheader.push(p)
        newvalue.push(reqval[1][i])
      }
    }
    
    // fill up the lists to 4 values per array
    while (newheader.length < 4){
      newheader.push('')
      newvalue.push('')
    }
    
    // print it back to request
    var newlist = [newheader,newvalue]
    GLArequests.setValues(newlist) 
  }
  
  function GLAIteEmpty(division) {
    var sheet = ss.getSheetByName(division)
    if (sheet == null){
      return null
    }
    var range = sheet.getRange("Z25:AC26").getValues()
    var firstrow = range[0]
    var secondrow = range[1]
    
    //  find next empty cell
    if (firstrow[0] == "" && secondrow[0] == "") {
      var cell = sheet.getRange("Z25:Z26")}
    else if (firstrow[1] == "" && secondrow[1] == "") {
      var cell = sheet.getRange("AA25:AA26")}
    else if (firstrow[2] == "" && secondrow[2] == "") {
      var cell = sheet.getRange("AB25:AB26")}
    else if (firstrow[3] == "" && secondrow[3] == "") {
      var cell = sheet.getRange("AC25:AC26")}
    else {
      SpreadsheetApp.getUi().alert('Uh oh! All full at '+ division+' division')
      var cell = null
    }
    
    // return cell object to write into
    return cell
   }