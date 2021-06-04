const OperatingSystem = {
    version: "Microsoft Windows [version 20.0.16299.125]",
    copyRight: "(c) 2017 Microsoft Corporation. All rights reserved."
}

var Terminal = {
    input: "",
    lastInput: "",
    cursor: "_",
    driverLetter: "C",
    directory: "Users\\Fulano",
    instanceNumber: 1
}
const Color = {
    hex0: "rgb(0, 0, 0)", //Preto
    hex1: "rgb(0, 0, 128)", //Azul
    hex2: "rgb(0, 128, 0)", //Verde
    hex3: "rgb(0, 128, 128)", //Verde-água
    hex4: "rgb(128, 0, 0)", //Vermelho
    hex5: "rgb(128, 0, 128)", //Roxo
    hex6: "rgb(128, 128, 0)", //Amarelo
    hex7: "rgb(192, 192, 192)", //Branco
    hex8: "rgb(128, 128, 128)", //Cinza
    hex9: "rgb(0, 0, 255)", //Azul claro
    hexA: "rgb(0, 255, 0)", //Verde claro
    hexB: "rgb(0, 255, 255)", //Verde-água claro
    hexC: "rgb(255, 0, 0)", //Vermelho claro
    hexD: "rgb(255, 0, 255)", //Lilás
    hexE: "rgb(255, 255, 0)", //Amarelo claro
    hexF: "rgb(255, 255, 255)" //Branco brilhante
}
// ------------------------------------------------------------------------ //
var osInfo = OperatingSystem.version + newLine() +
    OperatingSystem.copyRight + newLine();
//Ex: C:\Users\Fulano>
var path = Terminal.driverLetter + ":\\" + Terminal.directory + ">";

var line = document.querySelector(".line");
var allLines = document.querySelectorAll(".line");
var lastLine = allLines[allLines.length - 1];

function cursor() {
    let cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    cursorSpan.textContent = Terminal.cursor;
    return cursorSpan.outerHTML;
}

function createLine() {
    let lineDivCreated = document.createElement("div");
    lineDivCreated.classList.add("line");
    let terminalDivSelected = document.querySelector(".terminal");
    terminalDivSelected.appendChild(lineDivCreated);
}

function nextLine() {
    createLine();
    clearInput();
    updateLine();
}

function newLine() {
    return "<br>";
}

function deleteAllLines() {
    /* Search for all "div's" that contain the "line" class and delete
     one by one until there's nothing left.*/
    for (var i = 0; i < allLines.length; i++) {
        allLines[i].parentNode.removeChild(allLines[i]);
    }
}

function clearInput() {
    Terminal.input = "";
}

function updateInput() {
    let inputSpan = document.createElement("span");
    inputSpan.classList.add("input");
    inputSpan.innerHTML = Terminal.input;
    return inputSpan.outerHTML;
}

function updateOsInfo() {
    return document.querySelector(".os-info").innerHTML = osInfo;
}

function updateLine() {
    allLines = document.querySelectorAll(".line");
    lastLine = allLines[allLines.length - 1];
    return lastLine.innerHTML = path + updateInput() + cursor();
}

function execute() {
    Terminal.input += newLine() + newLine();
    updateLine();
    nextLine();
}

function nbsp(n) {
    return "&nbsp;".repeat(n);
}
function saveLastInput() {
    Terminal.lastInput = Terminal.input;
}

// Comandos do CMD
function help() {
    Terminal.input += newLine() +
        "For more information about a specific command," + newLine() +
        "type HELP command_name" + newLine() +
        "CD" + nbsp(13) + "Displays the name of the current directory or makes changes to it." + newLine() +
        "CLS" + nbsp(12) + "Clean the screen." + newLine() +
        "CMD" + nbsp(12) + "Starts a new instance of the command interpreter." + newLine() +
        "" + nbsp(15) + "Windows." + newLine() +
        "COLOR" + nbsp(10) + "Set default foreground and background colors" + newLine() +
        "" + nbsp(15) + "do console." + newLine() +
        "EXIT" + nbsp(11) + "Exit CMD.EXE (command interpreter) program." + newLine() +
        "HELP" + nbsp(11) + "Provides help information about Windows commands." + newLine() +
        "TIME" + nbsp(11) + "Displays or sets the system time." + newLine() +
        "VER" + nbsp(12) + "Displays the Windows version." + newLine() +
        "" + newLine() +
        "For more information about tools, see the command line reference in online help." + newLine()
    execute();
}
function cd() {
    let directory = Terminal.input.split(" ")[1];

    switch (directory) {
        case "..":
            Terminal.input += newLine() + newLine();
            updateLine();
            // Remove name from current directory.
            Terminal.directory = Terminal.directory.split("\\").reverse().slice(1).reverse().join("\\");
            path = Terminal.driverLetter + ":\\" + Terminal.directory + ">";
            nextLine();
            break;
        case ".":
            Terminal.input += newLine() + newLine();
            updateLine();
            clearInput();
            createLine();
            updateLine();
            break;
        default:
            Terminal.input += newLine();
            updateLine();
            Terminal.directory += "\\" + directory;
            path = Terminal.driverLetter + ":\\" + Terminal.directory + ">";
            nextLine();
    }
}
function color() {
    let colorName = Terminal.input.split(" ")[1];
    let firstColor = colorName.slice(0, 1).toUpperCase();
    let secondColor = colorName.slice(1, 2).toUpperCase();
    let colorHelp = "Sets the default console foreground and background colors." + newLine() +
        "" + newLine() +
        "COLOR [attr]" + newLine() +
        "" + newLine() +
        "" + nbsp(2) + "attr" + nbsp(8) + "Specifies the color attributes of console output" + newLine() +
        "" + newLine() +
        "Atributos de cor são especificados por DOIS dígitos hexadecimais. O primeiro" + newLine() +
        "corresponde à cor de tela de fundo; o segundo à cor de primeiro plano. Cada" + newLine() +
        "dígito pode ter apenas um dos seguintes valores:" + newLine() +
        "" + newLine() +
        "" + nbsp(4) + "0 = Preto" + nbsp(8) + "8 = Cinza" + newLine() +
        "" + nbsp(4) + "1 = Azul" + nbsp(9) + "9 = Azul claro" + newLine() +
        "" + nbsp(4) + "2 = Verde" + nbsp(8) + "A = Verde claro" + newLine() +
        "" + nbsp(4) + "3 = Verde-água" + nbsp(3) + "B = Verde-água claro" + newLine() +
        "" + nbsp(4) + "4 = Vermelho" + nbsp(5) + "C = Vermelho claro" + newLine() +
        "" + nbsp(4) + "5 = Roxo" + nbsp(9) + "D = Lilás" + newLine() +
        "" + nbsp(4) + "6 = Amarelo" + nbsp(6) + "E = Amarelo claro" + newLine() +
        "" + nbsp(4) + "7 = Branco" + nbsp(7) + "F = Branco brilhante" + newLine() +
        "" + newLine() +
        "Caso nenhum argumento seja passado, este comando restaurará a cor de" + newLine() +
        "antes do CMD.EXE ser executado. Este valor vem ou da janela atual do" + newLine() +
        "console, ou da opção /T da linha de comando, ou do valor de DefaultColor" + newLine() +
        "no Registro." + newLine() +
        "" + newLine() +
        "O comando COLOR altera ERRORLEVEL para 1 se for tentado se executar o" + newLine() +
        "comando COLOR com as mesmas cores de primeiro plano e de tela de" + newLine() +
        "fundo.";

    function isHex(h) {
        return /^[0-9A-F]{2}$/i.test(h);
    }

    if ((isHex(colorName)) && (firstColor != secondColor)) {
        document.querySelector("body").style.backgroundColor = eval("Color.hex" + firstColor);
        document.querySelector("body").style.color = eval("Color.hex" + secondColor);
        execute();
    } else {
        Terminal.input += newLine() + colorHelp;
        execute();
    }
}
function blank() {
    clearInput();
    createLine();
    updateLine();
}
function ver() {
    Terminal.input = newLine() +
        newLine() +
        OperatingSystem.version +
        newLine() +
        newLine();
    updateLine();
    clearInput();
    createLine();
    updateLine();
}
function time() {
    var date = new Date();
    Terminal.input += newLine() +
        "Hora atual: " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds() +
        "," +
        String(date.getMilliseconds()).slice(0, 2) +
        "<br>Digite a nova hora: " +
        newLine();

    execute();
}
function clearScreen() {
    clearInput();
    osInfo = "";
    deleteAllLines();
    createLine();
    updateOsInfo();
    updateLine();
}
function exit() {
    if (Terminal.instanceNumber <= 1) {
        document.body.style.display = "none";
        // window.close();
    } else {
        document.title = document.title.slice(0, -6)
        Terminal.instanceNumber--;
        execute();
    }
}
function newTerminalInstance() {
    osInfo = OperatingSystem.version + newLine() +
        OperatingSystem.copyRight;
    Terminal.input += newLine() + osInfo;
    Terminal.instanceNumber++;
    document.title += " - cmd";
    execute();
}

function listening() {
    document.addEventListener("keypress", (event) => {
        // Caso o usuário digite Enter, o input atual na tela será interpretado.
        if (event.key === "Enter") {
            saveLastInput();

            switch (Terminal.input.split(" ")[0]) {
                case "cls":
                    clearScreen();
                    break;
                case "":
                    blank();
                    break;
                case "time":
                    time();
                    break;
                case "ver":
                    ver();
                    break;
                case "cmd":
                    newTerminalInstance();
                    break;
                case "exit":
                    exit();
                    break;
                case "changetheme":
                    changeTheme();
                    break;
                case "cd":
                    cd();
                    break;
                case "help":
                    help();
                    break;
                case "color":
                    color();
                    break;
                default:
                    // saveLastInput();
                    Terminal.input = Terminal.input +
                        newLine() +
                        "\'" +
                        Terminal.input.split(" ")[0] +
                        "\' " +
                        "não é reconhecido como um comando interno ou externo, um programa operável ou um arquivo em lotes.";

                    execute();
            }

        } else {
            /* Caso o usuário digite qualquer tecla que não seja Enter,
          tudo que for digitado será mostrado na tela. */
            Terminal.input += event.key;
            updateLine();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
            Terminal.input = Terminal.input.slice(0, -1);
            updateLine();
        } else if (event.key === "ArrowUp") {
            Terminal.input = Terminal.lastInput;
            updateLine();
        }
    });
}

// Chamadas de início
updateOsInfo();
createLine();
updateLine();
listening();

/* Tarefas
- Adicionar um autoscroll
- Mover o cursor entre o input
*/
