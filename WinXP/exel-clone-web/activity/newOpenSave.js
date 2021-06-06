let save = document.querySelector(".save");
let open = document.querySelector(".open");
// functionality -> download excel representation
save.addEventListener("click", function () {
    //2d arrayy save file 
    const data = JSON.stringify(workSheetDB);
    // convert it into blob
    // data -> file like object convert
    const blob = new Blob([data], { type: 'application/json' });
    // convert it any type file into url
    const url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    // content in that file
    a.href = url;
    // file download
    a.download = "file.json";
    // anchor click
    a.click();
})
// downloaded file -> open read 
// input type file -> change event file name


open.addEventListener("change", function (e) {
    // file obj arr
    let filesArr = e.target.files;
    let fileObj = filesArr[0];
    console.log(fileObj);
    // frontend api -> file reader 
    let fr = new FileReader();
    fr.readAsText(fileObj);
    fr.addEventListener("load", function () {
        let stringData = fr.result
        sheetListArr = JSON.parse(stringData);
        sheetArr = sheetListArr[0];
        setUI(sheetArr);
    })
})



// alert(rows);