//Gets the elements we need for the scrips
const myForm = document.querySelector("#myForm");
const x1 = document.querySelector("#x1");
const x2 = document.querySelector("#x2");
const y1 = document.querySelector("#y1");
const y2 = document.querySelector("#y2");
const error = document.querySelector("#errors");
const myTable = document.querySelector("#table");
const unhide = document.querySelector("#unhide");

//adds the function to be executed on the form when submit is pressed 
myForm.addEventListener("submit", onSubmit);

//function that gets rid of any children of an element
function deleteChildren(myTable) {    
    let child = myTable.lastElementChild; 
    while (child) {
        myTable.removeChild(child);
        child = myTable.lastElementChild;
    }
}

//function that executes when submit gets pressed 
function onSubmit(e){
    //prevents the default behavior when the submit button gets pressed 
    e.preventDefault();

    //calculates the length of the arrays 
    const xLen = (x2.value - x1.value) + 1;
    const yLen = (y2.value - y1.value) + 1;

    //makes sure the input was valid and if not outputs to error
    if (xLen <= 0){
        error.textContent = "Make sure X End is greater than or equal to X Start";
        error.classList.remove("hidden");
        return;
    }
    if (yLen <= 0){
        error.textContent = "Make sure Y End is greater than or equal to Y Start";
        error.classList.remove("hidden");
        return;
    }
    //clears any lingering error messages 
    error.classList.add("hidden");
    //unhides the table
    unhide.classList.remove("hidden");

    //generates the multiplication table and axis headers
    const xValues = new Array(xLen);
    const yValues = new Array(yLen);
    const multTable = new Array(yLen);

    for (let i = 0; i < xLen; i++){
        xValues[i] = parseInt(x1.value) + i;
    }
    for (let i = 0; i < yLen; i++){
        yValues[i] = parseInt(y1.value) + i;
    }

    for (let y = 0; y < yLen; y++){
        multTable[y] = Array(xLen);
        for (let x = 0; x < xLen; x++){
            multTable[y][x] = xValues[x] * yValues[y];
        }
    }

    //clears any old data in the table
    deleteChildren(myTable);

    //appends top header
    let tr = document.createElement("tr");
    for (let i = 0; i < (xLen + 1); i++) {
        const th = document.createElement("th");
        if (i == 0){
            tr.appendChild(th);
        } else{
            const textNode = document.createTextNode(xValues[i-1]);
            th.appendChild(textNode);
            tr.appendChild(th);
        }
    }
    myTable.appendChild(tr);

    //appends rest of table
    for (let y = 0; y < yLen; y++){
        tr = document.createElement("tr");
        for (let x = 0; x < (xLen + 1); x++){
            if (x == 0){
                const th = document.createElement("th");
                const textNode = document.createTextNode(yValues[y]);
                th.appendChild(textNode);
                tr.appendChild(th);
            } else{
                const td = document.createElement("td");
                const textNode = document.createTextNode(multTable[y][x-1]);
                td.appendChild(textNode);
                tr.appendChild(td);
            }
        }
        myTable.appendChild(tr);
    }
}

