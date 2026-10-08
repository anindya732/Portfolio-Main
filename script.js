/* =========================================================
   ANINDYA BISWAS PORTFOLIO
========================================================= */


/* =========================================================
   THEME TOGGLE
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    themeToggle?.querySelector("i");


function updateThemeIcon() {

    if (!themeIcon) return;

    if (document.body.classList.contains("light")) {

        themeIcon.className =
            "fa-solid fa-sun";

    } else {

        themeIcon.className =
            "fa-solid fa-moon";

    }

}


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

}

updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

    });

}


/* =========================================================
   3D PROFILE CARD
========================================================= */

const profileCard =
    document.getElementById("profileCard");

const profileWrapper =
    document.querySelector(".profile-card-wrapper");


if (profileCard && profileWrapper) {

    profileWrapper.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth <= 850) return;

            const rect =
                profileCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 18;

            const rotateX =
                ((centerY - y) / centerY) * 18;

            const moveX =
                ((x - centerX) / centerX) * 8;

            const moveY =
                ((y - centerY) / centerY) * 8;

            profileWrapper.style.setProperty("--profile-mx", `${(x / rect.width) * 100}%`);
            profileWrapper.style.setProperty("--profile-my", `${(y / rect.height) * 100}%`);

            profileCard.style.transform = `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translate3d(${moveX}px, ${moveY}px, 0)
                scale3d(1.025,1.025,1.025)
            `;

        }
    );


    profileWrapper.addEventListener(
        "mouseleave",
        () => {

            profileWrapper.style.setProperty("--profile-mx", "50%");
            profileWrapper.style.setProperty("--profile-my", "50%");

            profileCard.style.transform = `
                rotateX(0deg)
                rotateY(0deg)
                translate3d(0,0,0)
                scale3d(1,1,1)
            `;

        }
    );

}


/* =========================================================
   PROFILE CARD — MOBILE DEVICE TILT
========================================================= */

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


window.addEventListener("deviceorientation", (event) => {

    if (window.innerWidth > 850) return;

    targetX =
        Math.max(
            -8,
            Math.min(8, event.gamma || 0)
        );

    targetY =
        Math.max(
            -8,
            Math.min(8, (event.beta || 0) - 45)
        );

});


function smoothCardMotion() {

    currentX +=
        (targetX - currentX) * 0.08;

    currentY +=
        (targetY - currentY) * 0.08;


    if (
        window.innerWidth <= 850 &&
        profileCard
    ) {

        profileCard.style.transform = `
            rotateX(${currentY}deg)
            rotateY(${currentX}deg)
            scale3d(1.01,1.01,1.01)
        `;

    }


    requestAnimationFrame(
        smoothCardMotion
    );

}


smoothCardMotion();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "active"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(element);

        }
    );

} else {

    revealElements.forEach(
        element => {
            element.classList.add("active");
        }
    );

}




/* =========================================================
   EDUCATION ROADMAP — SEQUENTIAL SCROLL REVEAL
   First card is visible when the roadmap opens; the following
   cards appear smoothly one-by-one as the user scrolls.
========================================================= */
(() => {
    const roadmap = document.querySelector('.academic-roadmap');
    if (!roadmap) return;

    const cards = [...roadmap.querySelectorAll('.roadmap-item')];
    if (!cards.length) return;

    // Keep the first university card visible from the start.
    cards[0].classList.add('roadmap-visible');

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cards.forEach(card => card.classList.add('roadmap-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('roadmap-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -12% 0px'
    });

    // Observe only the cards after the first one.
    cards.slice(1).forEach(card => observer.observe(card));
})();


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   PREMIUM STICKY NAVBAR
   Never hides on scroll — only gets a subtle compact glass state.
========================================================= */

const navbar = document.querySelector(".navbar");

if (navbar) {
    const updateNavbarState = () => {
        navbar.classList.toggle("nav-scrolled", window.scrollY > 24);
    };

    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });
}


/* =========================================================
   SMOOTH ANCHOR LINKS
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        targetId === "#" ||
                        !document.querySelector(targetId)
                    ) {

                        return;

                    }

                    event.preventDefault();

                    const target =
                        document.querySelector(
                            targetId
                        );

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


/* =========================================================
   VIDEO RESUME
========================================================= */

const resumeVideo = document.getElementById("resumeVideo");
const videoPlaceholder = document.getElementById("videoPlaceholder");

if (resumeVideo) {
    resumeVideo.addEventListener("mouseenter", () => {
        resumeVideo.setAttribute("title", "Play your video resume");
    });

    // Hide the placeholder automatically when the folder video loads.
    resumeVideo.addEventListener("loadeddata", () => {
        if (videoPlaceholder) {
            videoPlaceholder.style.display = "none";
        }
    });

    // Keep the native browser controls: play/pause, volume, progress and fullscreen.
    resumeVideo.addEventListener("error", () => {
        if (videoPlaceholder) {
            videoPlaceholder.style.display = "flex";
        }
    });
}


/* =========================================================
   MOUSE-FOLLOWING GLOW
========================================================= */

const glow =
    document.createElement("div");


glow.className =
    "mouse-glow";


document.body.appendChild(glow);


const glowStyle =
    document.createElement("style");


glowStyle.innerHTML = `

    .mouse-glow {

        position: fixed;

        width: 250px;

        height: 250px;

        border-radius: 50%;

        pointer-events: none;

        z-index: -1;

        background:
            radial-gradient(
                circle,
                rgba(56,189,248,.07),
                transparent 70%
            );

        transform:
            translate(-50%, -50%);

        transition:
            left .15s ease-out,
            top .15s ease-out;

    }

`;


document.head.appendChild(
    glowStyle
);


window.addEventListener(
    "mousemove",
    (event) => {

        glow.style.left =
            event.clientX + "px";

        glow.style.top =
            event.clientY + "px";

    }
);


/* =========================================================
   PROJECT CARD MAGNETIC / 3D EFFECT
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 850) return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y - rect.height / 2)
                    / rect.height) * -5;

                const rotateY =
                    ((x - rect.width / 2)
                    / rect.width) * 5;

                card.style.transform = `
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   CODING CARD HOVER
========================================================= */

const codingCards =
    document.querySelectorAll(
        ".coding-card"
    );


codingCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 850) return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const px =
                    (x / rect.width) * 100;

                const py =
                    (y / rect.height) * 100;

                card.style.background = `
                    radial-gradient(
                        circle at ${px}% ${py}%,
                        rgba(255,255,255,.13),
                        rgba(255,255,255,.035)
                    )
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";

            }
        );

    }
);


/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingText =
    document.getElementById("typingText");


const typingWords = [

    "Problem Solver",

    "Future AI & ML Engineer",

    "Competitive Engineering"

];


let typingWordIndex = 0;

let typingCharIndex = 0;

let typingDeleting = false;


const typingSpeed = 90;

const deletingSpeed = 55;

const typingPause = 1700;

const deletingPause = 450;


function runTypingAnimation() {

    if (!typingText) return;


    const currentWord =
        typingWords[typingWordIndex];


    /* TYPE */

    if (!typingDeleting) {

        typingText.textContent =
            currentWord.slice(
                0,
                typingCharIndex + 1
            );


        typingCharIndex++;


        if (
            typingCharIndex ===
            currentWord.length
        ) {

            typingDeleting = true;

            setTimeout(
                runTypingAnimation,
                typingPause
            );

            return;

        }


        setTimeout(
            runTypingAnimation,
            typingSpeed
        );

        return;

    }


    /* DELETE */

    typingText.textContent =
        currentWord.slice(
            0,
            typingCharIndex - 1
        );


    typingCharIndex--;


    if (typingCharIndex === 0) {

        typingDeleting = false;


        typingWordIndex =
            (
                typingWordIndex + 1
            ) %
            typingWords.length;


        setTimeout(
            runTypingAnimation,
            deletingPause
        );

        return;

    }


    setTimeout(
        runTypingAnimation,
        deletingSpeed
    );

}


runTypingAnimation();


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (
    mobileMenuBtn &&
    mobileMenu
) {

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "open"
            );


            const icon =
                mobileMenuBtn.querySelector(
                    "i"
                );


            if (icon) {

                icon.className =
                    mobileMenu.classList.contains(
                        "open"
                    )
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

            }

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );


                        const icon =
                            mobileMenuBtn.querySelector(
                                "i"
                            );


                        if (icon) {

                            icon.className =
                                "fa-solid fa-bars";

                        }

                    }
                );

            }
        );

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticElements =
    document.querySelectorAll(
        ".magnetic-btn, .nav-contact, .primary-btn, .secondary-btn"
    );


magneticElements.forEach(
    element => {

        element.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <= 850
                ) return;


                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `
                    translate(
                        ${x * 0.12}px,
                        ${y * 0.12}px
                    )
                    `;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   CONTACT FORM — REAL EMAIL DELIVERY
   Sends the submitted form to Anindya's email via FormSubmit.
========================================================= */

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const sendMessageBtn = document.getElementById("sendMessageBtn");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        const honey = contactForm.querySelector('[name="_honey"]');
        if (honey && honey.value.trim()) {
            event.preventDefault();
            return;
        }

        if (formSuccess) formSuccess.classList.add("show");

        if (sendMessageBtn) {
            sendMessageBtn.classList.add("is-sending");
            sendMessageBtn.disabled = true;
            const icon = sendMessageBtn.querySelector("i");
            const text = sendMessageBtn.querySelector("span");
            if (icon) icon.className = "fa-solid fa-circle-notch fa-spin";
            if (text) text.textContent = "Sending…";
        }

        // Do not prevent the native submit: FormSubmit receives the form
        // and delivers it to anindya123rrss@gmail.com.
    });
}

/* =========================================================
   FORM INPUT FOCUS EFFECT
========================================================= */

const formInputs =
    document.querySelectorAll(
        ".contact-form input, .contact-form textarea"
    );


formInputs.forEach(
    input => {

        input.addEventListener(
            "focus",
            () => {

                input.parentElement?.classList.add(
                    "focused"
                );

            }
        );


        input.addEventListener(
            "blur",
            () => {

                input.parentElement?.classList.remove(
                    "focused"
                );

            }
        );

    }
);


/* =========================================================
   PROJECT / DEMO BUTTONS
========================================================= */

const projectLinks =
    document.querySelectorAll(
        ".project-link"
    );


projectLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                if (
                    link.getAttribute("href") ===
                    "#"
                ) {

                    event.preventDefault();

                    alert(
                        "Project link will be added soon."
                    );

                }

            }
        );

    }
);


/* =========================================================
   STAT COUNTER ANIMATION
========================================================= */

const statNumbers =
    document.querySelectorAll(
        "[data-count]"
    );


if (
    statNumbers.length &&
    "IntersectionObserver" in window
) {

    const statObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) return;


                        const element =
                            entry.target;


                        const target =
                            Number(
                                element.dataset.count
                            );


                        let current = 0;

                        const duration = 1200;

                        const start =
                            performance.now();


                        function updateCounter(
                            timestamp
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        timestamp -
                                        start
                                    ) /
                                    duration,
                                    1
                                );


                            current =
                                Math.floor(
                                    progress *
                                    target
                                );


                            element.textContent =
                                current;


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                element.textContent =
                                    target;

                            }

                        }


                        requestAnimationFrame(
                            updateCounter
                        );


                        statObserver.unobserve(
                            element
                        );

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    statNumbers.forEach(
        number => {

            statObserver.observe(
                number
            );

        }
    );

}


/* =========================================================
   PARALLAX EFFECT
========================================================= */

const parallaxElements =
    document.querySelectorAll(
        "[data-parallax]"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.innerWidth <= 850)
            return;


        const scrollY =
            window.scrollY;


        parallaxElements.forEach(
            element => {

                const speed =
                    Number(
                        element.dataset.parallax
                    ) || 0.15;


                element.style.transform =
                    `translateY(
                        ${scrollY * speed}px
                    )`;

            }
        );

    }
);


/* =========================================================
   KEYBOARD ESC — CLOSE MOBILE MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            mobileMenu
        ) {

            mobileMenu.classList.remove(
                "open"
            );


            if (mobileMenuBtn) {

                const icon =
                    mobileMenuBtn.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.className =
                        "fa-solid fa-bars";

                }

            }

        }

    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);

/* =========================================================
   LIVE LOCAL TIME
   Uses the visitor's device/browser local timezone.
========================================================= */

const localTimeText = document.getElementById("localTimeText");

function updateLocalTime() {
    if (!localTimeText) return;

    const now = new Date();

    localTimeText.textContent = new Intl.DateTimeFormat(
        undefined,
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }
    ).format(now);
}

updateLocalTime();
setInterval(updateLocalTime, 1000);


/* =========================================================
   STICKY GLASS NAVBAR
   Always visible while scrolling.
========================================================= */

const smartNavbar = document.querySelector(".navbar");

if (smartNavbar) {
    smartNavbar.classList.remove("nav-hidden");
    smartNavbar.classList.add("nav-visible");
}


/* =========================================================
   ACTIVE NAV PILL
========================================================= */


const navPills =
    document.querySelectorAll(
        ".nav-menu .nav-pill"
    );

const navSections = [
    { id: "home", link: "#home" },
    { id: "about", link: "#about" },
    { id: "roadmap", link: "#roadmap" },
    { id: "experience", link: "#experience" },
    { id: "skills", link: "#skills" },
    { id: "projects", link: "#projects" },
    { id: "languages", link: "#languages" },
    { id: "achievements", link: "#achievements" },
    { id: "travel", link: "#travel" }
];

function updateActiveNav() {

    if (!navPills.length) return;

    const marker =
        window.scrollY + 180;

    let currentSection = "";

    navSections.forEach(section => {

        const element =
            document.getElementById(
                section.id
            );

        if (!element) return;

        if (
            marker >=
            element.offsetTop
        ) {
            currentSection =
                section.link;
        }

    });

    navPills.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") ===
            currentSection
        );

    });
}

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();


/* =========================================================
   CV VIEWER MODAL
========================================================= */

const cvModal = document.getElementById("cvModal");
const viewCvBtn = document.getElementById("viewCvBtn");
const closeCvBtn = document.getElementById("closeCvBtn");

function openCvViewer() {
    if (!cvModal) return;
    cvModal.classList.add("open");
    cvModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("cv-open");
    focusCvViewer();
}

function closeCvViewer() {
    if (!cvModal) return;
    cvModal.classList.remove("open");
    cvModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cv-open");
}

viewCvBtn?.addEventListener("click", openCvViewer);
closeCvBtn?.addEventListener("click", closeCvViewer);

cvModal?.querySelectorAll("[data-close-cv]").forEach((element) => {
    element.addEventListener("click", closeCvViewer);
});

/* Smooth CV scrolling — mouse wheel + trackpad */
const cvPageViewer = document.getElementById("cvPageViewer");

// Let the CV viewer own the mouse wheel while it is open.
// Native scrolling remains available for the scrollbar, touch, keyboard,
// and trackpad, while wheel input gets a small smooth animation.
cvPageViewer?.addEventListener("wheel", (event) => {
    if (!cvPageViewer || Math.abs(event.deltaY) < 0.01) return;

    let delta = event.deltaY;
    if (event.deltaMode === 1) delta *= 16;
    if (event.deltaMode === 2) delta *= cvPageViewer.clientHeight;

    // Keep one mouse-wheel notch comfortable, but allow trackpad movement.
    if (event.deltaMode !== 0) {
        delta = Math.max(-180, Math.min(180, delta));
    } else {
        delta = Math.max(-160, Math.min(160, delta));
    }

    // Stop the page behind the modal from moving.
    event.preventDefault();
    event.stopPropagation();

    const maxScroll = Math.max(0, cvPageViewer.scrollHeight - cvPageViewer.clientHeight);
    const target = Math.max(0, Math.min(cvPageViewer.scrollTop + delta, maxScroll));

    cvPageViewer.scrollTo({
        top: target,
        behavior: "smooth"
    });
}, { passive: false });

// Keep the viewer focused when opened so mouse/keyboard interaction is
// consistently directed to the CV instead of the page underneath.
function focusCvViewer() {
    requestAnimationFrame(() => {
        cvPageViewer?.focus({ preventScroll: true });
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeCvViewer();
    }
});

/* =========================================================
   PREMIUM DYNAMIC 3D / COLOR INTERACTION LAYER
========================================================= */

(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    // Scroll progress bar
    const progress = document.createElement('div');
    progress.className = 'scroll-progress-line';
    document.body.appendChild(progress);

    const updateProgress = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const value = max > 0 ? (window.scrollY / max) * 100 : 0;
        progress.style.setProperty('--scroll-progress', `${value}%`);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Premium 3D tilt cards — desktop only
    const tiltCards = document.querySelectorAll('[data-tilt], .skill-card, .project-card, .experience-card, .coding-card');

    tiltCards.forEach((card) => {
        let raf = null;
        card.addEventListener('pointermove', (event) => {
            if (window.innerWidth <= 850) return;
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const rx = (0.5 - y) * 7;
            const ry = (x - 0.5) * 8;
            const px = x * 100;
            const py = y * 100;

            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.015)`;
                card.style.setProperty('--mx', `${px}%`);
                card.style.setProperty('--my', `${py}%`);
            });
        });

        card.addEventListener('pointerleave', () => {
            if (raf) cancelAnimationFrame(raf);
            card.style.transform = '';
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        });
    });

    // Add a soft color halo to language cards based on pointer position
    document.querySelectorAll('.premium-language-card').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${event.clientX - r.left}px`);
            card.style.setProperty('--my', `${event.clientY - r.top}px`);
        });
    });

    // Floating particles behind the portfolio
    const canvas = document.createElement('canvas');
    canvas.className = 'ambient-particles';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(70, Math.floor(window.innerWidth / 20));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.7 + .35,
            vx: (Math.random() - .5) * .18,
            vy: (Math.random() - .5) * .18,
            phase: Math.random() * Math.PI * 2
        }));
    };

    const draw = (time = 0) => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -10) p.x = window.innerWidth + 10;
            if (p.x > window.innerWidth + 10) p.x = -10;
            if (p.y < -10) p.y = window.innerHeight + 10;
            if (p.y > window.innerHeight + 10) p.y = -10;
            const alpha = .18 + (Math.sin(time * .001 + p.phase) + 1) * .12;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(148,163,255,${alpha})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    requestAnimationFrame(draw);

    // Make icon blocks gently float with different phases
    document.querySelectorAll('.skill-icon, .project-icon, .achievement-icon, .coding-logo').forEach((icon, i) => {
        icon.style.animation = `premiumFloat ${3.2 + (i % 5) * .35}s ease-in-out ${-(i * .25)}s infinite alternate`;
    });

    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress-line {
            position: fixed;
            top: 0;
            left: 0;
            width: var(--scroll-progress, 0%);
            height: 2px;
            z-index: 10000;
            pointer-events: none;
            background: linear-gradient(90deg, #38bdf8, #8b5cf6, #ec4899, #38bdf8);
            background-size: 220% 100%;
            box-shadow: 0 0 16px rgba(56,189,248,.7);
            animation: progressHue 4s linear infinite;
        }
        .ambient-particles {
            position: fixed;
            inset: 0;
            z-index: -4;
            pointer-events: none;
            opacity: .65;
        }
        .premium-language-card::after {
            content: '';
            position: absolute;
            width: 180px;
            height: 180px;
            left: calc(var(--mx, 50%) - 90px);
            top: calc(var(--my, 50%) - 90px);
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,.09), transparent 68%);
            pointer-events: none;
            opacity: 0;
            transition: opacity .3s ease;
        }
        .premium-language-card:hover::after { opacity: 1; }
        @keyframes premiumFloat {
            from { transform: translateY(-2px) rotate(-1deg); }
            to { transform: translateY(5px) rotate(1deg); }
        }
        @keyframes progressHue { to { background-position: 220% 0; } }
    `;
    document.head.appendChild(style);
})();


/* =========================================================
   CODING PROFILES — ADVANCED POINTER / 3D MOTION
========================================================= */
(() => {
    const cards = document.querySelectorAll('.coding-profile-card');
    const counters = document.querySelectorAll('[data-coding-count]');
    if (!cards.length) return;

    cards.forEach((card, index) => {
        card.addEventListener('pointermove', (event) => {
            if (window.innerWidth <= 850) return;
            const r = card.getBoundingClientRect();
            const x = event.clientX - r.left;
            const y = event.clientY - r.top;
            const px = x / r.width;
            const py = y / r.height;
            const rx = (0.5 - py) * 9;
            const ry = (px - 0.5) * 11;
            card.style.setProperty('--mx', `${px * 100}%`);
            card.style.setProperty('--my', `${py * 100}%`);
            card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-12px) scale(1.012)`;
            card.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.16), transparent 34%), linear-gradient(145deg, rgba(255,255,255,.105), rgba(255,255,255,.025))`;
        });
        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
            card.style.background = '';
        });
    });

    // Animate only the visual counters already defined in the page; no external stats are fabricated.
    if ('IntersectionObserver' in window && counters.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = Number(el.dataset.codingCount || 0);
                const start = performance.now();
                const duration = 1100;
                const tick = now => {
                    const p = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.round(target * eased) + (target >= 5 ? '+' : '');
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                observer.unobserve(el);
            });
        }, { threshold: 0.4 });
        counters.forEach(c => observer.observe(c));
    }
})();

/* =========================================================
   CONTACT — ULTRA DYNAMIC MICRO-INTERACTIONS
   Visual-only enhancement; existing layout/actions preserved.
========================================================= */
(() => {
    const section = document.querySelector('.contact-section');
    if (!section) return;

    const socialCards = section.querySelectorAll('.social-contact');
    const contactLinks = section.querySelectorAll('.contact-main a');
    const form = section.querySelector('.contact-form');

    // Smooth pointer light + subtle 3D depth for social cards.
    socialCards.forEach((card) => {
        let raf = 0;
        card.addEventListener('pointermove', (event) => {
            if (window.innerWidth <= 850) return;
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const px = x / rect.width;
            const py = y / rect.height;
            const rx = (0.5 - py) * 7;
            const ry = (px - 0.5) * 9;

            card.style.setProperty('--mx', `${x}px`);
            card.style.setProperty('--my', `${y}px`);
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.012)`;
            });
        });
        card.addEventListener('pointerleave', () => {
            cancelAnimationFrame(raf);
            card.style.transform = '';
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        });
    });

    // Contact email/phone rows get a soft pointer aura without changing layout.
    contactLinks.forEach((link) => {
        link.addEventListener('pointermove', (event) => {
            const rect = link.getBoundingClientRect();
            link.style.setProperty('--contact-x', `${event.clientX - rect.left}px`);
            link.style.setProperty('--contact-y', `${event.clientY - rect.top}px`);
        });
    });

    // Form has a very subtle pointer-following highlight.
    if (form) {
        form.addEventListener('pointermove', (event) => {
            const rect = form.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            form.style.setProperty('--form-x', `${x}%`);
            form.style.setProperty('--form-y', `${y}%`);
        });
    }
})();


/* =========================================================
   ACHIEVEMENTS — LIQUID BUTTON INTERACTION
   Physical press + cursor liquid + ripple, inspired by the
   supplied screen recording.
========================================================= */
(() => {
    const cards = document.querySelectorAll('.liquid-achievement');
    if (!cards.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cards.forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            if (window.innerWidth <= 850 || reduceMotion) return;
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const rx = (0.5 - y) * 6;
            const ry = (x - 0.5) * 8;
            card.style.setProperty('--mx', `${x * 100}%`);
            card.style.setProperty('--my', `${y * 100}%`);
            card.style.transform = `perspective(1050px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-9px) scale(1.018)`;
        });

        card.addEventListener('pointerleave', () => {
            if (reduceMotion) return;
            card.style.transform = '';
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        });

        card.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) return;
            card.classList.add('is-pressed');

            const rect = card.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'liquid-ripple';
            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;
            card.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
        });

        const release = () => card.classList.remove('is-pressed');
        card.addEventListener('pointerup', release);
        card.addEventListener('pointercancel', release);
        card.addEventListener('pointerleave', release);
    });
})();

/* =========================================================
   PREMIUM DYNAMIC SKILLS — interaction engine
========================================================= */
(() => {
    const cards = document.querySelectorAll('.premium-skill-card');
    const filters = document.querySelectorAll('.skill-filter');

    cards.forEach((card, index) => {
        const level = Number(card.dataset.level || 0);
        card.style.setProperty('--level', level);

        const percent = card.querySelector('.skill-percent');
        const meter = card.querySelector('.skill-meter span');
        if (percent) percent.textContent = '0%';
        if (meter) meter.style.width = '0%';

        card.addEventListener('mousemove', (event) => {
            if (window.innerWidth <= 700) return;
            const r = card.getBoundingClientRect();
            const x = event.clientX - r.left;
            const y = event.clientY - r.top;
            const px = (x / r.width) * 100;
            const py = (y / r.height) * 100;
            const rx = ((y - r.height / 2) / r.height) * -4;
            const ry = ((x - r.width / 2) / r.width) * 4;
            card.style.setProperty('--mx', `${px}%`);
            card.style.setProperty('--my', `${py}%`);
            card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px) translateZ(5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        const animateLevel = () => {
            if (!percent || !meter || card.classList.contains('is-hidden')) return;
            card.classList.add('active-skill');
            meter.style.width = `${level}%`;
            const start = performance.now();
            const duration = 1000;
            const tick = (now) => {
                const p = Math.min((now - start) / duration, 1);
                percent.textContent = `${Math.round(level * (1 - Math.pow(1 - p, 3)))}%`;
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        card.dataset.animateLevel = index;
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const card = entry.target;
                const level = Number(card.dataset.level || 0);
                const percent = card.querySelector('.skill-percent');
                const meter = card.querySelector('.skill-meter span');
                card.classList.add('active-skill');
                if (meter) meter.style.width = `${level}%`;
                if (percent) {
                    const start = performance.now();
                    const duration = 950;
                    const tick = now => {
                        const p = Math.min((now - start) / duration, 1);
                        percent.textContent = `${Math.round(level * (1 - Math.pow(1 - p, 3)))}%`;
                        if (p < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }
                observer.unobserve(card);
            });
        }, { threshold: 0.18 });
        cards.forEach(card => observer.observe(card));
    } else {
        cards.forEach(card => {
            card.classList.add('active-skill');
            const level = Number(card.dataset.level || 0);
            card.querySelector('.skill-percent').textContent = `${level}%`;
            card.querySelector('.skill-meter span').style.width = `${level}%`;
        });
    }

    filters.forEach(button => {
        button.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;

            cards.forEach((card, i) => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('is-hidden', !show);
                if (show) {
                    card.animate([
                        { opacity: 0, transform: 'translateY(14px) scale(.98)' },
                        { opacity: 1, transform: 'translateY(0) scale(1)' }
                    ], { duration: 420, delay: i * 35, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' });
                }
            });
        });
    });
})();


/* =========================================================
   NEXT-LEVEL SKILLS — live mini visualizer
========================================================= */
(() => {
    const cards = document.querySelectorAll('.premium-skill-card');
    if (!cards.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cards.forEach((card) => {
        const level = Number(card.dataset.level || 0);
        card.style.setProperty('--skill-level', level);

        const bars = card.querySelectorAll('.mini-bars i');
        const base = [0.36,0.58,0.46,0.82,0.54,0.72,0.40];
        bars.forEach((bar, i) => {
            const normalized = Math.max(0.18, Math.min(1, base[i] * (0.72 + level / 180)));
            bar.style.height = `${Math.round(normalized * 100)}%`;
        });

        if (!reduced) {
            card.addEventListener('mouseenter', () => {
                bars.forEach((bar, i) => {
                    bar.style.animationDuration = `${1.05 + i * .08}s`;
                });
            });
            card.addEventListener('mouseleave', () => {
                bars.forEach((bar) => bar.style.animationDuration = '1.8s');
            });
        }
    });

    // Keep the live label visually alive without changing its meaning.
    const liveLabel = document.querySelector('.skills-live');
    if (liveLabel && !reduced) {
        let phase = 0;
        setInterval(() => {
            phase = (phase + 1) % 3;
            const labels = ['Learning continuously', 'Building through projects', 'Improving every day'];
            const text = liveLabel.querySelector('span:last-child');
            if (text) text.textContent = labels[phase];
        }, 2600);
    }
})();

/* EXPERIENCE NEXT-LEVEL INTERACTION */
(() => {
 const lab=document.querySelector('[data-experience-lab]'); if(!lab)return;
 const cards=[...lab.querySelectorAll('.experience-module')];
 const mode=lab.querySelector('[data-telemetry-mode]'), stack=lab.querySelector('[data-telemetry-stack]'), status=lab.querySelector('[data-telemetry-status]'), clock=lab.querySelector('[data-experience-clock]');
 const states={software:['BUILD','JAVA • WEB','IN PROGRESS'],problem:['SOLVE','DSA • ALGO','PRACTICING'],future:['EXPLORE','AI • ML','LEARNING']};
 function activate(c){cards.forEach(x=>x.classList.remove('is-active'));c.classList.add('is-active');const v=states[c.dataset.module]||states.software;if(mode)mode.textContent=v[0];if(stack)stack.textContent=v[1];if(status)status.textContent=v[2]}
 cards.forEach(c=>{c.addEventListener('mouseenter',()=>activate(c));c.addEventListener('focus',()=>activate(c));c.addEventListener('click',()=>activate(c));});
 if(window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){lab.addEventListener('pointermove',e=>{const r=lab.getBoundingClientRect();lab.style.setProperty('--mx',`${((e.clientX-r.left)/r.width)*100}%`);lab.style.setProperty('--my',`${((e.clientY-r.top)/r.height)*100}%`)},{passive:true});cards.forEach(c=>{c.addEventListener('pointermove',e=>{if(innerWidth<850)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) translateY(-7px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateZ(8px)`});c.addEventListener('pointerleave',()=>c.style.transform='')})}
 if(clock){const start=performance.now();const tick=t=>{let s=Math.floor((t-start)/1000);clock.textContent=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;requestAnimationFrame(tick)};requestAnimationFrame(tick)}
})();

/* EDUCATION JOURNEY — scroll progress and active milestone */
(() => {
    const timeline = document.querySelector('.roadmap-timeline');
    if (!timeline) return;
    const milestones = [...timeline.querySelectorAll('.roadmap-item')];
    if (!milestones.length) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const updateJourney = () => {
        frame = 0;
        const rect = timeline.getBoundingClientRect();
        const travel = rect.height + window.innerHeight * 0.45;
        const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.72 - rect.top) / travel));
        timeline.style.setProperty('--journey-progress', progress.toFixed(3));
    };
    const scheduleUpdate = () => {
        if (!frame) frame = requestAnimationFrame(updateJourney);
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('journey-current');
                else entry.target.classList.remove('journey-current');
            });
        }, { threshold: 0.38, rootMargin: '-8% 0px -18% 0px' });
        milestones.forEach(item => observer.observe(item));
    }

    if (!reducedMotion) {
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate, { passive: true });
    }
    updateJourney();
})();

/* =========================================================
   CONTACT — CURSOR-ACTIVE ICON GLOW
   Visual-only interaction; no layout or link behavior changes.
========================================================= */
(() => {
    const section = document.querySelector('.contact-section');
    if (!section) return;

    const socialCards = section.querySelectorAll('.social-contact');

    socialCards.forEach((card) => {
        card.addEventListener('pointerenter', () => {
            card.classList.add('cursor-active');
        });

        card.addEventListener('pointerleave', () => {
            card.classList.remove('cursor-active');
        });
    });
})();

/* =========================================================
   PROJECT CARD LOGOS — DYNAMIC POINTER COLOR
   Keeps every project card/content unchanged. The logo hue
   follows the pointer position inside its own card.
========================================================= */
(() => {
    const projectCards = document.querySelectorAll('#projects .project-card');
    if (!projectCards.length) return;

    const baseHues = [195, 345, 270, 205];

    projectCards.forEach((card, index) => {
        const icon = card.querySelector('.project-icon');
        if (!icon) return;

        const baseHue = baseHues[index % baseHues.length];
        icon.style.setProperty('--project-hue', baseHue);
        icon.style.setProperty('--project-x', '50%');
        icon.style.setProperty('--project-y', '50%');

        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
            const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

            const hue = (baseHue + ((x - 0.5) * 110) + ((0.5 - y) * 35) + 360) % 360;

            icon.style.setProperty('--project-hue', hue.toFixed(1));
            icon.style.setProperty('--project-x', `${(x * 100).toFixed(1)}%`);
            icon.style.setProperty('--project-y', `${(y * 100).toFixed(1)}%`);
        });

        card.addEventListener('pointerleave', () => {
            icon.style.setProperty('--project-hue', baseHue);
            icon.style.setProperty('--project-x', '50%');
            icon.style.setProperty('--project-y', '50%');
        });
    });
})();

/* =========================================================
   SKILL CARD LOGOS — DYNAMIC POINTER COLOR
   Same interaction as the project card logos.
   Keeps every skill card/content unchanged.
========================================================= */
(() => {
    const skillCards = document.querySelectorAll('#skills .premium-skill-card');
    if (!skillCards.length) return;

    const baseHues = [195, 345, 270, 205, 48, 188, 275, 35, 145];

    skillCards.forEach((card, index) => {
        const icon = card.querySelector('.premium-skill-icon');
        if (!icon) return;

        const baseHue = baseHues[index % baseHues.length];
        icon.style.setProperty('--skill-logo-hue', baseHue);
        icon.style.setProperty('--skill-logo-x', '50%');
        icon.style.setProperty('--skill-logo-y', '50%');

        card.addEventListener('pointermove', (event) => {
            if (window.innerWidth <= 700) return;

            const rect = card.getBoundingClientRect();
            const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
            const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

            const hue = (baseHue + ((x - 0.5) * 110) + ((0.5 - y) * 35) + 360) % 360;

            icon.style.setProperty('--skill-logo-hue', hue.toFixed(1));
            icon.style.setProperty('--skill-logo-x', `${(x * 100).toFixed(1)}%`);
            icon.style.setProperty('--skill-logo-y', `${(y * 100).toFixed(1)}%`);
        });

        card.addEventListener('pointerleave', () => {
            icon.style.setProperty('--skill-logo-hue', baseHue);
            icon.style.setProperty('--skill-logo-x', '50%');
            icon.style.setProperty('--skill-logo-y', '50%');
        });
    });
})();

/* =========================================================
   PREMIUM SOAP BUBBLES
   Generates varied bubbles so the background feels organic,
   lightweight and continuously alive.
========================================================= */
(() => {
    const layer = document.getElementById('soapBubbles');
    if (!layer) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const count = window.innerWidth <= 700 ? 20 : 34;

    const rand = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('span');
        bubble.className = 'soap-bubble';

        const size = rand(18, 138);
        const x = rand(1, 99);
        const delay = rand(-24, 0);
        const duration = rand(12, 27);
        const drift = rand(-190, 190);
        const depth = rand(.12, 1.05);
        const opacity = rand(.25, .78);
        const hue = rand(165, 330);
        const shine = rand(.55, 1);

        if (size < 34) bubble.classList.add('micro');
        if (size > 105) bubble.classList.add('hero-bubble');

        bubble.style.setProperty('--size', `${size.toFixed(1)}px`);
        bubble.style.setProperty('--x', `${x.toFixed(2)}%`);
        bubble.style.setProperty('--delay', `${delay.toFixed(2)}s`);
        bubble.style.setProperty('--duration', `${duration.toFixed(2)}s`);
        bubble.style.setProperty('--drift', `${drift.toFixed(1)}px`);
        bubble.style.setProperty('--depth', depth.toFixed(2));
        bubble.style.setProperty('--opacity', opacity.toFixed(2));
        bubble.style.setProperty('--hue', hue.toFixed(0));
        bubble.style.setProperty('--shine', shine.toFixed(2));

        layer.appendChild(bubble);
    }

    if (reduceMotion.matches) return;

    let raf = 0;
    let mx = 0;
    let my = 0;

    window.addEventListener('pointermove', (event) => {
        mx = ((event.clientX / window.innerWidth) - .5) * 34;
        my = ((event.clientY / window.innerHeight) - .5) * 14;

        if (raf) return;
        raf = requestAnimationFrame(() => {
            layer.style.setProperty('--bubble-mouse-x', `${mx.toFixed(1)}px`);
            layer.style.setProperty('--bubble-mouse-y', `${my.toFixed(1)}px`);
            raf = 0;
        });
    }, { passive: true });
})();


/* =========================================================
   LIQUID GLASS NAV — SINGLE FLUID SPRING ENGINE
   One controller owns the active pill so scroll + click never
   fight each other. Uses a critically-damped spring with a
   tiny velocity component for a soft, natural glide.
========================================================= */
(() => {
  const menu = document.querySelector('.nav-menu');
  const links = [...document.querySelectorAll('.nav-menu .nav-pill')];
  if (!menu || !links.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let target = { x: 0, y: 0, w: 0, h: 0 };
  let current = { x: 0, y: 0, w: 0, h: 0 };
  let velocity = { x: 0, y: 0, w: 0, h: 0 };
  let raf = 0;
  let ready = false;
  let measureQueued = false;

  const activeLink = () =>
    links.find(link => link.classList.contains('active')) || links[0];

  const write = () => {
    menu.style.setProperty('--nav-fluid-x', `${current.x}px`);
    menu.style.setProperty('--nav-fluid-y', `${current.y}px`);
    menu.style.setProperty('--nav-fluid-w', `${current.w}px`);
    menu.style.setProperty('--nav-fluid-h', `${current.h}px`);
  };

  const measure = (instant = false) => {
    const active = activeLink();
    if (!active) return;

    const mr = menu.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    target = {
      x: ar.left - mr.left,
      y: ar.top - mr.top,
      w: ar.width,
      h: ar.height
    };

    if (!ready || instant || reduce.matches) {
      current = { ...target };
      velocity = { x: 0, y: 0, w: 0, h: 0 };
      ready = true;
      write();
    }

    if (!raf && !reduce.matches) raf = requestAnimationFrame(tick);
  };

  const queueMeasure = (instant = false) => {
    if (measureQueued) return;
    measureQueued = true;
    requestAnimationFrame(() => {
      measureQueued = false;
      measure(instant);
    });
  };

  const tick = () => {
    raf = 0;
    if (reduce.matches) {
      current = { ...target };
      velocity = { x: 0, y: 0, w: 0, h: 0 };
      write();
      return;
    }

    // Soft spring: responsive on click, silky while scrolling,
    // with no long tail or visible snapping.
    const stiffness = 0.18;
    const damping = 0.72;
    const spring = (key) => {
      const delta = target[key] - current[key];
      velocity[key] = (velocity[key] + delta * stiffness) * damping;
      current[key] += velocity[key];
    };

    spring('x');
    spring('y');
    spring('w');
    spring('h');
    write();

    const moving =
      Math.abs(target.x - current.x) > 0.035 ||
      Math.abs(target.y - current.y) > 0.035 ||
      Math.abs(target.w - current.w) > 0.035 ||
      Math.abs(target.h - current.h) > 0.035 ||
      Math.abs(velocity.x) > 0.035 ||
      Math.abs(velocity.w) > 0.035;

    if (moving) raf = requestAnimationFrame(tick);
    else {
      current = { ...target };
      velocity = { x: 0, y: 0, w: 0, h: 0 };
      write();
    }
  };

  links.forEach(link => {
    link.addEventListener('click', () => {
      // Make the clicked item the target immediately; the spring
      // handles the visual travel.
      links.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
      queueMeasure(false);
    });
  });

  window.addEventListener('scroll', () => queueMeasure(false), { passive: true });
  window.addEventListener('resize', () => queueMeasure(true), { passive: true });
  window.addEventListener('load', () => queueMeasure(true), { once: true });

  if (reduce.addEventListener) {
    reduce.addEventListener('change', () => queueMeasure(true));
  }

  measure(true);
})();

/* Modern 3D liquid-glass navigation interaction */
(() => {
  const nav = document.querySelector('.nav-container');
  if (!nav || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const reset = () => {
    nav.style.setProperty('--rx','0deg');
    nav.style.setProperty('--ry','0deg');
    nav.style.setProperty('--mx','50%');
    nav.style.setProperty('--my','50%');
  };
  nav.addEventListener('pointermove', (e) => {
    const r = nav.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width;
    const y = (e.clientY-r.top)/r.height;
    nav.style.setProperty('--ry', `${((x-.5)*2.2).toFixed(2)}deg`);
    nav.style.setProperty('--rx', `${((.5-y)*1.6).toFixed(2)}deg`);
    nav.style.setProperty('--mx', `${(x*100).toFixed(1)}%`);
    nav.style.setProperty('--my', `${(y*100).toFixed(1)}%`);
  });
  nav.addEventListener('pointerleave', reset);
})();

/* =========================================================
   ABONTI-STYLE PROFILE CARD MICRO-ORBS + SMOOTH GLASS TILT
========================================================= */
(() => {
  const wrapper = document.querySelector('.profile-card-wrapper');
  const card = document.getElementById('profileCard');
  if (!wrapper || !card) return;

  // Decorative particles live only inside the profile card.
  if (!card.querySelector('.profile-orb')) {
    const frag = document.createDocumentFragment();
    const positions = [
      [12,24,7,8],[88,30,5,11],[18,74,5,14],[83,70,8,10],[9,52,4,12],[92,55,4,15]
    ];
    positions.forEach(([x,y,size,dur], i) => {
      const orb = document.createElement('span');
      orb.className = 'profile-orb';
      orb.style.left = `${x}%`;
      orb.style.top = `${y}%`;
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.animation = `profileOrbFloat ${dur}s ease-in-out ${i * .45}s infinite alternate`;
      frag.appendChild(orb);
    });
    card.appendChild(frag);
  }

  if (!document.getElementById('profileOrbKeyframes')) {
    const style = document.createElement('style');
    style.id = 'profileOrbKeyframes';
    style.textContent = `
      @keyframes profileOrbFloat {
        from { transform: translate3d(0,0,0) scale(.75); opacity:.35; }
        to { transform: translate3d(10px,-14px,0) scale(1.18); opacity:.9; }
      }
    `;
    document.head.appendChild(style);
  }

  let raf = 0;
  let tx = 0, ty = 0, tz = 0;
  let cx = 0, cy = 0, cz = 0;

  const render = () => {
    cx += (tx - cx) * .12;
    cy += (ty - cy) * .12;
    cz += (tz - cz) * .12;
    card.style.transform = `perspective(1500px) rotateX(${cx}deg) rotateY(${cy}deg) translate3d(${cz}px,${cz * .55}px,0) scale(${1 + Math.abs(cx + cy) * .0009})`;
    raf = requestAnimationFrame(render);
  };
  render();

  wrapper.addEventListener('pointermove', (e) => {
    if (window.innerWidth <= 850) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    tx = (0.5 - py) * 13;
    ty = (px - 0.5) * 15;
    tz = (px - 0.5) * 5;
    wrapper.style.setProperty('--profile-mx', `${px * 100}%`);
    wrapper.style.setProperty('--profile-my', `${py * 100}%`);
  }, { passive: true });

  wrapper.addEventListener('pointerleave', () => {
    tx = 0; ty = 0; tz = 0;
    wrapper.style.setProperty('--profile-mx','50%');
    wrapper.style.setProperty('--profile-my','50%');
  });

  window.addEventListener('beforeunload', () => cancelAnimationFrame(raf));
})();


/* =========================================================
   CURSOR-FOLLOW NAVIGATION — SMOOTH 3D FLOAT
   The glass navigation gently follows the cursor and each
   section gets a subtle depth/parallax response.
========================================================= */
(() => {
  const nav = document.querySelector('.nav-container');
  if (!nav || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let tx = 0, ty = 0, trX = 0, trY = 0;
  let cx = 0, cy = 0, crX = 0, crY = 0;
  let active = false;

  const animate = () => {
    cx += (tx - cx) * 0.075;
    cy += (ty - cy) * 0.075;
    crX += (trX - crX) * 0.09;
    crY += (trY - crY) * 0.09;

    nav.style.setProperty('--cursor-x', `${cx.toFixed(2)}px`);
    nav.style.setProperty('--cursor-y', `${cy.toFixed(2)}px`);
    nav.style.setProperty('--cursor-rx', `${crX.toFixed(2)}deg`);
    nav.style.setProperty('--cursor-ry', `${crY.toFixed(2)}deg`);

    const items = nav.querySelectorAll('.logo, .nav-menu, .nav-actions');
    items.forEach((el, i) => {
      const factor = [0.28, 0.16, 0.24][i] ?? 0.18;
      el.style.setProperty('--nav-depth-x', `${(cx * factor).toFixed(2)}px`);
      el.style.setProperty('--nav-depth-y', `${(cy * factor).toFixed(2)}px`);
    });
    requestAnimationFrame(animate);
  };

  nav.addEventListener('pointerenter', () => { active = true; });
  nav.addEventListener('pointermove', (e) => {
    const r = nav.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    tx = (x - 0.5) * 7;
    ty = (y - 0.5) * 4;
    trY = (x - 0.5) * 5.2;
    trX = (0.5 - y) * 3.8;
    nav.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    nav.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
  });
  nav.addEventListener('pointerleave', () => {
    active = false;
    tx = ty = trX = trY = 0;
    nav.style.setProperty('--mx', '50%');
    nav.style.setProperty('--my', '50%');
  });
  animate();
})();

/* =========================================================
   VIDEO RESUME — ULTRA MODERN CONTROLS
   Scoped only to the video-resume section.
========================================================= */
(() => {
    const video = document.getElementById("resumeVideo");
    const section = document.querySelector(".video-ultra-panel");
    const box = document.querySelector(".video-ultra-box");
    const placeholder = document.getElementById("videoPlaceholder");
    const center = document.getElementById("videoCenterPlay");
    const play = document.getElementById("videoPlay");
    const mute = document.getElementById("videoMute");
    const volume = document.getElementById("videoVolume");
    const fullscreen = document.getElementById("videoFullscreen");
    const progress = document.getElementById("videoProgress");
    const time = document.getElementById("videoTime");
    if (!video || !section || !box) return;

    const fmt = (seconds) => {
        if (!Number.isFinite(seconds)) return "00:00";
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const sync = () => {
        const duration = video.duration || 0;
        const value = duration ? (video.currentTime / duration) * 100 : 0;
        if (progress) {
            progress.value = value;
            progress.style.setProperty("--progress-level", `${value}%`);
        }
        if (time) time.textContent = `${fmt(video.currentTime)} / ${fmt(duration)}`;
        box.classList.toggle("video-active", !video.paused);
        section.classList.toggle("video-playing", !video.paused);
        if (play) play.innerHTML = video.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
        if (center) center.innerHTML = video.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
        if (mute) {
            const silent = video.muted || video.volume === 0;
            mute.innerHTML = silent ? '<i class="fa-solid fa-volume-xmark"></i>' : (video.volume < .5 ? '<i class="fa-solid fa-volume-low"></i>' : '<i class="fa-solid fa-volume-high"></i>');
            mute.setAttribute("aria-label", silent ? "Unmute video" : "Mute video");
        }
        if (volume) {
            volume.value = video.muted ? 0 : video.volume;
            volume.style.setProperty("--volume-level", `${(video.muted ? 0 : video.volume) * 100}%`);
        }
    };

    const togglePlay = () => {
        if (video.paused) video.play().catch(() => {});
        else video.pause();
    };

    center?.addEventListener("click", togglePlay);
    play?.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    mute?.addEventListener("click", () => {
        if (video.muted || video.volume === 0) {
            video.muted = false;
            if (video.volume === 0) video.volume = 0.75;
        } else {
            video.muted = true;
        }
        sync();
    });
    volume?.addEventListener("input", () => {
        const value = Number(volume.value);
        video.volume = value;
        video.muted = value === 0;
        sync();
    });
    fullscreen?.addEventListener("click", () => {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else box.requestFullscreen?.();
    });
    progress?.addEventListener("input", () => {
        if (video.duration) video.currentTime = (Number(progress.value) / 100) * video.duration;
    });
    video.addEventListener("timeupdate", sync);
    video.addEventListener("loadedmetadata", sync);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("volumechange", sync);
    video.addEventListener("loadeddata", () => { if (placeholder) placeholder.style.display = "none"; sync(); });
    video.addEventListener("error", () => { if (placeholder) placeholder.style.display = "flex"; sync(); });
    box.addEventListener("mousemove", (e) => {
        const r = box.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        box.style.transform = `perspective(1100px) rotateX(${(-y * 1.5).toFixed(2)}deg) rotateY(${(x * 1.8).toFixed(2)}deg) translateZ(0)`;
    });
    box.addEventListener("mouseleave", () => { box.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)"; });
    sync();
})();

/* EDUCATION — achievement-style cursor liquid + 3D interaction */
(() => {
  const cards = document.querySelectorAll('.roadmap-item');
  if (!cards.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cards.forEach(card => {
    card.addEventListener('pointermove', event => {
      if (window.innerWidth <= 850 || reduceMotion) return;
      const r = card.getBoundingClientRect();
      const x = (event.clientX-r.left)/r.width;
      const y = (event.clientY-r.top)/r.height;
      card.style.setProperty('--mx', `${x*100}%`);
      card.style.setProperty('--my', `${y*100}%`);
      const rx = (0.5-y)*5;
      const ry = (x-0.5)*7;
      card.style.transform = `perspective(1050px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-9px) scale(1.012)`;
    });
    card.addEventListener('pointerleave', () => {
      if (reduceMotion) return;
      card.style.transform='';
      card.style.setProperty('--mx','50%');
      card.style.setProperty('--my','50%');
    });
  });
})();

/* EDUCATION — reveal on downward scroll, hide again when scrolling upward */
(() => {
  const section = document.querySelector('.academic-roadmap');
  const cards = [...document.querySelectorAll('.academic-roadmap .roadmap-item')];
  if (!section || !cards.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    cards.forEach(card => card.classList.add('roadmap-visible'));
    return;
  }

  let lastY = window.scrollY;
  let direction = 'down';
  let ticking = false;

  const updateDirection = () => {
    const y = window.scrollY;
    direction = y >= lastY ? 'down' : 'up';
    lastY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateDirection);
      ticking = true;
    }
  }, { passive: true });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const card = entry.target;
      if (entry.isIntersecting && direction === 'down') {
        card.classList.add('roadmap-visible');
      } else if (!entry.isIntersecting && direction === 'up') {
        card.classList.remove('roadmap-visible');
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '-8% 0px -18% 0px'
  });

  cards.forEach(card => observer.observe(card));
})();
