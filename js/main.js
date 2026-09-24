document.addEventListener("DOMContentLoaded", function () {
    const godina = document.getElementById("godina");
    if (godina) {
        godina.textContent = new Date().getFullYear();
    }

    const dugmeMeni = document.querySelector(".dugme-meni");
    const glavniMeni = document.querySelector(".glavni-meni");

    if (dugmeMeni && glavniMeni) {
        dugmeMeni.addEventListener("click", function () {
            const otvoren = glavniMeni.classList.toggle("otvoren");
            dugmeMeni.setAttribute("aria-expanded", String(otvoren));
            dugmeMeni.setAttribute(
                "aria-label",
                otvoren ? "Zatvori meni" : "Otvori meni"
            );
        });
    }

    const dugmePodmeni = document.querySelector(".dugme-podmeni");
    const padajuciMeni = document.querySelector(".padajuci-meni");

    if (dugmePodmeni && padajuciMeni) {
        dugmePodmeni.addEventListener("click", function () {
            const otvoren = padajuciMeni.classList.toggle("otvoren");
            dugmePodmeni.setAttribute("aria-expanded", String(otvoren));
        });
    }

    const slajdovi = document.querySelectorAll(".slajd");
    const prethodni = document.querySelector(".slajder-prethodni");
    const sledeci = document.querySelector(".slajder-sledeci");

    if (slajdovi.length > 0 && prethodni && sledeci) {
        let trenutniSlajd = 0;

        function prikaziSlajd(indeks) {
            slajdovi[trenutniSlajd].classList.remove("aktivan");

            trenutniSlajd =
                (indeks + slajdovi.length) % slajdovi.length;

            slajdovi[trenutniSlajd].classList.add("aktivan");
        }

        prethodni.addEventListener("click", function () {
            prikaziSlajd(trenutniSlajd - 1);
        });

        sledeci.addEventListener("click", function () {
            prikaziSlajd(trenutniSlajd + 1);
        });

        setInterval(function () {
            prikaziSlajd(trenutniSlajd + 1);
        }, 5000);
    }

    const kontaktForma = document.getElementById("kontakt-forma");

    if (kontaktForma) {
        kontaktForma.addEventListener("submit", function (dogadjaj) {
            dogadjaj.preventDefault();

            const polja = [
                {
                    id: "ime",
                    minimum: 2,
                    poruka: "Unesi ime od najmanje 2 karaktera."
                },
                {
                    id: "email",
                    minimum: 0,
                    poruka: "Unesi ispravnu email adresu."
                },
                {
                    id: "tema",
                    minimum: 3,
                    poruka: "Unesi temu od najmanje 3 karaktera."
                },
                {
                    id: "poruka",
                    minimum: 10,
                    poruka: "Poruka mora imati najmanje 10 karaktera."
                }
            ];

            let sveIspravno = true;
            let prvoNeispravnoPolje = null;

            polja.forEach(function (stavka) {
                const polje = document.getElementById(stavka.id);
                const prikazGreske = document.getElementById(
                    "greska-" + stavka.id
                );
                const vrednost = polje.value.trim();

                const nijeIspravno =
                    vrednost.length < stavka.minimum ||
                    vrednost === "" ||
                    (stavka.id === "email" && !polje.validity.valid);

                if (nijeIspravno) {
                    prikazGreske.textContent = stavka.poruka;
                    polje.setAttribute("aria-invalid", "true");
                    sveIspravno = false;

                    if (!prvoNeispravnoPolje) {
                        prvoNeispravnoPolje = polje;
                    }
                } else {
                    prikazGreske.textContent = "";
                    polje.removeAttribute("aria-invalid");
                }
            });

            const status = document.getElementById("status-forme");

            if (sveIspravno) {
                status.textContent =
                    "Unos je ispravan. Ovo je demonstraciona forma; poruka nije poslata.";
                kontaktForma.reset();
            } else {
                status.textContent = "Ispravi označena polja.";
                prvoNeispravnoPolje.focus();
            }
        });
    }
});