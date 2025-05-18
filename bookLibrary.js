let Registration = JSON.parse(localStorage.getItem('todo')) || [];// initializng the todo array from local storage

function showMessage(messagediv) {
    let message = document.createElement('div'); // creating a div element to show messages
    message.textContent = messagediv;// setting the text content of the message div
    message.style.position="fixed";
    message.style.backgroundColor = "limegreen";
    message.style.padding = '10px';
    message.style.margin = '10px 0';
    message.style.borderRadius = '5px';
    document.getElementById('messageContainer').appendChild(message); //appending the message div to the message container

    setTimeout(() => {
        message.remove();
    }, 3000);
}

function register(){
    
let username = document.getElementById("Yousername").value.trim();
let password = document.getElementById("Pasword").value.trim();

if (username === "" || password === "") {
    showMessage("Please fill in all fields");
    return;
}else if (Registration.some(entry => entry.username === username)|| Registration.some(entry => entry.password === password)) {
    showMessage("Username already exists");
    return;
}else if (username.length < 3 || password.length < 6) {
    showMessage("Username must be at least 3 characters and password must be at least 6 characters");
    return;
} else {
    Registration.push({ username, password });
    showMessage("Registration successful");
    // Clear input fields
    document.getElementById('Yousername').value = '';
    document.getElementById('Pasword').value = '';
    document.getElementById("name").value = '';
    document.getElementById("surname").value = '';
    // Save to local storage            
    localStorage.setItem('todo', JSON.stringify(Registration));
 
}
}

function logIn(){
    let UUsername = document.getElementById("Username").value.trim();
    let PPassword = document.getElementById("Password").value.trim();
   
    if( UUsername === ""|| PPassword ===""){
        showMessage("Please fill in all fields");
        return;
    }
    const user = Registration.find(entry => entry.username ===UUsername && entry.password === PPassword);// find the user in the Registration array
   
    if(user){// if user is found}
        showMessage("Login successful");
     

}else {
    showMessage("Invalid username or password");
}
document.getElementById("Username").value='';
document.getElementById("Password").value='';
  window.location.href = "home.html";  

}

async function searchBooks(){
    let searchInput = document.getElementById("search").value.toLowerCase().trim();
    
    let apiKey= "AIzaSyA86IDXiCMpyjiiPUB6Hj_lRTnhcJ38EQA";
   
    let url = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${apiKey}`;   
   
    
try{
    let response = await fetch(url);// Fetching data from the API
    // Check if the response is ok (status in the range 200-299)
    // If not, throw an error
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }


    let data = await response.json();// waiting for the response to be converted to JSON
   
    let books = data.items;// Array of books returned from the API
    
    let List = document.getElementById("bookList");
    List.innerHTML = ""; // Clear previous results
    if (books && books.length > 0) {// Check if there are books in the response
        books.forEach(book => {
            let bookItem = document.createElement("div");
            bookItem.className = "book-item";
            bookItem.innerHTML = `
                <h3>${book.volumeInfo.title}</h3>
                <p>${book.volumeInfo.description || "No description available"}</p>
                <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'No image available'}" alt="${book.volumeInfo.title}">
            `;
            bookList.appendChild(bookItem);
        });
    } else {
        bookList.innerHTML = "<p>No results found</p>";
    }





}

    
catch (error) {
    console.error("Error fetching data:", error);
    showMessage("Error fetching data");

    


}
}

function updateProfile(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            alert("Profile updated for: " + name + " (" + email + ")");
        }