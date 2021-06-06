let addbtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let formulaInput = document.querySelector(".formula-box");

let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");


let fontBtn = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");

let allAlignBtns = document.querySelectorAll(".alignment-container>input");

let gridContainer = document.querySelector(".grid_container");
let topLeftBlock = document.querySelector(".top-left-block");


let sheetDB = workSheetDB[0];
firstSheet.addEventListener("click", handleActiveSheet);
// create sheets and add functionlities
addbtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    console.log(sheetsArr);
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    // console.log("idx" + idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = `Sheet ${idx + 1}`;
    // page add
    sheetList.appendChild(NewSheet);

    //  db
    // active set 
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr[sheetsArr.length - 1].classList.add("active-sheet");
    // 2 d array 
    initCurrentSheetDb();
    // /current change
    sheetDB = workSheetDB[idx];
    // cell empty 
    // new page element value empty
    initUI();
    // change sheet
    NewSheet.addEventListener("click", handleActiveSheet);
})

function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }
    //  index
    let sheetIdx = MySheet.getAttribute("sheetIdx");
    sheetDB = workSheetDB[sheetIdx - 1];
    // get data from that and set ui
    setUI(sheetDB);
}




// *****************************************************
//  address set on click of a cell 
//**************************************************** */
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handleCell() {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
    });

    Allcells[i].addEventListener("keydown", function (e) {
        let obj = Allcells[i].getBoundingClientRect();
        let height = obj.height;
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        let leftCol = document.querySelectorAll(".left-col .left-col_box")[rid];
        leftCol.style.height = height + "px";
    });
}



// initial cell click emulate
Allcells[0].click();





// Helper function

function initUI() {
    for (let i = 0; i < Allcells.length; i++) {
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily = "Arial";
        Allcells[i].style.fontSize = "16px";
        Allcells[i].style.textAlign = "left";
        Allcells[i].innerText = "";
    }
}
function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let {
                bold,
                italic,
                underline,
                fontFamily,
                fontSize,
                halign,
                value,
                backgroundColor,
                fontColor
            } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.style.fontSize = fontSize;
            cell.style.textAlign = halign
            cell.style.fontFamily = fontFamily
            cell.style.textDecoration = underline ? "underline" : null;
            cell.style.fontStyle = italic ? "italic" : null;
            cell.innerText = value;
            cell.style.backgroundColor = backgroundColor;
            cell.style.fontcolor = fontColor;
        }
    }
}








// grid formatting
document.querySelectorAll(".grid .col").forEach(e => {
    e.addEventListener("click", (event) => {
        if (event.target.style.fontWeight == "bold") {
            document.querySelector("#bold").style.backgroundColor = "lightgrey"
            document.querySelector("#bold").style.backgroundRadius = "5px"
        } else {
            document.querySelector("#bold").style.backgroundColor = "#ffffff"
            document.querySelector("#bold").style.backgroundRadius = "5px"
        }

        if (event.target.style.fontStyle == "italic") {
            document.querySelector("#italic").style.backgroundColor = "lightgrey"
            document.querySelector("#italic").style.backgroundRadius = "5px"
        } else {
            document.querySelector("#italic").style.backgroundColor = "#ffffff"
            document.querySelector("#italic").style.backgroundRadius = "5px"
        }

        if (event.target.style.textDecoration == "underline") {
            document.querySelector("#underline").style.backgroundColor = "lightgrey"
            document.querySelector("#underline").style.backgroundRadius = "5px"
        } else {
            document.querySelector("#underline").style.backgroundColor = "#ffffff"
            document.querySelector("#underline").style.backgroundRadius = "5px"
        }
        document.querySelector("#styler-align").value = event.target.style.textAlign;
        document.querySelector("#font-family").value = event.target.style.fontFamily;
        document.querySelector("#font-size").value = event.target.style.fontSize;
        if (event.target.style.textAlign == "") {
            document.querySelector("#styler-align").selectedIndex = "0"
        }
        if (event.target.style.fontFamily == "") {
            document.querySelector("#font-family").selectedIndex = "0"
        }
        if (event.target.style.fontSize == "") {
            document.querySelector("#font-size").selectedIndex = "0"
        }

    })
})

function getRIdCIdfromAddress(adress) {
    // A1
    let cellColAdr = adress.charCodeAt(0);
    // console.log(cellColAdr);
    let cellrowAdr = adress.slice(1);
    let cid = cellColAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid };
}

//font edit handel
document.querySelector("#font-size").addEventListener("change", function (e) {
    let fontSize = e.target.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    sheetDB[rid][cid].fontSize = fontSize;
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    console.log(fontSize);
    cell.style.fontSize = fontSize;
})

document.querySelector("#styler-align").addEventListener('change', e => {
    let align = e.target.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    sheetDB[rid][cid].halign = align;
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = align;
})

document.querySelector("#font-family").addEventListener('change', e => {
    let family = e.target.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    sheetDB[rid][cid].fontFamily = family;
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily = family;
})

document.querySelector("#underline").addEventListener('click', e => {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    sheetDB[rid][cid].underline = "underline";
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textDecoration = "underline";
})

document.querySelector("#italic").addEventListener('click', e => {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontStyle = "italic";
    sheetDB[rid][cid].italic = "italic";
})

document.querySelector("#bold").addEventListener('click', e => {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontWeight = "bold";
    sheetDB[rid][cid].bold = true;
})
document.querySelector("#color").addEventListener('change', e => {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.color = e.target.value;
    sheetDB[rid][cid].fontColor = e.target.value;
})
document.querySelector("#bg-color").addEventListener('change', e => {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.backgroundColor = e.target.value;
    sheetDB[rid][cid].backgroundColor = e.target.value;
})


// ********Formula code*******************
// cell blur
// "value"-> value
//  fomrula value-> manually value set  

for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("blur", function handleCell() {
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        // 2d array
        let cellObject = sheetDB[rid][cid];

        // grid 
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        //   formula -> 40, 40
        if (cellObject.value == cell.innerText) {
            return;
        }
        if (cellObject.formula) {
            removeFormula(cellObject, address);
        }
        // db entry
        cellObject.value = cell.innerText;
        // depend update 
        changeChildrens(cellObject);
    });
}

// formula bar enter// value -> formula set
// old formula -> new formula  
formulaInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaInput.value != "") {
        let Newformula = formulaInput.value;
        // cellObject formula
        let address = addressBar.value;
        // getCurrentCell
        let { rid, cid } = getRIdCIdfromAddress(address);
        let cellObject = sheetDB[rid][cid];
        let prevFormula = cellObject.formula;
        if (prevFormula == Newformula) {
            return;
        }
        if (prevFormula != "" && prevFormula != Newformula) {
            removeFormula(cellObject, address);
        }
        let evaluatedValue = evaluateFormula(Newformula);
        // alert(value);
        //    UI change
        setUIByFormula(evaluatedValue, rid, cid);
        // db -> works
        setFormula(evaluatedValue, Newformula, rid, cid, address);
        changeChildrens(cellObject);
    }
})


// parsing 
function evaluateFormula(formula) {
    // (A100+A20)
    // 
    let formulaTokens = formula.split(" ");
    // split
    // [(, A1, +, A2,)]
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            // A1
            let { rid, cid } = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            //  getting value from  db
            let { value } = cellObject;
            formula = formula.replace(formulaTokens[i], value);
        }
    }
    // (10 +20 )
    // infix evaluation
    let ans = eval(formula);
    if (ans == 'infinity') {
        alert("Exception Cycle Detected");
    }
    return ans;
    // eval
    // ( 10 + 20 )
}


function setUIByFormula(value, rid, cid) {
    document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;
    //  parent add yourself as a
}



// formula update db, value update , parent children array update
function setFormula(value, formula, rid, cid, address) {
    let cellObject = sheetDB[rid][cid];
    cellObject.value = value;
    cellObject.formula = formula;
    let formulaTokens = formula.split(" ");
    // (A1 + A2)
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            cellObject.children.push(address)
        }
    }
}


function changeChildrens(cellObject) {
    // children get
    // formula reevaluate
    // recursively call
    let childrens = cellObject.children;
    for (let i = 0; i < childrens.length; i++) {
        let chAddress = childrens[i];
        let chRICIObj = getRIdCIdfromAddress(chAddress);
        let chObj = sheetDB[chRICIObj.rid][chRICIObj.cid];
        let formula = chObj.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUIByFormula(evaluatedValue, chRICIObj.rid, chRICIObj.cid);
        chObj.value = evaluatedValue;
        // your children have children
        changeChildrens(chObj);
    }

}
// remove yourself from parent;s children array
function removeFormula(cellObject, address) {
    // (A1)
    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let parentCellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            let childrens = parentCellObject.children;
            let idx = childrens.indexOf(address);
            childrens.splice(idx, 1);
        }
    }
    cellObject.formula = "";
}