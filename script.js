const models = [

    {
        title: "Ferrari F40",

        image:
            "/Jasper-3D-Models/images/ferrari_f40.webp"
    },


    {
        title: "Chair",

        image:
            "/Jasper-3D-Models/images/chair.webp"
    },


    {
        title: "Basketball",

        image:
            "/Jasper-3D-Models/images/basketball.webp"
    }

];



/* =========================================
   DOM ELEMENTS
========================================= */


const modelGrid =
    document.getElementById(
        "modelGrid"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


const modelCount =
    document.getElementById(
        "modelCount"
    );


const modal =
    document.getElementById(
        "modelModal"
    );


const modalImage =
    document.getElementById(
        "modalImage"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalBackdrop =
    document.getElementById(
        "modalBackdrop"
    );


const menuButton =
    document.getElementById(
        "menuButton"
    );


const navigation =
    document.getElementById(
        "navigation"
    );


const currentYear =
    document.getElementById(
        "currentYear"
    );



/* =========================================
   STATE
========================================= */


let lastFocusedElement = null;



/* =========================================
   RENDER MODELS
========================================= */


function renderModels() {

    modelGrid.innerHTML = "";


    /*
        Update model count.
    */

    const amount =
        models.length;


    modelCount.textContent =
        `${amount} ${
            amount === 1
                ? "Model"
                : "Models"
        }`;


    /*
        Empty state.
    */

    if (amount === 0) {

        emptyState.hidden = false;

        modelGrid.hidden = true;

        return;
    }


    emptyState.hidden = true;

    modelGrid.hidden = false;


    /*
        Create cards.
    */

    models.forEach(
        (model, index) => {

            const card =
                createModelCard(
                    model,
                    index
                );


            modelGrid.appendChild(
                card
            );

        }
    );

}



/* =========================================
   CREATE MODEL CARD
========================================= */


function createModelCard(
    model,
    index
) {


    /*
        Article/card.
    */

    const article =
        document.createElement(
            "article"
        );


    article.className =
        "model-card";


    /*
        Make the card keyboard accessible.
    */

    article.tabIndex = 0;


    article.setAttribute(
        "role",
        "button"
    );


    article.setAttribute(
        "aria-label",
        `Open ${model.title}`
    );



    /* =====================================
       IMAGE WRAPPER
    ===================================== */


    const imageWrapper =
        document.createElement(
            "div"
        );


    imageWrapper.className =
        "model-image-wrapper";



    /* =====================================
       IMAGE
    ===================================== */


    const image =
        document.createElement(
            "img"
        );


    image.className =
        "model-image";


    image.src =
        model.image;


    image.alt =
        `${model.title} 3D render`;


    /*
        First 3 images are loaded immediately.

        Other images are loaded when they
        approach the viewport.
    */

    image.loading =
        index < 3
            ? "eager"
            : "lazy";


    image.decoding =
        "async";


    /*
        Your renders are 1080 x 1080.
    */

    image.width = 1080;

    image.height = 1080;



    /* =====================================
       IMAGE ERROR HANDLING
    ===================================== */


    image.addEventListener(
        "error",
        () => {

            image.alt =
                `${model.title} render unavailable`;

        }
    );



    /* =====================================
       BUILD IMAGE
    ===================================== */


    imageWrapper.appendChild(
        image
    );



    /* =====================================
       TITLE
    ===================================== */


    const information =
        document.createElement(
            "div"
        );


    information.className =
        "model-information";


    const title =
        document.createElement(
            "h3"
        );


    title.className =
        "model-title";


    title.textContent =
        model.title;


    information.appendChild(
        title
    );



    /* =====================================
       BUILD CARD
    ===================================== */


    article.appendChild(
        imageWrapper
    );


    article.appendChild(
        information
    );



    /* =====================================
       MOUSE CLICK
    ===================================== */


    article.addEventListener(
        "click",
        () => {

            openModal(model);

        }
    );



    /* =====================================
       KEYBOARD
    ===================================== */


    article.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();


                openModal(model);

            }

        }
    );


    return article;

}



/* =========================================
   OPEN MODAL
========================================= */


function openModal(model) {


    /*
        Remember which card was focused.

        This allows keyboard users to return
        to the card after closing the modal.
    */

    lastFocusedElement =
        document.activeElement;



    /*
        Set image.
    */

    modalImage.src =
        model.image;


    modalImage.alt =
        `${model.title} 3D render`;


    /*
        Set title.
    */

    modalTitle.textContent =
        model.title;



    /*
        Open modal.
    */

    modal.classList.add(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );



    /*
        Prevent page scrolling behind modal.
    */

    document.body.style.overflow =
        "hidden";



    /*
        Focus close button.
    */

    modalClose.focus();

}



/* =========================================
   CLOSE MODAL
========================================= */


function closeModal() {


    modal.classList.remove(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
        Restore page scrolling.
    */

    document.body.style.overflow =
        "";


    /*
        Clear image.

        This allows the browser to release
        the image when the modal is closed.
    */

    modalImage.src = "";


    modalImage.alt = "";


    modalTitle.textContent = "";



    /*
        Return keyboard focus to the card.
    */

    if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus === "function"
    ) {

        lastFocusedElement.focus();

    }


    lastFocusedElement = null;

}



/* =========================================
   MODAL EVENTS
========================================= */


/*
    Close button.
*/

modalClose.addEventListener(
    "click",
    closeModal
);


/*
    Click outside image.
*/

modalBackdrop.addEventListener(
    "click",
    closeModal
);


/*
    ESC key.
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {

            closeModal();

        }

    }
);

/* =========================================
   MOBILE NAVIGATION
========================================= */


function closeNavigation() {

    navigation.classList.remove(
        "open"
    );


    menuButton.classList.remove(
        "active"
    );


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}



/*
    Open/close mobile navigation.
*/

menuButton.addEventListener(
    "click",
    () => {

        const isOpen =
            navigation.classList.toggle(
                "open"
            );


        menuButton.classList.toggle(
            "active",
            isOpen
        );


        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }
);



/*
    Close navigation when
    clicking a navigation link.
*/

navigation
    .querySelectorAll("a")
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                closeNavigation
            );

        }
    );



/*
    Close mobile menu when clicking
    outside of it.
*/

document.addEventListener(
    "click",
    (event) => {

        if (
            !navigation.classList.contains(
                "open"
            )
        ) {

            return;

        }


        if (
            navigation.contains(
                event.target
            ) ||
            menuButton.contains(
                event.target
            )
        ) {

            return;

        }


        closeNavigation();

    }
);



/*
    Close mobile menu with ESC.
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            navigation.classList.contains(
                "open"
            )
        ) {

            closeNavigation();

            menuButton.focus();

        }

    }
);



/* =========================================
   CURRENT YEAR
========================================= */


currentYear.textContent =
    new Date().getFullYear();



/* =========================================
   START WEBSITE
========================================= */


renderModels();