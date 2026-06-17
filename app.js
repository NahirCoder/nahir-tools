fetch("/api")
.then(r => r.json())
.then(data => {

    document.getElementById("name").textContent = data.site?.Name || "";
    document.getElementById("slogan").textContent = data.site?.Slogan || "";

    if (data.site?.Logo?.[0]?.url) {
        document.getElementById("logo").src = data.site.Logo[0].url;
    }

    const list = document.getElementById("list");

    (data.websites || []).forEach(w => {
        const f = w.fields;

        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${f["Website Name"]}</h3>
            <p>${f.Comment}</p>
            <a href="${f["Website URL"]}" target="_blank">Visit</a>
        `;

        list.appendChild(div);
    });

});

document.getElementById("contact").onclick = () => {
    window.location.href = "mailto:nahirtools@gmail.com";
};
