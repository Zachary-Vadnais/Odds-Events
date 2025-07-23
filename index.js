
//== state ==
let numberBank = [];
let oddNumbers = [];
let evenNumbers = [];

//== root ==
const root = document.createElement("div");
document.body.appendChild(root);

//== render function ==
function renderApp() {
    root.innerHTML = ""; 
    root.appendChild(renderForm());
    root.appendChild(renderButtons());
    root.appendChild(renderSection("Number Bank", numberBank));
    root.appendChild(renderSection("Even Numbers", evenNumbers));
    root.appendChild(renderSection("Odd Numbers", oddNumbers));
}

//== components ==

// form to add number
function renderForm() {
    const form = document.createElement("form"); 
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Enter a number";
    input.required = true;

    const button = document.createElement("button");
    button.textContent = "Add Number";

    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener("submit", (e) => { 
        e.preventDefault();
        const num = parseInt(input.value);
        if (!isNaN(num)) {
            addNumber(num);
            input.value = "";
        }
    });

    return form;
}

// buttons to sort
function renderButtons() {
    const container = document.createElement("div");
    container.classList.add("button-container");

    const sortOneBtn = document.createElement("button");
    sortOneBtn.textContent = "Sort One";
    sortOneBtn.addEventListener("click", () => {
        sortOne();
    });

    const sortAllBtn = document.createElement("button");
    sortAllBtn.textContent = "Sort All";
    sortAllBtn.addEventListener("click", () => {
        sortAll();
    });


    const randomBtn = document.createElement("button");
    randomBtn.textcontent = "Generate Random Number";
    randomBtn.addEventListener("click", () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        addNumber(randomNumber);
    });



    container.appendChild(randomBtn);
    container.appendChild(sortOneBtn);
    container.appendChild(sortAllBtn);

    return container;
}

// render a section for numbers
function renderSection(title, numbers) {
    const section = document.createElement("section");

    const heading = document.createElement("h2");
    heading.textContent = title;

    const list = document.createElement("ul");
    const sortedNumbers = [...numbers].sort((a,b) => a-b);

    for(let num of sortedNumbers) {
        const li= document.createElement("li");
        li.textContent = num;
        list.appendChild(li);
    }

    section.appendChild(heading);
    section.appendChild(list);
    return section;
}

//== state update functions ==
function addNumber(num) {
    numberBank.push(num);
    renderApp(); 
}

function sortOne() {
    const num = numberBank.shift(); 
    if (num !== undefined) {
        if (num % 2 === 0) {
            evenNumbers.push(num);
        } else {
            oddNumbers.push(num);
        }
    }
    renderApp();
}

function sortAll() {
    while (numberBank.length > 0) {
        sortOne();
    }
}

renderApp();