// DOM Elements
const eligibilityBtn = document.getElementById('eligibilityBtn');
const eligibilityForm = document.getElementById('eligibilityForm');
const formProgress = document.getElementById('formProgress');
const progressText = document.getElementById('progressText');
const formResults = document.getElementById('formResults');
const faqItems = document.querySelectorAll('.faq-item');

// Affiliate links for traffic splitting
const affiliateLinks = {
    original: 'https://rewarrdsgiant.com/aff_c?offer_id=2343&aff_id=145517',
    new: 'https://rewarrdsgiant.com/aff_c?offer_id=2499&aff_id=145517'
};

// Event Listeners
// Add click handler to implement 50/50 traffic split
eligibilityBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Randomly choose between original and new link (90/10 split)
    const randomValue = Math.random();
    const targetLink = randomValue < 0.9 ? affiliateLinks.original : affiliateLinks.new;
    
    // Redirect to the selected link
    window.location.href = targetLink;
});

// FAQ Toggle
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form Navigation Functions
function nextQuestion(currentQuestionNum) {
    // Validate that an option is selected
    const currentQuestion = document.getElementById(`question${currentQuestionNum}`);
    const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');
    
    if (!selectedOption) {
        alert('Please select an option to continue.');
        return;
    }
    
    // Hide current question
    currentQuestion.classList.remove('active');
    
    // Show next question
    const nextQuestionNum = currentQuestionNum + 1;
    const nextQuestion = document.getElementById(`question${nextQuestionNum}`);
    nextQuestion.classList.add('active');
    
    // Update progress
    updateProgress(nextQuestionNum);
}

function prevQuestion(currentQuestionNum) {
    // Hide current question
    const currentQuestion = document.getElementById(`question${currentQuestionNum}`);
    currentQuestion.classList.remove('active');
    
    // Show previous question
    const prevQuestionNum = currentQuestionNum - 1;
    const prevQuestion = document.getElementById(`question${prevQuestionNum}`);
    prevQuestion.classList.add('active');
    
    // Update progress
    updateProgress(prevQuestionNum);
}

function updateProgress(questionNum) {
    const totalQuestions = 3;
    const progressPercentage = (questionNum / totalQuestions) * 100;
    
    formProgress.style.width = `${progressPercentage}%`;
    progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
}

function submitForm() {
    // Validate that an option is selected
    const currentQuestion = document.getElementById('question3');
    const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');
    
    if (!selectedOption) {
        alert('Please select an option to continue.');
        return;
    }
    
    // Hide form questions
    document.getElementById('quizForm').style.display = 'none';
    
    // Show results
    formResults.style.display = 'block';
    
    // Update progress to 100%
    formProgress.style.width = '100%';
    progressText.textContent = '100% Complete';
    
    // Scroll to results
    formResults.scrollIntoView({ behavior: 'smooth' });
}

// Add current year to footer copyright
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${currentYear} Stimulus Assistance Portal. All rights reserved.`;
    }
    
    // Initialize the first FAQ item as open
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});
