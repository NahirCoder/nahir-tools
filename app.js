document.addEventListener("DOMContentLoaded", async () => {

    // CONTACT BUTTON
    const contactBtn = document.getElementById("contactBtn");
    const contactMessage = document.getElementById("contactMessage");

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

            const popup = window.open(gmailUrl, "_blank");

            if (!popup) {
                contactMessage.textContent =
                    "Please Sign In To Your Email Address To Contact";
            }
        }
    });

    try {

        const res = await fetch("/api");
        const data = await res.json();

        console.log("API:", data);

        // SITE
        document.getElementById("name").textContent =
            data.site?.Name || "";

        document.getElementById("slogan").textContent =
            data.site?.Slogan || "";

        if (data.site?.Logo?.[0]?.url) {
            document.getElementById("logo").src =
                data.site.Logo[0].url;
        }

        // PORTFOLIO
        const container = document.getElementById("list");
        container.innerHTML = "";

        (data.websites || []).forEach(item => {

            const f = item.fields;

            const div = document.createElement("div");
            div.className = "project";

            div.innerHTML = `
                <p><strong>Visit the website I made</strong></p>

                <h3>${f["Website Name"] || ""}</h3>

                <p>
                    <a
                        class="project-link"
                        href="${f["Website URL"] || "#"}"
                        target="_blank"
                    >
                        ${f["Website URL"] || ""}
                    </a>
                </p>

                <p>⭐ ${f.Stars || 0}/5</p>

                <p>
                    <strong>Comment by owner:</strong>
                    ${f.Comment || ""}
                </p>

                <hr>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error(error);
    }

});
