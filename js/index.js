let message = document.getElementById("lefttext");
let processed = document.getElementById("righttext");
let encryptButton = document.getElementById("encrypt");
let decryptButton = document.getElementById("decrypt");
let copyButton = document.getElementById("copy");

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

encryptButton.onclick = () => {
	let encrypted = encrypt(message.value)
	processed.value = encrypted;
	processed.style.backgroundImage = encrypted ? "none" : imgURL;
	copy.style.display = encrypted ? "block" : "none";
};

decryptButton.onclick = () => {
	let decrypted = decrypt(message.value)
	processed.value = decrypted;
	processed.style.backgroundImage = decrypted ? "none" : imgURL;
	copy.style.display = decrypted ? "block" : "none";
};

copyButton.onclick = () => {
	navigator.clipboard.writeText(processed.value);
};