const name = document.getElementById("name");
const address = document.getElementById("address");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const website = document.getElementById("website");
const mapId = document.getElementById("map");
const form = document.getElementById("form");

function validateForm(e) {
    e.preventDefault();

    const error = document.querySelector('.error');
    errorMessage = {};
   
    error.innerHTML = "Something is wrong";
    console.log(e);
} 

form.addEventListener('submit', validateForm);


let map;

function initMap() {
    map = new google.maps.Map(mapId, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
    console.log(map)
  }

console.log("my App")

