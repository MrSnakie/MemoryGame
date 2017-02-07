var dos = 'img/dos.jpg'; // On définie l'image de dos
var clique = 0; // Nombre de cliques
var paires = 0; // Nombre de paires
var choixun; // Choix de la 1ère carte
var choixdeux; // Choix de la 2ème carte
var norepeat = true; // Empêche le chrono de se répéter
var timerID = 0;
var min = 0;
var sec = 0;
var victoire = false;

function choisir(carte) { // Choix des cartes quand l'utilisateur clique
	if (norepeat == true) {
		timerID = setInterval('chrono()', 1000);
		norepeat = false;
	}
	if (clique == 2) { // Au délà du deuxième clique
		return; // On affiche rien
	}
	if (clique == 0) { // Au premier clique
		choixun = carte; // On attribue le numéro de la carte choisie au premier choix
		document.images[carte].src = tab[carte]; // Affiche l'image de la carte correspondant au choix
		document.images[choixun].style.pointerEvents = 'none'; // Désactive l'évènement du clique
		clique = 1; // On passe le clique à 1
	}
	else { // Au deuxième clique
		clique = 2; // On passe le clique à 2
		choixdeux = carte; // On attribue le numéro de la carte choisie au deuxième choix
		document.images[carte].src = tab[carte]; // Affiche l'image de la carte correspondant au choix
		timer = setTimeout('verif()', 1000); // Ajoute un temps de pause puis passe à la fonction de vérification
	}	
}

function verif() { // Vérifie si une paire a été faite
	clearTimeout(verif);
	clique = 0;
	if (tab[choixdeux] == tab[choixun]) {
		paires++;
		document.getElementById('paires').innerHTML = paires;
		document.images[choixun].style.pointerEvents = 'none';
		document.images[choixun].style.opacity = '0.3';
		document.images[choixdeux].style.pointerEvents = 'none';
		document.images[choixdeux].style.opacity = '0.3';
	} else {
		document.images[choixun].src = dos;
		document.images[choixun].style.pointerEvents = 'auto';
		document.images[choixdeux].src = dos;
		document.getElementById('alert').style.visibility = 'visible';
		setTimeout(function(){(document.getElementById('alert').style.visibility = 'hidden');},3000);
		return;
	}
	if (paires==7) {
		clearInterval(timerID);
		document.location.href = './index.php?pseudo='+prompt('Entrez votre pseudo:')+'&paires='+paires+'&min='+min+'&sec='+sec;
	}
}

function chrono() { // Fonction du chronomètre
	if (sec<59) {
		sec++;
		if (sec<10) {
			sec = "0" +sec;
		}
	}
	else if (sec=59) {
		min++;
		sec = "0" + 0;
	}
	document.getElementById("chrono").innerHTML = min + ':' + sec;
}