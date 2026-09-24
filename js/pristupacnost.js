document.addEventListener("DOMContentLoaded", function () {
    const dugmeTema = document.getElementById("promeni-temu");
    const izborFonta = document.getElementById("velicina-fonta");
    const bootstrapStranica = Boolean(
        document.querySelector('link[href="bootstrap/bootstrap.min.css"]')
    );

    const sacuvanaTema = localStorage.getItem("tema") || "svetla";
    const sacuvanFont = localStorage.getItem("font") || "normalan";

    function postaviTemu(tema) {
        const tamna = tema === "tamna";

        document.body.classList.toggle("tamna-tema", tamna);
        document.documentElement.setAttribute(
            "data-bs-theme",
            tamna ? "dark" : "light"
        );

        if (dugmeTema) {
            dugmeTema.textContent = tamna ? "Svetla tema" : "Tamna tema";
        }
    }

    function postaviFont(velicina) {
        document.documentElement.classList.remove(
            "font-manji",
            "font-veci"
        );

        if (velicina === "manji") {
            document.documentElement.classList.add("font-manji");
        } else if (velicina === "veci") {
            document.documentElement.classList.add("font-veci");
        }

        if (bootstrapStranica) {
            const telo = document.body;
            const glavniNaslov = document.querySelector("h1");
            const podnaslovi = document.querySelectorAll("h2");

            telo.classList.remove("small", "fs-5");

            if (glavniNaslov) {
                glavniNaslov.classList.remove(
                    "display-3",
                    "display-4",
                    "display-5"
                );
            }

            podnaslovi.forEach(function (naslov) {
                naslov.classList.remove("fs-1", "fs-3");
            });

            if (velicina === "manji") {
                telo.classList.add("small");

                if (glavniNaslov) {
                    glavniNaslov.classList.add("display-5");
                }

                podnaslovi.forEach(function (naslov) {
                    naslov.classList.add("fs-3");
                });
            } else if (velicina === "veci") {
                telo.classList.add("fs-5");

                if (glavniNaslov) {
                    glavniNaslov.classList.add("display-3");
                }

                podnaslovi.forEach(function (naslov) {
                    naslov.classList.add("fs-1");
                });
            } else if (glavniNaslov) {
                glavniNaslov.classList.add("display-4");
            }
        }

        if (izborFonta) {
            izborFonta.value = velicina;
        }
    }

    postaviTemu(sacuvanaTema);
    postaviFont(sacuvanFont);

    if (dugmeTema) {
        dugmeTema.addEventListener("click", function () {
            const novaTema = document.body.classList.contains("tamna-tema")
                ? "svetla"
                : "tamna";

            localStorage.setItem("tema", novaTema);
            postaviTemu(novaTema);
        });
    }

    if (izborFonta) {
        izborFonta.addEventListener("change", function () {
            localStorage.setItem("font", izborFonta.value);
            postaviFont(izborFonta.value);
        });
    }
});