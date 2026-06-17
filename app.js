document.addEventListener("DOMContentLoaded", async () => {

    // CONTACT BUTTON (FIXED)
    document.getElementById("contactBtn").addEventListener("click", () => {
        // WhatsApp-style action via email (or replace with WhatsApp if needed)
        window.location.href = "mailto:nahirtools@gmail.com?subject=Website Order";
    });

    const res = await fetch("/api");
    const data = await res.json();

    // SITE
    document.getElementById("name").textContent = data.site?.Name || "";
    document.getElementById("slogan").textContent = data.site?.Slogan || "";

    if (data.site?.Logo?.[0]?.url) {
        document.getElementById("logo").src = data.site.Logo[0].url;
    }

    // PORTFOLIO
    const container = document.getElementById("list");
    container.innerHTML = "";

    (data.websites || []).forEach(item => {
        const f = item.fields;

        const div = document.createElement("div");

        div.innerHTML = `
            <p><b>Visit the website I made</b></p>

            <h3>${f["Website Name"]}</h3>

            <p>${f["Website URL"]}</p>

            <p>⭐ ${f.Stars}/5</p>

            <p><b>Comment by owner:</b> ${f.Comment}</p>

            <hr>
        `;

        container.appendChild(div);
    });

});
