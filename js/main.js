/**
 * Mason Oaks HOA Website JavaScript
 */

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    var backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize OpenStreetMap if map container exists
    initializeMap();
});

// Initialize OpenStreetMap
function initializeMap() {
    var mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Wake Forest, NC coordinates
    var wakeForestCoordinates = [35.9799, -78.5097];
    
    // Create the map
    var map = L.map('map').setView(wakeForestCoordinates, 14);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add Mason Oaks marker
    var masonOaksCoordinates = [35.9799, -78.5097]; // Replace with actual coordinates
    var masonOaksMarker = L.marker(masonOaksCoordinates).addTo(map);
    masonOaksMarker.bindPopup('<strong>Mason Oaks Community</strong>').openPopup();
    
    // Add points of interest
    var pointsOfInterest = [
        {
            name: 'Downtown Wake Forest',
            coords: [35.9784, -78.5097],
            type: 'shopping'
        },
        {
            name: 'Harris Teeter',
            coords: [35.9699, -78.5197],
            type: 'grocery'
        },
        {
            name: 'Wake Forest Crossing',
            coords: [35.9599, -78.5297],
            type: 'shopping'
        },
        {
            name: 'The Factory',
            coords: [35.9899, -78.5397],
            type: 'recreation'
        },
        {
            name: 'E. Carroll Joyner Park',
            coords: [35.9699, -78.5597],
            type: 'park'
        }
    ];
    
    // Create icons for different types of POIs
    var icons = {
        shopping: L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        grocery: L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        recreation: L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        park: L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        })
    };
    
    // Add all POIs to map
    pointsOfInterest.forEach(function(poi) {
        var marker = L.marker(poi.coords, {icon: icons[poi.type]}).addTo(map);
        marker.bindPopup('<strong>' + poi.name + '</strong>');
    });
}

// Form validation for contact form
function validateContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return true;
    
    var name = form.querySelector('#name').value;
    var email = form.querySelector('#email').value;
    var message = form.querySelector('#message').value;
    var errorMessage = document.getElementById('formErrorMessage');
    
    if (!name || !email || !message) {
        errorMessage.textContent = 'Please fill out all fields';
        errorMessage.style.display = 'block';
        return false;
    }
    
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address';
        errorMessage.style.display = 'block';
        return false;
    }
    
    errorMessage.style.display = 'none';
    return true;
}

// Function to toggle FAQ answers
function toggleFaqItem(element) {
    var currentItem = element.parentElement;
    var isOpen = currentItem.classList.contains('active');
    
    // Close all items
    document.querySelectorAll('.faq-item').forEach(function(item) {
        item.classList.remove('active');
        var answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = '0px';
        }
    });
    
    // Open clicked item if it was closed
    if (!isOpen) {
        currentItem.classList.add('active');
        var answer = currentItem.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    }
}