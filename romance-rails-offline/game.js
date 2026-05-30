// Initialize gropeLevel in localStorage if it doesn't exist
if (localStorage.getItem('gropeLevel') === null) {
    localStorage.setItem('gropeLevel', '0');
}

// Function to update the grope level display
function updateGropeLevel() {
  const gropeLevel = localStorage.getItem('gropeLevel');
  const gropeLevelAmountElement = document.getElementById('grope-level-amount');
  if (gropeLevelAmountElement) {
    gropeLevelAmountElement.textContent = gropeLevel;
  }
}

// Function to increment gropeLevel
function incrementGropeLevel() {
  let gropeLevel = localStorage.getItem('gropeLevel') ? parseInt(localStorage.getItem('gropeLevel')) : 0;
  gropeLevel++;
  localStorage.setItem('gropeLevel', gropeLevel);
  console.log(`Grope level: ${gropeLevel}`);
}

// Function to check for thresholds and unlock content
function checkGropeLevel() {
  let gropeLevel = localStorage.getItem('gropeLevel') ? parseInt(localStorage.getItem('gropeLevel')) : 0;
  // Example threshold
  if (gropeLevel >= 5) {
    console.log("Congratulations! You've reached a new level of depravity.");
    // Unlock new content here
  }
}

// Function to be called when a special video is played
function onSpecialVideoPlay() {
  incrementGropeLevel();
  checkGropeLevel();
  updateGropeLevel();
}
