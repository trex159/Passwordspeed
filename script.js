/*
Plan:
Passwort aus id="passwordInput" holen und als Variable speichern
Wenn der nutzer is in einem Testfeld eingibt, sollen die eingaben live mit dem gesetzten Passwort verglichen werden.
Wenn der nutzer einen Fehler macht, wird das feld rot, auch im Hintergrund. Wenn das Richitge passwort drinnen steht, blinkt es kurz grün und leert sich autopmatisch.
Die Zeit wird immer live gemessen und die Fehlerquote live angezeigt (1 Fehler = 1 Falscher versuch, nicht 1 falsches Zeichen).
Der einzige Unterschied zwischen test 1 und 2 is, dass man in test 1 das passwort sieht und in test 2 nicht.

			<div class="test1">
				<h1>Tippe dein Passwort Schnell</h1>
				<input type="text" id="test1_txt" placeholder="Hier dein Passwort eingeben">
				<p class="info">Tippe dein Passwort so schnell wie möglich. Du kannst es auch blind tippen.</p>
				<p class="info" id="statistics1">Fehlerquote: X%<br>Tempo: X PPM (passwords per minute)</p>
				<p class="info" id="bewertung1">Du kannst es X tippen</p>
			</div>
			<div class="test2">
				<h1>Tippe dein Passwort Schnell</h1>
				<input type="password" id="test2_txt" placeholder="Hier dein Passwort eingeben">
				<p class="info">Tippe dein Passwort blind so schnell wie möglich. Du kannst es auch blind tippen.</p>
				<p class="info" id="statistics2">Fehlerquote: X%<br>Tempo: X PPM (passwords per minute)</p>
				<p class="info" id="bewertung2">Du kannst es X tippen</p>
			</div>

WICHTIG: Der cursor muss aktive im textfeld bleiben, auch wenn es sich leert oder fehler gibt, um ein schnelles durchgängiges training zu ermöglihen ohne unterbrechungen.
*/
//Setup
const pswdIp = document.getElementById("passwordInput");
const t1Ip = document.getElementById("test1_txt");
const t2Ip = document.getElementById("test2_txt");
const sts1 = document.getElementById("statistics1");
const sts2 = document.getElementById("statistics2");
const bew1 = document.getElementById("bewertung1");
const bew2 = document.getElementById("bewertung2");
const reset = document.getElementById("resetButton");
let pswd = pswdIp.value;
let startTime1 = null;
let startTime2 = null;
let typedPwd1 = 0;
let typedPwd2 = 0;
let erroractive2 = false;
let erroractive1 = false;
let error1 = 0;
let error2 = 0;
// Passwort setzen
pswdIp.addEventListener("input", function() {
	pswd = pswdIp.value;
})
// Reset button
reset.addEventListener("click", function() {
	pswdIp.value = "";
	t1Ip.value = "";
	t2Ip.value = "";
	pswd = "";
	startTime1 = null;
	startTime2 = null;
	typedPwd1 = 0;
	typedPwd2 = 0;
	erroractive1 = false;
	erroractive2 = false;
	error1 = 0;
	error2 = 0;
	sts1.innerHTML = `Fehlerquote: X%<br>Tempo: X PPM (passwords per minute)`;
	sts2.innerHTML = `Fehlerquote: X%<br>Tempo: X PPM (passwords per minute)`;
	bew1.innerHTML = `Du kannst es X tippen`;
	bew2.innerHTML = `Du kannst es X tippen`;
})
//Test 1
t1Ip.addEventListener("input", function() {
	if (startTime1 === null) {
		startTime1 = new Date();
		startTime2 = null;
		typedPwd1 = 0;
		typedPwd2 = 0;
		error1 = 0;
		error2 = 0;
		erroractive1 = false;
		erroractive2 = false;
	};
	if (pswd == "") {
		alert("Bitte setze zuerst ein Passwort in das obere Feld, bevor du den Test startest.");
		t1Ip.value = "";
		return;
	}
	if (t1Ip.value === pswd && pswd !== "") {
		t1Ip.style.backgroundColor = "green";
		t1Ip.value = "";
		typedPwd1++;
	}
	// Auch sehen wenn das richtige passwort noch eingegeben wird, aber noch nicht fertig ist
	else if (pswd.startsWith(t1Ip.value)) {
		console.log("noch nicht fertig");
		t1Ip.style.backgroundColor = "white";
		erroractive1 = false;
	} else {
		if (!erroractive1) {
			t1Ip.style.backgroundColor = "red";
			erroractive1 = true;
			error1++;
		} else {
			t1Ip.style.backgroundColor = "red";
		}
	}
	// Berechnung der Zeit und Fehlerquote
	let elapsedTime1 = (new Date() - startTime1) / 1000; // Zeit in Sekunden
	let ppm1 = (typedPwd1 / elapsedTime1) * 60;
	let errorRate1 = (error1 / (typedPwd1 + error1)) * 100; // Fehlerquote in Prozent
	if (isNaN(errorRate1)) {
		errorRate1 = 0;
	}
    // Bewertung
    rating1 = "";
    if (ppm1 < 6 || errorRate1 > 50) {
        rating1 = "Schlecht";
    } else if (ppm1 < 17 || errorRate1 > 25) {
        rating1 = "Gut";
    } else {
        rating1 = "SEHR GUT";
    }

	sts1.innerHTML = `Fehlerquote: ${errorRate1.toFixed(2)}%<br>Tempo: ${ppm1.toFixed(2)} PPM (passwords per minute)`;
	bew1.innerHTML = `Du kannst es ${rating1} tippen`;
})
//Test 2
t2Ip.addEventListener("input", function() {
	if (startTime2 === null) {
		startTime2 = new Date();
		startTime1 = null;
		typedPwd1 = 0;
		typedPwd2 = 0;
		error1 = 0;
		error2 = 0;
		erroractive1 = false;
		erroractive2 = false;
	};
	if (pswd == "") {
		alert("Bitte setze zuerst ein Passwort in das obere Feld, bevor du den Test startest.");
		t2Ip.value = "";
		return;
	}
	if (t2Ip.value === pswd && pswd !== "") {
		t2Ip.style.backgroundColor = "green";
		t2Ip.value = "";
		typedPwd2++;
	}
	// Auch sehen wenn das richtige passwort noch eingegeben wird, aber noch nicht fertig ist
	else if (pswd.startsWith(t2Ip.value)) {
		console.log("noch nicht fertig");
		t2Ip.style.backgroundColor = "white";
		erroractive2 = false;
	} else {
		if (!erroractive2) {
			t2Ip.style.backgroundColor = "red";
			erroractive2 = true;
			error2++;
		} else {
			t2Ip.style.backgroundColor = "red";
		}
	}
	// Berechnung der Zeit und Fehlerquote
	let elapsedTime2 = (new Date() - startTime2) / 1000; // Zeit in Sekunden
	let ppm2 = (typedPwd2 / elapsedTime2) * 60;
	let errorRate2 = (error2 / (typedPwd2 + error2)) * 100; // Fehlerquote in Prozent
	if (isNaN(errorRate2)) {
		errorRate2 = 0;
	}

    // Bewertung
    rating2 = "";
    if (ppm2 < 6 || errorRate2 > 50) {
        rating2 = "Schlecht";
    } else if (ppm2 < 17 || errorRate2 > 25) {
        rating2 = "Gut";
    } else {
        rating2 = "SEHR GUT";
    }

	sts2.innerHTML = `Fehlerquote: ${errorRate2.toFixed(2)}%<br>Tempo: ${ppm2.toFixed(2)} PPM (passwords per minute)`;
	bew2.innerHTML = `Du kannst es ${rating2} tippen`;
})
