var imgbase = ["img/ane.jpg","img/chat.jpg","img/chien.jpg","img/lama.jpg","img/lapins.jpg","img/lionne.jpg","img/ours.jpg"];
var tab = imgbase.concat(imgbase); // On copie le tableau pour avoir les images en double
var dos = 'img/dos.jpg'; // On définie l'image de dos
var clique = 0; // Nombre de cliques
var paires = 0; // Nombre de paires
var choixun; // Choix de la 1ère carte
var choixdeux; // Choix de la 2ème carte
var norepeat = true; // Empêche le chrono de se répéter
var timerID = 0;
var min = 0;
var sec = 0;

function afficherimage() { // Fonction pour afficher les images au chargement de la page
	for (i=0; i<=tab.length-1; i++) { // Boucle qui parcours le tableau d'images
		document.getElementById('games').innerHTML += '<img src="img/dos.jpg" onclick="choisir('+i+')" draggable="false">' // A chaque tour, on écrit dans le HTML
	}
}

afficherimage(); // Charge la fonction au chargement de la page

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
		document.getElementById('games').style.display = 'block';
		document.getElementById('games').style.flexDirection = 'column';
		document.getElementById('games').innerHTML = '<h1>Vous avez gagné !</h1><br /><input type="button" class="restart" value="Recommencer" onClick="window.location.reload()">';
	}
}

function random() { // Fonction pour mélanger les cartes au début
	for(var i=tab.length; i; i--) { //pour i=longueur totale du tableau, i toujours vrai(sup a zero), on decremente i(on lui enleve 1).
		j = Math.floor(Math.random() * i);//Math.floor arondie a la valeur superieure,Math.random donne un nombre aleatoire (entre 0 et 1)le tout * i
		x = tab[i-1];  //decale de 1 à l'interrieur du tableau(ex:si i=13 X deviendra lionne)
		tab[i-1] = tab[j]; //si i= 13 tab 12(i-1) deviendras J(j=nombre aleatoire)
		tab[j] = x; //j deviens X(pour cette exemple x=lionne)
	}
}

random(tab); // Charge la fonction au chargement de la page

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