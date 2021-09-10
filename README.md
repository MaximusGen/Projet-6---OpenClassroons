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

