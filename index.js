window.onload = () => {
    // get the form element and create an array to store the participants
    const form = document.querySelector("form");
    const participants = [];
    

    form.addEventListener("submit", event => {
        // when form is submitted, the inputted values are stored 
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const gift = document.getElementById("giftlist").value.trim();

        // when there are 10 participants, users will be taken to next page where they can see the list of participants and be allocated a gifter.
        if(participants.length >=10) {
            return; 
        }

        // checks for duplicate submissions to the array are done 
        const duplicateName = participants.some(
        participant => participant.name.toLowerCase() === name.toLowerCase());
        if (duplicateName) {
            alert("dw, your details are already in the list");
            return;
        }

        // if name hasn't been pushed to the array earlier, push the inputted name and giftlist to array
        participants.push({
            name: name,
            gift: gift
        });

        form.reset();  
        console.log(participants);
        
    })
    
    
}