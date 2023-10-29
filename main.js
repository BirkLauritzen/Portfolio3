// Making the whole page load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Defining variables
    let clicks = 0;
    let autoClickers = 0;
    let autoClickerPrice = 10;
    let autoClickerInterval;
    let multiplier = 1;
    let multiplierPrice = 100;
    let bakeries = 0;
    let bakeryPrice = 1000;
    let bakeryInterval;

    // Defining DOM elements
    const counterElement = document.getElementById('counter');
    const autoClickerCountElement = document.getElementById('autoClickerCount');
    const multiplierCountElement = document.getElementById('multiplierCount');
    const bakeryCountElement = document.getElementById('bakeryCount');
    const cookieElement = document.getElementById('cookie');

    // Function to increment the counter either manually or automatically based on the presence of auto-clickers,
    function increment(manual = false) {
        if (manual) {
            clicks += multiplier;
        } else {
            clicks += autoClickers * multiplier;
        }
        counterElement.innerHTML = clicks;
    }

    // Function that buys an auto-clicker and makes the counter go up every second
    function buyAutoClicker() {
        if (clicks >= autoClickerPrice) {
            clicks -= autoClickerPrice;
            autoClickers += 1;
            autoClickerPrice = Math.ceil(autoClickerPrice * 1.20);
            autoClickerCountElement.innerHTML = `Auto-Clickers: ${autoClickers}`;
            document.getElementById('buyAutoClicker').innerText = `Buy Auto-Clicker (${autoClickerPrice} cookies)`;
            if (autoClickers === 1) {
                autoClickerInterval = setInterval(() => increment(), 1000);
            }
        }
    }

    // Function that buys a multiplier and makes the counter go up at a faster rate
    function buyMultiplier() {
        if (clicks >= multiplierPrice) {
            clicks -= multiplierPrice;
            multiplier += 1;
            multiplierPrice = Math.ceil(multiplierPrice * 50);
            multiplierCountElement.innerHTML = `Multipliers: ${multiplier}`;
            document.getElementById('buyMultiplier').innerText = `Buy Multiplier (${multiplierPrice} cookies)`;
            counterElement.innerHTML = clicks;
        }
    }

    // Function that buys a bakery and makes the counter go up every 5 seconds
    function buyBakery() {
        if (clicks >= bakeryPrice) {
            clicks -= bakeryPrice;
            bakeries += 1;
            bakeryPrice = Math.ceil(bakeryPrice * 1.25);
            bakeryCountElement.innerHTML = `Bakeries: ${bakeries}`;
            document.getElementById('buyBakery').innerText = `Buy Bakery (${bakeryPrice} cookies)`;
            counterElement.innerHTML = clicks;
            if (bakeries === 1) {  // if this is the first bakery, start the bakery production interval
                bakeryInterval = setInterval(bakeryProduction, 5000);
            }
        }
    }

    // Function that increments the cookies by bakeries * 10 * multiplier every 5 seconds
    function bakeryProduction() {
        clicks += bakeries * 10 * multiplier;
        counterElement.innerHTML = clicks;
    }

    // Event listeners
    cookieElement.addEventListener('click', () => {
        increment(true);
        cookieElement.style.animation = 'none';
        setTimeout(() => {
            cookieElement.style.animation = '';
        }, 10);
    });
    document.getElementById('buyAutoClicker').addEventListener('click', buyAutoClicker);
    document.getElementById('buyMultiplier').addEventListener('click', buyMultiplier);
    document.getElementById('buyBakery').addEventListener('click', buyBakery);
});
