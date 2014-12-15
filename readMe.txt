Installer Mongoose

1- run le serveur mongo : mongod dans le terminal
Si vous voullez vérifier que la BDD est bien créée : mongo dans un autre terminal, puis :
use web1
db.criminals.find();
2- lancer le script mongoScript : node mongoScript.js //On ajoute les données dans la BDD
3- ensuite on peut tester : node serveur.js
