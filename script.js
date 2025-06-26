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
  diceContainer.innerHTML = '';

  const selected = getRandomDice(NUM_DICE, NUM_IMAGES);

  selected.forEach((n, i) => {
    const die = document.createElement('div');
    die.className = 'die';

    const dieImg = document.createElement('div');
    dieImg.className = 'die-img hidden'; // initially hidden

    const icon = document.createElement('img');
    icon.src = `dice-images/story_dice${n}.png`;

    dieImg.appendChild(icon);
    die.appendChild(dieImg);
    diceContainer.appendChild(die);

    // Delay showing the animation
setTimeout(() => {
  dieImg.classList.remove('hidden');
  dieImg.classList.add('fall');
  dieImg.style.animationDelay = `${i * 0.1}s`;  // add stagger here
}, 0);

  });
}

rollBtn.addEventListener('click', rollDice);
rollDice();
