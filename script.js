let previousPiece = null;
let currentPlayerColor = null;
let whitePawnPieceDirection = null;
let blackPawnPieceDirection = null;

function blackButton() {
    currentPlayerColor = "black";
    initializeChessboard();
    closeModal();
}

function whiteButton() {
    currentPlayerColor = "white";
    initializeChessboard();
    closeModal();
}

function initializeChessboard() {
    if (currentPlayerColor === "white") {

        document.querySelectorAll(".piece").forEach((piece) => {
            switch (piece.classList[1]) {
                case "white-rook":
                    piece.classList.remove("white-rook");
                    piece.classList.add("black-rook");
                    break;
                case "white-knight":
                    piece.classList.remove("white-knight");
                    piece.classList.add("black-knight");
                    break;
                case "white-bishop":
                    piece.classList.remove("white-bishop");
                    piece.classList.add("black-bishop");
                    break;
                case "white-king":
                    piece.classList.remove("white-king");
                    piece.classList.add("black-queen");
                    break;
                case "white-queen":
                    piece.classList.remove("white-queen");
                    piece.classList.add("black-king");
                    break;
                case "white-pawn":
                    piece.classList.remove("white-pawn");
                    piece.classList.add("black-pawn");
                    break;
                case "black-rook":
                    piece.classList.remove("black-rook");
                    piece.classList.add("white-rook");
                    break;
                case "black-knight":
                    piece.classList.remove("black-knight");
                    piece.classList.add("white-knight");
                    break;
                case "black-bishop":
                    piece.classList.remove("black-bishop");
                    piece.classList.add("white-bishop");
                    break;
                case "black-king":
                    piece.classList.remove("black-king");
                    piece.classList.add("white-queen");
                    break;
                case "black-queen":
                    piece.classList.remove("black-queen");
                    piece.classList.add("white-king");
                    break;
                case "black-pawn":
                    piece.classList.remove("black-pawn");
                    piece.classList.add("white-pawn");
                    break;
            }

        });


    }
    currentPlayerColor = "white";
    document.getElementById("chessboard").style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

window.onload = function () {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
};

document.addEventListener("click", function (event) {
    let clickedElement = event.target;
    let chessboard = document.getElementById("chessboard");

    if (!chessboard.contains(clickedElement)) {
        clearAllHints();
    }
    else if (clickedElement.classList.contains("hint")) {
        movePieceToHint(clickedElement);
        clearAllHints();
        switchPlayerColor();
    }
    else if (clickedElement.children[0]?.classList.contains("hint")) {
        movePieceToHint(clickedElement.children[0]);
        clearAllHints();
        switchPlayerColor();
    }
});

function switchPlayerColor() {
    if (currentPlayerColor === "white") {
        currentPlayerColor = "black";
    }
    else if (currentPlayerColor === "black") {
        currentPlayerColor = "white";
    }
}

function movePawn(pawn) {
    clearAllHints();
    let currentPosition = pawn.parentNode;
    let rowIndex = getChessPieceRowIndex(pawn);
    let colIndex = getChessPieceColumnIndex(pawn);
    
    if (rowIndex == 6) {
        if(currentPosition.children[0].classList.contains('white-pawn')){
            whitePawnPieceDirection = -1;
        }
        else if(currentPosition.children[0].classList.contains('black-pawn')) {
            blackPawnPieceDirection = -1;
        }
    }
    else if (rowIndex == 1) {
        if(currentPosition.children[0].classList.contains('white-pawn')){
            whitePawnPieceDirection = 1;
        }
        else if(currentPosition.children[0].classList.contains('black-pawn')) {
            blackPawnPieceDirection = 1;
        }

    }
    if(currentPlayerColor === 'white') {
        direction = whitePawnPieceDirection;
    }
    else if(currentPlayerColor === 'black') {
        direction = blackPawnPieceDirection;
    }

    let newRow = rowIndex + direction;
    let newSquare = currentPosition.parentNode.parentNode.children[newRow].children[colIndex];

    if (rowIndex == 6) {
        if((pawn.classList.contains('white-pawn') && currentPlayerColor === 'black') || (pawn.classList.contains('black-pawn') && currentPlayerColor === 'white')) {
            //DO NOTHING
        }
        else{
            let newSquare_2 = currentPosition.parentNode.parentNode.children[newRow - 1].children[colIndex];
            if(newSquare_2.children.length == 0 && newSquare.children.length == 0){
                newSquare_2.append(createHintElement());
            }
            
        }
        
    }
    else if (rowIndex == 1) {
        if((pawn.classList.contains('white-pawn') && currentPlayerColor === 'black') || (pawn.classList.contains('black-pawn') && currentPlayerColor === 'white')){
            //DO NOTHING
        }
        else{
            let newSquare_2 = currentPosition.parentNode.parentNode.children[newRow + 1].children[colIndex];
            if(newSquare_2.children.length == 0 && newSquare.children.length == 0) {
                newSquare_2.append(createHintElement());
            }
        }
        
    }

    if (newSquare.children.length == 0) {
        
        if(pawn.classList.contains('white-pawn') && currentPlayerColor === 'white' || pawn.classList.contains('black-pawn') && currentPlayerColor === 'black'){ 
            newSquare.append(createHintElement());
        }
    }

    previousPiece = pawn;
}

function movePieceToHint(hintElement) {
    let piece = previousPiece;
    let newSquare = hintElement.parentNode;

    newSquare.appendChild(piece);

    previousPiece = piece;
    clearAllHints();
}

function moveRook(rook) {
    if (!rook.classList.contains('black-queen') && !rook.classList.contains('white-queen') && !rook.classList.contains('black-king') && !rook.classList.contains('white-king')) {
        clearAllHints();
    }
    let currentPosition = rook.parentNode;
    let rowIndex = getChessPieceRowIndex(rook);
    let colIndex = getChessPieceColumnIndex(rook);
    let isRookValid = false;

    if((rook.classList.contains('white-rook') && currentPlayerColor === 'white') || (rook.classList.contains('black-rook') && currentPlayerColor === 'black') || (rook.classList.contains('white-king') && currentPlayerColor === 'white') || (rook.classList.contains('black-king') && currentPlayerColor === 'black') || (rook.classList.contains('white-queen') && currentPlayerColor === 'white') || (rook.classList.contains('black-queen') && currentPlayerColor === 'black')){
        isRookValid = true;
    }

    if(isRookValid){

    for (let rookX = colIndex + 1; rookX < 8; rookX++) {
        let newSquareX = currentPosition.parentNode.parentNode.children[rowIndex].children[rookX];
        if (newSquareX.children.length === 0) {
            newSquareX.append(createHintElement());
            if (rook.classList.contains('black-king') || rook.classList.contains('white-king')) {
                break;
            }
        } else {
            break;
        }
    }

    for (let rookX = colIndex - 1; rookX >= 0; rookX--) {
        let newSquareX = currentPosition.parentNode.parentNode.children[rowIndex].children[rookX];
        if (newSquareX.children.length === 0) {
            newSquareX.append(createHintElement());
            if (rook.classList.contains('black-king') || rook.classList.contains('white-king')) {
                break;
            }
        } else {
            break;
        }
    }

    for (let rookY = rowIndex + 1; rookY < 8; rookY++) {
        let newSquareY = currentPosition.parentNode.parentNode.children[rookY].children[colIndex];
        if (newSquareY.children.length === 0) {
            newSquareY.append(createHintElement());
            if (rook.classList.contains('black-king') || rook.classList.contains('white-king')) {
                break;
            }
        } else {
            break;
        }
    }

    for (let rookY = rowIndex - 1; rookY >= 0; rookY--) {
        let newSquareY = currentPosition.parentNode.parentNode.children[rookY].children[colIndex];
        if (newSquareY.children.length === 0) {
            newSquareY.append(createHintElement());
            if (rook.classList.contains('black-king') || rook.classList.contains('white-king')) {
                break;
            }
        } else {
            break;
        }
    }

}

    previousPiece = rook;
}

function moveKnight(knight) {
    clearAllHints();
    let currentPosition = knight.parentNode;
    let rowIndex = getChessPieceRowIndex(knight);
    let colIndex = getChessPieceColumnIndex(knight);

    let topLeftSquare_1 = (rowIndex - 1 >= 0 && colIndex - 2 >= 0) ? currentPosition.parentNode.parentNode.children[rowIndex - 1].children[colIndex - 2] : currentPosition;
    let topLeftSquare_2 = (rowIndex - 2 >= 0 && colIndex - 1 >= 0) ? currentPosition.parentNode.parentNode.children[rowIndex - 2].children[colIndex - 1] : currentPosition;
    let topRightSquare_3 = (rowIndex - 2 >= 0 && colIndex + 1 < 8) ? currentPosition.parentNode.parentNode.children[rowIndex - 2].children[colIndex + 1] : currentPosition;
    let topRightSquare_4 = (rowIndex - 1 >= 0 && colIndex + 2 < 8) ? currentPosition.parentNode.parentNode.children[rowIndex - 1].children[colIndex + 2] : currentPosition;
    let bottomRightSquare_5 = (rowIndex + 1 < 8 && colIndex + 2 < 8) ? currentPosition.parentNode.parentNode.children[rowIndex + 1].children[colIndex + 2] : currentPosition;
    let bottomRightSquare_6 = (rowIndex + 2 < 8 && colIndex + 1 < 8) ? currentPosition.parentNode.parentNode.children[rowIndex + 2].children[colIndex + 1] : currentPosition;
    let bottomLeftSquare_7 = (rowIndex + 1 < 8 && colIndex - 2 >= 0) ? currentPosition.parentNode.parentNode.children[rowIndex + 1].children[colIndex - 2] : currentPosition;
    let bottomLeftSquare_8 = (rowIndex + 2 < 8 && colIndex - 1 >= 0) ? currentPosition.parentNode.parentNode.children[rowIndex + 2].children[colIndex - 1] : currentPosition;

    let isKnightValid = false;

    if((knight.classList.contains('black-knight') && currentPlayerColor === 'black') || (knight.classList.contains('white-knight') && currentPlayerColor === 'white')){
        isKnightValid = true;
    }

    if(isKnightValid){

    if (topLeftSquare_1.children.length == 0) {
        topLeftSquare_1.append(createHintElement());
    }

    if (topLeftSquare_2.children.length == 0) {
        topLeftSquare_2.append(createHintElement());
    }

    if (topRightSquare_3.children.length == 0) {
        topRightSquare_3.append(createHintElement());
    }

    if (topRightSquare_4.children.length == 0) {
        topRightSquare_4.append(createHintElement());
    }

    if (bottomRightSquare_5.children.length == 0) {
        bottomRightSquare_5.append(createHintElement());
    }

    if (bottomRightSquare_6.children.length == 0) {
        bottomRightSquare_6.append(createHintElement());
    }

    if (bottomLeftSquare_7.children.length == 0) {
        bottomLeftSquare_7.append(createHintElement());
    }

    if (bottomLeftSquare_8.children.length == 0) {
        bottomLeftSquare_8.append(createHintElement());
    }
}

    previousPiece = knight;

}

function moveBishop(bishop) {
    if (!bishop.classList.contains('black-queen') && !bishop.classList.contains('white-queen') && !bishop.classList.contains('black-king') && !bishop.classList.contains('white-king')) {
        clearAllHints();
    }
    let currentPosition = bishop.parentNode;
    let rowIndex = getChessPieceRowIndex(bishop);
    let colIndex = getChessPieceColumnIndex(bishop);
    let localCounter = 0;
    let isBishopValid = false;

    if((bishop.classList.contains('white-bishop') && currentPlayerColor === 'white') || (bishop.classList.contains('black-bishop') && currentPlayerColor === 'black') || (bishop.classList.contains('white-king') && currentPlayerColor === 'white') || (bishop.classList.contains('black-king') && currentPlayerColor === 'black') || (bishop.classList.contains('white-queen') && currentPlayerColor === 'white') || (bishop.classList.contains('black-queen') && currentPlayerColor === 'black')){
        isBishopValid = true;
    }

    if(isBishopValid){

    for (let bishopLeftUp = colIndex - 1; bishopLeftUp >= 0; bishopLeftUp--) {
        localCounter++;
        let newSquareX = currentPosition.parentNode.parentNode.children[rowIndex - localCounter]?.children[bishopLeftUp];
        if (!newSquareX) break;
        if (newSquareX.children.length === 0) {
            newSquareX.append(createHintElement());
            if (bishop.classList.contains('black-king') || bishop.classList.contains('white-king')) {
                break;
            }
        } else {
            break;
        }
    }

    localCounter = 0;

    for (let bishopRightDown = colIndex + 1; bishopRightDown < 8; bishopRightDown++) {
        localCounter++;
        let newSquareX = currentPosition.parentNode.parentNode.children[rowIndex + localCounter]?.children[bishopRightDown];
        if (newSquareX && newSquareX.children.length === 0) {
            newSquareX.append(createHintElement());
            if (bishop.classList.contains('black-king') || bishop.classList.contains('white-king')) {
                break;
            }
        } else {
            break;
        }
    }

    localCounter = 0;

    for (let bishopLeftDown = colIndex - 1; bishopLeftDown >= 0; bishopLeftDown--) {
        localCounter++;
        let newSquare = currentPosition.parentNode.parentNode.children[rowIndex + localCounter]?.children[bishopLeftDown];
        if (newSquare && newSquare.children.length === 0) {
            newSquare.append(createHintElement());
            if (bishop.classList.contains('black-king') || bishop.classList.contains('white-king')) {
                break;
            }
        } else {
            break;
        }
    }

    localCounter = 0;

    for (let bishopRightUp = colIndex + 1; bishopRightUp < 8; bishopRightUp++) {
        localCounter++;
        let newSquare = currentPosition.parentNode.parentNode.children[rowIndex - localCounter]?.children[bishopRightUp];
        if (newSquare && newSquare.children.length === 0) {
            newSquare.append(createHintElement());
            if (bishop.classList.contains('black-king') || bishop.classList.contains('white-king')) {
                break;
            }
        } else {
            break;
        }
    }
}

    previousPiece = bishop;
}

function moveQueen(queen) {
    clearAllHints();
    if(queen.classList.contains('black-king') || queen.classList.contains('white-king')){
        moveKing(queen);
    }
    else if((queen.classList.contains('black-queen') && currentPlayerColor === 'black') || (queen.classList.contains('white-queen') && currentPlayerColor === 'white')){
        moveBishop(queen);
        moveRook(queen);
    }

    previousPiece = queen;
}

function moveKing(king) {
    clearAllHints();
    if(king.classList.contains('black-queen') || king.classList.contains('white-queen')){
        moveQueen(king);
    }
    else if((king.classList.contains('black-king') && currentPlayerColor === 'black') || (king.classList.contains('white-king') && currentPlayerColor === 'white')){
        moveBishop(king);
        moveRook(king);
    }

    previousPiece = king;
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

function clearAllHints() {
    let hints = document.getElementsByClassName("hint");
    while (hints.length > 0) {
        hints[0].remove();
    }
}
