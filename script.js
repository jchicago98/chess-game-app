let previousPiece = null;
let playerOneColor = null;
let playerTwoColor = null;
let currentPlayerColor = null;
let currentPieceColorPicked = null;
let whitePawnPieceDirection = null;
let blackPawnPieceDirection = null;
let hasBlackKingCastled = null;
let hasWhiteKingCastled = null;
let isCaptureHintValid = null;

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
        playerTwoColor = "white";
        playerOneColor = "black";
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
    else if (currentPlayerColor === "black") {
        playerTwoColor = "black";
        playerOneColor = "white";
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
    
    if(clickedElement.classList.contains("capture-hint")){
        movePieceToHint(clickedElement);
        clearAllHints();
        switchPlayerColor();
    }
    else if (!chessboard.contains(clickedElement)) {
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

function movePieceToHint(hintElement) {
    let piece = previousPiece;
    let newSquare = hintElement.parentNode;

    if(hintElement.classList.contains("capture-hint")){
        newSquare = newSquare.parentNode;
        addCapturedPiece(hintElement.parentNode);
        //newSquare.children[0].remove();
        newSquare.appendChild(piece);
        playCaptureSound();
        isCaptureHintValid = false;
        if(piece.classList.contains("white-king")){
            hasWhiteKingCastled = true;
        }
        else if(piece.classList.contains("black-king")){
            hasBlackKingCastled = true;
        }
    }

    else{
       newSquare.appendChild(piece);
       playMoveSelfSound();
       if(piece.classList.contains("white-king")){
        hasWhiteKingCastled = true;
    }
    else if(piece.classList.contains("black-king")){
        hasBlackKingCastled = true;
    } 
    }
    

    previousPiece = piece;
    clearAllHints();
}

function addCapturedPiece(capturedPiece){
    let playerOne = document.getElementById("captured-pieces-player-one");
    let playerTwo = document.getElementById("captured-pieces-player-two");
    capturedPiece.classList.remove("piece");
    capturedPiece.classList.add("pieces-captured");
    if(currentPlayerColor === playerOneColor){
        playerOne.append(capturedPiece);
    }
    else if(currentPlayerColor === playerTwoColor){
        playerTwo.append(capturedPiece);
    }
}

function switchPlayerColor() {
    if (currentPlayerColor === "white") {
        currentPlayerColor = "black";
    }
    else if (currentPlayerColor === "black") {
        currentPlayerColor = "white";
    }
}

function movePawn(pawn) {
    if(!isCaptureHintValid){
        clearAllHints();
    }
    else if(isCaptureHintValid){
        if(previousPiece != pawn && currentPlayerColor == getColorOfPiece(pawn.classList[1])){
            clearAllHints();
            isCaptureHintValid = false;
        }
    }
    
    let currentPosition = pawn.parentNode;
    let rowIndex = getChessPieceRowIndex(pawn);
    let colIndex = getChessPieceColumnIndex(pawn);
    
    if (rowIndex == 6) {
        if(currentPosition.children[0].classList.contains('white-pawn') && whitePawnPieceDirection != 1){
            whitePawnPieceDirection = -1;
        }
        else if(currentPosition.children[0].classList.contains('black-pawn') && blackPawnPieceDirection != 1) {
            blackPawnPieceDirection = -1;
        }
    }
    else if (rowIndex == 1) {
        if(currentPosition.children[0].classList.contains('white-pawn') && whitePawnPieceDirection != -1) {
            whitePawnPieceDirection = 1;
        }
        else if(currentPosition.children[0].classList.contains('black-pawn') && blackPawnPieceDirection!= -1) {
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
    checkPawnCapture(currentPosition, newRow, colIndex);
    let newSquare = currentPosition.parentNode.parentNode.children[newRow].children[colIndex];

    if (rowIndex == 6) {
        if((pawn.classList.contains('white-pawn') && currentPlayerColor === 'black') || (pawn.classList.contains('black-pawn') && currentPlayerColor === 'white')) {
            void(0);
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
            void(0);
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

    if(!isCaptureHintValid){
        previousPiece = pawn;
    }
    else if(isCaptureHintValid){
        let currentPawnColor = getColorOfPiece(pawn.classList[1]);
        if(currentPawnColor == currentPlayerColor){
            previousPiece = pawn;
        }
        else{
            void(0);
        }
    }
    
    
}

function checkPawnCapture(currentSquare, newRow, colIndex) {
    if(!isCaptureHintValid){
        currentSquare.children[0].append(highlightPlayerSelection());
    }
    let currentPieceTypeClicked = currentSquare.children[0].classList[1];
    currentPieceColorPicked = getColorOfPiece(currentPieceTypeClicked);
    let newSquare_1 = currentSquare.parentNode.parentNode.children[newRow].children[colIndex - 1];
    let newSquare_2 = currentSquare.parentNode.parentNode.children[newRow].children[colIndex + 1];
    
    if(newSquare_1 == undefined){
        void(0);
    }

    else if((newSquare_1.children.length > 0 && newSquare_1.children[0].children.length == 0) && (currentPieceColorPicked == currentPlayerColor)){
        let pieceType = newSquare_1.children[0].classList[1];
        if(getColorOfPiece(pieceType) != currentPieceColorPicked){
            newSquare_1.children[0].append(createCaptureHintElement());
            isCaptureHintValid = true;
        }
        
    }

    if(newSquare_2 == undefined){
        void(0);
    }

    else if((newSquare_2.children.length > 0 && newSquare_2.children[0].children.length == 0) && (currentPieceColorPicked == currentPlayerColor)){
        let pieceType = newSquare_2.children[0].classList[1];
        if(getColorOfPiece(pieceType) != currentPieceColorPicked) {
            newSquare_2.children[0].append(createCaptureHintElement());
            isCaptureHintValid = true;
        }
        
    }
}

function moveRook(rook) {
    if(isCaptureHintValid){
        if(previousPiece != rook && currentPlayerColor == getColorOfPiece(rook.classList[1])){
            clearAllHints();
            isCaptureHintValid = false;
        }
    }
    if (!rook.classList.contains('black-queen') && !rook.classList.contains('white-queen') && !rook.classList.contains('black-king') && !rook.classList.contains('white-king') && !isCaptureHintValid) {
        clearAllHints();
    }
    let currentPosition = rook.parentNode;
    if(rook.classList.contains('white-rook') || rook.classList.contains('black-rook')) {
        currentPosition.children[0].append(highlightPlayerSelection());
    }
    let rowIndex = getChessPieceRowIndex(rook);
    let colIndex = getChessPieceColumnIndex(rook);
    currentPieceColorPicked = getColorOfPiece(currentPosition.children[0].classList[1]);
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
            if(getColorOfPiece(newSquareX.children[0].classList[1]) !== currentPieceColorPicked){
                newSquareX.children[0].append(createCaptureHintElement());
                isCaptureHintValid = true;
            }
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
            if(getColorOfPiece(newSquareX.children[0].classList[1]) !== currentPieceColorPicked){
                newSquareX.children[0].append(createCaptureHintElement());
                isCaptureHintValid = true;
            }
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
            if(getColorOfPiece(newSquareY.children[0].classList[1]) !== currentPieceColorPicked){
                newSquareY.children[0].append(createCaptureHintElement());
                isCaptureHintValid = true;
            }
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
            if(getColorOfPiece(newSquareY.children[0].classList[1]) !== currentPieceColorPicked){
                newSquareY.children[0].append(createCaptureHintElement());
                isCaptureHintValid = true;
            }
            break;
        }
    }

}

if(!isCaptureHintValid){
    previousPiece = rook;
}
else if(isCaptureHintValid){
    let currentRookColor = getColorOfPiece(rook.classList[1]);
    if(currentRookColor == currentPlayerColor){
        previousPiece = rook;
    }
    else{
        void(0);
    }
}
}

function moveKnight(knight) {
    if(!isCaptureHintValid){
        clearAllHints();
    }
    else if(isCaptureHintValid){
        if(previousPiece != knight && currentPlayerColor == getColorOfPiece(knight.classList[1])){
            clearAllHints();
            isCaptureHintValid = false;
        }
    }
    let currentPosition = knight.parentNode;
    currentPosition.children[0].append(highlightPlayerSelection());
    currentPieceColorPicked = getColorOfPiece(currentPosition.children[0].classList[1]);
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

    else if(topLeftSquare_1.children.length > 0 && getColorOfPiece(topLeftSquare_1.children[0].classList[1]) != currentPieceColorPicked){
        topLeftSquare_1.children[0].append(createCaptureHintElement());
        isCaptureHintValid = true;
    }

    if (topLeftSquare_2.children.length == 0) {
        topLeftSquare_2.append(createHintElement());
    }

    else if(topLeftSquare_2.children.length > 0 && getColorOfPiece(topLeftSquare_2.children[0].classList[1]) != currentPieceColorPicked){
        topLeftSquare_2.children[0].append(createCaptureHintElement());
        isCaptureHintValid = true;
    }

    if (topRightSquare_3.children.length == 0) {
        topRightSquare_3.append(createHintElement());
    }

    else if(topRightSquare_3.children.length > 0 && getColorOfPiece(topRightSquare_3.children[0].classList[1]) != currentPieceColorPicked){
        topRightSquare_3.children[0].append(createCaptureHintElement());
        isCaptureHintValid = true;
    }

    if (topRightSquare_4.children.length == 0) {
        topRightSquare_4.append(createHintElement());
    }

    else if(topRightSquare_4.children.length > 0 && getColorOfPiece(topRightSquare_4.children[0].classList[1]) != currentPieceColorPicked){
        topRightSquare_4.children[0].append(createCaptureHintElement());
        isCaptureHintValid = true;
    }

    if (bottomRightSquare_5.children.length == 0) {
        bottomRightSquare_5.append(createHintElement());
    }

    else if(bottomRightSquare_5.children.length > 0 && getColorOfPiece(bottomRightSquare_5.children[0].classList[1]) != currentPieceColorPicked){
        bottomRightSquare_5.children[0].append(createCaptureHintElement());
        isCaptureHintValid = true;
    }

    if (bottomRightSquare_6.children.length == 0) {
        bottomRightSquare_6.append(createHintElement());
    }

    else if(bottomRightSquare_6.children.length > 0 && getColorOfPiece(bottomRightSquare_6.children[0].classList[1]) != currentPieceColorPicked){
        bottomRightSquare_6.children[0].append(createCaptureHintElement());
        isCaptureHintValid = true;
    }

    if (bottomLeftSquare_7.children.length == 0) {
        bottomLeftSquare_7.append(createHintElement());
    }

    else if(bottomLeftSquare_7.children.length > 0 && getColorOfPiece(bottomLeftSquare_7.children[0].classList[1]) != currentPieceColorPicked){
        bottomLeftSquare_7.children[0].append(createCaptureHintElement());
        isCaptureHintValid = true;
    }

    if (bottomLeftSquare_8.children.length == 0) {
        bottomLeftSquare_8.append(createHintElement());
    }

    else if(bottomLeftSquare_8.children.length > 0 && getColorOfPiece(bottomLeftSquare_8.children[0].classList[1]) != currentPieceColorPicked){
        bottomLeftSquare_8.children[0].append(createCaptureHintElement());
        isCaptureHintValid = true;
    }

}

if(!isCaptureHintValid){
    previousPiece = knight;
}
else if(isCaptureHintValid){
    let currentKnightColor = getColorOfPiece(knight.classList[1]);
    if(currentKnightColor == currentPlayerColor){
        previousPiece = knight;
    }
    else{
        void(0);
    }
}

}

function moveBishop(bishop) {
    if(isCaptureHintValid){
        if(previousPiece != bishop && currentPlayerColor == getColorOfPiece(bishop.classList[1])){
            clearAllHints();
            isCaptureHintValid = false;
        }
    }

    if (!bishop.classList.contains('black-queen') && !bishop.classList.contains('white-queen') && !bishop.classList.contains('black-king') && !bishop.classList.contains('white-king') && !isCaptureHintValid) {
        clearAllHints();
    }
    let currentPosition = bishop.parentNode;
    if(bishop.classList.contains('white-bishop') || bishop.classList.contains('black-bishop')){
        currentPosition.children[0].append(highlightPlayerSelection());
    }
    currentPieceColorPicked = getColorOfPiece(currentPosition.children[0].classList[1]);
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
            //BUG HERE: Problem is that while it detects if there is a color match or not,
            //if there is a hint in the new square, it also passes the hint to the getColorOfPiece function.
            //Please fix bug so that it only looks at pieces and not the hints.
            if(getColorOfPiece(newSquareX.children[0].classList[1]) !== currentPieceColorPicked){
                newSquareX.children[0].append(createCaptureHintElement());
                isCaptureHintValid = true;
            }
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
        } 

        else if((newSquareX && newSquareX.children.length > 0) && (getColorOfPiece(newSquareX.children[0].classList[1])!== currentPieceColorPicked)){
            newSquareX.children[0].append(createCaptureHintElement());
            isCaptureHintValid = true;
            break;
        }
        
        else {
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
        } 
        
        else if((newSquare && newSquare.children.length > 0) && (getColorOfPiece(newSquare.children[0].classList[1])!== currentPieceColorPicked)){
            newSquare.children[0].append(createCaptureHintElement());
            isCaptureHintValid = true;
            break;
        }

        else {
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
        } 
        
        else if((newSquare && newSquare.children.length > 0) && (getColorOfPiece(newSquare.children[0].classList[1])!== currentPieceColorPicked)){
            newSquare.children[0].append(createCaptureHintElement());
            isCaptureHintValid = true;
            break;
        }
        
        else {
            break;
        }
    }
}

if(!isCaptureHintValid){
    previousPiece = bishop;
}
else if(isCaptureHintValid){
    let currentBishopColor = getColorOfPiece(bishop.classList[1]);
    if(currentBishopColor == currentPlayerColor){
        previousPiece = bishop;
    }
    else{
        void(0);
    }
}
}

function moveQueen(queen) {
    if(!isCaptureHintValid){
        clearAllHints();
    }
    else if(isCaptureHintValid){
        if(previousPiece != queen && currentPlayerColor == getColorOfPiece(queen.classList[1])){
            clearAllHints();
            isCaptureHintValid = false;
        }
    }
    let currentPosition = queen.parentNode;
    currentPosition.children[0].append(highlightPlayerSelection());
    if(queen.classList.contains('black-king') || queen.classList.contains('white-king')){
        moveKing(queen);
    }
    else if((queen.classList.contains('black-queen') && currentPlayerColor === 'black') || (queen.classList.contains('white-queen') && currentPlayerColor === 'white')){
        moveBishop(queen);
        moveRook(queen);
    }

    if(!isCaptureHintValid){
        previousPiece = queen;
    }
    else if(isCaptureHintValid){
        let currentQueenColor = getColorOfPiece(queen.classList[1]);
        if(currentQueenColor == currentPlayerColor){
            previousPiece = queen;
        }
        else{
            void(0);
        }
    }
}

function moveKing(king) {
    if(!isCaptureHintValid){
        clearAllHints();
    }
    else if(isCaptureHintValid){
        if(previousPiece != king && currentPlayerColor == getColorOfPiece(king.classList[1])){
            clearAllHints();
            isCaptureHintValid = false;
        }
    }
    let currentPosition = king.parentNode;
    currentPosition.children[0].append(highlightPlayerSelection());
    if(king.classList.contains('black-queen') || king.classList.contains('white-queen')){
        moveQueen(king);
    }
    else if((king.classList.contains('black-king') && currentPlayerColor === 'black') || (king.classList.contains('white-king') && currentPlayerColor === 'white')){
        let kingCastleStatus = false;
        if(previousPiece){
            kingCastleStatus = checkCastle(king);  
        }
        if(!kingCastleStatus){
            moveBishop(king);
            moveRook(king);
        }
        
    }

    if(!isCaptureHintValid){
        previousPiece = king;
    }
    else if(isCaptureHintValid){
        let currentKingColor = getColorOfPiece(king.classList[1]);
        if(currentKingColor == currentPlayerColor){
            previousPiece = king;
        }
        else{
            void(0);
        }
    }
}

function checkCastle(piece) {

    let rowIndex = getChessPieceRowIndex(piece);
    let colIndex = getChessPieceColumnIndex(piece);
    let currentPosition = piece.parentNode;
    let squareWithBishop = null;
    let squareWithKnight = null;
    let squareWithQueen = null;
    //PLAYER TWO - BOTTOM ROW
    if(getChessPieceRowIndex(previousPiece) == 7){
        if(getChessPieceColumnIndex(previousPiece) == 0 && playerTwoColor == 'white'){
        squareWithBishop = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 2];
        squareWithKnight = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 3]; 
        squareWithQueen = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 1];
    }
    
    else if(getChessPieceColumnIndex(previousPiece) == 7 && playerTwoColor == 'white'){
        squareWithBishop = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 1]; 
        squareWithKnight = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 2]; 
    }

    else if(getChessPieceColumnIndex(previousPiece) == 0 && playerTwoColor == 'black'){
        squareWithBishop = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 1]; 
        squareWithKnight = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 2]; 
    }

    else if(getChessPieceColumnIndex(previousPiece) == 7 && playerTwoColor == 'black'){
        squareWithBishop = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 2];
        squareWithKnight = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 3]; 
        squareWithQueen = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 1];
    }
    }

    //PLAYER ONE - TOP ROW
    else if(getChessPieceRowIndex(previousPiece) == 0){
        if(getChessPieceColumnIndex(previousPiece) == 0 && playerOneColor == 'white'){
        squareWithBishop = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 1];
        squareWithKnight = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 2];
    }
    
    else if(getChessPieceColumnIndex(previousPiece) == 7 && playerOneColor == 'white'){
        squareWithBishop = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 2]; 
        squareWithKnight = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 3];
        squareWithQueen = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 1]; 
    }

    else if(getChessPieceColumnIndex(previousPiece) == 0 && playerOneColor == 'black'){
        squareWithBishop = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 2];
        squareWithKnight = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 3]; 
        squareWithQueen = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex - 1]; 
    }

    else if(getChessPieceColumnIndex(previousPiece) == 7 && playerOneColor == 'black'){
        squareWithBishop = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 1];
        squareWithKnight = currentPosition.parentNode.parentNode.children[rowIndex].children[colIndex + 2];
    }
    }
    
    
    
    if(previousPiece.classList.contains('white-rook') && piece.classList.contains('white-king') && !hasWhiteKingCastled){
        if(getChessPieceColumnIndex(previousPiece) == 7){
            if(squareWithBishop.children.length == 0 && squareWithKnight.children.length == 0 && getChessPieceRowIndex(previousPiece) == 7){
                squareWithBishop.append(previousPiece);
                squareWithKnight.append(piece);
                hasWhiteKingCastled = true;
                switchPlayerColor();
                playCastleSound();
                return true;
        }
        else if(squareWithBishop.children.length == 0 && squareWithKnight.children.length == 0 && squareWithQueen.children.length == 0 && getChessPieceRowIndex(previousPiece) == 0){
            squareWithBishop.append(piece);
            squareWithQueen.append(previousPiece);
            hasWhiteKingCastled = true;
            switchPlayerColor();
            playCastleSound();
            return true;
        }
        else{
                console.log('Castle king side INVALID!');
        }
        }
        else if(getChessPieceColumnIndex(previousPiece) == 0){
            if(squareWithBishop.children.length == 0 && squareWithKnight.children.length == 0 && getChessPieceRowIndex(previousPiece) == 0){
                squareWithBishop.append(previousPiece);
                squareWithKnight.append(piece);
                hasWhiteKingCastled = true;
                switchPlayerColor();
                playCastleSound();
                return true;
            }
            else if(squareWithBishop.children.length == 0 && squareWithKnight.children.length == 0 && squareWithQueen.children.length == 0 && getChessPieceRowIndex(previousPiece) == 7){
                squareWithBishop.append(piece);
                squareWithQueen.append(previousPiece);
                hasWhiteKingCastled = true;
                switchPlayerColor();
                playCastleSound();
                return true;
            }
            else{
                console.log('Castle queen side INVALID!');
            }
        }
        
    }




    else if(previousPiece.classList.contains('black-rook') && piece.classList.contains('black-king') && !hasBlackKingCastled){
        if(getChessPieceColumnIndex(previousPiece) == 7){
            if(squareWithBishop.children.length == 0 && squareWithKnight.children.length == 0 && getChessPieceRowIndex(previousPiece) == 7 && squareWithQueen.children.length == 0){
                squareWithQueen.append(previousPiece);
                squareWithBishop.append(piece);
                hasBlackKingCastled = true;
                switchPlayerColor();
                playCastleSound();
                return true;
        }
        else if(squareWithBishop.children.length == 0 && squareWithKnight.children.length == 0 && getChessPieceRowIndex(previousPiece) == 0){
            squareWithBishop.append(previousPiece);
            squareWithKnight.append(piece);
            hasBlackKingCastled = true;
            switchPlayerColor();
            playCastleSound();
            return true;
        }
        else{
                console.log('Castle king side INVALID!');
        }
        }
        else if(getChessPieceColumnIndex(previousPiece) == 0){
            if(squareWithBishop.children.length == 0 && squareWithKnight.children.length == 0 && getChessPieceRowIndex(previousPiece) == 7){
                squareWithBishop.append(previousPiece);
                squareWithKnight.append(piece);
                hasBlackKingCastled = true;
                switchPlayerColor();
                playCastleSound();
                return true;
            }
            else if(squareWithBishop.children.length == 0 && squareWithKnight.children.length == 0 && getChessPieceRowIndex(previousPiece) == 0 && squareWithQueen.children.length == 0){
                squareWithBishop.append(piece);
                squareWithQueen.append(previousPiece);
                hasBlackKingCastled = true;
                switchPlayerColor();
                playCastleSound();
                return true;
            }
            else{
                console.log('Castle queen side INVALID!');
            }
        }
    }
    return;
}

function playMoveSelfSound(){
    let moveAudio = new Audio('http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3');
    moveAudio.play();
    return;
}

function playCaptureSound(){
    let captureAudio = new Audio('http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3');
    captureAudio.play();
    return;
}

function playCastleSound(){
    let castleAudio = new Audio('https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/castle.mp3');
    castleAudio.play();
    return;
}

function getColorOfPiece(piece){
    let parts = piece.split('-');
    let colorOfPiece = parts[0];
    return colorOfPiece;
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

function createCaptureHintElement(){
    let captureHint = document.createElement("div");
    captureHint.classList.add("capture-hint");
    captureHint.style.border = "0.35rem solid rgba(0, 0, 0, 0.1)";
    captureHint.style.width = "85%";
    captureHint.style.height = "85%";
    captureHint.style.borderRadius = "50%";
    captureHint.style.boxSizing = "border-box";
    captureHint.style.margin = "auto";
    captureHint.style.display = "flex";
    captureHint.style.justifyContent = "center";
    captureHint.style.transform = "translateY(10%)";
    return captureHint;
}

function highlightPlayerSelection(){
    let playerSelection = document.createElement("div");
    playerSelection.classList.add("player-selection");
    playerSelection.style.backgroundColor = "rgba(255, 255, 51, 0.4)";
    playerSelection.style.display = "flex";
    playerSelection.style.width = "100%";
    playerSelection.style.height = "100%";
    return playerSelection;
}

function clearAllHints() {
    let hints = document.getElementsByClassName("hint");
    let captureHints = document.getElementsByClassName("capture-hint");
    let playerSelection = document.getElementsByClassName("player-selection");
    if(captureHints){
        while (captureHints.length > 0) {
            captureHints[0].remove();
        }
    }
    while (hints.length > 0) {
        hints[0].remove();
    }
    while (playerSelection.length > 0) {
        playerSelection[0].remove();
    }
}
