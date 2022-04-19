class Yahtzee {
    constructor () {
        this.score = [];
        this.numberOfRolls = 0;
    }

    startGame () {
        this.resetGame();
        // --- Update number of rolls --- //
        this.numberOfRolls++;
        // --- Roll 5 Die --- //
        for (let i=0; i<5; i++) {
            this.score.push( this.rollDice() );
        }
        // --- Create Image for each die --- //
        this.score.forEach( (s) => this.createDiceImage(s) )
    }

    // --- Clear HTML content & Reset Game variables --- //
    resetGame () {
        document.querySelector('.dice').innerHTML = "";
        document.querySelector('.score').innerHTML = "";
        this.score = []
        this.numberOfRolls = 0;
    }

    // --- Need something to completely end the game --- //
    endGame () {

    }

    // --- Returns a random Die (number 1-6) --- //
    rollDice () {
        return Math.floor( Math.random() * (6 - 1 + 1) ) + 1;
    }

    // --- Creates an image of corresponding die number & appends to div ".dice" --- //
    createDiceImage (num) {
        const diceImg = document.createElement('img');
        diceImg.src = `assets/imgs/red${num}.png`;
        diceImg.classList.add(num);
        // --- Adds click event to each image. Event toggles class '.keep' to visualize a user keeping a die for next roll  --- //
        diceImg.addEventListener('click', () => {
            diceImg.classList.length === 1 ? diceImg.classList.add('keep') : diceImg.classList.remove('keep');
        })

        document.querySelector('.dice').appendChild(diceImg);
    }

    reRollDice () {
        if (this.numberOfRolls === 3) {
            alert("Game over Chum")
            return;
        }
        this.numberOfRolls++
        this.score = [];
        let allDice = document.querySelectorAll(".dice img");

        allDice.forEach( (d) => {
            d.classList.length === 1 ? d.remove() : this.score.push( Number(d.classList[0]) );
        })

        this.updateScore()
        let remainingDice = 5 - this.score.length;
        for (let i=0; i<remainingDice; i++) {
            let newDice = this.rollDice();
            this.score.push(newDice);
            this.createDiceImage(newDice);
        }
    }

    updateScore () {}

    calculateFinalScore () {}

    fullHouseChecker () {}

    straightChecker () {}
}