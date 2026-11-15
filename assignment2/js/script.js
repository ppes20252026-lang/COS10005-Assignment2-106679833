// === 1. RESTAURANT DATA (used by recommendations, reservations and bill estimates) ===
const restaurants = [
    {
        "id": "darussalam",
        "name": "Darussalam Kitchen",
        "cuisine": "Malay & Indian",
        "price": 24,
        "deposit": 20,
        "diets": [
            "halal"
        ],
        "purposes": [
            "family",
            "business"
        ],
        "dishes": [
            {
                "name": "Chicken Biryani",
                "price": 22
            },
            {
                "name": "Roti & Curry Set",
                "price": 15
            }
        ]
    },
    {
        "id": "greenleaf",
        "name": "Green Leaf Table",
        "cuisine": "Plant-based",
        "price": 27,
        "deposit": 15,
        "diets": [
            "vegan"
        ],
        "purposes": [
            "family",
            "date"
        ],
        "dishes": [
            {
                "name": "Garden Power Bowl",
                "price": 26
            },
            {
                "name": "Mushroom Rice Plate",
                "price": 22
            }
        ]
    },
    {
        "id": "spiceroute",
        "name": "Spice Route Corner",
        "cuisine": "Indian",
        "price": 29,
        "deposit": 25,
        "diets": [
            "halal"
        ],
        "purposes": [
            "family",
            "business"
        ],
        "dishes": [
            {
                "name": "Tandoori Chicken",
                "price": 29
            },
            {
                "name": "Paneer Masala",
                "price": 24
            }
        ]
    },
    {
        "id": "napoli",
        "name": "Little Napoli",
        "cuisine": "Italian",
        "price": 62,
        "deposit": 30,
        "diets": [
            "vegan"
        ],
        "purposes": [
            "date",
            "family"
        ],
        "dishes": [
            {
                "name": "Margherita Pizza",
                "price": 39
            },
            {
                "name": "Tomato Basil Pasta",
                "price": 34
            }
        ]
    },
    {
        "id": "goldenwok",
        "name": "Golden Wok House",
        "cuisine": "Asian Fusion",
        "price": 28,
        "deposit": 20,
        "diets": [
            "halal"
        ],
        "purposes": [
            "family",
            "business"
        ],
        "dishes": [
            {
                "name": "Ginger Chicken Rice",
                "price": 26
            },
            {
                "name": "Vegetable Fried Noodles",
                "price": 22
            }
        ]
    },
    {
        "id": "skyline",
        "name": "Skyline Dining",
        "cuisine": "Modern International",
        "price": 105,
        "deposit": 50,
        "diets": [],
        "purposes": [
            "date",
            "business"
        ],
        "dishes": [
            {
                "name": "Grilled Sea Bass",
                "price": 78
            },
            {
                "name": "Herb Roast Chicken",
                "price": 65
            }
        ]
    }
];

// === 2. SMALL REUSABLE HELPERS ===
function byId(id) {
    return document.getElementById(id);
}

function emailIsValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function findRestaurant(id) {
    return restaurants.find(function (restaurant) {
        return restaurant.id === id;
    });
}

function showFieldError(fieldId, message) {
    const input = byId(fieldId);
    const error = byId(fieldId + 'Error');

    if (input && error) {
        error.textContent = message;
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
        input.setAttribute('aria-describedby', error.id);
    }
    return message === '';
}

function showMessage(element, message, isError) {
    element.hidden = !message;
    element.textContent = message;
    element.classList.toggle('error-message', Boolean(isError));
}

// === 3. RECOMMENDATION FORM ===
function initRecommendations() {
    const form = byId('recommendForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const diet = byId('diet').value;
        const budget = Number(byId('budget').value);
        const purpose = byId('purpose').value;
        const warning = byId('recommendError');

        if (!diet || !budget || !purpose) {
            showMessage(warning, 'Please choose a diet, budget and dining purpose.', true);
            byId('resultsSection').hidden = true;
            return;
        }
        showMessage(warning, '', false);

        // Dietary restrictions and budget are hard filters, not just ranking bonuses.
        const matches = restaurants.filter(function (restaurant) {
            const dietOK = diet === 'none' || restaurant.diets.includes(diet);
            const budgetOK = restaurant.price <= budget;
            return dietOK && budgetOK;
        });

        // Give higher scores to matches for the chosen dining purpose.
        // If scores tie, the lower average price is suggested first.
        matches.sort(function (a, b) {
            const scoreA = (a.purposes.includes(purpose) ? 4 : 0) + (budget - a.price) / budget;
            const scoreB = (b.purposes.includes(purpose) ? 4 : 0) + (budget - b.price) / budget;
            return scoreB - scoreA || a.price - b.price;
        });

        const results = byId('recommendResults');
        const summary = byId('resultsSummary');
        results.replaceChildren();
        byId('resultsSection').hidden = false;

        if (matches.length === 0) {
            summary.textContent = 'No exact matches were found. Try a larger budget or another dietary preference.';
            return;
        }

        const shown = Math.min(matches.length, 3);
        summary.textContent = matches.length + ' suitable restaurant(s) found. Showing ' +
            shown + ' best match' + (shown === 1 ? '' : 'es') + '.';
        matches.slice(0, 3).forEach(function (restaurant, index) {
            const card = document.createElement('article');
            card.className = 'match-card';

            const label = document.createElement('span');
            label.className = 'eyebrow';
            label.textContent = 'MATCH ' + (index + 1);

            const heading = document.createElement('h3');
            heading.textContent = restaurant.name;

            const details = document.createElement('p');
            details.textContent = restaurant.cuisine + ' • RM ' + restaurant.price +
                ' per person • RM ' + restaurant.deposit + ' deposit';

            // Show real example menu items from our own sample data (not just an average).
            const menu = document.createElement('p');
            menu.className = 'match-menu';
            menu.textContent = 'Menu: ' + restaurant.dishes.map(function (dish) {
                return dish.name + ' (RM ' + dish.price + ')';
            }).join(' • ');

            const reason = document.createElement('p');
            reason.className = 'match-reason';
            reason.textContent = restaurant.purposes.includes(purpose)
                ? 'Fits your budget, dietary choice and dining purpose.'
                : 'Fits your budget and dietary choice. The atmosphere may be less suited to your dining purpose.';

            const link = document.createElement('a');
            link.className = 'button button-small';
            link.href = 'reservation.html?restaurant=' + encodeURIComponent(restaurant.id);
            link.textContent = 'Reserve this restaurant';

            card.append(label, heading, details, menu, reason, link);
            results.appendChild(card);
        });
    });
}

// === 4. REGISTRATION FORM VALIDATION ===
function initRegistration() {
    const form = byId('registerForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // This form has no backend or database.
        let valid = true;
        let firstInvalid = null;

        function check(id, condition, message) {
            if (!showFieldError(id, condition ? '' : message)) {
                valid = false;
                if (!firstInvalid) firstInvalid = byId(id);
            }
        }

        const username = byId('username').value;
        const email = byId('regEmail').value.trim();
        const phone = byId('regPhone').value;
        const password = byId('password').value;
        const confirmed = byId('confirmPassword').value;

        check('username', /^[A-Za-z0-9_]{5,}$/.test(username),
            'Use at least 5 characters: letters, numbers or underscores only.');
        check('regEmail', emailIsValid(email), 'Enter a valid email address.');
        check('regPhone', /^\d{8,15}$/.test(phone), 'Enter 8 to 15 digits, without spaces or symbols.');
        check('password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{10,}$/.test(password),
            'Password needs 10+ characters, uppercase, lowercase, a number and a special character.');
        check('confirmPassword', confirmed !== '' && confirmed === password,
            'The confirmation password must match.');
        check('gender', Boolean(byId('gender').value), 'Please select a gender option.');
        check('regDiet', Boolean(byId('regDiet').value), 'Please select a dietary preference.');
        check('country', Boolean(byId('country').value), 'Please select a country or region.');

        const message = byId('registerMessage');
        if (valid) {
            showMessage(message, 'All fields passed validation. This is a front-end demo, so no account was created or saved.', false);
            form.reset();
        } else {
            showMessage(message, 'Please correct the highlighted fields above.', true);
            firstInvalid.focus();
        }
    });
}

// === 5. RESERVATION DEPOSIT AND CONDITIONAL PAYMENT FIELDS ===
function updateDeposit() {
    const select = byId('restaurantSelect');
    if (!select) return;

    const restaurant = findRestaurant(select.value);
    byId('deposit').value = restaurant ? restaurant.deposit.toFixed(2) : 'Select a restaurant';
    byId('selectedRestaurantLabel').textContent = restaurant ? restaurant.name : 'Not chosen';
    byId('selectedDepositLabel').textContent = restaurant ? 'RM ' + restaurant.deposit.toFixed(2) : 'RM 0';
}

function updatePaymentFields() {
    const chosen = document.querySelector('input[name="paymentMethod"]:checked');
    const isVoucher = chosen && chosen.value === 'voucher';
    const isOnline = chosen && chosen.value === 'online';

    byId('voucherFields').hidden = !isVoucher;
    byId('cardFields').hidden = !isOnline;
    byId('voucherCode').disabled = !isVoucher;
    byId('cardType').disabled = !isOnline;
    byId('cardNumber').disabled = !isOnline;
    byId('voucherCode').required = Boolean(isVoucher);
    byId('cardType').required = Boolean(isOnline);
    byId('cardNumber').required = Boolean(isOnline);

    if (!isVoucher) {
        byId('voucherCode').value = '';
        showFieldError('voucherCode', '');
    }
    if (!isOnline) {
        byId('cardType').value = '';
        byId('cardNumber').value = '';
        showFieldError('cardType', '');
        showFieldError('cardNumber', '');
    }
}

function updateBillingEmail() {
    if (byId('sameEmail').checked) {
        byId('billingEmail').value = byId('resEmail').value;
        byId('billingEmail').readOnly = true;
    } else {
        byId('billingEmail').readOnly = false;
    }
}

function futureDateTime(value) {
    if (!value) return false;
    const selected = new Date(value);
    return !Number.isNaN(selected.getTime()) && selected.getTime() > Date.now();
}

function setMinimumReservationDate() {
    // datetime-local uses local time (not UTC), so correct the timezone offset.
    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    byId('reservationDate').min = localTime.toISOString().slice(0, 16);
}

function initReservation() {
    const form = byId('reservationForm');
    if (!form) return;

    const selectedId = new URLSearchParams(window.location.search).get('restaurant');
    if (selectedId && findRestaurant(selectedId)) {
        byId('restaurantSelect').value = selectedId;
    }
    updateDeposit();
    setMinimumReservationDate();
    byId('restaurantSelect').addEventListener('change', updateDeposit);
    byId('resEmail').addEventListener('input', updateBillingEmail);
    byId('sameEmail').addEventListener('change', updateBillingEmail);
    document.querySelectorAll('input[name="paymentMethod"]').forEach(function (radio) {
        radio.addEventListener('change', updatePaymentFields);
    });
    updatePaymentFields();

    form.addEventListener('submit', function (event) {
        let valid = true;
        let firstInvalid = null;
        function check(id, condition, message) {
            if (!showFieldError(id, condition ? '' : message)) {
                valid = false;
                if (!firstInvalid) firstInvalid = byId(id);
            }
        }

        setMinimumReservationDate();
        check('fullName', byId('fullName').value.trim().length > 0, 'Please enter your full name.');
        check('resEmail', emailIsValid(byId('resEmail').value.trim()), 'Enter a valid contact email.');
        check('resPhone', /^\d{10,}$/.test(byId('resPhone').value.trim()), 'Enter at least 10 digits.');
        check('restaurantSelect', Boolean(findRestaurant(byId('restaurantSelect').value)), 'Choose a restaurant.');
        check('reservationDate', futureDateTime(byId('reservationDate').value), 'Choose a future date and time.');

        const people = Number(byId('people').value);
        check('people', Number.isInteger(people) && people > 0, 'Enter a whole number greater than zero.');

        const method = document.querySelector('input[name="paymentMethod"]:checked');
        byId('paymentMethodError').textContent = method ? '' : 'Please choose a deposit method.';
        if (!method) valid = false;

        if (method && method.value === 'voucher') {
            check('voucherCode', /^\d{12}$/.test(byId('voucherCode').value.trim()),
                'Enter a 12-digit voucher code (format check only).');
        } else if (method && method.value === 'online') {
            const cardType = byId('cardType').value;
            check('cardType', Boolean(cardType), 'Please select the card type.');
            const length = cardType === 'amex' ? 15 : 16;
            check('cardNumber', Boolean(cardType) && new RegExp('^\\d{' + length + '}$').test(byId('cardNumber').value.trim()),
                'Enter ' + length + ' digits for the selected card type (fake details only).');
        }

        check('billingEmail', emailIsValid(byId('billingEmail').value.trim()), 'Enter a valid billing email.');

        if (!valid) {
            event.preventDefault();
            showMessage(byId('reservationMessage'), 'Please correct the highlighted errors before continuing.', true);
            if (firstInvalid) firstInvalid.focus();
        } else {
            // Intentionally do not prevent default: the specification requires a POST to Mercury.
            // Never use a real card number because this is a student test endpoint over HTTP.
            showMessage(byId('reservationMessage'), '', false);
        }
    });
}

// === 6. OPTIONAL ESTIMATED BILL CALCULATOR ===
function calculateBill() {
    const restaurant = findRestaurant(byId('billRestaurant').value);
    const people = Number(byId('billPeople').value);
    const validPeople = Number.isInteger(people) && people >= 1 && people <= 50;
    const isValid = Boolean(restaurant) && validPeople;
    const warning = byId('billError');

    if (!isValid) {
        showMessage(warning, 'Choose a restaurant and a group size from 1 to 50.', true);
    } else {
        showMessage(warning, '', false);
    }

    const food = isValid ? restaurant.price * people : 0;
    const extrasPerPerson = (byId('addDrink').checked ? 8 : 0) + (byId('addDessert').checked ? 12 : 0);
    const extras = isValid ? extrasPerPerson * people : 0;
    const total = food + extras;
    const deposit = isValid ? restaurant.deposit : 0;

    byId('billFood').textContent = formatRM(food);
    byId('billExtras').textContent = formatRM(extras);
    byId('billTotal').textContent = formatRM(total);
    byId('billDeposit').textContent = formatRM(deposit);
    byId('billBalance').textContent = formatRM(Math.max(total - deposit, 0));
    byId('billReserveLink').href = restaurant
        ? 'reservation.html?restaurant=' + encodeURIComponent(restaurant.id)
        : 'reservation.html';
}

function formatRM(amount) {
    return 'RM ' + amount.toFixed(2);
}

function initBillCalculator() {
    const form = byId('billForm');
    if (!form) return;

    const selectedId = new URLSearchParams(window.location.search).get('restaurant');
    if (selectedId && findRestaurant(selectedId)) byId('billRestaurant').value = selectedId;
    form.addEventListener('submit', function (event) { event.preventDefault(); });
    ['billRestaurant', 'billPeople', 'addDrink', 'addDessert'].forEach(function (id) {
        byId(id).addEventListener('change', calculateBill);
        byId(id).addEventListener('input', calculateBill);
    });
    calculateBill();
}

// === 7. HOMEPAGE IMAGE SLIDER ===
function initHeroSlider() {
    const hero = document.querySelector('.hero-home');
    if (!hero) return; // Only the homepage has the image slider.

    const slides = Array.from(hero.querySelectorAll('.hero-slide'));
    const dots = Array.from(hero.querySelectorAll('.hero-dot'));
    if (slides.length !== 3 || dots.length !== slides.length) return;

    let currentSlide = 0;
    let timer;

    function showSlide(index) {
        currentSlide = index;
        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-active', i === index);
        });
        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === index);
            dot.setAttribute('aria-pressed', i === index ? 'true' : 'false');
        });
    }

    function pauseSlides() {
        if (timer) window.clearInterval(timer);
    }

    function startSlides() {
        pauseSlides();
        // Respect reduced-motion settings: dots still work manually.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        timer = window.setInterval(function () {
            showSlide((currentSlide + 1) % slides.length);
        }, 6500);
    }

    dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            showSlide(index);
            startSlides();
        });
    });
    hero.addEventListener('mouseenter', pauseSlides);
    hero.addEventListener('mouseleave', startSlides);
    hero.addEventListener('focusin', pauseSlides);
    hero.addEventListener('focusout', function (event) {
        if (!hero.contains(event.relatedTarget)) startSlides();
    });
    startSlides();
}

// === 8. START FEATURES ONLY ON THE PAGE THAT NEEDS THEM ===
initRecommendations();
initRegistration();
initReservation();
initBillCalculator();

initHeroSlider();
