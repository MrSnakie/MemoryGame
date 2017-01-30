var imgbase = ["img/ane.jpg","img/chat.jpg","img/chien.jpg","img/lama.jpg","img/lapins.jpg","img/lionne.jpg","img/ours.jpg"];
var img = imgbase.concat(imgbase);
var dos = 'img/dos.jpg';
var clique = 0;
var paires = 0;
var choixun;
var choixdeux;

function melanger() { // Mélange les cartes au début
	for (var i=0; i<=14; i++) {
		var random = Math.floor(Math.random()*(i+1));
		document.images.src = img;
	}
}

function choisir(carte) { // Choix des cartes quand l'utilisateur clique
	if (clique == 2) {
		return;
	}
	if (clique == 0) {
		choixun = carte;
		document.images[carte].src = img[carte];
		clique = 1;
	} else {
		clique = 2;
		choixdeux = carte;
		document.images[carte].src = img[carte];
		timer = setInterval("verif()", 1000);
	}	
}

function verif() { // Vérifie si une paire a été faite
	clearInterval(timer);
	clique = 0;
	if (img[choixdeux] == img[choixun]) {
		paires++;
		document.getElementById("paires").innerHTML = paires;
	} else {
		document.images[choixun].src = dos;
		document.images[choixdeux].src = dos;
		return;
	}
}

function victoire() { // Ta compris le nom d'la fonction
	// script
}