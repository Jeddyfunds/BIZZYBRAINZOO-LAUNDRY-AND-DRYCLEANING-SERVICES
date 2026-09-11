/* =========================================================
   BIZZYBRAINZOO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const BIZZYBRAINZOO = {

    // Main WhatsApp number
    whatsappNumber: "2348037275936",

    // Other business numbers
    phoneNumbers: [
        "08037275936",
        "09030509833",
        "07025661448"
    ]

};


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Current year
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // Mobile navigation
    setupMobileNavigation();


    // Booking form
    setupBookingForm();


    // Set minimum pickup date
    setMinimumDate();


    // Close modal when clicking outside
    setupModalClosing();

});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function setupMobileNavigation() {

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (!menuBtn || !navLinks) {
        return;
    }


    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    // Close mobile menu after selecting a link

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   BOOKING MODAL
   ========================================================= */

function openBookingModal() {

    const modal = document.getElementById("bookingModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeBookingModal() {

    const modal = document.getElementById("bookingModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   LOGIN MODAL
   ========================================================= */

function openLoginModal() {

    const modal = document.getElementById("loginModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeLoginModal() {

    const modal = document.getElementById("loginModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   MODAL OUTSIDE CLICK
   ========================================================= */

function setupModalClosing() {

    const modals = document.querySelectorAll(".modal-overlay");

    modals.forEach(function (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                modal.classList.remove("active");

                document.body.style.overflow = "";

            }

        });

    });

}


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") {
        return;
    }


    closeBookingModal();
    closeLoginModal();

});


/* =========================================================
   SELECT SERVICE
   ========================================================= */

function selectService(serviceName) {

    openBookingModal();


    const checkboxes = document.querySelectorAll(
        'input[name="service"]'
    );


    checkboxes.forEach(function (checkbox) {

        if (checkbox.value === serviceName) {
            checkbox.checked = true;
        }

    });

}


/* =========================================================
   MINIMUM PICKUP DATE
   ========================================================= */

function setMinimumDate() {

    const pickupDate = document.getElementById("pickupDate");

    if (!pickupDate) {
        return;
    }


    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");


    pickupDate.min = `${year}-${month}-${day}`;

}


/* =========================================================
   BOOKING FORM
   ========================================================= */

function setupBookingForm() {

    const form = document.getElementById("bookingForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("customerName").value.trim();


        const phone =
            document.getElementById("customerPhone").value.trim();


        const address =
            document.getElementById("customerAddress").value.trim();


        const pickupDate =
            document.getElementById("pickupDate").value;


        const itemCount =
            document.getElementById("itemCount").value;


        const note =
            document.getElementById("customerNote").value.trim();


        const selectedServices =
            Array.from(
                document.querySelectorAll(
                    'input[name="service"]:checked'
                )
            ).map(function (checkbox) {

                return checkbox.value;

            });


        if (selectedServices.length === 0) {

            alert(
                "Please select at least one service."
            );

            return;

        }


        if (!name || !phone || !address || !pickupDate) {

            alert(
                "Please complete all required fields."
            );

            return;

        }


        const readableDate =
            formatDate(pickupDate);


        let message =
            `Hello BIZZYBRAINZOO,%0A%0A` +

            `I would like to book a laundry service.%0A%0A` +

            `*Customer Name:* ${encodeURIComponent(name)}%0A` +

            `*Phone:* ${encodeURIComponent(phone)}%0A` +

            `*Address:* ${encodeURIComponent(address)}%0A` +

            `*Pickup Date:* ${encodeURIComponent(readableDate)}%0A` +

            `*Number of Items:* ${encodeURIComponent(itemCount)}%0A` +

            `*Services:* ${encodeURIComponent(
                selectedServices.join(", ")
            )}%0A`;


        if (note) {

            message +=
                `*Additional Note:* ${encodeURIComponent(note)}%0A`;

        }


        message +=
            `%0APlease confirm my booking. Thank you.`;


        const whatsappURL =
            `https://wa.me/${BIZZYBRAINZOO.whatsappNumber}?text=${message}`;


        window.open(
            whatsappURL,
            "_blank"
        );


        form.reset();

        closeBookingModal();

    });

}


/* =========================================================
   DATE FORMATTER
   ========================================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }


    const date = new Date(
        dateString + "T00:00:00"
    );


    return date.toLocaleDateString(
        "en-NG",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/* =========================================================
   WHATSAPP
   ========================================================= */

function openWhatsApp() {

    const message =
        "Hello BIZZYBRAINZOO, I would like to make an enquiry about your laundry and drycleaning services.";


    const url =
        `https://wa.me/${BIZZYBRAINZOO.whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   GOOGLE LOGIN PLACEHOLDER
   ========================================================= */

function googleLogin() {

    /*
       IMPORTANT:

       This button is currently a frontend placeholder.

       Real Google authentication should NOT be implemented
       only with JavaScript.

       The production version will connect this button to:

       Google OAuth
              ↓
       Authentication provider
              ↓
       Secure backend
              ↓
       Customer account
              ↓
       Customer dashboard

       Example future flow:

       window.location.href = "/auth/google";
    */


    alert(
        "Google Customer Login will be connected when the secure backend and Google OAuth authentication are added."
    );

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (anchor) {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetID =
                this.getAttribute("href");


            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetID);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

window.addEventListener("scroll", function () {

    const header =
        document.getElementById("header");


    if (!header) {
        return;
    }


    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 10px 30px rgba(8,127,91,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});