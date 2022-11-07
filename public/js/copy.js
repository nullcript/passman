"use strict";

let copyBtn = document.querySelectorAll(".copy");

copyBtn.forEach((v) => {
    v.addEventListener("click", (e) => {
        let text = e.target.textContent;
        navigator.clipboard.writeText(text.trim());
        alert("ID copied to clipboard");
    });
});