// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgmXZu34LnRagXsXzgBYob42Zrgn1mPc4",
  authDomain: "tdc-debugmentalhealth.firebaseapp.com",
  databaseURL: "https://tdc-debugmentalhealth-default-rtdb.firebaseio.com",
  projectId: "tdc-debugmentalhealth",
  storageBucket: "tdc-debugmentalhealth.appspot.com",
  messagingSenderId: "515876331617",
  appId: "1:515876331617:web:85398a08ffa6587b020a20",
  measurementId: "G-87DWHB8XQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
console.log(app);


// Reference to the current user's journal entries in Realtime Database
const journalRef = firebase.database().ref("journal/" + firebase.auth().currentUser.uid);

// Get the form element
const journalEntryForm = document.getElementById("journal-entry-form");

// Add a submit event listener to the form
journalEntryForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting via HTTP

  // Get journal entry data from the form
  const entryData = {
    date: journalEntryForm.date.value,
    title: journalEntryForm.title.value,
    content: journalEntryForm.content.value,
  };

  // Generate a unique key for the entry
  const entryKey = journalRef.push().key;

  // Save the journal entry with the unique key
  journalRef.child(entryKey).set(entryData)
    .then(() => {
      console.log("Journal entry saved successfully.");
      // Optionally, you can clear the form or display a success message.
    })
    .catch((error) => {
      console.error("Error saving journal entry:", error);
      // Handle errors and display an error message to the user if needed.
    });
});

// Reference to the HTML element where you want to display journal entries
const journalContainer = document.getElementById("journal-entries"); // Replace with the actual ID of your container

// Fetch journal entries
journalRef.once("value")
  .then(function(snapshot) {
    // Get all journal entries
    const entries = snapshot.val();

    // Loop through entries and display them
    for (const entryKey in entries) {
      const entryData = entries[entryKey];
      displayJournalEntry(entryData);
    }
  })
  .catch(function(error) {
    console.error("Error fetching journal entries:", error);
    // Handle errors and display an error message to the user if needed.
  });

// Function to display a journal entry
function displayJournalEntry(entryData) {
  // Create HTML elements to display the entry (e.g., date, title, content)
  const entryElement = document.createElement("div");
  entryElement.innerHTML = `
    <h3>${entryData.date}</h3>
    <h2>${entryData.title}</h2>
    <p>${entryData.content}</p>
  `;

  // Append the entry to the container
  journalContainer.appendChild(entryElement);
}
