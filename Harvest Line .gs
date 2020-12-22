function GenerateSouth() {
    South.Generate()
  }
  
  function GenerateEast() {
    East.Generate()
  }
  
  function GenerateWest() {
    West.Generate()
  }
  
  function GenerateNorth() {
    North.Generate()
  }
  
  function GenerateSoutheast() {
    Southeast.Generate()
  }
  
  function GenerateSouthwest() {
    Southwest.Generate()
  }
  
  function GenerateNortheast() {
    Northeast.Generate()
  }
  
  function GenerateNorthwest() {
    Northwest.Generate()
  }
  
  //-----------------------------------------------------------
  
  function HLSubmit(division, harvest) {
    var sheet = ss.getSheetByName(division);
    var sheetdata = sheet.getRange('F54:F58').getValues()
    var score = sheetdata[0][0]
  
    var additional = sheetdata[2]
    var subx = sheetdata[3]
    var gla = sheetdata[4]
    
    // GLA box has 'x' in it
    if (gla != ''){
      var tetrapod = sheetdata[1]
    } else {
      var tetrapod = null
      }
  
    switch(score) {
      case "Low":
        var size = 18
        break;
      case "Mid-Low":
        var size = 25
        break;
      case "Mid":
        var size = 34
        break;
      case "Mid-High":
        var size = 42
        break;
      case "High":
        var size = 50
        break;
      default:
        var size = null
      }
    
    if (size == null || harvest == null) {
      var HLbutton = ui.alert('Please select Harvest size', ui.ButtonSet.OK)
      if (HLbutton == ui.Button.OK) {
        startHLSetuptest();
      }} else {
        // This will close the window
        var output = HtmlService
        .createHtmlOutput('<input type="button" value="OK!" onclick="google.script.host.close()" />')
        .setWidth(100)
        .setHeight(50);
        SpreadsheetApp.getUi().showModalDialog(output, 'Harvesting.....');
  
        if (size<26){
          setnumV(generateHL(size, harvest, tetrapod, additional, subx), size, sheet);
        } else {
          setnumV2(generateHL(size, harvest, tetrapod, additional, subx), size, sheet);
        }
    }
  }
  
  function generateHL(size, harvest, tetrapod, additional, subx){
    //  check additional 1's first, C level minus additional 1's, then additional X's, then reserve, then 2 contams, then fill the rest with 1's
    //  gotta check each line of the code whether we've reached the size of the harvest line
    //  so it's a lot of if conditions , one for every action
    //  probably a more efficient way of doing it but it's the day before opening and i'm hungry
    let harvestLine = [];
    //  if GLA is engaged
    //  subx will only have deduct Xs from C levels
    if (tetrapod != null){
      let numofcontam = Math.round(size*tetrapod) - subx
      for (i=0; i < numofcontam; i++){
        if (harvestLine.length >= size){
          break
        } else {
          harvestLine.push("X")
        }
      }
    }
    
    //  push "additional" x's
    for (i=0; i < additional; i++){
      if (harvestLine.length >= size){
        break
      } else {
        harvestLine.push("X")
      }
    }
  
    for (i=0; i < harvest; i++){
      //    each level gets one 3 and two 2's.
      if (harvestLine.length >= size){
        break
      } else {
        harvestLine.push("3")
        }
      if (harvestLine.length >= size){
        break
      } else {
        harvestLine.push("2")
        }
      if (harvestLine.length >= size){
        break
      } else {
        harvestLine.push("2")
        }
    }
    
    // everyone gets 2 contam
      if (harvestLine.length < size){
        harvestLine.push("X")
      }
      if (harvestLine.length < size){
        harvestLine.push("X")
      }   
    while (harvestLine.length < size){ 
      harvestLine.push("1")
    }
    shuffle(harvestLine)
    return harvestLine
  }
  
  
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
  
  // for harvest line over 25
  function setnumV2(harvestLine, HL, sheet){
    var values1 = [harvestLine.slice(0, 25)]
    var values2 = [harvestLine.slice(25, HL)];
    var row2 = (HL - 25);
    //  var range = sheet.getRange("2","1", "2", "25"); header
    var HLrange = sheet.getRange("5", "1", "1", "25");
    if (HL == '34') {
      var HLrange2 = sheet.getRange("6", "9", "1", row2)
    } else if (HL == '42') {
      var HLrange2 = sheet.getRange("6", "5", "1", row2)
    } else if (HL == '50'){
      var HLrange2 = sheet.getRange("6", "1", "1", row2)  
    }
    if (HLrange.isBlank() == false) {
      var output = HtmlService
        .createHtmlOutput('<input type="button" value="Restart" onclick="google.script.host.close()" />')
        .setWidth(100)
        .setHeight(50);
      SpreadsheetApp.getUi().showModalDialog(output, 'Please clear the Harvest Line first!');
    }
    else {
      HLrange.setValues(values1).setBackground("red").setFontColor("red");
      HLrange2.setValues(values2).setBackground("red").setFontColor("red");
    }
  }
  
  // for harvest line under 25
  function setnumV(harvestLine, HL, sheet){
    
    var values = [
      harvestLine
    ];
  
    if (HL == '18') {
      var HLrange = sheet.getRange("5", "5", "1", HL)
    } else if (HL == '25') {
      var HLrange = sheet.getRange("5", "1", "1", HL)
    }
    if (HLrange.isBlank() == false) {
      var output = HtmlService
        .createHtmlOutput('<input type="button" value="Restart" onclick="google.script.host.close()" />')
        .setWidth(100)
        .setHeight(50);
      SpreadsheetApp.getUi().showModalDialog(output, 'Please clear the Harvest Line first!');
    }
    else {
      HLrange.setValues(values).setBackground("red").setFontColor("red");
    }
  }