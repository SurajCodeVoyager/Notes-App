const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box")

let isFirstNote = true; // Flag to check if it's the first note

 function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
 }
 showNotes();

function updateStorage(){
localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className="input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src="images/delete.png";
    // notesContainer.appendChild(inputBox).appendChild(img);

    // Check if the newly created note is empty
    if (isFirstNote) {
        isFirstNote = false; // Mark the first note as created
    } else {
        // For subsequent notes, check if it's empty
        if (!inputBox.textContent.trim()) {
            alert("Subsequent notes should not be empty!");
            return; // Do not create and append the empty note
        }
    }

    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        const parent = e.target.parentElement;

        // Check if the first empty note is being deleted
        if (isFirstNote && !parent.textContent.trim()) {
            isFirstNote = false; // Mark the first note as deleted
        }

        parent.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach((nt) => {
            nt.onkeyup = function () {
                updateStorage();
            }
        });
    }
})
document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})
// notesContainer.addEventListener("click", function(e){
//     if(e.target.tagName === "IMG"){
//         e.target.parentElement.remove(); 
//         updateStorage();
//     }
//     else if(e.target.tagName === "P"){
//         notes = document.querySelectorAll(".input-box")
//         notes.forEach(nt =>{
//             nt.onkeyup =function(){
//                 updateStorage(); 
//             }
//         })
//     }
// }) 
