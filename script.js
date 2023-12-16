//Logic for password masking
function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str += "*"
    }
    return str
}

//Logic to copy password to clipboard
function copyText(txt){
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display= "inline"
            setTimeout(() => {
                document.getElementById("alert").style.display= "none"

            }, 2000);
        },
        () => {
            alert("Clipboard copying failed");
        },
    );
}

//Logic to delete a Password
const deletePassword = (website)=>{
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e)=>{
        return e.website !=website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully deleted ${website}'s password`)
    showPasswords()
}

//Logic to fill table after inputing values
const showPasswords = () => {
    let tb= document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if(data == null) {
        tb.innerHTML = "No Data to Show"
    }
    else {
        tb.innerHTML =  `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Passwords</th>
        <th>Action</th>
      </tr>`
    let arr = JSON.parse(data);
    let str = ""
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];

        str += `<tr>
            <td>${element.website} <img onclick="copyText('${element.website}')" src="./Images/copyIcon.svg" alt="Copy Button" width="20" height="20"> </td>
            <td>${element.username} <img onclick="copyText('${element.username}')" src="./Images/copyIcon.svg" alt="Copy Button" width="20" height="20"> </td>
            <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./Images/copyIcon.svg" alt="Copy Button" width="20" height="20"> </td>
            <td><img class="linkedin" src="./Images/delete.svg" height="38" width="38" onclick="deletePassword('${element.website}')"></td>
            </tr>`
        }
        // <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
    tb.innerHTML = tb.innerHTML + str
}
    website.value=""
    username.value=""
    password.value=""
}



console.log("Working");
showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Clicked...")
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)

    if (passwords == null) {
        let json = []
        json.push({website:website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({website:website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})

