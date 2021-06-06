/**************** 
 * Declarations
 ****************/
let footer_time = document.querySelector(".footer__time");
let startBtn = document.querySelector('.footer__start');
let startMenu = document.querySelector(".start_menu")
let animationFlag = true;
let topDepth = 100000;
let createTextDocument = document.getElementById("create_text_document");
let desktopIcinsDiv = document.querySelector(".desktop__icons");
let textDocumentDB = [];
let textDocumentIcon = id => `<div class="icon" docID='${id}' ondblclick="docOpen(event)">
                                <img src="./images/desktop_icons/word.png" alt="">
                                <div class="text">New Word Document (${id})</div>
                             </div>`
let selectedIcon = document.querySelectorAll(".icon")[0];
let menuContextDiv = document.querySelector(".context");
let emptyDocument = document.querySelector(".wordpad");



/***********************
 * Showing System time
 ***********************/
function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

footer_time.innerHTML = formatAMPM(new Date);





/*************************** 
* Start Menu Enable Disable
****************************/
startBtn.addEventListener('click', () => {
    startMenu.classList.toggle("disable")
})






/*********************
 * Desktop Right Click 
 ********************/
$(document).on("contextmenu", function (event) {
    event.preventDefault();
    if (event.target.closest(".icon")) {
        let iconEle = event.target.closest(".icon")
        menuContextDiv.innerHTML = `<div class="context__item" onclick="handelOpenIcon()">
                                        Open
                                    </div>
                                    <hr>
                                    <div class="context__item" onclick="handelRename()">
                                        Rename
                                    </div>
                                        <hr>
                                    <div class="context__item" onclick="handelDelete()">
                                        Delete
                                    </div>`
        selectedIcon = iconEle;
    } else {
        menuContextDiv.innerHTML = `<div class="context__item">
                                        View
                                    </div>
                                    <div class="context__item">
                                        Sort By
                                    </div>
                                    <div class="context__item">
                                        Refresh
                                    </div>
                                    <hr>
                                    <div class="context__item">
                                        Paste
                                    </div>
                                    <div class="context__item">
                                        Paste Shortcut
                                    </div>
                                    <hr>
                                    <div class="context__item" id="create_text_document" onclick="createIcon()">
                                        New Word Document
                                    </div>
                                    <div class="context__item">
                                        New Folder
                                    </div>
                                    <hr>
                                    <div class="context__item">
                                        Set Wallpaper
                                    </div>`
    }
    $(".context")
        .show()
        .css({
            top: event.pageY,
            left: event.pageX
        });
});
$(document).click(function () {
    if ($(".context").is(":hover") == false) {
        $(".context").fadeOut("fast");
    };
});






/****************************
 * Handel Open Rename Delete
 ****************************/
let handelOpenIcon = () => {

}
let handelRename = () => {
    selectedIcon.querySelector(".text").setAttribute("contenteditable", "true")
    $(".context").hide()
    selectedIcon.querySelector(".text").focus()
}
let handelDelete = () => {
    selectedIcon.style.display = "none";
    $(".context").hide()
}






/***********************************
 * Desktop Icon select functionality
 ***********************************/
// console.log(desktopIconsArray)
function desktopIconSelect() {
    let desktopIconsArray = document.querySelectorAll('.icon')

    desktopIconsArray.forEach((e, i) => {
        e.addEventListener("click", (event) => {
            desktopIconsArray.forEach(ele => {
                ele.classList.remove("selected")
            })
            event.target.classList.toggle("selected");
        })
        e.setAttribute("id", i)
    })
}
desktopIconSelect();





/*********************
** Xp start Animation
*********************/
function loadingAnimation() {
    let x = 1;
    let int = setInterval(() => {
        if (x == document.querySelector(".loader").offsetWidth) x = 0
        x += 1
        document.querySelectorAll(".loader span")[0].style.marginLeft = x + "px"
    }, 10);
    // if (animationFlag) {
    //     $(".xp__animation").show().delay(3000).fadeOut();
    //     $(".welcome").show().delay(6000).fadeOut().delay(10000);

    //     animationFlag = false
    // }
    if (animationFlag) {
        document.querySelector(".xp__animation").style.display = "block";
        setTimeout(() => {
            document.querySelector(".xp__animation").style.display = "none";
            animationFlag = false;
            document.querySelector(".welcome").style.display = "block";
            setTimeout(() => {
                document.querySelector(".welcome").style.display = "none";
            }, 1000);
        }, 3000);

    }
}







/*****************
 * Boot Animation
 ****************/
$('main').on('focus', 'li', function () {
    $this = $(this);
    $this.addClass('active').siblings().removeClass();
    $this.closest('main').scrollTop($this.index() * $this.outerHeight());
}).on('keydown', 'li', function (e) {
    $this = $(this);
    if (e.keyCode == 40) { $this.next().focus(); return false; }
    else if (e.keyCode == 38) {
        $this.prev().focus(); return false;
    }
}).find('li').first().focus();

document.addEventListener("keydown", (e) => {
    if (e.key == 'Enter') {
        if (document.querySelector(".active").innerText == "Start Windows Normally") {
            $(".body").hide();
            loadingAnimation();
        }
    }
})








/*****************************************
 * Depth Handeler/minimize/maximize/close
 *****************************************/

document.addEventListener("click", (e) => {

    if (e.target.closest(".window")) {
        let windowDivEle = e.target.closest(".window");
        windowDivEle.style.zIndex = ++topDepth;
        if (e.target.getAttribute("class") == "max") {
            windowDivEle.classList.toggle("maximized")
        }
        if (e.target.getAttribute("class") == "cls") {
            windowDivEle.classList.toggle("hidden")
            if (windowDivEle.classList.contains("wordpad")) {
                console.log(e.target.getAttribute("docid") + "docid in cls");
                textDocumentDB[e.target.getAttribute("docid")] = document.richTextField;
            }
        }
        if (e.target.getAttribute("class") == "min") {
            windowDivEle.style.display = "none";
        }
    }
})








/******************
 * Handel open app
 ******************/

document.querySelector(".icon[type='txt']").addEventListener("dblclick", (e) => {
    document.querySelector(".floating__window").innerHTML += `
    <div class="window maximized">
    <div class="title-bar">
        <div><img src="images/start_menu_images/notepad.png"> ReadME.txt</div>
        <div class="controls">
            <button class="cls"></button>
            <button class="max"></button>
            <button class="min"></button>
        </div>
    </div>
    <div class="menu-bar">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
    </div>
    <textarea>
Hello World!

Features:
- Desktop icons are clickable. Double clicking them will open the aaplication;
- Time in system-tray is your system's time.
- This window is draggable, closable, minimizable and maximizable. Try it.
____________________________________________________________________________

The code is on github feel free to play with it. Star the repository if you liked this. Contributions to this repository are welcome and appreciated.
____________________________________________________________________________

Do follow me on Github (@battleplayer02) and Linkedin (@hshekhar02).
        </textarea>
    </div>`;

    /*****************
     * Floating Window
     *****************/
    $(".window").draggable({
        containment: "document"
    })
    $(".window").resizable({
        handles: "n, s, e, w, ne, nw, se, sw"
    })
})


/*****************
 * Floating Window
 *****************/
$(".window").draggable({
    containment: "document"
})
$(".window").resizable({
    handles: "n, s, e, w, ne, nw, se, sw"
})





/**********************************
 * Create and handel text document
 **********************************/
let createIcon = () => {
    desktopIcinsDiv.innerHTML += textDocumentIcon(textDocumentDB.length)
    textDocumentDB.push(document.richTextField.document.body);
    desktopIconSelect();
}
let docOpen = (event) => {
    // console.log(event);
    if (event.target.closest(".icon")) {
        console.log(event.target.closest(".icon"));
    }
    emptyDocument.classList.toggle("hidden");
    emptyDocument.setAttribute("docid", event.target.getAttribute("docid"))
    console.log(event.target.getAttribute("docid"))
    document.richTextField.document.body = textDocumentDB[event.target.closest(".icon").getAttribute("docid")];
    /*******************
     * Floating Window *
     *******************/
    $(".window").draggable({
        containment: "document"
    })
    $(".window").resizable({
        handles: "n, s, e, w, ne, nw, se, sw"
    })
}


/********************************
 *    Text Editor Operations    *
 ********************************/
document.richTextField.document.designMode = "on";
var showingSourceCode = false;
var isInEditMode = true;

function enableEditMode() {
    richTextField.document.designMode = 'On';
}

function execCmd(command) {
    richTextField.document.execCommand(command, false, null);
}

function execCommandWithArg(command, arg) {
    richTextField.document.execCommand(command, false, arg);
}

function toggleSource() {
    if (showingSourceCode) {
        richTextField.document.getElementsByTagName('body')[0].innerHTML = richTextField.document.getElementsByTagName('body')[0].textContent;
        showingSourceCode = false;
    } else {
        richTextField.document.getElementsByTagName('body')[0].textContent = richTextField.document.getElementsByTagName('body')[0].innerHTML;
        showingSourceCode = true;
    }
}

function toggleEdit() {
    if (isInEditMode) {
        richTextField.document.designMode = 'Off';
        isInEditMode = false;
    } else {
        richTextField.document.designMode = 'On';
        isInEditMode = true;
    }
}


/******************
 * Winapp handeler
 ******************/

const Webamp = window.Webamp;
const webamp = new Webamp({
    initialTracks: [
        {
            metaData: {
                artist: "DJ Mike Llama",
                title: "Llama Whippin' Intro"
            },
            // NOTE: Your audio file must be served from the same domain as your HTML
            // file, or served with permissive CORS HTTP headers:
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
            url: "https://cdn.jsdelivr.net/gh/captbaritone/webamp@43434d82cfe0e37286dbbe0666072dc3190a83bc/mp3/llama-2.91.mp3",
            duration: 5.322286
        },
        {
            metaData: {
                artist: "Some Artist",
                title: "Title of Second Track"
            },
            url: "https://cdn.jsdelivr.net/gh/captbaritone/webamp@43434d82cfe0e37286dbbe0666072dc3190a83bc/mp3/llama-2.91.mp3",
            duration: 5.322286
        }
    ],
});

// Returns a promise indicating when it's done loading.
webamp.renderWhenReady(document.getElementById('app'));
webamp.close();
let openWinapp = () => {
    webamp.reopen();
}


/*****************
 * Vscode Toggle *
 *****************/

let openVSCode = (e) => {
    document.querySelector(".vscode").classList.toggle("hidden")
}
/*****************
 * Chrome Toggle *
 *****************/
let openChrome = (e) => {
    document.querySelector(".chrome").classList.toggle("hidden")
}


/*****************
 * Excel Toggle *
 *****************/

let openExcel = (e) => {
    document.querySelector(".exel").classList.toggle("hidden")
}

/*****************
 * ChatCode Toggle *
 *****************/

let openChatCode = (e) => {
    document.querySelector(".chatcode").classList.toggle("hidden")
}


/*****************
 *  Chat Toggle  *
 *****************/

let openChat = (e) => {
    document.querySelector(".floating__window").innerHTML += `
    <div class="window maximized chat">
                <div class="title-bar">
                    <div><img src="images/desktop_icons/chat.png"> Chat</div>
                    <div class="controls">
                        <button class="cls"></button>
                        <button class="max"></button>
                        <button class="min"></button>
                    </div>
                </div>
                <iframe src="chat/index.html" frameborder="0"></iframe>
            </div>`

    /*******************
     * Floating Window *
     *******************/
    $(".window").draggable({
        containment: "document"
    })
    $(".window").resizable({
        handles: "n, s, e, w, ne, nw, se, sw"
    })
}

/**************
 * Open Glitch
 **************/

let openGlitch = () => {
    window.location.replace("./glitch");
}