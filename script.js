function movePawn(pawn) {
    let currentPosition = pawn.parentNode;

    console.log(currentPosition)

    let rowIndex = getChessPieceRowIndex(pawn);
    let colIndex = getChessPieceColumnIndex(pawn);

    let direction = (pawn.classList.contains('black-pawn')) ? -1 : 0;

    let newRow = rowIndex + direction;

    let newSquare = currentPosition.parentNode.parentNode.children[newRow].children[colIndex];

    let newDiv = document.createElement("div");
    newDiv.style.backgroundColor = "rgba(0, 0, 0, .1)";
    newDiv.style.width = "35%";
    newDiv.style.height = "35%";
    newDiv.style.borderRadius = "50%";
    newDiv.style.boxSizing = "border-box";

    //Check if square is occupied
    if (!(newSquare.children.length === 0)) {
        console.log('Invalid movement - Square is occupied');
        console.log(newSquare.children[0]);
        //newSquare.remove(newSquare.children[0]);
        return;
    }



    newSquare.append(newDiv);

    console.log(newSquare);

}

function getChessPieceColumnIndex(pieceX) {
    let colIndex = Array.from(pieceX.parentNode.parentNode.children).indexOf(pieceX.parentNode);
    return colIndex;
}

function getChessPieceRowIndex(pieceY) {
    let rowIndex = Array.from(pieceY.parentNode.parentNode.parentNode.children).indexOf(pieceY.parentNode.parentNode);
    return rowIndex;
}


