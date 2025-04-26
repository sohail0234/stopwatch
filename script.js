document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const lapBtn = document.getElementById('lapBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapsList = document.getElementById('lapsList');
    
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;

    function formatTime(ms) {
        let date = new Date(ms);
        let hours = date.getUTCHours().toString().padStart(2, '0');
        let minutes = date.getUTCMinutes().toString().padStart(2, '0');
        let seconds = date.getUTCSeconds().toString().padStart(2, '0');
        let milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    function startTimer() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(function() {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            isRunning = true;
            toggleButtons(true);
        }
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            toggleButtons(false);
            // Change pause button to red when clicked
            pauseBtn.classList.add('active');
            setTimeout(() => {
                pauseBtn.classList.remove('active');
            }, 200);
        }
    }

    function recordLap() {
        if (isRunning || elapsedTime > 0) {
            lapCount++;
            const lapItem = document.createElement('li');
            lapItem.innerHTML = `
                <span class="lap-number">Lap ${lapCount}</span>
                <span class="lap-time">${formatTime(elapsedTime)}</span>
            `;
            lapsList.prepend(lapItem);
            
            // Flash lap button when clicked
            lapBtn.classList.add('active');
            setTimeout(() => {
                lapBtn.classList.remove('active');
            }, 200);
        }
    }

    function resetTimer() {
        pauseTimer();
        elapsedTime = 0;
        lapCount = 0;
        updateDisplay();
        lapsList.innerHTML = '';
        
        // Flash reset button when clicked
        resetBtn.classList.add('active');
        setTimeout(() => {
            resetBtn.classList.remove('active');
        }, 200);
    }

    function toggleButtons(running) {
        startBtn.style.display = running ? 'none' : 'block';
        pauseBtn.style.display = running ? 'block' : 'none';
    }

    // Event listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    lapBtn.addEventListener('click', recordLap);
    resetBtn.addEventListener('click', resetTimer);

    // Initialize
    toggleButtons(false);
    updateDisplay();
});
