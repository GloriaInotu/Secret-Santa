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

        const name = document.getElementById("name").value.trim();
 
        const gift = document.getElementById("giftlist").value.trim();

        const code = Math.floor(1000 + Math.random() * 9000).toString();

        const participantQuery = query(
        collection(db, "participants"),
        where("nameLower", "==", name.toLowerCase()) );

        const querySnapshot = await getDocs(participantQuery);

        if (!querySnapshot.empty) {
            alert("dw, your details are already saved");
            return;
        }

        await addDoc(
            collection(db, "participants"),
            {
                name: name,
                nameLower: name.toLowerCase(),
                giftList: gift,
                code: code,
                assignedTo: ""
            } );

        alert("Registration successful!\n\nYour access code is " +code+ "\n\n Save this code!!");

        form.reset();
    });
};