// Initialize Firebase
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);

// Handle user registration
const signUpForm = document.querySelector('#signup-form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User registered successfully, you can redirect here
            console.log('User registered:', userCredential.user);
            // Redirect to the dashboard or another page
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            // Handle registration error
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            // You can display an error message to the user if needed
        });
});
