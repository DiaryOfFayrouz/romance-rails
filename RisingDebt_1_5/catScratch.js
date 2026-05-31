SugarCube.Macro.add('meetBonnie',{
    handler: function(){
        SugarCube.State.variables.metBonnie = true;
        let text = `As you work your shift at the bar, two skankily dressed women catch your eye. One of them catches you looking and winks at you, then gestures for you to come over. Curious, you walk over to them. 

        <img src="img/bonnie/bonnieintro.jpg" style="width: 60%">
        
        "Hey cutie, you're one of Smith's whores yeah?"
        
        "I'm one of his employees," you say, defensively. The two laugh at you.
        
        "Yeah whatever. Well, we know his people don't pay shit, so if you ever wanna make some real money and have some fun, call this number." She hands you a card labelled Cat Scratch Club with a number drawn on the back. "One of our guys will pick you up and drop you home, Mr. Smith will never know you left his little compound." You take the card hesitantly. Mr. Smith didn't seem like the kind of guy to fuck with, but if this let you pay off your debt quicker, it might be a good opportunity. 
        
        "Thanks. I'll check it out." The two ladies each lean forward and give you a big kiss on the cheek.
        
        "You're a doll. See you around." They slink past you, both giving your ass a squeeze as they go by. You're a little nervous, but intrigued by their offer. In the meantime, back to work.
        
        <<keycontrol 1>>[[Continue|Bar]]<</keycontrol>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('catScratchClub',{
    handler: function(){
        let text = `<div id="choice1">You arrive at the club, and have a choice of eclectically themed rooms with a dom already waiting for you.

        <<keycontrol 1>><<link "Go to a room with a male dom">><<replace "#choice1">><<catScratchSex "mdom">><</replace>><</link>><</keycontrol>>
        <<keycontrol 2>><<link "Go to a room with a female dom">><<replace "#choice1">><<catScratchSex "fdom">><</replace>><</link>><</keycontrol>>
        
        </div>`
        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('catScratchSex',{
    handler: function(){
        SugarCube.State.variables.domsub = Math.max(0, Math.min(100, SugarCube.State.variables.domsub-5));
        let subtype = SugarCube.State.variables.penis > 0 ? 'transsub' : 'femsub';
        let domtype = this.args[0];
        let src = randChoice(lesbianImageLists[subtype][domtype]);
        let text = `You are brutally punished, humiliated, used, and generally tormented for what feels like hours.

        <video width="720" autoplay muted preload="auto" loop src="img/${src}"></video>
        
        Yet after your ${domtype == 'mdom' ? 'master' : 'mistress'} for the evening dismisses you and you head home, you begin to miss the sensations, and start to look forward to your next session. Something about the degrading treatment just feels so...right.
        
        Money +300, Loyalty -1 <<set $money += 300>><<set $loyalty -= 1>>
        
        <<keycontrol 1>>[[Continue|Tally]]<</keycontrol>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
}) 