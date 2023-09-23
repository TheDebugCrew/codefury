// Initialize Firebase (replace with your Firebase config)
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);

// Check if a user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, display their name
        const userDisplayName = user.displayName;
        document.querySelector('#user-display-name').textContent = userDisplayName;

        // Fetch and display user's progress, challenges, and badges here
        // For now, let's add a sample challenge to get you started
        const challengeList = document.querySelector('#challenge-list');
        const sampleChallenge = document.createElement('li');
        sampleChallenge.textContent = "30-Minute Walk Challenge";
        challengeList.appendChild(sampleChallenge);
    } else {
        // User is not signed in, you can redirect them to the login page
        window.location.href = "login.html"; // Replace with your login page URL
    }
});
