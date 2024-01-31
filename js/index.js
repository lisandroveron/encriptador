let message = document.getElementById("lefttext");
let processed = document.getElementById("righttext");
let encryptButton = document.getElementById("encrypt");
let decryptButton = document.getElementById("decrypt");
let buttons = document.getElementById("buttons");
let copyButton = document.getElementById("copy");
let clearButton = document.getElementById("clear");
let textcopied = document.getElementById("textcopied");
let textnotfound = document.getElementById("textnotfound");
let rulesadvice = document.getElementById("rulesadvice");
const imgURL = processed.style.backgroundImage;

function encrypt(message) {
	let text = message.split("");

	for (let i = 0; i < text.length; i++) {
		switch (text[i]) {
			case "a": text[i] = "ai"; break;
			case "e": text[i] = "enter"; break;
			case "i": text[i] = "imes"; break;
			case "o": text[i] = "ober"; break;
			case "u": text[i] = "ufat"; break;
			default: break;
		};
	};

	let encrypted = text.join("");

	return encrypted;
};

function decrypt(message) {
	const regexp = /(?<=ai|enter|imes|ober|ufat)|(?=ai|enter|imes|ober|ufat)/

	let text = message.split(regexp);

	for (let i = 0; i < text.length; i++) {
		switch (text[i]) {
			case "ai": text[i] = "a"; break;
			case "enter": text[i] = "e"; break;
			case "imes": text[i] = "i"; break;
			case "ober": text[i] = "o"; break;
			case "ufat": text[i] = "u"; break;
			default: break;
		};
	};

	let decrypted = text.join("");

	return decrypted;
};

function clear() {
	message.value = "";
	processed.value = "";
	processed.style.backgroundImage = imgURL;
	textnotfound.style.display = "block";
	buttons.style.display = "none";
};

function toggle(element) {
	element.classList.toggle("notification--on");
	setTimeout(() => {
		element.classList.toggle("notification--on")
	}, 5000);
};

function verify(text, mode) {
	let forbiddenChars = /[^a-z0-9\s\n¡!¿?.,:<>]|^[\s\n]+$/g;
	let match = text.search(forbiddenChars) >= 0;
	let error = match ? true : false;

	if (error) {
		toggle(rulesadvice);
		return;
	};

	let result;
	switch (mode) {
		case "encrypt": result = encrypt(text); break;
		case "decrypt": result = decrypt(text); break;
		default: break;
	};

	processed.value = result;
	processed.style.backgroundImage = result ? "none" : imgURL;
	buttons.style.display = result ? "flex" : "none";
	textnotfound.style.display = result ? "none" : "block";
};

encryptButton.onclick = () => {
	verify(message.value, "encrypt");
};

decryptButton.onclick = () => {
	verify(message.value, "decrypt");
};

copyButton.onclick = () => {
	navigator.clipboard.writeText(processed.value).then(() => {
		toggle(textcopied);
	});
};

clearButton.onclick = () => {
	clear();
};

window.onload = () => {
	clear();
};