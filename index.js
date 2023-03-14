let loginform = document.getElementById("login-form");
const date_of_birthinput = document.getElementById('date_of_birth');

date_of_birthinput.addEventListener('input', (event) => {
    const date_of_birth = new Date(event.target.value);
    const now = new Date();
    const Age = now.getFullYear() - date_of_birth.getFullYear();

    if (Age < 18 || Age > 55) {
        date_of_birthinput.setCustomValidity('Please enter a valid date of birth between Ages 18 and 55.');
    }
    else{
        date_of_birthinput.setCustomValidity('');
    }
});

const getdetails = ()=>{
    let details = localStorage.getItem("user-details");
    if(details){
        details = JSON.parse(details);
    }
    else{
        details = [];
    } 
    return details;
}
let data = getdetails();

const showdetails =()=>{
    const details = getdetails();
    const tableentries = details.map((entry)=>{
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.pw}</td>`;
        const date_of_birthCell = `<td>${entry.db}</td>`;
        const acceptTermsCell = `<td>${entry.ch}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${date_of_birthCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const tab = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>date_of_birth</th>
            <th>accepted terms?</th>
        </tr>${tableentries}
    </table>`;

    let fdetails = document.getElementById("user-details");
    fdetails.innerHTML = tab;
}
const saveform = (event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value; 
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;
    const db = document.getElementById("date_of_birth").value;
    const ch = document.getElementById("acceptTerms").checked;
    const entry = {
        name,
        email,
        pw,
        db,
        ch
    }
    data.push(entry);
    localStorage.setItem("user-details",JSON.stringify(data));
    showdetails();
}

loginform.addEventListener("submit",saveform); 

showdetails();


