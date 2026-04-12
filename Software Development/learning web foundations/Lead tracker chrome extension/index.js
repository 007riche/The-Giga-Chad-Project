let myLeads = [];
const inputEl = document.getElementById("input-el");

const saveBtn= document.getElementById("input-btn");
const leadList = document.getElementById("leads");
const clearBtn = document.getElementById("clear-btn");

const storedLeads = JSON.parse(localStorage.getItem("leads"));
if(storedLeads) {
    myLeads=storedLeads;
    myLeads.forEach(lead => {
        renderLead(lead);
    });
}

clearBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads=[];
    const children = leadList.childNodes;
    
    while(children.length > 1) {
        leadList.removeChild(children[1]);
        // setTimeout(() => {console.log(`${children[1]}`)}, "1000");
    }
});


saveBtn.addEventListener("click", () => {
    const newLead = inputEl.value;
    myLeads.push(newLead);
    renderLead(newLead);
    localStorage.setItem("leads", JSON.stringify(myLeads));
    inputEl.value = "";
    console.log(myLeads);
});

console.log("out of the listener");

function renderLead(lead) {
        let childLi = document.createElement("li");
        let childLiA = document.createElement("a");
        childLiA.setAttribute("href", lead);
        childLiA.setAttribute("target", "_blank");
        childLiA.textContent = lead;
        childLi.append(childLiA);
        leadList.append(childLi);
}

// function renderLeads() {
//     leadList.innerHTML = "";
//     myLeads.forEach(lead => {
//         let childLi = document.createElement("li");
//         childLi.textContent = lead;
//         leadList.append(childLi);
//     })
// }