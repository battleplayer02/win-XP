/*
 * Declarations
 */
let startBtn = document.querySelector('.footer__start');
let startMenu = document.querySelector(".start_menu")
let desktopIconsArray = document.querySelectorAll('.icon')
let animationFlag = true;
let topDepth = 100000;
/*
* Start Menu Enable Disable
*/
startBtn.addEventListener('click', () => {
    startMenu.classList.toggle("disable")
})


/*
 * Desktop Right Click 
 */
$(document).on("contextmenu", function (event) {
    event.preventDefault();
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

// console.log(desktopIconsArray)
desktopIconsArray.forEach((e, i) => {
    e.addEventListener("click", (event) => {
        desktopIconsArray.forEach(ele => {
            ele.classList.remove("selected")
        })
        event.target.classList.toggle("selected");
    })
    e.setAttribute("id", i)
})

/**
 * Xp start Animation
 */
function loadingAnimation() {
    let x = 1;
    let int = setInterval(() => {
        if (x == document.querySelector(".loader").offsetWidth) x = 0
        x += 1
        document.querySelectorAll(".loader span")[0].style.marginLeft = x + "px"
    }, 10);
    if (animationFlag) {
        $(".xp__animation").show().delay(3000).fadeOut(); animationFlag = false
    }
}

/**
 * Boot Animation
 */
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


/**
 * Floating Window
 */
$(".window").draggable()
$(".window").resizable({
    handles: "n, s, e, w, ne, nw, se, sw"
})

/**
 * Depth Handeler/minimize/maximize/close
 */

document.addEventListener("click", (e) => {

    if (e.target.closest(".window")) {
        let windowDivEle = e.target.closest(".window");
        windowDivEle.style.zIndex = ++topDepth;
        if (e.target.getAttribute("class") == "max") {
            windowDivEle.classList.toggle("minimized")
        }
        if (e.target.getAttribute("class") == "cls") {
            windowDivEle.style.display = "none";
        }
        if (e.target.getAttribute("class") == "min") {
            windowDivEle.style.display = "none";
        }
    }
})

/**
 * Handel open app
 */

document.querySelector(".icon[type='txt']").addEventListener("dblclick", (e) => {
    document.querySelector(".floating__window").innerHTML += `
            <div class="window">
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
                <textarea></textarea>
            </div>  
    `;
})