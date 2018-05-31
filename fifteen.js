/*
Zhao Cheng(Alex) Guo
Section AH

This file contains the JavaScript code for fifteen.html. The JavaScript
code here generates and enables users to actually play the fifteen puzzle. 
*/


(function(){
    "use strict";
    var $ = function(id){
        return document.getElementById(id);
    };
    var blankLeft;
    var blankTop;
    var SQUARE_HEIGHT = 100;
    var SIZE = 4;
    
    /*
    Generates the puzzle and sets up various forms of controls (such as
    the shuffle button).
    */
    window.onload = function(){
        createPuzzle();
        blankLeft = 300;
        blankTop = 300;
        $("shufflebutton").onclick = shuffle;
        var allSquares = document.querySelectorAll(".puzzle");
        for(var i = 0; i < allSquares.length; i++){
            allSquares[i].onclick = clickSquare;
            allSquares[i].onmouseover = hoverOver;
        }
    };
    
    /*
    This function creates the fifteen puzzle once the webpage loads. Creates a 4 row
    by 4 column square filled with 15 smaller puzzle piece squares. Each smaller puzzle square
    is a piece of the big puzzle image. Numbers each puzzle piece in order from left to right, 
    top to bottom, with numbers from 1 - 15. Bottom right corner is always missing upon creation.
    */
    function createPuzzle(){
        var counter = 1;
        for(var i = 0; i < SIZE; i++){
            for(var j = 0; j < SIZE && counter < SIZE * SIZE; j++){
                var puzzlePiece = document.createElement("div");
                puzzlePiece.classList.add("puzzle");
                puzzlePiece.id = i + "_" + j;
                puzzlePiece.style.left = j * SQUARE_HEIGHT + "px";
                puzzlePiece.style.top = i * SQUARE_HEIGHT + "px";
                puzzlePiece.style.backgroundPosition = (-j * SQUARE_HEIGHT + "px ") + (-i * SQUARE_HEIGHT + "px");
                puzzlePiece.innerHTML = counter;
                counter += 1;
                $("puzzlearea").appendChild(puzzlePiece);
            }
        }
    }
    
    /*
    This function randomly shuffles all of the puzzle piece squares on the game board using
    a function that randomly moves any of the puzzle piece squares next to the blank square into
    the blank square for a large number of turns. The user should still be able to solve the puzzle
    after the shuffling.
    */
    function shuffle(){
        var allSquares = document.querySelectorAll(".puzzle");
        for(var i = 0; i < 1000; i++){
            var neighbors = [];
            
            //Pick the squares that are next to the blank squares,
            for(var j = 0; j < allSquares.length; j++){
                var square = allSquares[j];
                if(isNextTo(square)){
                    neighbors.push(square);
                }
            }
            
            //pick a random one out of those and move it into the blank
            //square.
            var randomIndex = parseInt(Math.random() * neighbors.length);
            var randomSquare = neighbors[randomIndex];
            move(randomSquare);
        }
    }
    
    /*
    This function moves the squares adjacent to the blank square into the 
    blank square if possible. Simulates what happens when one clicks any square.
    Does nothing if the square clicked is not adjacent to the blank square.
    */
    function move(square){
        var left = parseInt(square.style.left);
        var top = parseInt(square.style.top);
        
        //If in the same row and directly next to, move left/right. 
        //If in the same column and directly next to, move up/down.
        if(isNextTo(square)){
            square.style.left = left + (blankLeft - left) + "px";
            square.style.top = top + (blankTop - top) + "px";
            blankLeft = left;
            blankTop = top;
        }
    }
    
    /*
    Determines whether the puzzle piece square passed in is adjacent
    to the blank square. Returns true if adjacent and false if not. 
    */
    function isNextTo(puzzlePiece){
        var left = parseInt(puzzlePiece.style.left);
        var top = parseInt(puzzlePiece.style.top);
        
        //If the square is exactly 1 square away from the blank and is in the same
        //column or row.
        if((Math.abs(blankLeft - left) == SQUARE_HEIGHT && top == blankTop) || 
            (Math.abs(blankTop - top) == SQUARE_HEIGHT && left == blankLeft)){
            return true;
        }
        return false;
    }
    
    /*
    When the mouse pointer hovers over a puzzle piece highlights that puzzle piece's border 
    and text in red if it is adjacent to the blank square as well as changes
    the mouse cursor to the pointer version. Does nothing the puzzle piece hovered over
    is not adjacent to the blank square.
    */
    function hoverOver(){
        var nextTo = isNextTo(this);
        if(nextTo){
            this.classList.add("movable");
        } else{
            this.classList.remove("movable");
        }
    }
    
    /*
    This function moves the square that is clicked into the blank square if
    it is adjacent to the blank square. Do nothing if the square clicked is
    not adjacent to the blank square.
    */
    function clickSquare(){
        move(this);
    }
})();
