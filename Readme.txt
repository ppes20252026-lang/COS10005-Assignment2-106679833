DINELOCAL — COS10005 WEB DEVELOPMENT ASSIGNMENT 2
==================================================

ABOUT THIS PROJECT
------------------
DineLocal is a six-page educational restaurant discovery and reservation
website. Restaurant details, menu prices and reservation deposits are sample
information, not real bookings, pricing or dietary certifications.

This website is a front-end course project. Its restaurant details and
booking features are provided for demonstration purposes only.

STUDENT DETAILS AND PROJECT LINKS
---------------------------------
Student name: Md Jahin Sadik
Student ID: 106679833
Course: COS10005 Web Development - Assignment 2
GitHub repository: [ADD YOUR REAL GITHUB REPOSITORY URL]
Mercury website: [ADD YOUR VERIFIED MERCURY WEBSITE URL]

FILE STRUCTURE
--------------
assignment2/
  index.html                 Cinematic home page and featured restaurants
  restaurants.html           Six dining profiles, food images, prices and deposits
  recommend.html             Dietary, budget and dining-purpose matching
  register.html              Demo registration with client-side validation
  reservation.html           Sample booking form, deposit and conditional payment
  bill.html                  Bonus estimated-bill calculator
  css/style.css              Shared design and desktop/tablet/mobile CSS
  js/script.js               Restaurant data, recommendation and validation logic
  images/logo.png            Classic transparent DineLocal header logo
  images/dinelocal-logo.png  Separate transparent PNG copy of logo
  images/dinelocal-logo.svg  Editable vector logo (transparent)
  images/dinelocal-icon.svg  Vector favicon source
  images/logo-icon.png       Transparent favicon
  images/hero-showcase.jpg   Homepage photo 1 (original cinematic image)
  images/hero.jpg            Homepage photo 2 (restaurant interior)
  images/restaurant5.jpg     Homepage photo 3 (food close-up)
  images/restaurant1.jpg ... restaurant6.jpg   Local food/dining images
  Readme.txt                 This file

USING THE WEBSITE
-----------------
1. Open assignment2/index.html in a modern browser.
2. Use the menu to navigate between all six pages.
3. In Recommendations, select diet, budget and dining purpose to see matching
   restaurants; a link opens Reservation with the restaurant preselected.
4. Reservation supports direct selection, date/time, party size, a fixed
   per-restaurant deposit, a voucher or fake card-number method, and billing
   email copying. Never enter real financial or personal credentials.
5. Bill Calculator estimates the meal price and adjusts for optional extras.
6. Images and CSS are included locally; no image API is required.

JAVASCRIPT LOGIC IN PLAIN ENGLISH
--------------------------------
- 'restaurants' is an array containing six objects. Each object includes an
  ID, restaurant name, cuisine, average price, booking deposit, suitable diet
  tags and typical dining purposes.
- Recommendation takes the selected diet, maximum budget and purpose. It
  filters out restaurants that fail the diet/budget conditions, then sorts
  matches by purpose suitability and price. It shows up to three results,
  including sample menu items and their prices. Average prices for four
  restaurants are RM 24, RM 27, RM 28 and RM 29, so the RM 30 budget works.
- Registration rejects missing or incorrect values: username (5+ letters,
  numbers or underscores), email (basic valid format), phone (8-15 digits),
  password (10+ with uppercase/lowercase/number/symbol), confirmation password
  (must match), and missing gender, diet and country choices. It shows an error
  next to each invalid field and prevents any registration submission.
- Reservation reads an optional restaurant ID from the URL and lets users
  change the dropdown at any time. It updates deposit labels dynamically and
  sets a future minimum date. Voucher and online-payment fields appear only
  for their respective payment option. Voucher uses a 12-digit format check;
  fake Visa/Mastercard is 16 digits; fake Amex is 15 digits. Billing-email
  copying uses a checkbox. JavaScript blocks form POST until errors are fixed.
- Bill Calculator multiplies the sample average price by guest count, adds
  optional drinks/dessert and shows a total and post-deposit balance.
- All JavaScript is stored in js/script.js, not embedded into HTML pages.

DESIGN, ACCESSIBILITY AND RESPONSIVENESS
---------------------------------------
- Same header, logo, menu, footer and active-page highlighting on all pages.
- Homepage uses a three-photo carousel with working buttons and automatic
  cycling (except when reduced motion is selected), four feature highlights,
  featured restaurant cards and a three-step overview of the platform.
- Semantic HTML5 elements, descriptive image alt text, visible focus outlines,
  associated form labels and readable validation messages are used.
- Desktop: 1024px and above; tablet: 768-1023px; mobile: 767px and below.
  Tablet uses two-column restaurant cards; mobile uses one column and exposes
  all six navigation links in a two-row menu.
- Users who prefer reduced motion receive reduced animations/transitions.

KNOWN LIMITATIONS AND SECURITY NOTES
------------------------------------
- This is NOT an operating restaurant service. There is no database, real
  authentication, actual table availability or genuine payment processing.
- Restaurant names, prices, deposits, cuisine/diet information and menus are
  illustrative. Confirm allergy or halal needs with a real restaurant.
- The specification requires the reservation form to POST to:
  http://mercury.swin.edu.au/it000000/cos10005/regtest.php
  This is an HTTP test endpoint. Use fake data only, especially card numbers.
- Mercury deployment and GitHub accessibility must still be checked using
  the final uploaded version of this website.
- This website does not check whether real seats are available.
- The bill is an estimate and omits taxes, additional fees and actual orders.

IMAGES / REFERENCES
-------------------
Course brief: COS10005 Assignment2 Aug2026.pdf.
Earlier personal HTML/CSS style reference: uploaded Assignment 1 Archive.zip.
The DineLocal chef-hat logo was created for this project with AI assistance
and is included in PNG and SVG formats.
It replaces the earlier white-rectangle logo to suit the burgundy header.
The cinematic hero and three food-card photographs were cropped from the
previously approved AI-generated DineLocal homepage visual. The photographs
are illustrative and should NOT be represented as images taken at any of the
named sample restaurants.
The other restaurant pictures are illustrative image files carried over from
earlier website drafts. The original photographer/website sources are NOT
verified in this package. Before submission, replace any images without
permission or supply accurate image-source credits in Harvard style. Do not
claim that third-party images are your original photographs.

TESTING AND VALIDATION
----------------------
- On 15 November 2026, all six HTML pages were checked using the W3C Nu HTML
  Checker. The results shown reported no errors or warnings.
- The W3C CSS Validator reported no errors for css/style.css. It reported two
  non-fatal warnings about matching background and border colours.
- Recommendation and registration behaviour was tested in Safari using
  example inputs. Test the final deployed version again before submission.
- The HTML/CSS validators do not check JavaScript functionality or confirm
  that the website works on the Mercury server.

SUBMISSION CHECKLIST
--------------------
[x] Student name and student ID included above.
[x] Six HTML pages checked with W3C Nu HTML Checker (no errors or warnings).
[x] CSS checked with W3C CSS Validator (zero errors, two warnings).
[ ] Add real GitHub and Mercury URLs above.
[ ] Confirm all page features, especially reservation form validation and
    dynamic fields, work on the uploaded Mercury website.
[ ] Test desktop, tablet and mobile layouts with the final uploaded files.
[ ] Verify any third-party image credits and permission to use those images.
[ ] Keep the GitHub repository available to the marker during marking.
[ ] Make a new ZIP after the last Readme.txt update and submit the latest copy
    to Canvas as 106679833_assign2.zip (per Canvas naming instructions).
[ ] Review the code and prepare for the individual five-minute interview.
