// DOM Elements
const display = document.getElementById('digital');
const hourHand = document.getElementById('handhours');
const minuteHand = document.getElementById('handminutes');
const secondHand = document.getElementById('handseconds');
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const resetButton = document.getElementById('resetBtn');
const hourInput = document.getElementById('hours');
const minuteInput = document.getElementById('minutes');
const secondInput = document.getElementById('seconds');
const alarm = document.getElementById('alarmSound');
const tick = document.getElementById('tickSound');

// Timer variables
let timer;
let endTime;
let isRunning = false;
let lastTick = 0;

// Initialize sounds
alarm.load();
tick.load();

// Input validation
function validateInput(input, max) {
    let value = parseInt(input.value) || 0;
    value = Math.min(Math.max(0, value), max);
    input.value = value.toString().padStart(2, '0');
    return value;
}

// Add input event listeners
hourInput.addEventListener('input', () => validateInput(hourInput, 23));
minuteInput.addEventListener('input', () => validateInput(minuteInput, 59));
secondInput.addEventListener('input', () => validateInput(secondInput, 59));

// Handle increment/decrement events
function handleInputChange(input, max) {
    const value = validateInput(input, max);
    input.value = value.toString().padStart(2, '0');
}

hourInput.addEventListener('change', () => handleInputChange(hourInput, 23));
minuteInput.addEventListener('change', () => handleInputChange(minuteInput, 59));
secondInput.addEventListener('change', () => handleInputChange(secondInput, 59));

// Sound functions
function playTick() {
    tick.currentTime = 0;
    tick.play().catch(e => console.warn('Tick sound error:', e));
}

function playAlarm() {
    alarm.currentTime = 0;
    alarm.play().catch(e => console.warn('Alarm sound error:', e));
}

// Clock update function
function updateClock() {
    const now = Date.now();
    const timeLeft = endTime - now;
    
    // Convert to positive values for display
    const absTime = Math.abs(timeLeft);
    const hours = Math.floor(absTime / 3600000);
    const minutes = Math.floor((absTime % 3600000) / 60000);
    const seconds = Math.floor((absTime % 60000) / 1000);
    const milliseconds = absTime % 1000;
    
    // Update digital display
    const sign = timeLeft < 0 ? '-' : '';
    display.textContent = `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Handle countdown completion - play alarm exactly at 0
    if (timeLeft <= 0 && timeLeft > -500 && !display.classList.contains('warning')) {
        display.classList.add('warning');
        playAlarm();
    }

    // Play tick sound starting from -1 second onwards
    if (timeLeft <= -1000) { // Start at -1 second and continue
        const currentSecond = Math.floor(absTime / 1000);
        if (currentSecond !== lastTick) {
            playTick();
            lastTick = currentSecond;
        }
    }

    // Update analog clock with smooth movement
    // Calculate precise time values including milliseconds
    const totalHours = hours + (minutes / 60) + (seconds / 3600) + (milliseconds / 3600000);
    const totalMinutes = minutes + (seconds / 60) + (milliseconds / 60000);
    const totalSeconds = seconds + (milliseconds / 1000);
    
    // Hour hand: 30 degrees per hour (360 / 12)
    const hourRotation = (totalHours % 12) * 30;
    // Minute hand: 6 degrees per minute (360 / 60)
    const minuteRotation = totalMinutes * 6;
    // Second hand: 6 degrees per second (360 / 60)
    const secondRotation = totalSeconds * 6;

    hourHand.style.transform = `rotate(${hourRotation}deg)`;
    minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
    secondHand.style.transform = `rotate(${secondRotation}deg)`;
}

// Timer controls
function startTimer() {
    const hours = parseInt(hourInput.value) || 0;
    const minutes = parseInt(minuteInput.value) || 0;
    const seconds = parseInt(secondInput.value) || 0;
    
    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please set a time greater than zero!');
        return;
    }

    const totalMilliseconds = ((hours * 60 + minutes) * 60 + seconds) * 1000;
    endTime = Date.now() + totalMilliseconds;
    isRunning = true;
    lastTick = -1;
    
    display.classList.remove('warning');
    startButton.disabled = true;
    stopButton.disabled = false;
    
    // Clear existing timer
    if (timer) clearInterval(timer);
    
    // Start new timer with higher refresh rate for smoother animation
    updateClock();
    timer = setInterval(updateClock, 16); // ~60fps for smooth animation
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
    startButton.disabled = false;
    stopButton.disabled = true;
    tick.pause();
    tick.currentTime = 0;
}

function resetTimer() {
    stopTimer();
    display.classList.remove('warning');
    
    // Reset inputs
    hourInput.value = '00';
    minuteInput.value = '00';
    secondInput.value = '00';
    
    // Reset display
    display.textContent = '00:00:00';
    
    // Reset hands
    hourHand.style.transform = 'rotate(0deg)';
    minuteHand.style.transform = 'rotate(0deg)';
    secondHand.style.transform = 'rotate(0deg)';
    
    // Reset sounds
    alarm.pause();
    alarm.currentTime = 0;
    tick.pause();
    tick.currentTime = 0;
    lastTick = 0;
}

// Increment/Decrement functions
function incrementValue(inputId, max) {
    const input = document.getElementById(inputId);
    let value = parseInt(input.value) || 0;
    value = (value + 1) > max ? 0 : value + 1;
    input.value = value.toString().padStart(2, '0');
}

function decrementValue(inputId, max) {
    const input = document.getElementById(inputId);
    let value = parseInt(input.value) || 0;
    value = (value - 1) < 0 ? max : value - 1;
    input.value = value.toString().padStart(2, '0');
}

// Event listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);