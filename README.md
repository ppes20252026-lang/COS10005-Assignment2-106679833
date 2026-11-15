# DineLocal — Restaurant Discovery & Reservation Website

**COS10005 Web Development | Assignment 2 | August 2026**


**Student:** Md Jahin Sadik  
**Student ID:** 106679833  
**GitHub repository:** https://github.com/ppes20252026-lang/COS10005-Assignment2-106679833  
**Mercury link:** https://mercury.swin.edu.au/cos10005/s106679833/assignment2/

## About the project

DineLocal is a responsive, six-page restaurant discovery and reservation website developed as a front-end coursework project. It lets visitors explore sample restaurants, get recommendations based on their preferences, validate a demo registration form, and fill in a reservation form with a sample deposit and payment method.

The restaurant names, menu prices, deposits and recommendations are **illustrative**. This is not a live restaurant booking or payment service.

## Main features

- **Home:** Three-image slideshow, featured restaurants, and links to the site's main features.
- **Restaurants:** Six restaurant profiles with cuisine types, signature dishes and prices, descriptions, and deposits.
- **Recommendations:** JavaScript-based matching using dietary preference, budget and dining purpose; selected restaurants can be passed to the reservation form.
- **Registration:** Client-side checks for username, email, phone, password, confirmation and required selections; no account is stored.
- **Reservations:** Restaurant preselection, dynamic deposit amounts, date and guest-count validation, voucher or demo card fields, and a billing-email copy option.
- **Bill calculator (bonus):** Dynamic estimated costs based on restaurant, guest count, and optional extras.

## Technologies

- HTML5 for page structure and forms
- CSS3 for shared styling and responsive layouts
- JavaScript for validation, recommendations and interactive features

## Project files

```text
assignment2/
├── index.html
├── restaurants.html
├── recommend.html
├── register.html
├── reservation.html
├── bill.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── [website images and logos]
└── Readme.txt
```

The complete assignment documentation, including JavaScript explanations, known limitations and image-reference notes, is in [`assignment2/Readme.txt`](assignment2/Readme.txt).

## How to run

1. Download or clone this repository.
2. Open `assignment2/index.html` in a modern browser.
3. Use the navigation menu to explore all six pages.
4. Use **fake information only** when testing registration, reservations or payment fields.

## Notes

- Registration uses front-end validation only; there is no database or real user account creation.
- Restaurant availability, pricing, menu and dietary information are sample data.
- Reservation payment fields demonstrate input formatting only, not real transactions.
- The reservation form uses the coursework-specified Mercury test endpoint; avoid entering real personal or card information.
- Deployment and source attribution details should be updated before final submission. Check `assignment2/Readme.txt` for the full references and limitations.

---

*Educational coursework demonstration for Swinburne University of Technology — COS10005.*
