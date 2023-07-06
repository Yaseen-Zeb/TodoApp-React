import { useState } from 'react';
import './css/app.css';


function App() {
    let [item, setitem] = useState("");
   let additem = []

     let list = [];
function getLists() {
        if (localStorage.getItem("list") != null) {
            list = JSON.parse(localStorage.getItem("list"))
        }else{
           list = additem;
        }
}
getLists()


    function show() {
        let str ="";
        list.forEach((e,i) => {
            str += `<div class="data">
            <p class="text">${e}</p>
            <input class="newInpt" type="text" />
            <button class="edit_btn">Edit</button>
            <button class="done_btn">Done</button>
            <i class='delete fas fa-trash'></i>
            </div>` 
            });
            setTimeout(() => {
                document.querySelector("section").innerHTML = str; 
            }, 200);
    }
    show();

    let input_change = (e) => {
        setitem(e.target.value);
    }
    let add = () => {
        if (item !== "") {
            localStorage.setItem("list",JSON.stringify([...list,item]));
        }
        setitem("");
    } 
    window.onkeydown = (e) => {
            if (e.keyCode === 13) {
        add()
            }
        }

    setInterval(() => {
        getLists()
        if (list.length > 0) {
            document.querySelectorAll(".data").forEach((e,i) => {
                 let edit_btn = e.querySelector(".edit_btn"),
                 done_btn = e.querySelector(".done_btn"),
                 newInpt = e.querySelector(".newInpt"),
                 pera = e.querySelector(".text"),
                 dlete = e.querySelector(".delete");
         
                 edit_btn.onclick = () =>{
                     pera.style.display = "none";
                     newInpt.style.display = "block";
                     newInpt.value = pera.textContent;
                     newInpt.focus();
                     edit_btn.style.display = "none";
                     done_btn.style.display = "block";
                 }
        
                 done_btn.onclick = () =>{
                    edit_btn.style.display = "block";
                    done_btn.style.display = "none";
                    pera.textContent = newInpt.value;
                    newInpt.style.display = "none";
                    pera.style.display = "block";
                    if (newInpt.value !== "") {
                         list[i] = newInpt.value;
                    }
                    localStorage.setItem("list",JSON.stringify(list))
                    show();
                 }
        
                 dlete.onclick = () =>{
                    
                    let updated_arr = [];
                    
                        list.forEach((stored_data,j)=>{
                            if (i !== j) {
                               updated_arr.push(stored_data)
                            }
                        })
                    localStorage.setItem("list",JSON.stringify(updated_arr));
                    getLists()
                    show()
                    }
         })
        }
        }, 600);

   
    return (
        <>
         <nav>
    <div className="first">
        <h1>To-do List</h1>
    </div>
    <div className="second">
        <input onChange={input_change} type="text" className="input" placeholder="Type" value={item} />
        <button onClick={add} className="submit"><i className="fa fa-plus" aria-hidden="true"></i></button>
    </div>
</nav>

<section className="store-data">

</section>
        </>

    )
}

export default App;