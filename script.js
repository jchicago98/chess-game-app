let previousPawn = null;

document.addEventListener("click", function (event) {
    let clickedElement = event.target;
    let chessboard = document.getElementById("chessboard");

    if (!chessboard.contains(clickedElement)) {
        clearAllHints();
    }
    else if (clickedElement.classList.contains("hint")) {
        movePawnToHint(clickedElement);
        clearAllHints();
    }
});

function movePawn(pawn) {
    clearAllHints();
    let currentPosition = pawn.parentNode;
    let rowIndex = getChessPieceRowIndex(pawn);
    let colIndex = getChessPieceColumnIndex(pawn);
    let direction = (pawn.classList.contains('black-pawn')) ? -1 : 0;
    let newRow = rowIndex + direction;
    let newSquare = currentPosition.parentNode.parentNode.children[newRow].children[colIndex];
    let hint = createHintElement();

    if (rowIndex == 6 && pawn.classList.contains('black-pawn')) {
        let newSquare_2 = currentPosition.parentNode.parentNode.children[newRow - 1].children[colIndex];
        newSquare_2.append(createHintElement());
    }

    if (newSquare.children.length == 0) {
        newSquare.append(hint);
    }

    previousPawn = pawn;
}

function movePawnToHint(hintElement) {
    let pawn = previousPawn;
    let currentPosition = pawn.parentNode;
    let rowIndex = getChessPieceRowIndex(pawn);
    let colIndex = getChessPieceColumnIndex(pawn);
    let direction = (pawn.classList.contains('black-pawn')) ? -1 : 0;
    let newRow = rowIndex + direction;
    let newSquare = hintElement.parentNode;

    newSquare.appendChild(pawn);

    previousPawn = pawn;
    clearAllHints();
    movePawn(pawn);
}

function getChessPieceColumnIndex(pieceX) {
    let colIndex = Array.from(pieceX.parentNode.parentNode.children).indexOf(pieceX.parentNode);
    return colIndex;
}

function getChessPieceRowIndex(pieceY) {
    let rowIndex = Array.from(pieceY.parentNode.parentNode.parentNode.children).indexOf(pieceY.parentNode.parentNode);
    return rowIndex;
}

function createHintElement() {
    let hint = document.createElement("div");
    hint.classList.add("hint");
    hint.style.backgroundColor = "rgba(0, 0, 0, .1)";
    hint.style.width = "35%";
    hint.style.height = "35%";
    hint.style.borderRadius = "50%";
    hint.style.boxSizing = "border-box";
    return hint;
}

function checkChessLocation() {

}

function clearAllHints() {
    let hints = document.getElementsByClassName("hint");
    while (hints.length > 0) {
        hints[0].remove();
    }
}
