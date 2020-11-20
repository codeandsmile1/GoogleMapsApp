const name = document.getElementById("name");
const address = document.getElementById("address");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const website = document.getElementById("website");
const mapId = document.getElementById("map");
const form = document.getElementById("form");
let isFormValid = true;

let markers = [];

let listData = [];

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
  unSetMarker(marker);
}

function clearForm() {
  if (isFormValid) {
    form.reset();
  }
}

function saveDataInLocalStorage() {
  if (isFormValid) {
    let localData = JSON.parse(localStorage.getItem("data"));

    if (localData === null) {
      listData.push(mydata);
      localStorage.setItem("data", JSON.stringify(listData));
    } else {
      localData.push(mydata);
      localStorage.setItem("data", JSON.stringify(localData));
    }
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
  let storedListData;

  if (!regexEmail.test(email.value)) {
    isFormValid = false;
    document.querySelector(".error-email").innerHTML =
      "You have entered an invalid email";
  } else {

    if(localStorage.getItem("data") != null) {
      storedListData = JSON.parse( localStorage.getItem("data"));
        
      for (let i = 0; i < storedListData.length; i++) {
        if(storedListData[i].email == email.value) {
          isFormValid = false;
          document.querySelector(".submit-message").innerHTML =
            "Email already submitted";
        } else {
          mydata.email = email.value;
         document.querySelector(".submit-message").innerHTML = "";
         }
        }
     } else{
      document.querySelector(".submit-message").innerHTML = "";
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
    document.querySelector(".error-address").innerHTML = "";
    mydata.address = address.value;
  }
}

form.addEventListener("submit", submitForm);

let marker = null;

function initMap() {
  const map = new google.maps.Map(mapId, {
    zoom: 8,
    center: new google.maps.LatLng(42.698334, 23.319941),
  });
 
  map.addListener("click", (e) => {
    geocoder = new google.maps.Geocoder();
    
    const latlng = {
      lat: parseFloat(e.latLng.lat()),
      lng: parseFloat(e.latLng.lng()),
    };

     unSetMarker(marker);

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

function unSetMarker(marker) {
  if(marker != null) {
    marker.setMap(null);
    }
}
