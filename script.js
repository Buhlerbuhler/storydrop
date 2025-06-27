const rollBtn = document.getElementById('rollBtn');
const diceContainer = document.getElementById('dice-container');

const NUM_DICE = 5;
const NUM_IMAGES = 51;

function getRandomDice(count, max) {
  const nums = Array.from({ length: max }, (_, i) => i + 1);
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return nums.slice(0, count);
}

function rollDice() {
  const currentDice = document.querySelectorAll('.die-img');

  // Animate old dice off-screen without flash
  currentDice.forEach((dieImg, i) => {
    // Hide instantly
    dieImg.style.opacity = '0';
    dieImg.style.transform = 'translateY(0)';

    // Trigger fall-away animation after a short delay
    setTimeout(() => {
      dieImg.classList.add('fall-away');
      dieImg.style.opacity = '';
      dieImg.style.transform = '';
    }, i * 100);
  });

  // Wait for all to animate out, then draw new dice
  setTimeout(() => {
    diceContainer.innerHTML = '';
    drawNewDice();
  }, 1200); // Adjust to match your fall-away animation time
}

function drawNewDice() {
  const selected = getRandomDice(NUM_DICE, NUM_IMAGES);

  selected.forEach((n) => {
    const die = document.createElement('div');
    die.className = 'die';

    const dieImg = document.createElement('div');
    dieImg.className = 'die-img'; // Starts off-screen and animates in

    const icon = document.createElement('img');
    icon.src = `dice-images/story_dice${n}.png`;

    dieImg.appendChild(icon);
    die.appendChild(dieImg);
    diceContainer.appendChild(die);
  });
}

// Initial roll and event binding
rollBtn.addEventListener('click', rollDice);
rollDice();

