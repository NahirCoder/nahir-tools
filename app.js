document.addEventListener("DOMContentLoaded", async () => {

    const res = await fetch("/api");
    const data = await res.json();

    console.log("API:", data);

    // SITE
    document.getElementById("name").textContent = data.site?.Name || "";
    document.getElementById("slogan").textContent = data.site?.Slogan || "";

    if (data.site?.Logo?.[0]?.url) {
        document.getElementById("logo").src = data.site.Logo[0].url;
    }

    // PORTFOLIO
    const container = document.getElementById("list") || document.getElementById("portfolio");

    if (container) {
        container.innerHTML = "";

        data.websites.forEach(item => {
            const f = item.fields;

            const div = document.createElement("div");

            div.innerHTML = `
                <h3>${f["Website Name"]}</h3>
                <p>${f.Comment}</p>
                <p>⭐ ${f.Stars}/5</p>
                <a href="${f["Website URL"]}" target="_blank">Visit</a>
                <hr>
            `;

            container.appendChild(div);
        });
    }

});
