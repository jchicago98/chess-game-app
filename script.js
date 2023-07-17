let previousPiece = null;

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

    if (rowIndex == 6 && pawn.classList.contains('black-pawn')) {
        let newSquare_2 = currentPosition.parentNode.parentNode.children[newRow - 1].children[colIndex];
        newSquare_2.append(createHintElement());
    }

    if (newSquare.children.length == 0) {
        newSquare.append(createHintElement());
    }

    previousPiece = pawn;
}

function movePawnToHint(hintElement) {
    let pawn = previousPiece;
    let currentPosition = pawn.parentNode;
    let rowIndex = getChessPieceRowIndex(pawn);
    let colIndex = getChessPieceColumnIndex(pawn);
    let direction = (pawn.classList.contains('black-pawn')) ? -1 : 0;
    let newRow = rowIndex + direction;
    let newSquare = hintElement.parentNode;

    newSquare.appendChild(pawn);

    previousPiece = pawn;
    clearAllHints();
    movePawn(pawn);
}

function moveRook(rook) {
    clearAllHints();
    let currentPosition = rook.parentNode;
    let rowIndex = getChessPieceRowIndex(rook);
    let colIndex = getChessPieceColumnIndex(rook);

    for (let rookX = colIndex + 1; rookX < 8; rookX++) {
        let newSquareX = currentPosition.parentNode.parentNode.children[rowIndex].children[rookX];
        if (newSquareX.children.length === 0) {
            newSquareX.append(createHintElement());
        } else {
            break;
        }
    }

    for (let rookX = colIndex - 1; rookX >= 0; rookX--) {
        let newSquareX = currentPosition.parentNode.parentNode.children[rowIndex].children[rookX];
        if (newSquareX.children.length === 0) {
            newSquareX.append(createHintElement());
        } else {
            break;
        }
    }

    for (let rookY = rowIndex + 1; rookY < 8; rookY++) {
        let newSquareY = currentPosition.parentNode.parentNode.children[rookY].children[colIndex];
        if (newSquareY.children.length === 0) {
            newSquareY.append(createHintElement());
        } else {
            break;
        }
    }

    for (let rookY = rowIndex - 1; rookY >= 0; rookY--) {
        let newSquareY = currentPosition.parentNode.parentNode.children[rookY].children[colIndex];
        if (newSquareY.children.length === 0) {
            newSquareY.append(createHintElement());
        } else {
            break;
        }
    }

    previousPiece = rook;
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
