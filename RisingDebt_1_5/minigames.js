/*
sex acts: [
  'rim',  'strap',
  'lick', 'sixtynine',
  'tits', 'anal',
  'trib', 'kiss',
  'fs',   'finger',
  'toy'
]
*/
const matchingGamePartials = [
    'strap_toy',
    'anal_rim',
    'lick_rim',
    'lick_sixtynine',
    'fs_lick',
    'fs_sixtynine',
    'finger_toy',
    'finger_strap',
    'kiss_tits'
]

const matchingGameFunctions = {
    getScore: (a1, a2) => {
        if(a1==a2){
            return 1
        }
        console.log(a1, a2)
        const key = [a1, a2].sort((a, b) => {
            var nameA = a.toLowerCase(), nameB = b.toLowerCase();
            if (nameA < nameB) //sort string ascending
             return -1;
            if (nameA > nameB)
             return 1;
            return 0; //default return value (no sorting)
           }).join('_')
        if(matchingGamePartials.includes(key)){
            return 0.5
        }
        return 0                    
    },
    getCards: (name, count, promiscuity, iq) => {
        if(!promiscuity){
            promiscuity = SugarCube.State.variables.promiscuity;
        }
        if(!iq){
            iq = SugarCube.State.variables.iq
        }
        let acts = shuffle(randChoices(Object.keys(venusRegularCards[name]), 4))
        let cardSrcs = {};
        let counter1 = 0;
        while(Object.keys(cardSrcs).length < count && counter1 < 1000){
            for(let a of acts){
                let src = randChoice(venusRegularCards[name][a])
                let srca = src+'a.jpg'
                let counter2 = 0;
                while(counter2 < 100 && cardSrcs[srca]){
                    src = randChoice(venusRegularCards[name][a])
                    srca = src+'a.jpg'
                    counter2++;
                }
                if(counter2 >= 99){
                    continue
                }
                let srcb = src+'b.jpg';
                if(randInt(promiscuity+40) > 25){
                    let src2 = randChoice(venusRegularCards[name][a])
                    let src2a = src2+'a.jpg'
                    let counter3 = 0;
                    while(counter3 < 100 && cardSrcs[src2a]){
                        src2 = randChoice(venusRegularCards[name][a])
                        src2a = src2+'a.jpg'
                        counter3++;
                    }
                    if(counter3 < 99){
                        srcb = src2a;
                    }

                }
                srca = `./img/venusRegulars/${name}/square/${srca}`;
                srcb = `./img/venusRegulars/${name}/square/${srcb}`
                cardSrcs[srca] = srca;
                cardSrcs[srcb] = srcb;

            }
            acts = shuffle(randChoices(Object.keys(venusRegularCards[name]), 4))
            counter1++

        }
        if(Object.keys(cardSrcs).length < count){
            console.log("unable to make a card set")
            return null
        }
        else{
            let cards = Object.keys(cardSrcs).map((src) => {
                let card = {
                    src: src
                }
                card.act = src.split('_')[3];

                card.show = false;

                return card
            })
            if(cards.length > count){
                cards = cards.slice(0, count)
            }

            return cards
        }
    }
}

const refreshMatchingGame = () => {
    jQuery('#refreshMatchingGame > a').click()
}

const clickMatchingCard = (idx, act) => {
    let cards = SugarCube.State.variables.matchingGameCards;

    SugarCube.State.variables.matchingGameSelected.push(idx);

    SugarCube.State.variables.matchingGameCards[idx].show = true;
    refreshMatchingGame();

    if(SugarCube.State.variables.matchingGameSelected.length == 2){
        let deltaScore = matchingGameFunctions.getScore(cards[SugarCube.State.variables.matchingGameSelected[0]].act, cards[SugarCube.State.variables.matchingGameSelected[1]].act);
        SugarCube.State.variables.matchingGameScore += deltaScore;
        SugarCube.State.variables.matchFound = "Error" 
        if(deltaScore === 0){
            SugarCube.State.variables.matchFound = "Not a match"  
        }
        else if(deltaScore === 1){
            SugarCube.State.variables.matchFound = "Match found!"  
        }
        else if(deltaScore > 0){
            SugarCube.State.variables.matchFound = "Partial match found"  
        }

        SugarCube.State.variables.matchingGameRounds -= 1;
        SugarCube.State.variables.matchingGameCards[SugarCube.State.variables.matchingGameSelected[0]].show = true;
        SugarCube.State.variables.matchingGameCards[SugarCube.State.variables.matchingGameSelected[1]].show = true;
        if(deltaScore == 0){
            SugarCube.State.variables.matchingGameCards[SugarCube.State.variables.matchingGameSelected[0]].tohide = true;
            SugarCube.State.variables.matchingGameCards[SugarCube.State.variables.matchingGameSelected[1]].tohide = true;
        }
    }

    if(SugarCube.State.variables.matchingGameSelected.length >= 2){
        SugarCube.State.variables.matchingGameSelected = [];
        setTimeout(() => {
            SugarCube.State.variables.matchingGameCards = SugarCube.State.variables.matchingGameCards.map((c, i) => {
                if(c.tohide){
                    c.show = false;
                }
                
                if(c.show){
                    c.grey = true;
                }
                return c
            })
            
            refreshMatchingGame();
        }, 500)
    }

}

SugarCube.Macro.add('matchingGame',{
    handler: function(){

        SugarCube.State.variables.venusRegularClient = this.args[0];
        SugarCube.State.variables.matchingGameStart = false;
        SugarCube.State.variables.matchingGamePreview = true;
        SugarCube.State.variables.matchingGameCards = shuffle(matchingGameFunctions.getCards(this.args[0], this.args[1]));
        SugarCube.State.variables.matchingGameSelected = [];
        SugarCube.State.variables.matchingGameScore = 0;
        SugarCube.State.variables.matchingGameRounds = this.args[2];
        SugarCube.State.variables.matchingGameMax = this.args[2]
        SugarCube.State.variables.matchFound = '';
        
        let text = `<div id="matchingGameWrapper"><<matchingGameCards>></div>
        
        <span class="hideme" id="refreshMatchingGame"><<link "refresh matching game">><<replace "#matchingGameWrapper">><<matchingGameCards>><</replace>><</link>></span>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('matchingGameRules',{
    handler: function(){
        let text = `You will be shown a grid of sexual acts that your partner likes; take as much time as you'd like to study them. Then, when you hit start, you'll be able to try to match similar acts. You'll get 1 point for each match, and 0.5 points for partial matches (such as matching strap-on and sex toy). Note that the images may look similar, or they may look completely different!
        
        Try to be specific in your categories: sixty-nining is more specific than cunnilingus; anal is more specific than strap-on.
        
        <<linkreplace "See all possible act categories">>rimming, vaginal strapon, licking, sixtynining, tit-play, anal (toys or strapon), tribbing, kissing, facesitting, fingering, using toys<</linkreplace>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('matchingGameCards',{
    handler: function(){
        let cards = SugarCube.State.variables.matchingGameCards;
        let text = ``;
        if(SugarCube.State.variables.matchingGamePreview){
            SugarCube.State.variables.matchingGameSuccess = null;
            text += `<<link "Start matching">><<set $matchingGamePreview to false>><<set $matchingGameStart to true>><<script>>refreshMatchingGame()<</script>><</link>>`
        }
        if(SugarCube.State.variables.matchingGameRounds <= 0){
            SugarCube.State.variables.matchingGameSuccess = SugarCube.State.variables.matchingGameScore >= SugarCube.State.variables.matchingGameMax/2
            SugarCube.State.variables.matchingGameStart = false;
            text += `<h3>Complete!</h3>
            <h4>Score: $matchingGameScore out of $matchingGameMax: ${SugarCube.State.variables.matchingGameSuccess ? "Passed!" : "Failed"}</h4>`
            text += `[[Go see ${SugarCube.State.variables.venusRegularClient}|VenusRegulars][$skipToScene to true]]`

        }
        if(SugarCube.State.variables.matchingGameStart && SugarCube.State.variables.matchingGameRounds > 0){
            text += `<h3>Matches left: $matchingGameRounds </h3>
            <h4>Score: $matchingGameScore out of $matchingGameMax</h4>
            $matchFound`
        }

        for(let i in cards){
            let card = cards[i]
            if(i%4 == 0){
                text += `<div style="display: flex; justify-content: space-around; width: 70%">`
            }
            text += `<img ${SugarCube.State.variables.matchingGameStart && !card.show && !card.grey ? `onclick="clickMatchingCard(${i}, '${card.act}')"` : ''} src="${card.show || SugarCube.State.variables.matchingGamePreview ? card.src : "./img/venusRegulars/hiddensquare.jpg"}" style="width:25%; padding: 4px 4px 4px 4px; ${card.grey ? "filter: grayscale(1);" : ""}"/>`
            if(i%4 == 3){
                text += `</div>`
            }
        }

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})
