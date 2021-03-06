class Yahtzee {
    constructor () {
        this.score = [];
        this.numberOfRolls = 0;
        this.totalScore = [];
        this.scoringSystem = {
            "Full House": 25,
            "Yahtzee": 50,
            "Small Straight": 30,
            "Large Straight": 40
        }
        this.totalGameScore = [];
        this.round = 0;
        this.tableHand = document.querySelector('#table-hand')
        this.btns = ["#start-game",'#roll-dice','#end-game']
    }

    startGame () {
        this.resetGame();
        // --- Update number of rolls --- //
        this.numberOfRolls ++;
        this.round ++;
        // --- Roll 5 Die --- //
        for (let i=0; i<5; i++) {
            this.score.push( this.rollDice() );
        }
        // --- Create Image for each die --- //
        this.score.forEach( (s) => this.createDiceImage(s) )
    }

    // --- Clear HTML content & Reset Game variables --- //
    resetGame () {
        if (this.round === 6) {
            this.round = 0;
            for (let i=1; i<this.tableHand.children.length; i++) {
                this.tableHand.children[i].innerText = '';
            }
        }
        document.querySelector('.dice').innerHTML = "";
        document.querySelector('.message').innerHTML = "";
        this.score = []
        this.numberOfRolls = 0;
    }

    // --- Need something to completely end the game --- //
    endGame () {
        let tableScore = document.querySelector('#table-score');

        const result = this.calculateFinalScore();
        tableScore.children[this.round].innerText = result;
        
        setTimeout(() => {
            document.querySelector('.message').innerText = `+${result}`;
        },1000)
        this.totalGameScore.push(result);
        if (this.totalGameScore.length === 6) {
            // this.round = 0;
            this.btns.forEach( btn => {
                let el = document.querySelector(btn);
                el.setAttribute('disabled',true);
            })
            let total = this.totalGameScore.reduce( (a,b) => a + b);
            setTimeout(() => {
                document.querySelector('.message').innerText = `Congratulations you scored ${total}!`
                this.totalGameScore = []
            },1000)
            setTimeout(() => {
                this.btns.forEach( btn => {
                    let el = document.querySelector(btn);
                    el.removeAttribute('disabled')
                })
            },2000)
        }
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
            document.querySelector('.message').innerText = "Cannot Roll more than 3 times!"
            // alert("Game over Chum")
            return;
        }
        this.numberOfRolls++
        this.score = [];
        let allDice = document.querySelectorAll(".dice img");

        allDice.forEach( (d) => {
            d.classList.length === 1 ? d.remove() : this.score.push( Number(d.classList[0]) );
        })

        // this.updateScore()
        let remainingDice = 5 - this.score.length;
        for (let i=0; i<remainingDice; i++) {
            let newDice = this.rollDice();
            this.score.push(newDice);
            this.createDiceImage(newDice);
        }
    }

    // --- I might not actually need this ??? --- //
    updateScore () {}

    calculateFinalScore () {
        // --- Sort array in ascending order to make it easier to check for straights --- //
        this.score.sort((a,b) => a - b)
        
        // --- Variables --- //
        // let tableHand = document.querySelector('#table-hand');
        const sum = this.score.reduce((a,b) => a + b);
        const findDuplicates = this.score.filter( (item, index) => this.score.indexOf(item) !== index );
        const tripsThroughYahtzee = this.score.filter( num => num === findDuplicates[0] );
        
        // --- Logic --- //
        // NEED to check for full house FIRST
        if ( this.fullHouseChecker(this.score) ) {
            document.querySelector('.message').innerText = "Full House!"
            this.tableHand.children[this.round].innerText = 'Full House'
            return this.scoringSystem['Full House'];
        } 
        // Check for Trips-Yahtzee
        if (tripsThroughYahtzee.length > 2 ) {
            let temp = this.helper(tripsThroughYahtzee.length);
            return temp === "Yahtzee" ? this.scoringSystem[temp] : sum; 
        }
        // Check for Straight
        let straight = this.straightChecker(this.score);
        if (straight) {
            document.querySelector('.message').innerText = `${straight}!`
            this.tableHand.children[this.round].innerText = `${straight}`
            return this.scoringSystem[straight];
        } 
        // default return sum
        return sum;
    
    }

    // --- Creates two arrays (arr1 = array that matches any item in passed arr that is equal to the value in the first index) (arr2 = same as arr1 but matches based off the last value) --- //
    // --- returns true if one array.length = 2 & the other is = 3 (full house) --- //
    fullHouseChecker (arr) {
        let arr1 = arr.filter( num => num === arr[0] );
        let arr2 = arr.filter( num => num === arr[4] );
        return arr1.length === 2 && arr2.length === 3 || arr2.length === 2 && arr1.length === 3 ? true : false;
    }

    // --- This is complicated and might need to be refactored --- //
    straightChecker (arr) {
        let incrementor = 0;
        let straight = arr.filter( num => {
            incrementor ++
            return num === incrementor  
        })
    
        if (straight.length === 4) return 'Small Straight'
        else if (straight.length === 5) return 'Large Straight'
        else {
            let test1 = arr[0] - 1;
            let incre = 0;
            let test = arr.filter( num => {
                incre ++
                return test1 + incre === num;
            })
            if (test.length === 5) return "Large Straight";
            let start = arr[1] - 1;
            let temp = arr;
            temp.shift()
            let incrementor2 = 0;
            let straight2 = temp.filter( num => {
                incrementor2 ++
                return start + incrementor2 === num;
            })
    
            if (straight2.length === 4) return 'Small Straight'
        }
    }

    helper (num) {
        let el = document.querySelector('.message');
        let result;
        switch(num) {
            case 3: 
                el.innerText = "Trips!"
                this.tableHand.children[this.round].innerText = "Trips"
                result = 'Trips'
                break;
            case 4:
                el.innerText = "Four of a Kind!"
                this.tableHand.children[this.round].innerText = "Four of a Kind"
                result = "Quads" 
                break;
            default: 
                el.innerText = "Yahtzee!"
                this.tableHand.children[this.round].innerText = "Yahtzee"
                result = "Yahtzee"
        }
        return result;
    }
}