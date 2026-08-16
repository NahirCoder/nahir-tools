document.addEventListener("DOMContentLoaded", async () => {

    /* =========================================================
       FOOTER YEAR
    ========================================================= */

    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /* =========================================================
       CONTACT BUTTON
    ========================================================= */

    const contactBtn = document.getElementById("contactBtn");
    const contactMessage = document.getElementById("contactMessage");

    if (contactBtn) {

        contactBtn.addEventListener("click", () => {

            const isMobile =
                /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
                    navigator.userAgent
                );

            if (isMobile) {

                window.location.href =
                    "mailto:nahirtools@gmail.com?subject=Website%20Order";

            } else {

                const gmailUrl =
                    "https://mail.google.com/mail/?view=cm&fs=1&to=nahirtools@gmail.com&su=Website%20Order";

                const popup = window.open(
                    gmailUrl,
                    "_blank"
                );

                if (!popup && contactMessage) {

                    contactMessage.textContent =
                        "Please sign in to your email address to contact us.";

                }

            }

        });

    }


    /* =========================================================
       LOAD DATA
    ========================================================= */

    try {

        const res = await fetch("/api");

        if (!res.ok) {
            throw new Error(
                `API request failed: ${res.status}`
            );
        }

        const data = await res.json();

        console.log("API:", data);


        /* =====================================================
           SITE INFORMATION
        ===================================================== */

        const nameElement =
            document.getElementById("name");

        const sloganElement =
            document.getElementById("slogan");

        const logoElement =
            document.getElementById("logo");

        const headerLogoElement =
            document.getElementById("header-logo");


        const businessName =
            data.site?.Name || "Nahir Tools";

        const slogan =
            data.site?.Slogan ||
            "Modern websites for small businesses.";


        if (nameElement) {
            nameElement.textContent =
                businessName;
        }


        if (sloganElement) {
            sloganElement.textContent =
                slogan;
        }


        /* =====================================================
           LOGO
        ===================================================== */

        const logoUrl =
            data.site?.Logo?.[0]?.url;


        if (logoUrl) {

            if (logoElement) {

                logoElement.src =
                    logoUrl;

                logoElement.style.display =
                    "block";

            }


            if (headerLogoElement) {

                headerLogoElement.src =
                    logoUrl;

                headerLogoElement.style.display =
                    "block";

            }

        }


        /* =====================================================
           PORTFOLIO
        ===================================================== */

        const container =
            document.getElementById("list");


        if (!container) {
            return;
        }


        container.innerHTML = "";


        const websites =
            data.websites || [];


        if (websites.length === 0) {

            container.innerHTML = `
                <div class="project">
                    <h3>Portfolio coming soon</h3>

                    <p>
                        We're currently preparing our
                        portfolio. Check back soon.
                    </p>
                </div>
            `;

            return;
        }


        websites.forEach(item => {

            const fields =
                item.fields || {};


            const websiteName =
                fields["Website Name"] ||
                "Website Project";


            const websiteUrl =
                fields["Website URL"] ||
                "#";


            const stars =
                fields.Stars ||
                0;


            const comment =
                fields.Comment ||
                "";


            const div =
                document.createElement("article");


            div.className =
                "project";


            div.innerHTML = `

                <p>
                    Featured Project
                </p>

                <h3>
                    ${escapeHtml(websiteName)}
                </h3>

                <p>
                    <a
                        class="project-link"
                        href="${escapeAttribute(websiteUrl)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Website →
                    </a>
                </p>

                <p>
                    ⭐ ${escapeHtml(String(stars))}/5
                </p>

                ${
                    comment
                        ? `
                            <p>
                                <strong>
                                    Client Feedback
                                </strong>
                            </p>

                            <p>
                                "${escapeHtml(comment)}"
                            </p>
                        `
                        : ""
                }

            `;


            container.appendChild(div);

        });


    } catch (error) {

        console.error(
            "Failed to load website data:",
            error
        );


        const container =
            document.getElementById("list");


        if (container) {

            container.innerHTML = `
                <div class="project">

                    <h3>
                        Unable to load portfolio
                    </h3>

                    <p>
                        Please try again later.
                    </p>

                </div>
            `;

        }

    }

});


/* =========================================================
   SECURITY HELPERS
========================================================= */

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}