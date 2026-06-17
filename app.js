document.addEventListener("DOMContentLoaded", async () => {

    try {

        const res = await fetch("/api");
        const data = await res.json();

        console.log("API:", data);

        // Site Settings
        document.getElementById("name").textContent =
            data.site?.Name || "";

        document.getElementById("slogan").textContent =
            data.site?.Slogan || "";

        if (data.site?.Logo?.[0]?.url) {
            document.getElementById("logo").src =
                data.site.Logo[0].url;
        }

        // Portfolio
        const container = document.getElementById("list");
        container.innerHTML = "";

        (data.websites || []).forEach(item => {

            const f = item.fields;

            const div = document.createElement("div");
            div.className = "project";

            div.innerHTML = `
                <p><strong>Visit the website I made</strong></p>

                <h3>${f["Website Name"] || ""}</h3>

                <p class="project-url">
                    ${f["Website URL"] || ""}
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
