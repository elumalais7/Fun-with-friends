// ===============================
// Allerlune Meme Maker
// script.js
// ===============================

const uploadImage = document.getElementById("uploadImage");
const previewImage = document.getElementById("previewImage");
const uploadPlaceholder = document.getElementById("uploadPlaceholder");

const captionInput = document.getElementById("captionInput");
const caption = document.getElementById("caption");

const funnyBtn = document.getElementById("funnyBtn");
const memePanel = document.getElementById("memePanel");
const memeList = document.getElementById("memeList");

const downloadBtn = document.getElementById("downloadBtn");


// ==========================
// Upload Image
// ==========================

uploadImage.addEventListener("change", function (event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;

        previewImage.style.display = "block";

        uploadPlaceholder.style.display = "none";

    };

    reader.readAsDataURL(file);

});


// ==========================
// Live Caption
// ==========================

captionInput.addEventListener("input", function () {

    if (this.value.trim() === "") {

        caption.innerHTML = "Your Text Here";

    } else {

        caption.innerHTML = this.value;

    }

});


// ==========================
// Funny Meme Button
// ==========================

funnyBtn.addEventListener("click", function () {

    memePanel.style.display = "block";

    memeList.innerHTML = "";

    funnyMemes.forEach(function (text) {

        const item = document.createElement("div");

        item.className = "memeItem";

        item.innerHTML = text;

        item.onclick = function () {

            captionInput.value = text;

            caption.innerHTML = text;

            memePanel.style.display = "none";

        };

        memeList.appendChild(item);

    });

});


// ==========================
// Download
// ==========================

downloadBtn.addEventListener("click", function () {

    if (previewImage.style.display === "none") {

        alert("Please upload an image first.");

        return;

    }

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.src = previewImage.src;

    img.onload = function () {

        canvas.width = img.naturalWidth;

        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);

        // Gradient

        const gradient = ctx.createLinearGradient(
            0,
            canvas.height - 180,
            0,
            canvas.height
        );

        gradient.addColorStop(0, "rgba(0,0,0,0)");

        gradient.addColorStop(1, "rgba(0,0,0,0.85)");

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            canvas.height - 180,
            canvas.width,
            180
        );

        // Text

        ctx.fillStyle = "#ffffff";

        ctx.font = "bold 50px Poppins";

        ctx.textAlign = "center";

        ctx.shadowColor = "black";

        ctx.shadowBlur = 12;

        wrapText(
            ctx,
            caption.innerHTML,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width - 100,
            60
        );

        const link = document.createElement("a");

        link.download = "Allerlune_Meme.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    };

});


// ==========================
// Multi Line Text
// ==========================

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {

    const words = text.split(" ");

    let line = "";

    let lines = [];

    for (let n = 0; n < words.length; n++) {

        let testLine = line + words[n] + " ";

        let metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && n > 0) {

            lines.push(line);

            line = words[n] + " ";

        } else {

            line = testLine;

        }

    }

    lines.push(line);

    let startY = y - (lines.length - 1) * lineHeight;

    for (let i = 0; i < lines.length; i++) {

        ctx.fillText(
            lines[i],
            x,
            startY + i * lineHeight
        );

    }

}
const textPosition =
document.getElementById("textPosition");

textPosition.addEventListener("change", updatePosition);

function updatePosition(){

caption.style.top="";
caption.style.bottom="";

if(textPosition.value==="top"){

caption.style.top="25px";

}

else if(textPosition.value==="middle"){

caption.style.top="50%";

caption.style.transform=
"translate(-50%,-50%)";

}

else{

caption.style.bottom="25px";

caption.style.transform=
"translateX(-50%)";

}

}

updatePosition();