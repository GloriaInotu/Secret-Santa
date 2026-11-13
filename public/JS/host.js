import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc
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

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
        [array[j], array[i]];
    }

    return array;
}

window.onload = async () => {
    const header2 = document.getElementById("header2")
    const form = document.querySelector("form");

    const snapshot =
    await getDocs(
        collection(db, "participants")
    );
    const participants = [];

    snapshot.forEach(docSnap => {
        participants.push({
            id: docSnap.id,
            ...docSnap.data()
        });
    });

    header2.innerHTML = "Number of participants:" + snapshot.size;

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const pin = document.getElementById("pin").value;

        if (pin !== "111") {

            alert("Incorrect PIN");
            return;
        }

        const snapshot = await getDocs(
            collection(db, "participants")
        );

        const participants = [];

        snapshot.forEach(docSnap => {

            participants.push({
                id: docSnap.id,
                ...docSnap.data()
            });

        });

        let receivers;

        do {

            receivers =
                shuffle([...participants]);

        } while (

            participants.some(
                (person, index) =>
                    person.id === receivers[index].id
            )

        );

        for (
            let i = 0;
            i < participants.length;
            i++
        ) {

            await updateDoc(
                doc(
                    db,
                    "participants",
                    participants[i].id
                ),
                {
                    assignedTo:
                        receivers[i].name,

                    assignedGiftList:
                        receivers[i].giftList
                }
            );

        }

        alert(
            "Secret Santa draw generated successfully!"
        );

        form.reset();

    });
    };