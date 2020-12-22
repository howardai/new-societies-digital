// const -> once code starts, value cant change
// var -> value only evaluated when we get to that line of code
// so if we expect value to change during the code, define var in code instead of using const

// not being used.... just for my reference
//const Nscore = Central.getRange('B2')
//const NEscore = Central.getRange('B3')
//const Escore = Central.getRange('B4')
//const SEscore = Central.getRange('B5')
//const Sscore = Central.getRange('B6')
//const SWscore = Central.getRange('B7')
//const Wscore = Central.getRange('B8')
//const NWscore = Central.getRange('B9')

//1) capacity data to spreadsheet
//2) high threshold up capacity by one. alert.
//3) also ups the victory point by on
//4) check score marking on central, update division sheet
//5) update threshold
//5) if low, check victory point
//6) if 6, new level
//6.5) if capacity is higher or equals to 18, no chagne
//6.6) if capacity is under 18, change to 18
//7) set extra action to 8
//8) set open slot to 25
//9) set text to midlow
//10) if landcost different, update. alert.
//11) alert.
//12) clear harvestline

// ------------------------- EAST----------------------------------//

function newseasonEast() {
    East.newseason('E2:F15', '5', 'B4', 2)
  }
  
  // ------------------------- WEST----------------------------------//
  
  function newseasonWest() {
    West.newseason('K2:L15', '11', 'B8', 2)
  }
  
  
  // ------------------------- SOUTH ----------------------------------//
  
  function newseasonSouth() {
    South.newseason('H2:I15', '8', 'B6', 2)
  }
  
  
  // ------------------------- NORTH ----------------------------------//
  
  function newseasonNorth() {
    North.newseason('B2:C15', '2', 'B2', 2)
  }
  
  
  // ------------------------- SOUTHEAST ----------------------------------//
  
  function newseasonSoutheast() {
      Southeast.newseason('E19:F32', '5', 'B5', 19)
  }
  
  
  // ------------------------- SOUTHWEST ----------------------------------//
  
  function newseasonSouthwest() {
       Southwest.newseason('H19:I32', '8', 'B7', 19)
  }
  
  
  // ------------------------- NORTHWEST ----------------------------------//
  
  function newseasonNorthwest() {
         Northwest.newseason('K19:L32', '11', 'B9', 19)
  }
  
  
  // ------------------------- NORTHEAST ----------------------------------//
  
  function newseasonNortheast() {
    Northeast.newseason('B19:C32', '2', 'B3', 19) 
  }
  
  
  // ------------------------ CAPACITY TALLY -----------------------------//
  
  function CapacityTally(range, rowtoadd) {
    var cap = ss.getSheetByName('Capacity').getRange(range).getValues()
    for (i = 0; i < cap.length; i++){
      if (cap[i][0] == '') {
  //      return row number of first emptyo row
        return (i + +rowtoadd)
  //    rowtoadd = 2 for top level and 19 for bottom level
        break
      }
    }
  }