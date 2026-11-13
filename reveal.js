import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "secret-santa-49de2.firebaseapp.com",
    projectId: "secret-santa-49de2",
    storageBucket: "secret-santa-49de2.firebasestorage.app",
    messagingSenderId: "4784871446",
    appId: "1:4784871446:web:38cdf196e3696f4e6bfd37",
    measurementId: "G-1MVDS2HM8H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
window.onload = () => {

    const form = document.querySelector("form");

    form.addEventListener("submit", async event => {

        event.preventDefault();

        const name = document.getElementById("getName").value.trim();
        const code = document.getElementById("accessCode").value.trim();
        const gName = document.getElementById("gName");
        const gList = document.getElementById("gList");


        const participantQuery = query(
            collection(db, "participants"),
            where("nameLower", "==", name.toLowerCase()),
            where("code", "==", code)
        );

        const querySnapshot = await getDocs(participantQuery);

        if (querySnapshot.empty) {
            alert("That didn't work. Please check your name and access code.");
            return;
        }

        const participant = querySnapshot.docs[0].data();
        gName.innerHTML = "Their name: " + participant.assignedTo;
        gList.innerHTML = "Wishlist: " + participant.assignedGiftList;

        form.reset();

    });

};