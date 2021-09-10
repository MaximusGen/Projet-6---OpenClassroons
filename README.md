# Projet-6---OpenClassroons

<h1> Projet 6 : Construisez une API sécurisée pour une application d'avis gastronomiques </h1>

<h2> Contexte du projet </h2>

<p><strong>Piiquantese</strong> dédie à la création de sauces épicées dont les recettes sont gardées
secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise
souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter
leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.</p>

<h2>Spécifications de l'API</h2>

<table>
 <thead>
  <tr>
    <th></th>
    <th>Point d'accès</th>
    <th>Request body(le cas échéant)</th>
    <th>Type de réponse attendue</th>
    <th>Fonction</th>
  </tr>
 </thead>
  <tbody>
  <tr>
    <td>POST</td>
    <td>/api/auth/signup</td>
    <td>{ email: string,password:string }</td>
    <td>{ message: string }</td>
    <td>Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données.</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth/login</td>
    <td>{ email: string,password:string }</td>
    <td>{ userId: string, token: string }</td>
    <td>Vérification des informations d'identification de l'utilisateur, renvoie l _id de l'utilisateur depuis la base de données et un token web JSON signé (contenant également l'_id de l'utilisateur).</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/sauces</td>
    <td> - </td>
    <td>Array of sauces</td>
    <td>Renvoie un tableau de toutes les sauces de la base de données.</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/sauces/:id</td>
    <td> - </td>
    <td>Single sauce</td>
    <td>Renvoie la sauce avec l’_id fourni</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/sauces</td>
    <td>{ sauce: String, image: File}</td>
    <td>{ message: String }Verb</td>
    <td>Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères et l'enregistre dans la base de données en définissant correctement son imageUrl. Initialise les likes et dislikes de la sauce à 0 et les usersLiked et usersDisliked avec des tableaux vides. Remarquez que le corps de la demande initiale est vide ; lorsque multer est ajouté, il renvoie une chaîne pour le corps de la demande en fonction des données soumises avec le fichier</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/sauces/:id</td>
    <td>EITHER Sauce as JSON OR { sauce:String,image: File }</td>
    <td>{ message: String }</td>
    <td>Met à jour la sauce avec l'_id fourni. Si une image est téléchargée, elle est capturée et l’imageUrl de la sauce est mise à jour. Si aucun fichier n'est fourni, les informations sur la sauce se trouvent directement dans le corps de la requête (req.body.name, req.body.heat, etc.). Si un fichier est fourni, la sauce transformée en chaîne de caractères se trouve dans req.body.sauce. Notez que le corps de la demande initiale est vide ; lorsque multer est ajouté, il renvoie une chaîne du corps de la demande basée sur les données soumises avec le fichier.</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/sauces/:id</td>
    <td> - </td>
    <td>{ message: String }</td>
    <td>Supprime la sauce avec l'_id fourni.</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/sauces/:id/like</td>
    <td>{ userId: String, like: Number }</td>
    <td>{ message: String }</td>
    <td>Définit le statut « Like » pour l' userId fourni. Si like = 1, l'utilisateur aime (= like) la sauce. Si like = 0, l'utilisateur annule son like ou son dislike. Si like = -1, l'utilisateur n'aime pas (= dislike) la sauce. L'ID de l'utilisateur doit être ajouté ou retiré du tableau approprié. Cela permet de garder une trace de leurs préférences et les empêche de liker ou de ne pas disliker la même sauce plusieurs fois : un utilisateur ne peut avoir qu'une seule valeur pour chaque sauce. Le nombre total de « Like » et de « Dislike » est mis à jour à chaque nouvelle notation.</td>
  </tr>
    </tbody>
</table>

<h2>API Errors</h2>

<p> Les erreurs éventuelles doivent être renvoyées telles qu'elles sont produites, sans
modification ni ajout. Si nécessaire, utilisez une nouvelle Error().</p>

<h2>API Routes</h2>

<p>Toutes les routes sauce pour les sauces doivent disposer d’une autorisation (le
token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer <token> »).
Avant que l'utilisateur puisse apporter des modifications à la route sauce, le code
doit vérifier si l'userId actuel correspond à l'userId de la sauce. Si l'userId ne
correspond pas, renvoyer « 403: unauthorized request. » Cela permet de s'assurer
 que seul le propriétaire de la sauce peut apporter des modifications à celle-ci.</p>
 
 <h2>Data ModelsSauce</h2>
 <ul>
 <li><strong>userId</strong> : String— l'identifiant MongoDB unique de l'utilisateur qui a créé la
sauce</li>
   <li><strong>name</strong> : String— nom de la sauce</li>
   <li><strong>manufacturer</strong>  : String— fabricant de la sauce</li>
   <li><strong>description</strong>  : String— description de la sauce</li>
   <li><strong>mainPepper</strong> : String— le principal ingrédient épicé de la sauce</li>
   <li><strong>imageUrl</strong> : String— l'URL de l'image de la sauce téléchargée par l'utilisateur</li>
   <li><strong>heat</strong> : Number— nombre entre 1 et 10 décrivant la sauce</li>
   <li><strong>likes</strong> : Number— nombre d'utilisateurs qui aiment (= likent) la sauce</li>
   <li><strong>dislikes</strong> : Number— nombre d'utilisateurs qui n'aiment pas (= dislike) la
sauce</li>
   <li><strong>usersLiked</strong> : [ "String <userId>" ]— tableau des identifiants des utilisateurs
qui ont aimé (= liked) la sauce</li>
   <li><strong>usersDisliked</strong>  : [ "String <userId>" ]— tableau des identifiants des
utilisateurs qui n'ont pas aimé (= disliked) la sauce</li>
 </ul>
 
 
 <h3>Utilisteur</h3>
 <ul>
 <li><strong>email</strong>  : String— adresse e-mail de l'utilisateur [unique]</li>
   <li><strong>password</strong> : String— mot de passe de l'utilisateur haché</li>
 </ul>
  
  <h2>Exigences de sécurité</h2>
  
  <ul>
   <li>Le mot de passe de l'utilisateur doit être haché.</li>
   <li>L'authentification doit être renforcée sur toutes les routes sauce requises.</li>
   <li>Les adresses électroniques dans la base de données sont uniques et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler les erreurs.</li>
   <li>La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la machine d'un utilisateur.</li>
   <li>Un plugin Mongoose doit assurer la remontée des erreurs issues de la base de données.</li>
   <li>Les versions les plus récentes des logiciels sont utilisées avec des correctifs de sécurité actualisés.</li>
   <li>Le contenu du dossier images ne doit pas être téléchargé sur GitHub.</li>
  </ul>
  
  <h2>Repository GitHub</h2>
  
  <p>Retirez le code de l'application front-end du repository du projet et suivez les étapes suivantes :</p>
    <ol>
     <li>Clonez le repository</li>
     <li>Ouvrez un terminal (Linux/Mac) ou une invite de commande/PowerShell (Windows)</li>
     <li>Exécutez npm install à partir du répertoire du projet</li>
     <li>Exécutez npm start</li>
     <li>Exécutez le back-end sur http://localhost:3000 seulement</li>
    </ol>
  <p>
   
  <p>Si vous utilisez VSCode, utilisez l'extension LiveShare pour faire fonctionner le serveur front-end sans avoir recours à npm install.</p>

  <h2> Tâche à éffectuer </h2>
  
  <h3> Tâche 1 : Démarrer le serveur backend </h3>
  <p>Recommandations: </p>
  <ul>
   <li>Suivez ces étapes : </li>
     <ul>
       <li>Créer un projet vide pour démarrer le serveur Node.js ;</li>
       <li>Installer Express ;</li>
       <li>Installer Mongoose.</li>
     </ul>
   <li>À partir de la version 4.16 d'Express, bodyparser est inclus et vous n'avez pas besoin de l'installer.</li>
     <ul>
       <li>Utilisez ( express.json() ) pour analyser le corps de la requête.</li>
     </ul>
  </ul>
  <p>f071 Les Problèmes à connaître: </p>
  <ul>
   <li>Si le port 3000 est utilisé par un autre processus, redémarrez complètement votre ordinateur (pour permettre l'utilisation du port) ou changez le port utilisé dans l’application Express.</li>
   <li>Impossible de se connecter à MongoDB. Vérifiez la chaîne de connexion, le nom d'utilisateur et le mot de passe de MongoDB et vérifiez que MongoDB Atlas (ou un service similaire) autorise toutes les adresses IP à se connecter au cluster.</li>
  </ul>
  
  <h3> Tâche 2 :  Construire le parcours utilisateur </h3>
  <p>Recommandations: </p>
  <ul>
   <li>Créez les éléments suivants : </li>
     <ul>
       <li>Modèle d'utilisateur ;</li>
       <li>Parcours utilisateur ;</li>
       <li>Contrôleur d'utilisateur.</li>
     </ul>
   <li>L'utilisateur est en mesure d'effectuer les opérations suivantes :</li>
     <ul>
       <li>Créer un compte ;</li>
       <li>Se connecter et disposer d'un token valide.</li>
     </ul>
   <li>Consultez l'onglet réseau de Devtools pour plus d'informations.</li>
  </ul>
  <p> Les Problèmes à connaître: </p>
  <ul>
   <li>Le mot de passe n'est pas haché. Veillez à hacher le mot de passe.</li>
   <li>Un utilisateur peut s'inscrire plusieurs fois avec la même adresse électronique. Assurez-vous que le code vérifie qu’une adresse électronique est unique.</li>
  </ul>
  
  <h3> Tâche 3 :   Démarrer le middleware </h3>
  <p>Recommandations: </p>
  <ul>
   <li>Ajout de multer pour les images.</li>
   <li>Ajout d’authorize pour la validation des tokens.</li>
     <ul>
       <li>Authorize doit être ajoutée avant de commencer à construirele parcours pour les sauces car l'authentification est nécessaire pour qu'un utilisateur puisse effectuer une action sur le parcours des sauces.</li>
     </ul>
  </ul>
  <p> Les Problèmes à connaître: </p>
  <ul>
   <li>Les images importées sont manquantes.</li>
   <li>Multer n'est pas correctement configuré.</li>
   <li>Le chemin statique n'a pas été ajouté à l'application pour fournir les images. Assurez-vous d'ajouter le chemin statique à l'application.</li>
  </ul>
  
  <h3> Tâche 4 :  Construire la route Sauce de l’API </h3>
  <p>Recommandations: </p>
  <ul>
   <li>Créez les éléments suivants : </li>
     <ul>
       <li>Le Modèle Sauce ;</li>
       <li>La Route Sauce ;</li>
       <li>Le Contrôleur Sauce.</li>
     </ul>
   <li>Autorisez toutes les fonctions en utilisant middleware Authorize.</li>
   <li>L'utilisateur est en mesure d'effectuer les opérations suivantes :</li>
     <ul>
       <li>Ajouter une nouvelle sauce ;</li>
       <li>Supprimer une sauce ;</li>
       <li>Voir toutes les sauces.</li>
     </ul>
   <li>Consultez l'onglet réseau de Devtools pour plus d'informations.</li>
  </ul>
  <p> Les Problèmes à connaître: </p>
  <ul>
   <li>Erreur 401 (l'utilisateur n'est pas autorisé).</li>
   <li>Multer ne sauvegarde pas les images.</li>
   <li>Les images ne sont pas affichées sur le frontend.</li>
  </ul>
  
  <h3> Tâche 5 :  Terminer la route Sauce de l’API </h3>
  <p>Recommandations: </p>
  <ul>
   <li>Exécutez l'application en tant qu'utilisateur pour vérifier que toutes les fonctions ont été correctement mises en œuvre, testez : </li>
     <ul>
       <li>Les deux types de demandes :</li>
         <ul>
           <li>Avec un fichier présent ;</li>
           <li>Sans fichier.</li>
         </ul>
       <li>Les trois scénarios de la fonction « like » (1, 0, -1) ;</li>
         <ul>
           <li>L’utilisateur peut liker ou ne pas aimer une sauce (ou aucun des deux)</li>
         </ul>
      <li>Seul le propriétaire de la sauce peut modifier ou supprimer une sauce existante.</li>
     </ul>
  </ul>
  <p> Les Problèmes à connaître: </p>
  <ul>
   <li>Erreur 401 (l'utilisateur n'est pas autorisé).</li>
   <li>Multer ne sauvegarde pas les images.</li>
   <li>Les images ne sont pas affichées sur le frontend.</li>
   <li>Les données ne sont pas modifiées lorsque l'utilisateur tente de modifier une sauce existante.</li>
   <li>La fonction « modifier » échoue lorsqu'une image est téléchargée ou modifiée.</li>
   <li>La fonction « like » échoue lorsque l'utilisateur essaie de liker ou de ne pas aimer une sauce plusieurs fois.</li>
   <li>Le propriétaire de la sauce ne peut pas voir les boutons « modifier » et « supprimer ». L'identifiant de la Sauce doit être valide et ne pas contenir de faute de frappe, car seul le propriétaire de la Sauce peut la modifier ou la supprimer.</li>
  </ul>
  
  
  
