var score = 0;
var hitno = 0;


function NewGame() {
    console.log('NewGame Started');
}

function makeBubble(){
    var clutter = "";
    var no = 0;

    for (var i=1; i<=198;i++){
        no = Math.floor(Math.random()*10)
        clutter += `<div class="bubble">${no}</div>`
    }

    document.querySelector("#pbtm").innerHTML = clutter;
}


const pbtm = document.getElementById("pbtm");
var timer = 60;
var score_board = []
var boardHTML = ""
function runTimer(){


    
    // Run this function every 1 second using setInterval(), 1000ms
    var interval_obj = setInterval(
        function(){
            if(timer>0){
                timer--;
                document.querySelector("#timer").textContent = timer;    
            }
            else{
                clearInterval(interval_obj);
                
                
                high_score = localStorage.getItem('high_score');



                if(Number(high_score)<=score){
                    localStorage.setItem('high_score', score);
                    
                }
                else if(high_score===""){
                    localStorage.setItem('high_score', 0);
                }

                


                const cardElement = document.createElement('div');
                cardElement.classList.add('card');

                // Adding custom CSS animation to created element
                cardElement.style.animation = 'fade-in 2s';

                pbtm.innerHTML="";
                cardElement.innerHTML=`<h1>Your Score</h1><br>
                                        <h1>${score}</h1><br>
                                        <h3>All time high Score: ${localStorage.getItem('high_score')}</h3>`;

                pbtm.append(cardElement);
            }
            
        }, 1000
        )
}
 

function getNewHit(){
    hitno = Math.floor(Math.random()*10);
    document.querySelector("#hitval").textContent = hitno;
}

function scoreUpdate(get_no) {

   if(hitno === get_no){
        score+=1;
        }
    document.querySelector("#scoreval").textContent = score;
}

// Even bubbling is a concept of applying/looking for event in a hierarchy manner
// is no event in child, then event is searched in parent, if not then its parent etc..
document.querySelector("#pbtm").addEventListener("click", function(details){

    // Target gives the element clicked within the PARENT i.e pbtm the white space.
    // Any click in the pbtm triggers the evenListener and  TARGET is captured
    //  USe Number() for string to number conversion
    console.log(Number(details.target.textContent));

    if(Number(details.target.textContent) === hitno){
        scoreUpdate(Number(details.target.textContent))
            
        // Change Bubbles & Hit when match found
        makeBubble();
        getNewHit();

    }

    
});






makeBubble();
runTimer();
getNewHit();