// If X, player still gets 2 in return

// ----------------------------- EAST --------------------------------------- //

function acquiredRevealEast() {
    East.acquiredReveal()
  }
  
  // ----------------------------- WEST --------------------------------------- //
  
  
  function acquiredRevealWest() {
    West.acquiredReveal()
  }
  
  
  // ----------------------------- SOUTH --------------------------------------- //
  
  
  function acquiredRevealSouth() {
    South.acquiredReveal()
  }
  
  
  // ----------------------------- NORTH --------------------------------------- //
  
  
  function acquiredRevealNorth() {
    North.acquiredReveal()
  }
  
  
  // ----------------------------- SOUTHEAST --------------------------------------- //
  
  
  function acquiredRevealSoutheast() {
    Southeast.acquiredReveal()
  }
  
  // ----------------------------- SOUTHWEST --------------------------------------- //
  
  
  function acquiredRevealSouthwest() {
    Southwest.acquiredReveal()
  }
  
  
  // ----------------------------- NORTHWEST --------------------------------------- //
  
  
  function acquiredRevealNorthwest() {
    Northwest.acquiredReveal()
  }
  
  
  // ----------------------------- NORTHEAST --------------------------------------- //
  
  
  function acquiredRevealNortheast() {
    Northeast.acquiredReveal()
  }
  
  // ----------------------------- GLA SEND FROM "REVEAL" -------------------------- //
  
  function GLAsend(abbrev, value) {
    var sheet = abbrev.sheet
    var cell = abbrev.GLADest
    var oldvalue = cell.getValue()
    cell.setValue(+value + +oldvalue)
  }