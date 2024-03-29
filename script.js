let btn=document.querySelector(".btn");
showpassword();
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let passwords=localStorage.getItem("passwords");
    if(passwords==null)
    {
        let json=[];
        json.push({website: website.value, username: username.value, password: password.value });
        localStorage.setItem("passwords",JSON.stringify(json));
    }
    else{
        let json=JSON.parse(passwords);
        json.push({website: website.value, username: username.value, password: password.value });
        localStorage.setItem("passwords",JSON.stringify(json));
    }
    showpassword();
})

//display password

function showpassword(){
    let passwords=localStorage.getItem("passwords");
    let table=document.getElementById("table");
    if(passwords==null ||  JSON.parse(passwords).length == 0)
    {
        table.innerHTML="no data to be shown";
    }
    else
    {
        let array=JSON.parse(passwords);
        table.innerHTML= `<tr class="">
        <td class="font-bold px-2">Website</td>
        <td class="font-bold px-2">Username</td>
        <td class="font-bold px-2">Password</td>
        <td class="font-bold px-2">Delete</td>
     </tr>`
     let str=""
     array.forEach(e => {
        str+= `<tr class="">
        <td class="font-bold border-2 border-black">${e.website}<img class="relative left-16 bottom-3 cursor-pointer " onclick="copyText('${e.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
        <td class="font-bold border-2 border-black">${e.username}<img class="relative left-16 bottom-3 cursor-pointer " onclick="copyText('${e.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
        <td class="border-2 border-black">${hidepassword(e.password)}<img class="relative left-16 bottom-3 cursor-pointer " onclick="copyText('${e.password}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
        <td class="px-2 border-2 border-black"> <button onclick="deletepassword('${e.website}')" class="rounded-lg bg-gray-400 w-20 my-2 btn">Delete</button></td>
     </tr>` 
     });
     table.innerHTML=table.innerHTML + str;
    }
}

//delete password

function deletepassword(website){
    let item=localStorage.getItem("passwords")
    let passwords=JSON.parse(item);
    let newarray=passwords.filter((e)=>{
        return e.website!=website;
    })
    localStorage.setItem("passwords",JSON.stringify(newarray));
    showpassword();
}

//hide password

function hidepassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str  += "*"
    }
    return str
}

//copy

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 2000);

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed")
        },
      );
  }