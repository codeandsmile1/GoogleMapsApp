const name = document.getElementById("name");
const address = document.getElementById("address");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const website = document.getElementById("website");
const mapId = document.getElementById("map");
const form = document.getElementById("form");
let isFormValid = true;

let mydata = {
  name: "",
  address: "",
  email: "",
  phone: "",
  website: "",
};

function submitForm(e) {
  e.preventDefault();
  isFormValid = true;

  validateName(name);
  validatePhone(phone);
  validateEmail(email);
  validateWebsite(website);
  validateAddress(address);
  saveDataInLocalStorage();
  clearForm();
}

function clearForm() {
   if(isFormValid) {
   form.reset();
   }
}

function saveDataInLocalStorage() {
  if (isFormValid) {
    localStorage.setItem("data", JSON.stringify(mydata));
  }
}

function validateName(name) {
  const regexName = /^[a-zA-Z]{2,30}$/;

  if (!regexName.test(name.value)) {
    isFormValid = false;
    document.querySelector(".error-name").innerHTML =
      "You have entered an invalid name";
  } else {
    document.querySelector(".error-name").innerHTML = "";
    mydata.name = name.value;
  }
}

function validateWebsite(url) {
  const regexWebsite = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;

  if (!regexWebsite.test(url.value)) {
    isFormValid = false;
    document.querySelector(".error-website").innerHTML =
      "You have entered an invalid website url";
  } else {
    document.querySelector(".error-website").innerHTML = "";
    mydata.website = url.value;
  }
}

function validatePhone(phone) {
  const regexPhone = /^[\d\.\-]+$/;

  if (!regexPhone.test(phone.value) || phone.value == "") {
    isFormValid = false;
    document.querySelector(".error-phone").innerHTML =
      "You have entered an invalid phone number";
  } else {
    document.querySelector(".error-phone").innerHTML = "";
    mydata.phone = phone.value;
  }
}

function validateEmail(email) {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let storedEmail;

  if (!regexEmail.test(email.value)) {
    isFormValid = false;
    document.querySelector(".error-email").innerHTML =
      "You have entered an invalid email";
  } else {
    const retrievedObject = localStorage.getItem("data");
    let storedObject = JSON.parse(retrievedObject);

    if (storedObject != null && storedObject.hasOwnProperty("email")) {
      storedEmail = storedObject.email;
    } else {
      storedEmail = "";
    }

    if (storedEmail === email.value) {
      isFormValid = false;
      document.querySelector(".submit-message").innerHTML =
        "Email already submitted";
    } else {
      document.querySelector(".error-email").innerHTML = "";
      mydata.email = email.value;
    }
  }
}

function validateAddress(address) {
  if (address.value == "") {
    isFormValid = false;
    document.querySelector(".error-address").innerHTML =
      "You have entered an invalid address";
  } else {
    mydata.address = address.value;
  }
}

form.addEventListener("submit", submitForm);

function initMap() {
  const mapDiv = document.getElementById("map");
  const map = new google.maps.Map(mapDiv, {
    zoom: 8,
    center: new google.maps.LatLng(42.698334, 23.319941),
  });

  map.addListener("click", (e) => {
    geocoder = new google.maps.Geocoder();

    const latlng = {
      lat: parseFloat(e.latLng.lat()),
      lng: parseFloat(e.latLng.lng()),
    };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          address.value = results[0].formatted_address;
          marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: "images/adress.jpg"
          });
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  });
}
