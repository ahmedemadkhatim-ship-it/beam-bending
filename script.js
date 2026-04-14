function initDropdowns() {
    const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.parentElement;
            dropdown.classList.toggle('open');
        });
    });
}

function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initCalculator() {
    const calculateButton = document.getElementById('calculate');
    const copyResultButton = document.getElementById('copy-result');
    const resetButton = document.getElementById('reset');
    const resultArea = document.getElementById('result');

    if (!calculateButton || !resultArea) {
        return;
    }

    calculateButton.addEventListener('click', () => {
        const moment = parseFloat(document.getElementById('moment').value);
        const distance = parseFloat(document.getElementById('distance').value);
        const inertia = parseFloat(document.getElementById('inertia').value);
        const yieldStrength = parseFloat(document.getElementById('yield-strength').value);

        if (isNaN(moment) || isNaN(distance) || isNaN(inertia) || moment <= 0 || distance <= 0 || inertia <= 0) {
            resultArea.innerHTML = '<p class="error-message">Please enter positive values for M, y, and I.</p>';
            return;
        }

        const stress = (moment * distance) / inertia;
        let html = `<div class="result-summary"><p><strong>Bending stress</strong> = ${stress.toFixed(2)} MPa</p></div>`;

        if (!isNaN(yieldStrength) && yieldStrength > 0) {
            const safetyFactor = yieldStrength / stress;
            const status = safetyFactor >= 1.5 ? 'Safe design' : safetyFactor >= 1 ? 'Acceptable' : 'Review material limit';
            html += `<div class="result-details"><p><strong>Yield strength:</strong> ${yieldStrength.toFixed(2)} MPa</p>`;
            html += `<p><strong>Safety factor:</strong> ${safetyFactor.toFixed(2)}</p>`;
            html += `<p class="status ${status.replace(/\s+/g, '-').toLowerCase()}">${status}</p></div>`;
        } else {
            html += '<div class="result-details"><p>Enter yield strength to calculate the safety factor.</p></div>';
        }

        resultArea.innerHTML = html;
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            document.getElementById('moment').value = '';
            document.getElementById('distance').value = '';
            document.getElementById('inertia').value = '';
            document.getElementById('yield-strength').value = '';
            resultArea.innerHTML = '<p class="result-placeholder">Enter values to calculate beam stress.</p>';
        });
    }

    if (copyResultButton) {
        copyResultButton.addEventListener('click', () => {
            const resultText = resultArea.textContent.trim();
            if (!resultText) {
                alert('Please calculate before copying.');
                return;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(resultText).then(() => {
                    alert('Result copied to clipboard.');
                }).catch(() => {
                    alert('Copy failed.');
                });
            }
        });
    }
}

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (!tabButtons.length || !tabPanels.length) {
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        return;
    }
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        if (!name || !email) {
            alert('Please complete both name and email before sending.');
            return;
        }
        alert(`Thank you, ${name}. Your message has been submitted.`);
        contactForm.reset();
    });
}

function initScrollAnimations() {
    const sections = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));
}

function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;
    window.addEventListener('scroll', () => {
        button.style.display = window.pageYOffset > 400 ? 'grid' : 'none';
    });
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initPage() {
    initDropdowns();
    initMobileMenu();
    initSmoothScroll();
    initCalculator();
    initTabs();
    initContactForm();
    initScrollAnimations();
    initBackToTop();
}

document.addEventListener('DOMContentLoaded', initPage);
