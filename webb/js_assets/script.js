/* ==========================================================================
   KKK 4x4 World - Main JavaScript
   ==========================================================================
   Purpose: Client-side interactivity shared across all pages.
   Features:
     1. Mobile hamburger menu toggle
     2. Active page highlighting in the navigation
     3. "Add to Cart" visual feedback on the Shop page
     4. Contact form validation
     5. Enquiry form validation
     6. Smooth scrolling for hero CTA buttons
   Dependencies: None (vanilla JS). Loaded after the DOM via <script> at the
                 bottom of each HTML page.
   References:
     - Used by: index.html, shop.html, about.html, contact.html,
                services.html, enquiries.html
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // -----------------------------
    // 1. Hamburger Menu Toggle
    // -----------------------------
    // Shows/hides the .nav-links list on mobile when the hamburger button is clicked.
    // Also closes the menu automatically after a link is selected.
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('show');
        });

        // Close menu when a nav link is clicked (mobile)
        const links = navLinks.querySelectorAll('a');
        links.forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('show');
            });
        });
    }

    // -----------------------------
    // 2. Highlight Active Page in Nav
    // -----------------------------
    // Reads the current filename from the URL and applies a white underline
    // style to the matching navigation link.
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(function (item) {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.style.color = '#ffffff';
            item.style.borderBottom = '2px solid #ffffff';
            item.style.paddingBottom = '2px';
        }
    });

    // -----------------------------
    // 3. Add to Cart Buttons (Shop)
    // -----------------------------
    // Temporary front-end feedback only. Logs the product name to the console.
    // Replace with real cart / backend logic when ready.
    const cartButtons = document.querySelectorAll('.product-card button');

    cartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const productName = this.parentElement.querySelector('h3').textContent;

            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = '#28a745';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '#ff6f00';
            }, 1500);

            // Simple console log (can be replaced with real cart later)
            console.log(productName + ' added to cart');
        });
    });

    // -----------------------------
    // 4. Contact Form Validation
    // -----------------------------
    // Prevents default submit, checks required fields and basic email format,
    // then shows a success alert and resets the form.
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            // Basic email check
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Thank you, ' + name + '! Your message has been sent.');
            contactForm.reset();
        });
    }

    // -----------------------------
    // 5. Enquiry Form Validation
    // -----------------------------
    // Same pattern as the contact form – validates all required fields
    // before showing a confirmation message.
    const enquiryForm = document.querySelector('.enquiry-form form');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const fullname = document.getElementById('fullname').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const vehicle = document.getElementById('vehicle-make').value.trim();
            const enquiryType = document.getElementById('enquiry-type').value;
            const details = document.getElementById('details').value.trim();

            if (fullname === '' || phone === '' || vehicle === '' || enquiryType === '' || details === '') {
                alert('Please complete all fields in the enquiry form.');
                return;
            }

            alert('Thank you, ' + fullname + '! Your enquiry has been submitted. Our team will contact you soon.');
            enquiryForm.reset();
        });
    }

    // -----------------------------
    // 6. Smooth scroll for hero buttons
    // -----------------------------
    // Intercepts clicks on .hero-btn that point to a hash (#products etc.)
    // and scrolls smoothly to the target section.
    const heroButtons = document.querySelectorAll('.hero-btn');
    heroButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

});