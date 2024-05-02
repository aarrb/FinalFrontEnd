const mode = 0;

const host_local = "http://localhost:8080";
const host_remote = "";

function getHost() {
  return (mode == 0) ? host_local : host_remote;
}

function isLoggedIn() {
  if(localStorage.getItem("token")) {
    return true;} 
  else {
    return false;}
}

function saveTheToken(token) {
  localStorage.setItem("token", token);

} 

function removeTheToken() {
 localStorage.removeItem("token");

} 

function getTheToken() {
  return localStorage.getItem("token");
} 




let configuration = {
  isLoggedIn: () => isLoggedIn(), 
  host: () => getHost(), 
  token: () => getTheToken()    
};



updateItemCart();


async function updateItemCart() {
  try {
      let itemCount = 0;
      document.getElementById("itemCount").textContent = itemCount;
  } catch (error) {
      console.error("Error updating item cart:", error);
  }
}



function emptyBasket() {
  localStorage.removeItem("basket");
}




async function login() {    
    let username = document.getElementById("username-login").value;
    let password = document.getElementById("password-login").value;
    let customer = {username: username, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/login", request);
        if(response.status == 200) {  
          alert("The login was successful!");
          const token = await response.text();
          saveTheToken(token);            
          location.href = "index.html";
        } else {
            console.log(`response status:${response.status}`);
            removeTheToken();            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}

async function signup() {
    let email = document.getElementById("email-signup").value;
    let password = document.getElementById("password-signup").value;
    let username = document.getElementById("username-signup").value;
    let customer = {username: username, email:email, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/signup", request);
        if(response.status == 200) {  
            alert("The registration was successful!")
            location.href = "login.html";

        } else {
            console.log(`response status:${response.status}`);            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}

async function logout() {   
  removeTheToken();  
}

async function getAll() {
  let response = await fetch(host_local + "/flowers", {
});
  let result = await response.json();
  return result;
}