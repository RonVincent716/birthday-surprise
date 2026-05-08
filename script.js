// Get elements
const giftBox = document.getElementById('giftBox');
const surprisesContainer = document.getElementById('surprisesContainer');
const resetBtn = document.getElementById('resetBtn');

// Confetti emojis
const confettiEmojis = ['🎉', '🎊', '🎁', '🎈', '✨', '🌟', '💫', '🎀', '🎂', '🥳'];

// Create confetti
function createConfetti(x, y) {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        
        const randomX = (Math.random() - 0.5) * 400;
        const randomY = (Math.random() - 0.5) * 400;
        const duration = 2 + Math.random() * 1;
        const delay = Math.random() * 0.2;
        
        confetti.style.animation = `fall ${duration}s linear ${delay}s forwards`;
        confetti.style.transform = `translateX(${randomX}px) translateY(${randomY}px) rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
}

// Handle gift box click
giftBox.addEventListener('click', function() {
    // Get gift box position
    const rect = giftBox.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Create confetti
    createConfetti(x, y);
    createConfetti(x + 50, y - 30);
    createConfetti(x - 50, y + 30);
    
    // Show surprises
    surprisesContainer.classList.add('active');
    
    // Show reset button
    setTimeout(() => {
        resetBtn.classList.add('show');
    }, 400);
    
    // Play a subtle animation on gift box
    giftBox.style.animation = 'none';
    setTimeout(() => {
        giftBox.style.animation = 'bounce 0.6s ease-out';
    }, 10);
});

// Handle reset button
resetBtn.addEventListener('click', function() {
    surprisesContainer.classList.remove('active');
    resetBtn.classList.remove('show');
    
    // Reset gift box animation
    giftBox.style.animation = 'none';
});

// Add hover effect to surprise cards
document.querySelectorAll('.surprise-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Keyboard support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (surprisesContainer.classList.contains('active')) {
            resetBtn.click();
        } else {
            giftBox.click();
        }
    }
});
