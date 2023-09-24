function myFunction() {
    var navBar = document.getElementById("nav-bar");
    if (navBar.className === "navbar") {
      navBar.className += " responsive";
    } else {
      navBar.className = "navbar";
    }
  }