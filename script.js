/* ==========================================================
   BIZZYBRAINZOO LAUNDRY & DRYCLEANING
   MAIN JAVASCRIPT
========================================================== */


/* ==========================================================
   WAIT FOR PAGE TO LOAD
========================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ======================================================
       PRELOADER
    ====================================================== */

    const preloader = document.getElementById("preloader");


    window.addEventListener("load", function () {

        setTimeout(function () {

            preloader.style.opacity = "0";

            setTimeout(function () {

                preloader.style.display = "none";

            }, 600);

        }, 700);

    });



    /* ======================================================
       MOBILE MENU
    ====================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");


        const icon =
            menuToggle.querySelector("i");


        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });



    /* ======================================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ====================================================== */

    const navigationLinks =
        navLinks.querySelectorAll("a");


    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            const icon =
                menuToggle.querySelector("i");


            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });



    /* ======================================================
       CURRENT YEAR
    ====================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* ======================================================
       ORDER NUMBER
    ====================================================== */

    const orderNumber =
        document.getElementById("orderNumber");


    function generateOrderNumber() {

        const randomNumber =
            Math.floor(1000 + Math.random() * 9000);


        return "BZ" + randomNumber;

    }


    if (orderNumber) {

        orderNumber.textContent =
            generateOrderNumber();

    }



    /* ======================================================
       FORM ELEMENTS
    ====================================================== */

    const bookingForm =
        document.getElementById("bookingForm");


    const customerName =
        document.getElementById("customerName");


    const customerPhone =
        document.getElementById("customerPhone");


    const customerAddress =
        document.getElementById("customerAddress");


    const clothes =
        document.getElementById("clothes");


    const pickupDate =
        document.getElementById("pickupDate");


    const deliveryType =
        document.getElementById("deliveryType");


    const extraNote =
        document.getElementById("extraNote");



    /* ======================================================
       DASHBOARD ELEMENTS
    ====================================================== */

    const summaryName =
        document.getElementById("summaryName");


    const summaryPhone =
        document.getElementById("summaryPhone");


    const summaryAddress =
        document.getElementById("summaryAddress");


    const summaryClothes =
        document.getElementById("summaryClothes");


    const summaryServices =
        document.getElementById("summaryServices");


    const summaryDate =
        document.getElementById("summaryDate");


    const summaryDelivery =
        document.getElementById("summaryDelivery");



    /* ======================================================
       GET SELECTED SERVICES
    ====================================================== */

    function getSelectedServices() {


        const selected =
            document.querySelectorAll(
                'input[name="services"]:checked'
            );


        const services = [];


        selected.forEach(function (checkbox) {

            services.push(checkbox.value);

        });


        return services;

    }



    /* ======================================================
       UPDATE DASHBOARD
    ====================================================== */

    function updateDashboard() {


        /* CUSTOMER NAME */

        if (customerName.value.trim() !== "") {

            summaryName.textContent =
                customerName.value.trim();

        } else {

            summaryName.textContent =
                "Not provided";

        }



        /* PHONE */

        if (customerPhone.value.trim() !== "") {

            summaryPhone.textContent =
                customerPhone.value.trim();

        } else {

            summaryPhone.textContent =
                "Not provided";

        }



        /* ADDRESS */

        if (customerAddress.value.trim() !== "") {

            summaryAddress.textContent =
                customerAddress.value.trim();

        } else {

            summaryAddress.textContent =
                "Not provided";

        }



        /* CLOTHES */

        if (clothes.value.trim() !== "") {

            summaryClothes.textContent =
                clothes.value.trim();

        } else {

            summaryClothes.textContent =
                "Not provided";

        }



        /* SERVICES */

        const services =
            getSelectedServices();


        if (services.length > 0) {

            summaryServices.textContent =
                services.join(", ");

        } else {

            summaryServices.textContent =
                "None selected";

        }



        /* DATE */

        if (pickupDate.value !== "") {

            const date =
                new Date(pickupDate.value + "T00:00:00");


            const formattedDate =
                date.toLocaleDateString(
                    "en-NG",
                    {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    }
                );


            summaryDate.textContent =
                formattedDate;

        } else {

            summaryDate.textContent =
                "Not selected";

        }



        /* DELIVERY */

        summaryDelivery.textContent =
            deliveryType.value;

    }



    /* ======================================================
       LIVE DASHBOARD UPDATE
    ====================================================== */

    customerName.addEventListener(
        "input",
        updateDashboard
    );


    customerPhone.addEventListener(
        "input",
        updateDashboard
    );


    customerAddress.addEventListener(
        "input",
        updateDashboard
    );


    clothes.addEventListener(
        "input",
        updateDashboard
    );


    pickupDate.addEventListener(
        "change",
        updateDashboard
    );


    deliveryType.addEventListener(
        "change",
        updateDashboard
    );


    extraNote.addEventListener(
        "input",
        updateDashboard
    );



    /* ======================================================
       MULTIPLE SERVICE SELECTION
    ====================================================== */

    const serviceCheckboxes =
        document.querySelectorAll(
            'input[name="services"]'
        );


    serviceCheckboxes.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            updateDashboard
        );

    });



    /* ======================================================
       SET MINIMUM DATE TO TODAY
    ====================================================== */

    if (pickupDate) {

        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");


        const day =
            String(today.getDate())
                .padStart(2, "0");


        const formattedToday =
            `${year}-${month}-${day}`;


        pickupDate.min =
            formattedToday;

    }



    /* ======================================================
       WHATSAPP ORDER
    ====================================================== */

    bookingForm.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            /* ==============================================
               CHECK SERVICES
            ============================================== */

            const services =
                getSelectedServices();


            if (services.length === 0) {

                alert(
                    "Please select at least one service before sending your order."
                );

                return;

            }



            /* ==============================================
               GET FORM VALUES
            ============================================== */

            const name =
                customerName.value.trim();


            const phone =
                customerPhone.value.trim();


            const address =
                customerAddress.value.trim();


            const clothesDescription =
                clothes.value.trim();


            const date =
                pickupDate.value;


            const delivery =
                deliveryType.value;


            const note =
                extraNote.value.trim();



            /* ==============================================
               ORDER NUMBER
            ============================================== */

            const orderID =
                orderNumber.textContent;



            /* ==============================================
               FORMAT DATE
            ============================================== */

            let formattedDate =
                "Not specified";


            if (date !== "") {

                const selectedDate =
                    new Date(date + "T00:00:00");


                formattedDate =
                    selectedDate.toLocaleDateString(
                        "en-NG",
                        {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }
                    );

            }



            /* ==============================================
               CREATE WHATSAPP MESSAGE
            ============================================== */

            let message = "";


            message +=
                "✨ *BIZZYBRAINZOO LAUNDRY & DRYCLEANING* ✨\n";


            message +=
                "*From Messy To Sparkling Immaculate.*\n\n";


            message +=
                "━━━━━━━━━━━━━━━━━━━━\n";


            message +=
                "🧾 *NEW LAUNDRY ORDER*\n";


            message +=
                "━━━━━━━━━━━━━━━━━━━━\n\n";


            message +=
                "🔖 *Order Number:* " +
                orderID +
                "\n\n";


            message +=
                "👤 *CUSTOMER INFORMATION*\n";


            message +=
                "Name: " +
                name +
                "\n";


            message +=
                "Phone: " +
                phone +
                "\n";


            message +=
                "Address: " +
                address +
                "\n\n";


            message +=
                "👕 *CLOTHES / ITEMS*\n";


            message +=
                clothesDescription +
                "\n\n";


            message +=
                "✨ *SERVICES REQUIRED*\n";


            services.forEach(function (service) {

                message +=
                    "• " +
                    service +
                    "\n";

            });


            message +=
                "\n";


            message +=
                "📅 *PREFERRED DATE*\n";


            message +=
                formattedDate +
                "\n\n";


            message +=
                "🚚 *DELIVERY PREFERENCE*\n";


            message +=
                delivery +
                "\n\n";


            if (note !== "") {

                message +=
                    "📝 *ADDITIONAL NOTE*\n";


                message +=
                    note +
                    "\n\n";

            }


            message +=
                "━━━━━━━━━━━━━━━━━━━━\n";


            message +=
                "Please confirm my order and let me know the final price.\n\n";


            message +=
                "Thank you, BizzyBrainzoo! ✨";



            /* ==============================================
               WHATSAPP NUMBER
            ============================================== */

            const whatsappNumber =
                "234908037275936";



            /* ==============================================
               ENCODE MESSAGE
            ============================================== */

            const encodedMessage =
                encodeURIComponent(message);



            /* ==============================================
               WHATSAPP URL
            ============================================== */

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodedMessage;



            /* ==============================================
               OPEN WHATSAPP
            ============================================== */

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );



    /* ======================================================
       SMOOTH SCROLLING
    ====================================================== */

    const allAnchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    allAnchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetID =
                    this.getAttribute("href");


                if (
                    targetID === "#" ||
                    !targetID
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetID);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });



    /* ======================================================
       INITIAL DASHBOARD
    ====================================================== */

    updateDashboard();

});