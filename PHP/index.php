<?php
	$images = array("img/ane.jpg","img/chat.jpg","img/chien.jpg","img/lama.jpg","img/lapins.jpg","img/lionne.jpg","img/ours.jpg");
	$images_double = array_merge($images, $images); // Double les images
	$image_dos = 'img/dos.jpg';
	shuffle($images_double);
	if(isset($_GET['pseudo'],$_GET["min"], $_GET["sec"])){
		$etat = 'victoire';
	}else{
		$etat = 'jeu';
	}
?>

<!DOCTYPE html>
<html lang=fr>

<head>
	<title>Jeu des paires</title> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="author" content="Stéphane Bariller">
	<meta name="description" content="Jeu de carte paires">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript">
		<?php
			$derniere_cle = array_pop(array_keys($images_double));
			echo 'var tab = [';
			foreach($images_double as $cle => $valeur){
				if($cle === $derniere_cle){
					echo "'$valeur'";
				}
				else{
					echo "'$valeur',";
				}
			}
			echo '];';
		?>
	</script>
</head>

<body>

	<section>

		<h1><u>Jeu des paires</u></h1>
		<p>Retourner deux cartes, si ces deux cartes sont identiques, alors vous venez de faire une paire.</p>
		<p>Le but du jeu est de retourner toutes les cartes en face visible.</p>

		<strong><p>Chronomètre: <span id="chrono">00:00</span> - Nombre de paire(s): <span id="paires">0</span></p></strong>
		<div id='alert'>Les 2 images sont différentes !</div>

		<div id="games">
			<?php

				if($etat == 'victoire'){
					echo '<div style="display:block">
							<h1>Félicitations, vous avez gagné <span>'.$_GET["pseudo"].'</span> !</h1>
							<h4>Vous avez fait <span>'.$_GET["paires"].'</span> paires en <span>'.$_GET["min"].'</span> minute(s) et <span>'.$_GET["sec"].'</span> seconde(s).</h4>
							<a href="./index.php"><input type="button" class="restart" value="Recommencer"></a>
							</div>';
				}else{	
					for($afficher_images=0; $afficher_images <= sizeof($images_double)-1; $afficher_images++){
						echo '<img src="'.$image_dos.'" onclick="choisir('.$afficher_images.')" draggable="false">';
					}
				}

			?>
		</div>

	</section>

	<script type="text/javascript" src="js/script.js"></script>

</body>

</html>