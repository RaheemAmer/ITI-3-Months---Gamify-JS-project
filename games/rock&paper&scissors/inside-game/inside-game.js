
var myData = [
    { id: 0, src: "../images/rock.png", value: "rock" },
    { id: 1, src: "../images/papper.png", value: "papper" },
    { id: 2, src: "../images/scissor.png", value: "scissor" }
]
var playerScore = 0
var CPUScore = 0

for (option of myData) {
    var crImg = document.createElement('img');
    crImg.setAttribute("id", option.id);
    crImg.setAttribute("src", option.src);
    crImg.setAttribute("style", "width:100px;cursor:pointer");
    crImg.setAttribute("class", "myOption");
    crImg.setAttribute("value", option.value);
    crImg.setAttribute("onclick", "myChoise(event)");
    document.querySelector(".forChoose__my-game-body__choose").appendChild(crImg);
}


function myChoise(event) {
    document.getElementById("left-hand__image").src = myData[event.target.id].src;
    document.getElementById("left-hand__image").setAttribute("class", myData[event.target.id].value);

    setTimeout(() => {
        getValue()
    }, 100);
    opponent();
    reset()
}

function opponent() {
    var opponent = Math.round(Math.random() * 2 );
    document.getElementById("right-hand__image").src = myData[opponent].src;

    document.getElementById("right-hand__image").setAttribute("class", myData[opponent].value);
    console.log(Math.random() * 3);
}

function getValue() {
    var leftValue = document.getElementById("left-hand__image").className;
    var rightValue = document.getElementById("right-hand__image").className;



    if (leftValue === rightValue) {
        setTimeout(() => {
            document.getElementById("forAlert").innerText = "Draw";
            document.getElementById("forAlert").classList.add("fadeOut");
            setTimeout(() => {
                document.getElementById("forAlert").innerText = "";
                document.getElementById("forAlert").classList.remove("fadeOut");


            },300 );

        }, 300);
    } else {
        if (leftValue === "papper" && rightValue === "rock") {
            setTimeout(() => {
                document.getElementById("forAlert").innerText = "you Win";
                document.getElementById("forAlert").classList.add("fadeOut");
                setTimeout(() => {
                    document.getElementById("forAlert").innerText = "";
                    document.getElementById("forAlert").classList.remove("fadeOut");


                }, 300);

            }, 300);
            document.getElementById("leftScore").innerText = ++playerScore;

        } else if (leftValue === "rock" && rightValue === "scissor") {
            setTimeout(() => {
                document.getElementById("forAlert").innerText = "you Win";
                document.getElementById("forAlert").classList.add("fadeOut");
                setTimeout(() => {
                    document.getElementById("forAlert").innerText = "";
                    document.getElementById("forAlert").classList.remove("fadeOut");


                }, 300);

            }, 300);
             document.getElementById("leftScore").innerText = ++playerScore;


        } else if (leftValue === "scissor" && rightValue === "papper") {
            setTimeout(() => {
                document.getElementById("forAlert").innerText = "you Win";
                document.getElementById("forAlert").classList.add("fadeOut");
                setTimeout(() => {
                    document.getElementById("forAlert").innerText = "";
                    document.getElementById("forAlert").classList.remove("fadeOut");


                }, 300);

            }, 300);
             document.getElementById("leftScore").innerText = ++playerScore;


        } else {
            setTimeout(() => {
                document.getElementById("forAlert").innerText = "you Lose";
                document.getElementById("forAlert").classList.add("fadeOut");
                setTimeout(() => {
                    document.getElementById("forAlert").innerText = "";
                    document.getElementById("forAlert").classList.remove("fadeOut");
                }, 300);

            }, 300);
            document.getElementById("rightScore").innerText = ++CPUScore;
        }
    }
    if (playerScore === 10) {
        Swal.fire({
            title: 'you Win !',
            text: 'Great Job , Click Here To Start New Game!',
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
          })
          playerScore = 0
        CPUScore = 0
        document.getElementById("rightScore").innerText = 0;
        document.getElementById("leftScore").innerText = 0;
    }else if(CPUScore === 10) {
        Swal.fire({
                title: 'you Lose !',
                text: 'Click Here To Start New Game!',
                icon: 'warning',
                showConfirmButton: true,
                allowOutsideClick: false,
              })
        playerScore = 0
        CPUScore = 0
        document.getElementById("rightScore").innerText = 0;
        document.getElementById("leftScore").innerText = 0;
    }
    
}