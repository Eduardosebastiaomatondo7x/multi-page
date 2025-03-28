# Multi-page

Proposition de structure de site vierge sous a-frame incluant une fonctionnalité de pages multiples

code javascript pour inspiration
      <!-- Définition du bouton pour augmenter la valeur de tel_1 -->
      <a-entity id="plus-button" position="0 1 -3" geometry="primitive: box" material="color: green"></a-entity>
      <!-- Définition du bouton pour diminuer la valeur de tel_1 -->
      <a-entity id="minus-button" position="2 1 -3" geometry="primitive: box" material="color: red"></a-entity>
    </a-scene>

    <script>
      // Déclaration de la variable tel_1 initialisée à 0
      let tel_1 = 0;

      // Ajout d'un écouteur d'événement sur le bouton plus pour incrémenter tel_1 de 1
      document.querySelector('#plus-button').addEventListener('click', function () {
        tel_1++;
        // Affichage de la valeur actuelle de tel_1 dans la console
        console.log('tel_1:', tel_1);
      });

      // Ajout d'un écouteur d'événement sur le bouton moins pour décrémenter tel_1 de 1
      document.querySelector('#minus-button').addEventListener('click', function () {
        tel_1--;
        // Affichage de la valeur actuelle de tel_1 dans la console
        console.log('tel_1:', tel_1);
      });
    </script>
