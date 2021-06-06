// let a=10;
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let grid = document.querySelector(".grid");

function init() {
    let str = "";
    for (let i = 0; i < 26; i++) {
        str += `<div class='col'>${String.fromCharCode(65 + i)}</div>`;
    }
    topRow.innerHTML = str;
    str = ""
    for (let i = 0; i < 100; i++) {
        str += `<div class='left-col_box'>${i + 1}</div>`
    }
    leftCol.innerHTML = str;
    // 2d array
    str = "";
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 26; j++) {
            str += `<div class='col' rid=${i} cid=${j} contenteditable="true"></div>`
        }
    }
    grid.innerHTML = str;
}

init();

let workSheetDB = [];
function initCurrentSheetDb() {
    let sheetDB = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let cell = {
                bold: false,
                italic: null,
                underline: null,
                fontFamily: "Arial",
                fontSize: "20",
                halign: "left",
                value: "",
                children: [],
                formula: "",
                backgroundColor: "#ffffff",
                fontColor: "black"
            }

            row.push(cell);
        }
        sheetDB.push(row);
    }
    // console.log(sheetDB);
    workSheetDB.push(sheetDB);
    // console.log(workSheetDB);
}
initCurrentSheetDb();

//  2 d Array-> styling prop
//  cell set 