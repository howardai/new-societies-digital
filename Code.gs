//2645 lines of code AUG 2020
//1005 lines from Dec 21 2020 cleanup!

const ui = SpreadsheetApp.getUi();
const ss = SpreadsheetApp.getActiveSpreadsheet();

class Division {
  constructor(name, abbrev, scorerange){
    this.name = name;
    this.abbrev = abbrev;
    this.sheet = ss.getSheetByName(name);
//    Division's own score on their own board
//    arg for reset board & score check
    this.score = scorerange;
    
    this.Capacity = this.sheet.getRange('C2')
    this.Actions = this.sheet.getRange('A2')
    this.Open = this.sheet.getRange('G2')
    this.Extra = this.sheet.getRange('E2')
    this.Victory = this.sheet.getRange('F49')
    this.Highcap = this.sheet.getRange('F47')
    
    this.titleboard = this.sheet.getRange('H20')
    this.msgboard = this.sheet.getRange('H23')
  }  
  
  //  any number of arguments (...)
  getRange(...range) {
    return this.sheet.getRange(...range)
  }
  
  acquiredReveal() {
    var GLAheader = []
    var GLAvalue = []
    for (var i=1; i < 26; i++){
      
      let acqRange = this.sheet.getRange("3",i);
      let HLRange = this.sheet.getRange("5",i);
      let acqRange2 = this.sheet.getRange("8",i);
      let HLRange2 = this.sheet.getRange("6",i);
      if (acqRange.isBlank() == false) {
        HLRange.clearFormat()
        var p = acqRange.getValue()
        var abbrev = new Abbrev(p)
        // if it isn't local acquistion
        if (abbrev.GLADest != null){
          var HLvalue = HLRange.getValue()
          if (HLvalue !== 'X'){
            GLAheader.push(abbrev)
            GLAvalue.push(HLRange.getValue())
          } else {
            GLAheader.push(abbrev)
            GLAvalue.push(2)
          }
          HLRange.clear()
        }
      }
      if (acqRange2.isBlank() == false) {
        HLRange2.clearFormat()
        var p2 = acqRange2.getValue()
        var abbrev2 = new Abbrev(p2)
        // if it isn't local acquistion
        if (abbrev2.GLADest != null){
          var HLvalue2 = HLRange2.getValue()
          if (HLvalue2 !== 'X'){
            GLAheader.push(abbrev2)
            GLAvalue.push(HLRange2.getValue())
          } else {
            GLAheader.push(abbrev2)
            GLAvalue.push(2)
          }
          HLRange2.clear()
        }
      }  
    }
    
    for(i=0; i<GLAheader.length;i++){
      GLAsend(GLAheader[i], GLAvalue[i])
    }
  }
  
  demo() {
    var values = [['X', '3', '1', '2', 'X', '1']];
    //  Cell K3 - P3
    var HLrange = this.sheet.getRange("K5:P5");
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
  
  Reset() {
      var sheet = this.sheet
      var firstrowvalues = [[, , 12.0, , 6.0, , 18.0, , , , , , 0.0, 'Low', 5.0, 'Mid', 10.0, 'High', 15.0, 4.0, , , '2/4/6']]
      var firstrow =  sheet.getRange('A2:W2')
      firstrow.setValues(firstrowvalues)
      // globa value upper right
      sheet.getRange('AB2').setValue('0')
      // harvest line & acquired marker
      sheet.getRange('A3:Y3').clearContent()
      sheet.getRange('A5:Y6').clear()
      sheet.getRange('A8:Y8').clearContent()
      // clear general area.... not the input capacity or global capacity
      sheet.getRange('E10:V14').clearContent()
      // clear border in player's boxes
      sheet.getRange('E10:G12').setBorder(false, false, false, false, null, null)
      sheet.getRange('H10:J12').setBorder(false, false, false, false, null, null)
      sheet.getRange('K10:M12').setBorder(false, false, false, false, null, null)
      sheet.getRange('N10:P12').setBorder(false, false, false, false, null, null)
      sheet.getRange('Q10:S12').setBorder(false, false, false, false, null, null)
      sheet.getRange('T10:V12').setBorder(false, false, false, false, null, null)
      // advancement
      sheet.getRange('E15:V19').clearContent()
      sheet.getRange('Y15:Y19').clearContent()
      // change text in score marking ****DIFFERENT PER DIV*****
      sheet.getRange(this.score).setValue('Low') 
      // high capacity met to 0
      sheet.getRange('F47').setValue(0.0) 
      // GLA cells
      sheet.getRange('Z21:AC22').clearContent()
      sheet.getRange('Z21:AC22').setBorder(true, true, true, true, true, true)
      sheet.getRange('Z25:AC26').clearContent()
      sheet.getRange('Z25:AC26').setBorder(true, true, true, true, true, true)
      // default message in message board
      sheet.getRange('H20').setValue("MESSAGE BOARD")
      sheet.getRange('H23').setValue("Greetings division, any pressing information about your society will show up here, stay tuned for news!")
      // ****DIFFERENT PER DIV*****
      this.demo()
  }
  
  MsgSend(titlerange, msgrange) {
    var Central = ss.getSheetByName('Central')
    var title = Central.getRange(titlerange).getValue()
    var message = Central.getRange(msgrange).getValue()
    this.titleboard.setValue(title)
    this.msgboard.setValue(message)
  }
  
  //    capacityrange = range on Capacity sheet for division
  //    capacitycolumn = column #s on capacity sheet for division
  //    scorecell = cell on Central sheet with score
  //  rowtoadd = 2 or 19, depending on if div is on upper or lower level on capacity sheet
  newseason(capacityrange, capacitycolumn, scorecell, rowtoadd) {
    //  alert if capacity is empty (prevent accidental double click)
    if (this.Actions.getValue() == ''){
      SpreadsheetApp.getUi().alert('Please enter capacity!')
    } else {
      this.upCapacity(capacityrange, capacitycolumn, rowtoadd)
      this.scorecheck(scorecell)
      
      //  update landcost
      var landcostR = this.sheet.getRange('T2')
      var landcost = +landcostR.getValue()
      var newlandcostR = this.sheet.getRange('F45')
      var newlandcost = +newlandcostR.getValue()  
      if (landcost !== newlandcost){
        landcostR.setValue(newlandcost)
        SpreadsheetApp.getUi().alert('Your landcost has changed from '+landcost+' to '+newlandcost)
      }
      
      //  clear harvestline
      var line = this.sheet.getRange('A5:Y6')
      line.clear()
    }
  }



  upCapacity(capacityrange, capacitycolumn, rowtoadd) {  
    //  send capacity data to spreadsheet
    var capacity = this.Capacity.getValue()
    var row = CapacityTally(capacityrange, rowtoadd)
    var cells = ss.getSheetByName('Capacity').getRange(row, capacitycolumn, "1", "2")
    var values = [[this.Actions.getValue(),capacity]]
    cells.setValues(values)
    this.Actions.clearContent()
    // hitting highest threshold increases capacity by one
    var reserve = this.sheet.getRange("M2");
    var highthreshold = this.sheet.getRange("S2").getValue()
    if (reserve.getValue() >= highthreshold) {
      var highcap = this.Highcap.getValue()
      this.Capacity.setValue(capacity+1)
      this.Highcap.setValue(highcap+1)
      SpreadsheetApp.getUi().alert('Your capacity has changed from '+capacity+' to '+(capacity + +1)+'.')
    }
  }



  // is the only way to up capacity to meet high threshold?
  // if so, can I safely assume that Capacity will never meet the cap before victory point does?
  // then i wont check capacity as a condition to reach next level
  scorecheck(scorecell) {
    var score = Central.getRange(scorecell).getValue()
    var scoreindiv = this.sheet.getRange(this.score)
    if (score !== scoreindiv.getValue()){
      this.update(score)
      scoreindiv.setValue(score)
    }
  }

  update(score){
    var thresholdrange = this.sheet.getRange('N2:S2')
    var harvestrange = this.sheet.getRange('E2:H2')
    var values = this.sheet.getRange('N52:S52').getValues()
    var values2 = this.sheet.getRange('E52:H52').getValues()
    var values3 = this.sheet.getRange('C52').getValues()
    var capacity = this.Capacity.getValue()
    if (capacity < values3){
      var capacity = values3
      this.Capacity.setValue(values3)
    }
    thresholdrange.setValues(values)
    harvestrange.setValues(values2)
    SpreadsheetApp.getUi().alert(
      'Your score is now ' + score + '! Your capacity is now '+ capacity +
      ', with new values in Harvest Line, Extra Actions, and Reserve Thresholds!'
    )  
  }
  
  GLArequest() {
    var GLArequests = this.sheet.getRange("Z21:AC22")
    var reqval = GLArequests.getValues()
    GLArequestsort(reqval, GLArequests, this.abbrev, this.sheet)
  }
  
  Generate() {
    // Display a modal dialog box with custom HtmlService content.
    var htmlOutput = HtmlService.createTemplateFromFile('HL prompt 3.html')
    //    using Force Print Scriptlet in html to print html. Inline template string.
    var name = this.name
    htmlOutput.selectedcode = '<option selected="selected" value="'+name+'">'+name+'</option>'
    var html =  htmlOutput.evaluate().setWidth(300).setHeight(150);
    SpreadsheetApp.getUi().showModalDialog(html, 'Harvest Line Generator');
  }
  
  reserveok(){
    var reserve = this.sheet.getRange("M2");
    var reserveSum = reserve.getValue()
    var reserveline = this.sheet.getRange("I2:L2")
    var reservelineV = reserveline.getValues()
    var newsum = +reservelineV[0][0] + +reservelineV[0][1] + +reservelineV[0][2] + +reservelineV[0][3] 
    reserve.setValue(+reserveSum + +newsum)
    reserveline.clear().setBorder(true, true, true, true, true, true)
  }
}

const East = new Division('East', 'E', 'Z9')
const West = new Division('West', 'W','Z17')
const South = new Division('South', 'S','Z13')
const North = new Division('North', 'N','Z5')
const Southeast = new Division('Southeast', 'SE','AB9')
const Northwest = new Division('Northwest', 'NW','AB17')
const Southwest = new Division('Southwest', 'SW','AB13')
const Northeast = new Division('Northeast', 'NE','AB5')
const Central = new Division('Central', null, null)
const Capacity = new Division('Capacity', null, null)

// -----------------------------------------------------------

class Abbrev {
  constructor(abbreviation){
    this.name = abbreviation
    this.player = abbreviation.slice(0,1)
    this.div = abbreviation.slice(1)
  }
  
  get division(){
    switch (this.div){
      case "N":
        return "North";
        break;
      case "S":
        return "South";
        break;        
      case "E":
        return "East";
        break;    
      case "W":
        return "West";
        break;    
      case "NW":
        return "Northwest";
        break;
      case "SE":
        return "Southeast";
        break;        
      case "NE":
        return "Northeast";
        break;    
      case "SW":
        return "Southwest";
        break; 
      default:
        return null;
        break;
    }
  }
    
  get sheet(){
    return eval(this.division)
  } 
  
  //  destination cell for GLA harvest from acquired reveal
  get GLADest(){
    var sheet = this.sheet
    switch (this.player) {
      case "1":
        return sheet.getRange('G13')
        break;
      case "2":
        return sheet.getRange('J13')
        break;
      case "3":
        return sheet.getRange('M13')
        break;
      case "4":
        return sheet.getRange('P13')
        break;
      case "5":
       return sheet.getRange('S13')
        break;
      case "6":
        return sheet.getRange('V13')
        break;
      default:
        //local acquired instead of GLA
        return null
        break;
    }
  }
}