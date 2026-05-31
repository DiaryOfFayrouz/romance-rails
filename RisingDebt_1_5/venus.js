SugarCube.Macro.add('meetAva',{
    handler: function(){
        SugarCube.State.variables.metAva = true;
        let text = `You head straight to Mr. Smith's office, but to your surprise he isn't there. Instead, a shapely woman in a black skirt stands in front of his desk and smiles at you warmly. 
        
        <img src="img/ava/avaintro.jpg">

        "Hello there, it is nice to meet you. You may call me Ms. Ava. I've been told you are quite the capable slut." You don't quite know how to respond to such a greeting.

        "Let me get to the point. Mr. Smith has owed me a favor for a long time, and I am cashing in. I'm opening up a special sort of social club for women in this building. A nice little space for them to relax after work, or while their spouses are at the bar. And I intend to cater to a very specific clientelle. You have proven your loyalty to Mr. Smith, and he has granted permission for you to work at my establishment in the afternoon." Her tone made it clear that you were expected to show up whether you liked it or not.
        
        "And why would I do that?" you say, a little frustration in your voice. You still don't like feeling like a piece of property, particularly one that's getting passed around without your say in the matter. Unexpectedly, she looks you in the eye and gives you a sly smile as her hands begin to undo her blouse.

        <img src="img/ava/avastrip1.jpg" style="width: 60%">

        "Well I thought that would have been obvious. Don't you miss the touch of a woman?"

        <img src="img/ava/avastrip2.jpg" style="width: 60%">

        "The feeling of smooth skin at your fingertips."

        <img src="img/ava/avastrip3.jpg" style="width: 60%">

        "The sweet tang of pussy." Completely naked, she turns and poses for you. "Who knows, if you're extra good you might even get to service me some time. I tip extremely well." Somewhat overwhelmed, you just nod. 
        
        "Glad I've made things clear. Oh, one more thing- make sure you have a pussy when you come over. We have nothing personal against trans women with penises, but my clients prefer someone who has committed themselves to their transformation." At the look of surprise on your face, she gives you a very evil grin. "Oh yes, they know about your status and are quite comfortable with it. Be careful around them my dear. I only invite women with a certain taste for control, no matter how gentle they seem." She seems to prefer women like herself you surmise. "Well, I'm sure you have a lot to do. Off you go then. Stop by the Venus Lounge any afternoon." A bit speechless, you give her a nod and leave the office. 

        <<keycontrol 1>>[[Continue.|HR]]<</keycontrol>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('venusOptions',{
    handler: function(){
        let text = ``;
        if(!SugarCube.State.variables.avaVenusRegulars){
            SugarCube.State.variables.avaVenusRegulars = true;
            text += `As you enter the Venus Lounge, the proprieter beckons you to her office.
            
            <img src="img/ava/avaintro.jpg">
            
            "You've been doing great work here, and customers are pleased. I'd like to ask you for a favor. I have a few regulars to the lounge that are looking for some special treatment. They want to form more of a connection with their provider rather than be assigned one at random. When you stop by, please consider having a session with one of them. I'm sure they'll pay handsomely once they get to know you, as long as you take their pleasure into consideration."
            
            Without waiting for a response, she waves to dismiss you. You head back to the lounge.
            
            `
        }

        text += `<<keycontrol 1>>[[Pick a random client|VenusLounge]]<</keycontrol>>
        <<keycontrol 2>>[[Visit a regular|VenusRegularSelection]]<</keycontrol>>`

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('venusLounge',{
    handler: function(){
        SugarCube.State.variables.venus += 5;
        let groupsex = Math.min(80, randInt(SugarCube.State.variables.venus)+30) > 50
        let sextype = randInt(SugarCube.State.variables.domsub*4) < 30 ? 'rough':'gentle';
        if(sextype == 'rough'){
            SugarCube.State.variables.domsub = Math.max(0, Math.min(100, SugarCube.State.variables.domsub-5));
        }
        let sexcat = randChoice(Object.keys(lesbianImageLists[sextype]));
        //let prefix = sexcat.split('/')[sexcat.split('/').length - 1];
        //let sexcount = lesbianImageLists[sextype][sexcat].length;
        let src = randChoice(lesbianImageLists[sextype][sexcat])
        let text = ``

        if(groupsex){
            SugarCube.State.variables.venus += 5;
            text += `Your reputation at the Venus Lounge is apparently quite good; so many women want a turn with you that you end up servicing several ladies at once.
            
            <<set $variable to pickImgNumber(1, 40, "lesbian/group/group")>><<vid "lesbian/group/group" $variable>>
            
            `
        }
        else {
            text += `You have a very lovely time with your companion for the afternoon${sextype == 'rough' ? ', though you feel like she is being quite rough with you today...not that you mind' : ''}.

            <video width="720" autoplay muted preload="auto" loop src="img/${src}"></video>
            
            `
        }
        
        text += `Money +150 and ${Math.floor(SugarCube.State.variables.fem * 1.5)} tip<<set $money += 150+${Math.floor(SugarCube.State.variables.fem * 1.5)}>>
        ${sextype == 'rough' ? `Submission increased`: ""}
        <<keycontrol 1>>[[Continue.|Evening]]<</keycontrol>>
        
        `
        if(SugarCube.State.variables.avaOffer && SugarCube.State.variables.venus >= 100){
            text += `You can stop by Ms. Ava's office to accept her offer.
            
            <<keycontrol 2>>[[Become her business partner.|AvaBrothelEnd]]<</keycontrol>>
            <<keycontrol 3>>[[Become her personal assistant.|AvaAssistantEnd]]<</keycontrol>>`
        };

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('venusRegularSelection',{
    handler: function(){
        SugarCube.State.temporary.personSelectionOptions = [].concat(venusRegularConst)
        let text = `<div id="personSelectionWrapper"><<personSelection "venusRegularSelected" "visitRegularButton">></div>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('visitRegularButton',{
    handler: function(){
        let text = `[[Visit ${!!SugarCube.State.variables.people[SugarCube.State.variables.venusRegularSelected] && SugarCube.State.variables.people[SugarCube.State.variables.venusRegularSelected].name}|VenusRegulars]]`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

const refreshPersonSelection = () => {
    jQuery('#refreshPersonSelection > a').click()
}

const selectPerson = (name, callbackVar) => {
    SugarCube.State.temporary.personSelected = name;
    SugarCube.State.variables[callbackVar] = name;
    refreshPersonSelection()
}

SugarCube.Macro.add('personSelection',{
    handler: function(){
        let callbackVar = this.args[0]
        let selectBtnMacro = this.args[1]
        if(!SugarCube.State.temporary.personSelected){
            SugarCube.State.temporary.personSelected = SugarCube.State.variables[callbackVar] 
        }

        let selected = SugarCube.State.temporary.personSelected;
        let options = SugarCube.State.temporary.personSelectionOptions;
        
        let text = `<span id="refreshPersonSelection" class="hideme"><<link "refresh person selection">><<replace "#personSelectionWrapper">><<personSelection "${callbackVar}" "${selectBtnMacro}">><</replace>><</link>></span>`;

        let unselected = options.filter((a) => a != selected)
        text += `<div style="display: flex; justify-content: center; flex-wrap: wrap">`
        for(let u of unselected){
            let person = SugarCube.State.variables.people[u];
            text += `<div><div>${person.name}</div><img onclick="selectPerson('${u}', '${callbackVar}')" src="${person.src}/thumb${person.level}.jpg" style="width: 100px; height: 100px; margin-left: 0.25rem; margin-right: 0.25rem"/><<if ${!!person.endingAvailable && person.endingAvailable()}>><br/><i style="color: yellow">Ending available!</i><</if>></div>`
        }
        text += `</div>`
        if(selected && SugarCube.State.variables.people[selected]){
            let person = SugarCube.State.variables.people[selected];
            text += `<div style="display: flex; align-items: start; justify-content: space-around">
            <img style="width: 50%" src="${person.src}/portrait${person.level}.jpg"/>
            <div>
            <<if ${!!person.endingAvailable && person.endingAvailable()}>><i style="color: yellow">Ending available!</i><</if>>
            <h3>Name: ${person.name}</h3>
            <h3>Affection: ${person.level < person.maxlevel ? person.level : "MAX"}</h3><<if ${person.level < person.maxlevel}>>
            <h3>Progress: ${person.exp}/${person.level*10}</h3><</if>>
            <h3><<${selectBtnMacro}>></h3>
            </div>
            </div>
            `
        }

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('venusRegularsScene',{
    handler: function(){
        let plusAffection = this.args[0]
        let id = SugarCube.State.variables.venusRegularSelected;
        let name = SugarCube.State.variables.people[id].name;
        let level = SugarCube.State.variables.people[id].level;
        let endingAvailable = SugarCube.State.variables.people[id].endingAvailable && SugarCube.State.variables.people[id].endingAvailable()
        let sceneCount = SugarCube.State.variables.people[id].sceneCount;
        let affectionStatement1 = {
            10: 'adequate',
            15: 'good',
            25: 'fantastic'
        }[plusAffection];

        let affectionStatement2 = {
            10: 'content',
            15: 'happy',
            25: 'ecstatic'
        }[plusAffection];

        let affectionStatement3 = gainAffection(id, plusAffection);
        SugarCube.State.variables.venus += 5;
        let text = `
        
        You do a ${affectionStatement1} job of pleasuring ${name} and she's ${affectionStatement2} with your service.
        <<set $variable to pickImgNumber(1,${sceneCount}, "venusRegulars/${id}/${id}")>>
        <<vid "venusRegulars/${id}/${id}" $variable>>
        
        ${affectionStatement3}
        
        Money +200 and ${Math.floor(level * 100)} tip<<set $money += 200+${Math.floor(level * 100)}>>

        <<keycontrol 1>>[[Continue.|Evening]]<</keycontrol>>

        <<if ${endingAvailable}>>It looks like ${name} has something she wants to say.

        <<keycontrol 2>>[[See what's up|VenusRegularsEndingIntro]]<</keycontrol>><</if>>
        `;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})


SugarCube.Macro.add('venusRegulars',{
    handler: function(){
        let id = SugarCube.State.variables.venusRegularSelected;
        let name = SugarCube.State.variables.people[id].name;
        let level = SugarCube.State.variables.people[id].level;
        let cards = [8, 8, 12, 12, 16, 16][level-1]
        let text = ``
        let plusAffection = 15;
        if(SugarCube.State.variables.skipToScene){
            SugarCube.State.variables.skipToScene = false;
            if(SugarCube.State.variables.matchingGameSuccess !== null && SugarCube.State.variables.matchingGameSuccess !== undefined){
                plusAffection = SugarCube.State.variables.matchingGameSuccess ? 25 : 10;
                SugarCube.State.variables.matchingGameSuccess = null;
            }
            text += `<<venusRegularsScene ${plusAffection}>>` 
        }
        
        else{
            text += `<span id="vrOptions"><<keycontrol 1>><<link "Go right to ${name}">><<replace "#vrOptions">><<venusRegularsScene ${plusAffection}>><</replace>><</link>><</keycontrol>>
            <<keycontrol 2>><<link "Try to remember her preferences (minigame)">><<replace "#vrOptions">><<matchingGame "${id}" ${cards} ${level}>><</replace>><</link>><</keycontrol>>
            <<keycontrol 3>><<linkreplace "View minigame rules">>
            
            <<matchingGameRules>><</linkreplace>><</keycontrol>></span>`;
        }
        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('avaOffice',{
    handler: function(){
        SugarCube.State.variables.avaOffer = true;
        let text = `You step cautiously into Ava's office. Unexpectedly, she stands up and gives you a hug, then gestures for you to sit down. She leans casually on her desk and gives you a warm smile.
        
        <img src="img/ava/avasit.jpg" style="width: 60%">
        
        "I called you in here to let you know how impressed I am. You've consistently had excellent reviews and business has been growing steadily. As a result, I wanted to give you an offer- I'm willing to buy the rest of your debt from Mr. Smith in exchange for you working for me full time. There are two positions available." 
        
        "One is as a business partner, primarily to handle recruitment of new clients and providers, and handle day to day running of the brothel. Naturally, you'll have full use of all the ladies as long as you get your work done as well."
        
        "The other is as my personal assistant. It is a bit less prestigious of a position, and I'm afraid I may keep you too busy to enjoy the bordello to its fullest, but there's an added benefit...I'll cover procedures to restore your masculinity. I want a stud in my life that will fuck on demand and that I can parade around as I please."
        
        "Which will it be?"
        
        <<keycontrol 1>>[[Business Partner.|AvaBrothelEnd]]<</keycontrol>>
        <<keycontrol 2>>[[Personal Assistant.|AvaAssistantEnd]]<</keycontrol>>
        <<keycontrol 3>>[[Think on it (go back to the lounge).|VenusLounge]]<</keycontrol>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('avaBrothelEnd',{
    handler: function(){
        let text = `You eagerly dive in to your new role as brothel Madame. To celebrate, you treat yourself to a nice relaxing orgy. 

        <video width="720" autoplay muted preload="auto" loop src="img/ava/orgy/orgy1.webm"></video>

        Apparently everyone enjoyed it as much as you, and your inbox is flooded with requests for more group sex parties. Naturally, you are happy to oblige.

        <video width="720" autoplay muted preload="auto" loop src="img/ava/orgy/orgy2.webm"></video>

        It becomes a monthly event, and business skyrockets. You start to rent more spaces, even having some events outside.

        <<vidgrid "ava/orgy/orgy" 2 6>>
        
        Needless to say, Ms. Ava is very appreciative, and your one on one meetings almost always include a few tokens of her gratitude.
        
        <video width="720" autoplay muted preload="auto" loop src="img/ava/lesbian/lesbian15.webm"></video>
        
        Technically, she still owns you, but what better job could you possibly have on the outside world?
        
        End: Madame
        
        <<script>>SugarCube.setup.setLocal('madame', true)<</script>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('avaAssistantEnd',{
    handler: function(){
        let text = `You're overjoyed to have your masculinity back, and you're excited to start your job as Ms. Ava's personal assistant. The job is not quite what you expected, or perhaps it is exactly what you should have expected. 

        At first she delights in objectifying you and using you as a masturbation aid.

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/desk1.webm"></video>

        You never have to take calls or perform any actual work, just fuck her on demand, which is so frequent you wonder how she gets any actual work done.

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/assistant3.webm"></video>

        At first, she insists on always being on top and in charge.

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/assistant23.webm"></video>

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/assistant24.webm"></video>

        However, as your "working relationship" develops, she more and more frequently lets you take charge and fuck her from behind, egging you on to rougher and rougher sex.

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/assistant10.webm"></video>

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/assistant35.webm"></video>

        You even make some house calls.

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/assistant11.webm"></video>

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/assistant15.webm"></video>

        It's somewhat mindless work, but very satisfying, and she's always happy to share you with others to keep things interesting.

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/share_f.webm"></video>

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/share_m.webm"></video>
        
        And she always makes sure you're a satsified employee.

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/assistant32.webm"></video>

        <video width="720" autoplay muted preload="auto" loop src="img/ava/assistant/assistant29.webm"></video>

        All in all, not a bad fate

        End: Himbo
        
        <<script>>SugarCube.setup.setLocal('himbo', true)<</script>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

const lesbianImageLists = {"gentle": {"lesbian/cunnthem/gentle": ["lesbian/cunnthem/gentle/gentle1.webm", "lesbian/cunnthem/gentle/gentle10.webm", "lesbian/cunnthem/gentle/gentle11.webm", "lesbian/cunnthem/gentle/gentle12.webm", "lesbian/cunnthem/gentle/gentle13.webm", "lesbian/cunnthem/gentle/gentle14.webm", "lesbian/cunnthem/gentle/gentle15.webm", "lesbian/cunnthem/gentle/gentle16.webm", "lesbian/cunnthem/gentle/gentle17.webm", "lesbian/cunnthem/gentle/gentle18.webm", "lesbian/cunnthem/gentle/gentle19.webm", "lesbian/cunnthem/gentle/gentle2.webm", "lesbian/cunnthem/gentle/gentle20.webm", "lesbian/cunnthem/gentle/gentle21.webm", "lesbian/cunnthem/gentle/gentle3.webm", "lesbian/cunnthem/gentle/gentle4.webm", "lesbian/cunnthem/gentle/gentle5.webm", "lesbian/cunnthem/gentle/gentle6.webm", "lesbian/cunnthem/gentle/gentle7.webm", "lesbian/cunnthem/gentle/gentle8.webm", "lesbian/cunnthem/gentle/gentle9.webm"], "lesbian/cunnyou/gentle": ["lesbian/cunnyou/gentle/gentle22.webm", "lesbian/cunnyou/gentle/gentle23.webm", "lesbian/cunnyou/gentle/gentle24.webm", "lesbian/cunnyou/gentle/gentle25.webm", "lesbian/cunnyou/gentle/gentle26.webm", "lesbian/cunnyou/gentle/gentle27.webm", "lesbian/cunnyou/gentle/gentle28.webm", "lesbian/cunnyou/gentle/gentle29.webm", "lesbian/cunnyou/gentle/gentle30.webm", "lesbian/cunnyou/gentle/gentle31.webm", "lesbian/cunnyou/gentle/gentle32.webm", "lesbian/cunnyou/gentle/gentle33.webm", "lesbian/cunnyou/gentle/gentle34.webm", "lesbian/cunnyou/gentle/gentle35.webm", "lesbian/cunnyou/gentle/gentle36.webm", "lesbian/cunnyou/gentle/gentle37.webm", "lesbian/cunnyou/gentle/gentle38.webm", "lesbian/cunnyou/gentle/gentle39.webm", "lesbian/cunnyou/gentle/gentle40.webm", "lesbian/cunnyou/gentle/gentle41.webm", "lesbian/cunnyou/gentle/gentle42.webm", "lesbian/cunnyou/gentle/gentle43.webm", "lesbian/cunnyou/gentle/gentle44.webm", "lesbian/cunnyou/gentle/gentle45.webm", "lesbian/cunnyou/gentle/gentle46.webm", "lesbian/cunnyou/gentle/gentle47.webm", "lesbian/cunnyou/gentle/gentle48.webm", "lesbian/cunnyou/gentle/gentle49.webm", "lesbian/cunnyou/gentle/gentle50.webm", "lesbian/cunnyou/gentle/gentle51.webm", "lesbian/cunnyou/gentle/gentle52.webm", "lesbian/cunnyou/gentle/gentle53.webm", "lesbian/cunnyou/gentle/gentle54.webm", "lesbian/cunnyou/gentle/gentle55.webm", "lesbian/cunnyou/gentle/gentle56.webm", "lesbian/cunnyou/gentle/gentle57.webm"], "lesbian/fingerthem": ["lesbian/fingerthem/fingerthem1.webm", "lesbian/fingerthem/fingerthem10.webm", "lesbian/fingerthem/fingerthem11.webm", "lesbian/fingerthem/fingerthem2.webm", "lesbian/fingerthem/fingerthem3.webm", "lesbian/fingerthem/fingerthem4.webm", "lesbian/fingerthem/fingerthem5.webm", "lesbian/fingerthem/fingerthem6.webm", "lesbian/fingerthem/fingerthem7.webm", "lesbian/fingerthem/fingerthem8.webm", "lesbian/fingerthem/fingerthem9.webm"], "lesbian/fingeryou/gentle": ["lesbian/fingeryou/gentle/gentle58.webm", "lesbian/fingeryou/gentle/gentle59.webm", "lesbian/fingeryou/gentle/gentle60.webm", "lesbian/fingeryou/gentle/gentle61.webm", "lesbian/fingeryou/gentle/gentle62.webm", "lesbian/fingeryou/gentle/gentle63.webm", "lesbian/fingeryou/gentle/gentle64.webm"], "lesbian/group": ["lesbian/group/group1.webm", "lesbian/group/group10.webm", "lesbian/group/group11.webm", "lesbian/group/group12.webm", "lesbian/group/group13.webm", "lesbian/group/group14.webm", "lesbian/group/group15.webm", "lesbian/group/group16.webm", "lesbian/group/group17.webm", "lesbian/group/group18.webm", "lesbian/group/group19.webm", "lesbian/group/group2.webm", "lesbian/group/group20.webm", "lesbian/group/group21.webm", "lesbian/group/group22.webm", "lesbian/group/group23.webm", "lesbian/group/group24.webm", "lesbian/group/group25.webm", "lesbian/group/group26.webm", "lesbian/group/group27.webm", "lesbian/group/group28.webm", "lesbian/group/group29.webm", "lesbian/group/group3.webm", "lesbian/group/group30.webm", "lesbian/group/group31.webm", "lesbian/group/group32.webm", "lesbian/group/group33.webm", "lesbian/group/group34.webm", "lesbian/group/group35.webm", "lesbian/group/group36.webm", "lesbian/group/group37.webm", "lesbian/group/group38.webm", "lesbian/group/group39.webm", "lesbian/group/group4.webm", "lesbian/group/group40.webm", "lesbian/group/group5.webm", "lesbian/group/group6.webm", "lesbian/group/group7.webm", "lesbian/group/group8.webm", "lesbian/group/group9.webm"], "lesbian/kiss_tease": ["lesbian/kiss_tease/kiss_tease1.webm", "lesbian/kiss_tease/kiss_tease10.webm", "lesbian/kiss_tease/kiss_tease11.webm", "lesbian/kiss_tease/kiss_tease12.webm", "lesbian/kiss_tease/kiss_tease13.webm", "lesbian/kiss_tease/kiss_tease14.webm", "lesbian/kiss_tease/kiss_tease15.webm", "lesbian/kiss_tease/kiss_tease16.webm", "lesbian/kiss_tease/kiss_tease17.webm", "lesbian/kiss_tease/kiss_tease18.webm", "lesbian/kiss_tease/kiss_tease19.webm", "lesbian/kiss_tease/kiss_tease2.webm", "lesbian/kiss_tease/kiss_tease20.webm", "lesbian/kiss_tease/kiss_tease21.webm", "lesbian/kiss_tease/kiss_tease22.webm", "lesbian/kiss_tease/kiss_tease23.webm", "lesbian/kiss_tease/kiss_tease24.webm", "lesbian/kiss_tease/kiss_tease25.webm", "lesbian/kiss_tease/kiss_tease26.webm", "lesbian/kiss_tease/kiss_tease27.webm", "lesbian/kiss_tease/kiss_tease3.webm", "lesbian/kiss_tease/kiss_tease4.webm", "lesbian/kiss_tease/kiss_tease5.webm", "lesbian/kiss_tease/kiss_tease6.webm", "lesbian/kiss_tease/kiss_tease7.webm", "lesbian/kiss_tease/kiss_tease8.webm", "lesbian/kiss_tease/kiss_tease9.webm"], "lesbian/other": ["lesbian/other/other1.webm", "lesbian/other/other2.webm", "lesbian/other/other3.webm", "lesbian/other/other4.webm", "lesbian/other/other5.webm", "lesbian/other/other6.webm"], "lesbian/strapyou": ["lesbian/strapyou/strapyou1.webm", "lesbian/strapyou/strapyou10.webm", "lesbian/strapyou/strapyou11.webm", "lesbian/strapyou/strapyou12.webm", "lesbian/strapyou/strapyou13.webm", "lesbian/strapyou/strapyou14.webm", "lesbian/strapyou/strapyou15.webm", "lesbian/strapyou/strapyou16.webm", "lesbian/strapyou/strapyou17.webm", "lesbian/strapyou/strapyou18.webm", "lesbian/strapyou/strapyou19.webm", "lesbian/strapyou/strapyou2.webm", "lesbian/strapyou/strapyou20.webm", "lesbian/strapyou/strapyou21.webm", "lesbian/strapyou/strapyou22.webm", "lesbian/strapyou/strapyou23.webm", "lesbian/strapyou/strapyou24.webm", "lesbian/strapyou/strapyou3.webm", "lesbian/strapyou/strapyou4.webm", "lesbian/strapyou/strapyou5.webm", "lesbian/strapyou/strapyou6.webm", "lesbian/strapyou/strapyou7.webm", "lesbian/strapyou/strapyou8.webm", "lesbian/strapyou/strapyou9.webm"], "lesbian/trib": ["lesbian/trib/trib1.webm", "lesbian/trib/trib10.webm", "lesbian/trib/trib11.webm", "lesbian/trib/trib12.webm", "lesbian/trib/trib13.webm", "lesbian/trib/trib14.webm", "lesbian/trib/trib15.webm", "lesbian/trib/trib16.webm", "lesbian/trib/trib17.webm", "lesbian/trib/trib18.webm", "lesbian/trib/trib19.webm", "lesbian/trib/trib2.webm", "lesbian/trib/trib20.webm", "lesbian/trib/trib21.webm", "lesbian/trib/trib22.webm", "lesbian/trib/trib23.webm", "lesbian/trib/trib24.webm", "lesbian/trib/trib25.webm", "lesbian/trib/trib26.webm", "lesbian/trib/trib27.webm", "lesbian/trib/trib3.webm", "lesbian/trib/trib4.webm", "lesbian/trib/trib5.webm", "lesbian/trib/trib6.webm", "lesbian/trib/trib7.webm", "lesbian/trib/trib8.webm", "lesbian/trib/trib9.webm"]}, "rough": {"lesbian/cunnthem/rough": ["lesbian/cunnthem/rough/rough1.webm", "lesbian/cunnthem/rough/rough10.webm", "lesbian/cunnthem/rough/rough11.webm", "lesbian/cunnthem/rough/rough12.webm", "lesbian/cunnthem/rough/rough13.webm", "lesbian/cunnthem/rough/rough14.webm", "lesbian/cunnthem/rough/rough15.webm", "lesbian/cunnthem/rough/rough16.webm", "lesbian/cunnthem/rough/rough17.webm", "lesbian/cunnthem/rough/rough18.webm", "lesbian/cunnthem/rough/rough19.webm", "lesbian/cunnthem/rough/rough2.webm", "lesbian/cunnthem/rough/rough20.webm", "lesbian/cunnthem/rough/rough21.webm", "lesbian/cunnthem/rough/rough22.webm", "lesbian/cunnthem/rough/rough23.webm", "lesbian/cunnthem/rough/rough24.webm", "lesbian/cunnthem/rough/rough25.webm", "lesbian/cunnthem/rough/rough26.webm", "lesbian/cunnthem/rough/rough27.webm", "lesbian/cunnthem/rough/rough28.webm", "lesbian/cunnthem/rough/rough29.webm", "lesbian/cunnthem/rough/rough3.webm", "lesbian/cunnthem/rough/rough30.webm", "lesbian/cunnthem/rough/rough31.webm", "lesbian/cunnthem/rough/rough32.webm", "lesbian/cunnthem/rough/rough4.webm", "lesbian/cunnthem/rough/rough5.webm", "lesbian/cunnthem/rough/rough6.webm", "lesbian/cunnthem/rough/rough7.webm", "lesbian/cunnthem/rough/rough8.webm", "lesbian/cunnthem/rough/rough9.webm"], "lesbian/cunnyou/rough": ["lesbian/cunnyou/rough/rough33.webm", "lesbian/cunnyou/rough/rough34.webm", "lesbian/cunnyou/rough/rough35.webm", "lesbian/cunnyou/rough/rough36.webm", "lesbian/cunnyou/rough/rough37.webm", "lesbian/cunnyou/rough/rough38.webm", "lesbian/cunnyou/rough/rough39.webm", "lesbian/cunnyou/rough/rough40.webm", "lesbian/cunnyou/rough/rough41.webm", "lesbian/cunnyou/rough/rough42.webm", "lesbian/cunnyou/rough/rough43.webm", "lesbian/cunnyou/rough/rough44.webm"], "lesbian/fingeryou/rough": ["lesbian/fingeryou/rough/rough45.webm", "lesbian/fingeryou/rough/rough46.webm", "lesbian/fingeryou/rough/rough47.webm", "lesbian/fingeryou/rough/rough48.webm", "lesbian/fingeryou/rough/rough49.webm", "lesbian/fingeryou/rough/rough50.webm", "lesbian/fingeryou/rough/rough51.webm", "lesbian/fingeryou/rough/rough52.webm", "lesbian/fingeryou/rough/rough53.webm", "lesbian/fingeryou/rough/rough54.webm", "lesbian/fingeryou/rough/rough55.webm", "lesbian/fingeryou/rough/rough56.webm", "lesbian/fingeryou/rough/rough57.webm", "lesbian/fingeryou/rough/rough58.webm", "lesbian/fingeryou/rough/rough59.webm", "lesbian/fingeryou/rough/rough60.webm"]}, "femsub": {"mdom": ["femsub/femsub1.webm", "femsub/femsub10.webm", "femsub/femsub11.webm", "femsub/femsub12.webm", "femsub/femsub13.webm", "femsub/femsub14.webm", "femsub/femsub15.webm", "femsub/femsub16.webm", "femsub/femsub17.webm", "femsub/femsub18.webm", "femsub/femsub19.webm", "femsub/femsub2.webm", "femsub/femsub20.webm", "femsub/femsub21.webm", "femsub/femsub22.webm", "femsub/femsub23.webm", "femsub/femsub24.webm", "femsub/femsub25.webm", "femsub/femsub26.webm", "femsub/femsub27.webm", "femsub/femsub3.webm", "femsub/femsub4.webm", "femsub/femsub5.webm", "femsub/femsub6.webm", "femsub/femsub7.webm", "femsub/femsub8.webm", "femsub/femsub9.webm"], "fdom": ["lesbian/lesdom/bondage/bondage1.webm", "lesbian/lesdom/bondage/bondage2.webm", "lesbian/lesdom/bondage/bondage3.webm", "lesbian/lesdom/bondage/bondage4.webm", "lesbian/lesdom/humiliation/humiliation1.webm", "lesbian/lesdom/humiliation/humiliation10.webm", "lesbian/lesdom/humiliation/humiliation11.webm", "lesbian/lesdom/humiliation/humiliation12.webm", "lesbian/lesdom/humiliation/humiliation13.webm", "lesbian/lesdom/humiliation/humiliation14.webm", "lesbian/lesdom/humiliation/humiliation2.webm", "lesbian/lesdom/humiliation/humiliation3.webm", "lesbian/lesdom/humiliation/humiliation4.webm", "lesbian/lesdom/humiliation/humiliation5.webm", "lesbian/lesdom/humiliation/humiliation6.webm", "lesbian/lesdom/humiliation/humiliation7.webm", "lesbian/lesdom/humiliation/humiliation8.webm", "lesbian/lesdom/humiliation/humiliation9.webm", "lesbian/lesdom/pain/pain1.webm", "lesbian/lesdom/pain/pain10.webm", "lesbian/lesdom/pain/pain11.webm", "lesbian/lesdom/pain/pain12.webm", "lesbian/lesdom/pain/pain13.webm", "lesbian/lesdom/pain/pain14.webm", "lesbian/lesdom/pain/pain15.webm", "lesbian/lesdom/pain/pain16.webm", "lesbian/lesdom/pain/pain17.webm", "lesbian/lesdom/pain/pain18.webm", "lesbian/lesdom/pain/pain19.webm", "lesbian/lesdom/pain/pain2.webm", "lesbian/lesdom/pain/pain20.webm", "lesbian/lesdom/pain/pain21.webm", "lesbian/lesdom/pain/pain22.webm", "lesbian/lesdom/pain/pain23.webm", "lesbian/lesdom/pain/pain24.webm", "lesbian/lesdom/pain/pain3.webm", "lesbian/lesdom/pain/pain4.webm", "lesbian/lesdom/pain/pain5.webm", "lesbian/lesdom/pain/pain6.webm", "lesbian/lesdom/pain/pain7.webm", "lesbian/lesdom/pain/pain8.webm", "lesbian/lesdom/pain/pain9.webm", "lesbian/lesdom/pleasure/pleasure1.webm", "lesbian/lesdom/pleasure/pleasure10.webm", "lesbian/lesdom/pleasure/pleasure11.webm", "lesbian/lesdom/pleasure/pleasure12.webm", "lesbian/lesdom/pleasure/pleasure13.webm", "lesbian/lesdom/pleasure/pleasure14.webm", "lesbian/lesdom/pleasure/pleasure15.webm", "lesbian/lesdom/pleasure/pleasure16.webm", "lesbian/lesdom/pleasure/pleasure17.webm", "lesbian/lesdom/pleasure/pleasure18.webm", "lesbian/lesdom/pleasure/pleasure19.webm", "lesbian/lesdom/pleasure/pleasure2.webm", "lesbian/lesdom/pleasure/pleasure20.webm", "lesbian/lesdom/pleasure/pleasure21.webm", "lesbian/lesdom/pleasure/pleasure22.webm", "lesbian/lesdom/pleasure/pleasure23.webm", "lesbian/lesdom/pleasure/pleasure24.webm", "lesbian/lesdom/pleasure/pleasure25.webm", "lesbian/lesdom/pleasure/pleasure26.webm", "lesbian/lesdom/pleasure/pleasure27.webm", "lesbian/lesdom/pleasure/pleasure28.webm", "lesbian/lesdom/pleasure/pleasure29.webm", "lesbian/lesdom/pleasure/pleasure3.webm", "lesbian/lesdom/pleasure/pleasure4.webm", "lesbian/lesdom/pleasure/pleasure5.webm", "lesbian/lesdom/pleasure/pleasure6.webm", "lesbian/lesdom/pleasure/pleasure7.webm", "lesbian/lesdom/pleasure/pleasure8.webm", "lesbian/lesdom/pleasure/pleasure9.webm", "lesbian/lesdom/service/service1.webm", "lesbian/lesdom/service/service2.webm", "lesbian/lesdom/strapon/strapon10.webm", "lesbian/lesdom/strapon/strapon12.webm", "lesbian/lesdom/strapon/strapon13.webm", "lesbian/lesdom/strapon/strapon14.webm", "lesbian/lesdom/strapon/strapon15.webm", "lesbian/lesdom/strapon/strapon16.webm", "lesbian/lesdom/strapon/strapon17.webm", "lesbian/lesdom/strapon/strapon18.webm", "lesbian/lesdom/strapon/strapon19.webm", "lesbian/lesdom/strapon/strapon2.webm", "lesbian/lesdom/strapon/strapon21.webm", "lesbian/lesdom/strapon/strapon23.webm", "lesbian/lesdom/strapon/strapon24.webm", "lesbian/lesdom/strapon/strapon31.webm", "lesbian/lesdom/strapon/strapon4.webm", "lesbian/lesdom/strapon/strapon5.webm", "lesbian/lesdom/strapon/strapon6.webm", "lesbian/lesdom/strapon/strapon8.webm", "lesbian/lesdom/strapon/strapon9.webm"]}, "transsub": {"mdom": ["transsub/transsub1.webm", "transsub/transsub10.webm", "transsub/transsub11.webm", "transsub/transsub12.webm", "transsub/transsub13.webm", "transsub/transsub14.webm", "transsub/transsub15.webm", "transsub/transsub16.webm", "transsub/transsub17.webm", "transsub/transsub18.webm", "transsub/transsub19.webm", "transsub/transsub2.webm", "transsub/transsub20.webm", "transsub/transsub21.webm", "transsub/transsub22.webm", "transsub/transsub23.webm", "transsub/transsub24.webm", "transsub/transsub25.webm", "transsub/transsub26.webm", "transsub/transsub27.webm", "transsub/transsub28.webm", "transsub/transsub29.webm", "transsub/transsub3.webm", "transsub/transsub4.webm", "transsub/transsub6.webm", "transsub/transsub7.webm", "transsub/transsub8.webm", "transsub/transsub9.webm"], "fdom": ["lesbian/lesdom/bondage/t_bondage1.webm", "lesbian/lesdom/bondage/t_bondage2.webm", "lesbian/lesdom/bondage/t_bondage3.webm", "lesbian/lesdom/humiliation/t_humiliation1.webm", "lesbian/lesdom/humiliation/t_humiliation2.webm", "lesbian/lesdom/humiliation/t_humiliation3.webm", "lesbian/lesdom/humiliation/t_humiliation4.webm", "lesbian/lesdom/humiliation/t_humiliation5.webm", "lesbian/lesdom/humiliation/t_humiliation6.webm", "lesbian/lesdom/humiliation/t_humiliation7.webm", "lesbian/lesdom/humiliation/t_humiliation8.webm", "lesbian/lesdom/pain/t_pain1.webm", "lesbian/lesdom/pain/t_pain11.webm", "lesbian/lesdom/pain/t_pain12.webm", "lesbian/lesdom/pain/t_pain13.webm", "lesbian/lesdom/pain/t_pain2.webm", "lesbian/lesdom/pain/t_pain3.webm", "lesbian/lesdom/pain/t_pain4.webm", "lesbian/lesdom/pain/t_pain5.webm", "lesbian/lesdom/pain/t_pain6.webm", "lesbian/lesdom/pain/t_pain7.webm", "lesbian/lesdom/pain/t_pain8.webm", "lesbian/lesdom/pain/t_pain9.webm", "lesbian/lesdom/service/t_service1.webm", "lesbian/lesdom/service/t_service2.webm", "lesbian/lesdom/service/t_service3.webm", "lesbian/lesdom/service/t_service4.webm", "lesbian/lesdom/service/t_service5.webm", "lesbian/lesdom/service/t_service6.webm", "lesbian/lesdom/strapon/t_strapon1.webm", "lesbian/lesdom/strapon/t_strapon11.webm", "lesbian/lesdom/strapon/t_strapon20.webm", "lesbian/lesdom/strapon/t_strapon22.webm", "lesbian/lesdom/strapon/t_strapon25.webm", "lesbian/lesdom/strapon/t_strapon26.webm", "lesbian/lesdom/strapon/t_strapon27.webm", "lesbian/lesdom/strapon/t_strapon28.webm", "lesbian/lesdom/strapon/t_strapon29.webm", "lesbian/lesdom/strapon/t_strapon3.webm", "lesbian/lesdom/strapon/t_strapon30.webm", "lesbian/lesdom/strapon/t_strapon7.webm"]}}