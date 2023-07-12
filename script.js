function movePawn(pawn) {
    let currentPosition = pawn.parentNode;

    let rowIndex = getChessPieceRowIndex(pawn);
    let colIndex = getChessPieceColumnIndex(pawn);

    let direction = (pawn.classList.contains('black-pawn')) ? -1 : 0;

    let newRow = rowIndex + direction;

    var newSquare = currentPosition.parentNode.parentNode.children[newRow].children[colIndex];

    //Check if square is occupied
    if (!(newSquare.children.length === 0)) {
        console.log('Invalid movement - Square is occupied');
        return;
    }

    newSquare.appendChild(pawn);
}

function getChessPieceColumnIndex(pieceX) {
    let colIndex = Array.from(pieceX.parentNode.parentNode.children).indexOf(pieceX.parentNode);
    return colIndex;
}

function getChessPieceRowIndex(pieceY) {
    let rowIndex = Array.from(pieceY.parentNode.parentNode.parentNode.children).indexOf(pieceY.parentNode.parentNode);
    return rowIndex;
}


