// Variable that contains the location of the pages
var PageLoc = "./Pages"

// Variables for A-FRAME related to the scene
var SceneData = $("a-scene")  // Selects the A-Frame scene element
var scene     = SceneData[0]  // Gets the first A-Frame scene element
var MainScene = $("#MainScene")[0]  // Gets the main scene element with the ID "MainScene"

AFRAME.registerComponent('obj-model-debug', {
  init: function() {
    this.el.addEventListener('model-loaded', () => {
      console.log('✅ Modelo carregado com sucesso!');
    });
    this.el.addEventListener('model-error', (evt) => {
      console.error('❌ Erro ao carregar modelo:', evt.detail);
    });
  }
});

// Contains the name of the document in a variable
let PathName = location.pathname.split("/")  // Splits the URL path into an array
PathName = (PathName[PathName.length - 1].split(".")[0] || "index").toUpperCase()  // Gets the last part of the path, removes the file extension, and converts it to uppercase. Defaults to "INDEX" if no file name is found.

// Function to wait for x milliseconds
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// Function that removes the "cache" from the camera
async function UpdateNavigator() {
    await sleep(100)  // Waits for 100 milliseconds
    $("#cur_camera")[0].emit("end_trans")  // Emits the "end_trans" event to the current camera element
}

// Interaction for the UpdateNavigator function, when the template is loaded
if(MainScene) MainScene.addEventListener("templaterendered", UpdateNavigator)  // Adds an event listener to call UpdateNavigator when the template is rendered

// Function that changes the scene based on the given name
async function SwitchArea(Name) {
    let ok = document.querySelectorAll(".field")  // Selects all elements with the class "field"

    // Removes all elements with the class "field"
    ok.forEach(function(val) { $(val).remove() })

    $("#cur_camera")[0].emit("start_trans")  // Emits the "start_trans" event to the current camera element
    await sleep(500)  // Waits for 500 milliseconds
  
    // Changes the scene to the value of the template
    MainScene.attributes.template.nodeValue = "src: " + PageLoc + "/" + PathName + "/" + Name + ".html"
}

// Initialization of the scene
AFRAME.registerComponent('scene-init', {
    schema: {type: 'string', default: 'default'},  // Defines a schema with a string type and a default value
    init: async function() {
      this.SceneName = this.data  // Gets the name of the scene from the schema

      SwitchArea(this.SceneName)  // Calls the SwitchArea function with the scene name
    }
  })  

// Button that changes the scene to the predefined value
AFRAME.registerComponent('scene-changer', {
    schema: {type: 'string', default: 'default'},  // Defines a schema with a string type and a default value
  
    init: async function() {
      this.onClick = this.onClick.bind(this)  // Binds the onClick function to the current context
      this.SceneName = this.data  // Gets the name of the scene from the schema

      //  Activates the event when a click is detected
      this.el.addEventListener("click", this.onClick)  // Adds an event listener to call onClick when the element is clicked
    },
  
    onClick: async function() {
      SwitchArea(this.SceneName)  // Calls the SwitchArea function with the scene name
    }
  })



// Composant personnalisé pour une trajectoire circulaire plus précise
AFRAME.registerComponent('circular-flight', {
  schema: {
    radius: {type: 'number', default: 10},
    speed: {type: 'number', default: 1},
    height: {type: 'number', default: 1.5}
  },
  init: function() {
    this.angle = 0;
    this.center = new THREE.Vector3(0, this.data.height, 0);
  },
  tick: function(time, timeDelta) {
    this.angle += timeDelta * 0.001 * this.data.speed;
    
    // Calcul de la nouvelle position
    const x = Math.cos(this.angle) * this.data.radius;
    const z = Math.sin(this.angle) * this.data.radius;
    this.el.setAttribute('position', {
      x: x,
      y: this.data.height,
      z: z
    });
    
    // Orientation de l'avion dans la direction du mouvement
    const degrees = -this.angle * (180 / Math.PI) + 90;
    this.el.setAttribute('rotation', {
      x: -20 * Math.sin(this.angle), // Inclinaison dans les virages
      y: degrees,
      z: 0
    });
  }
});


 AFRAME.registerComponent('clickable', {
    init: function() {
      this.el.addEventListener('click', () => {
        // Basculer la visibilité des panneaux
        const cartPanel = document.getElementById('cart-panel');
        const purchasePanel = document.getElementById('purchase-options');
        
        cartPanel.setAttribute('visible', !cartPanel.getAttribute('visible'));
        purchasePanel.setAttribute('visible', !purchasePanel.getAttribute('visible'));
        
        // Mettre à jour le compteur du panier
        if (cartPanel.getAttribute('visible')) {
          const cartCounter = document.getElementById('cart-items');
          const currentCount = parseInt(cartCounter.getAttribute('value')) || 0;
          cartCounter.setAttribute('value', `${currentCount + 1} articles`);
        }
      });
    }
  });

  // Pour les options d'achat
  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation(); // Empêche le déclenchement du clic parent
      alert(`Option "${e.target.querySelector('a-text').getAttribute('value')}" sélectionnée!`);
    });
  });
localStorage.setItem('cartCount', currentCount + 1);
AFRAME.registerComponent('clickable', {
  init: function () {
    this.el.addEventListener('mouseenter', () => {
      this.el.setAttribute('scale', '0.0025 0.0025 0.0025');
    });
    this.el.addEventListener('mouseleave', () => {
      this.el.setAttribute('scale', '0.002 0.002 0.002');
    });
    this.el.addEventListener('click', () => {
      // Votre logique ici
    });
  }
});


  

