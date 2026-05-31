SugarCube.Macro.add('setTiffEvent',{
    handler: function(){
        const tiffEventChance = SugarCube.State.variables.tiffEventTimer <= 1 && SugarCube.State.variables.tiffContent;
        SugarCube.State.variables.tiffEvent = null;
        if(tiffEventChance){
            SugarCube.State.variables.tiffEventTimer = randInt(3, 6);
            if(SugarCube.State.variables.metTiff){
                SugarCube.State.variables.tiffEvent = randChoice(['morningpunish', 'bar', 'brothel', 'morningselfie', 'noonselfie', 'afternoonselfie'])
            }
            else{
                SugarCube.State.variables.tiffEvent = 'meeting';
            }
        }
        else{
            SugarCube.State.variables.tiffEventTimer -= 1;
        }
        let text = ``;

        jQuery(`<span></span>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('tiffMorning',{
    handler: function(){
        let text = ``;
        if(SugarCube.State.variables.metTiff){
            text += `<<tiffPunishment>>`
        }
        else{ 
            text += `<<tiffIntroduction>>`
        }

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('tiffIntroduction',{
    handler: function(){
        SugarCube.State.variables.metTiff = true;
        let text = `You woke up this morning to an unusual sight. A very pretty woman in your room, inexplicably duct taped to a column.

        <img src="img/tiff/mummy/mummy0.jpg" style="width: 60%"/>

        "Um, good morning?" you say, hesitantly. "Who are you and why are you here?"

        "Good morning ma'am," the woman says politely. "My name is Tiffany Minx. I'm another of Mr. Smith's sluts. I was a bad girl so he sent me here to be punished."

        "I'm surprised he sent you to me. I'm not exactly dominant around here."

        "Mr. Smith said it would show me that I'm the lowest of the low if he had another of his girls punish me." Her voice trembled as she said it, but the look on her face hinted it was more from sheer arousal than from fear. "Please do what you want with me. Mr. Smith has provided you with some toys for the occasion. He even let me have a pussy today." You look over near the door. There's a box with more duct tape, a massager, a riding crop, a small taser, and a few other toys. This could be fun.

        <div id="tiffChoices"><<link "Punish the slut">><<replace "#tiffChoices">><<tiffPunish>>
        
        After you've had your fun with the orange haired harlot, you release her panting, sweaty body from its bindings. She catches her breath for a while, then sits up and smiles at you.
        
        "I know us girls aren't supposed to talk, but would you like to keep in touch? I can send you fun selfies and you can watch me fuck in the brothel," she said with a giggle.
        
        <div id="tiffChoices2"><<link "Accept her number">><<replace "#tiffChoices2">>You eagerly accept, and exchange numbers. She gives you a surprisingly chaste kiss on the cheek before heading out. Well that was an interesting start to your day. <<set $tiffContent to true>>
        
        <<keycontrol 1>>[[Continue.|Noon]]<</keycontrol>><</replace>><</link>>
        <<link "Politely decline (don't show Tiffany content)">><<replace "#tiffChoices2">>You politely decline, not wanting to go against Mr. Smith's rules. She gives you a sad look, then nods and excuses herself before leaving. What an unexpected start to your day.<<set $tiffContent to false>>
        
        <<keycontrol 1>>[[Continue.|Noon]]<</keycontrol>><</replace>><</link>></div><</replace>><</link>>
        <<link "Release her">><<replace "#tiffChoices">>You decide not to punish the strange girl you just met. After all, you're not here to play Mr. Smith's games. Instead, you start to release her from the duct tape. She looks incredibly disappointed, but gives you a little curtsy when you finish.
        
        "Thank you for your mercy ma'am," she says politely. Then she taps her fingers thoughtfully. "I know us girls aren't supposed to talk, but would you like to keep in touch? I can send you fun selfies and you can watch me fuck in the brothel," she said with a giggle.
        
        <div id="tiffChoices2"><<link "Accept her number">><<replace "#tiffChoices2">>You eagerly accept, and exchange numbers. She gives you a surprisingly chaste kiss on the cheek before heading out. Well that was an interesting start to your day. <<set $tiffContent to true>>
        
        <<keycontrol 1>>[[Continue.|Noon]]<</keycontrol>><</replace>><</link>>
        <<link "Politely decline (don't show Tiffany content)">><<replace "#tiffChoices2">>You politely decline, not wanting to go against Mr. Smith's rules. She gives you a sad look, then nods and excuses herself before leaving. What an unexpected start to your day.<<set $tiffContent to false>>
        
        <<keycontrol 1>>[[Continue.|Noon]]<</keycontrol>><</replace>><</link>></div><</replace>><</link>></div>

        `;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('tiffPunish',{
    handler: function(){
        let randNum = Math.floor(Math.random()*6)+1;

        let text = `You use all the toys at your disposal, alternating pleasure and pain until Tiffany is writhing and moaning in her merciless bondage.
        
        <video width="720" autoplay muted preload="auto" loop src="img/tiff/mummy/mummy${randNum}.mp4"></video>
        `;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('tiffPunishment',{
    handler: function(){
        let text = `Once again, you wake up to find Tiffany duct taped to a beam in your room. She gives you a wink.

        <img src="img/tiff/mummy/mummy0.jpg" style="width: 60%"/>
        
        "I was a bad girl again. Won't you please punish me?"
        <div id="tiffChoices"><<link "Punish the slut">><<replace "#tiffChoices">>
        <<tiffPunish>>
        
        After you've had your fun with the orange haired harlot, you release her panting, sweaty body from its bindings. She catches her breath for a while, then sits up and smiles at you.
        
        "Thank you ma'am for punishing this bad girl. I've learned my lesson."
        
        You sincerely doubt that.

        <<keycontrol 1>>[[Continue.|Noon]]<</keycontrol>><</replace>><</link>>
        <<link "Release her">><<replace "#tiffChoices">>You decide not to punish her today. After all, you're not here to play Mr. Smith's games. Instead, you start to release her from the duct tape. She looks incredibly disappointed, but gives you a little curtsy when you finish.
        
        "Thank you for your mercy ma'am," she says politely. I've learned my lesson."
        
        You sincerely doubt that.

        <<keycontrol 1>>[[Continue.|Noon]]<</keycontrol>>
        
        <</replace>><</link>></div>
        `;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('tiffBar',{
    handler: function(){
        let text = `You spot Tiffany slinking around the bar. Knowing her, she's trying to score free drinks and possibly a quick fuck in the bathroom. Good girl. 
        ${randChoice([`<img src="img/tiff/bar/bar1.jpg" style="width: 60%"/>`,
        `<img src="img/tiff/bar/bar2.jpg" style="width: 60%"/>`,
        `<img src="img/tiff/bar/bar3.jpg" style="width: 60%"/>`])}<hr/>`
        ;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('tiffGloryhole',{
    handler: function(){
        let text = `As you head to the gloryholes in the bathroom, you see someone leaving a stall in a hurry and zipping up his pants. As you walk past, Tiffany tucks some bills down the front of her corset and sucks her finger, giving you a hungry gaze.
        
        <img src="img/tiff/bar/gh1.jpg" style="width: 60%"/>
        
        Unfortunately, you're here today for business, not pleasure.<hr/>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('tiffBrothel',{
    handler: function(){
        let text = `<i>After meeting Tiffany for the first time, random event in the brothel. All possible pics shown</i><hr/>
        
        You spot Tiffany off in a side room, door wide open as fitting the exhibitionist slut.
        
        She's eagerly sucking off a client, clearly addicted to his cock. You get the feeling he's a regular given that he's fine with the door being open.
        
        Her locked up clitty prevents her from getting any physical satisfaction from the act but you assume she's used to the denial by now. 
        
        <video width="720" autoplay muted preload="auto" loop src="img/tiff/brothel/bj1.mp4"></video>
        
        <img src="img/tiff/brothel/bj2.jpg" style="width: 60%"/>
        
        <img src="img/tiff/brothel/bj3.jpg" style="width: 60%"/>
        
        <img src="img/tiff/brothel/bj4.jpg" style="width: 60%"/>
        
        <img src="img/tiff/brothel/bj5.jpg" style="width: 60%"/><hr/>
        
        You spot Tiffany off in a side room, door wide open as fitting the exhibitionist slut.
        
        She's eagerly deep throating a client, clearly addicted to his cock. You get the feeling he's a regular given that he's fine with the door being open.
        
        Her locked up clitty prevents her from getting any physical satisfaction from the act but you assume she's used to the denial by now. 
        
        <img src="img/tiff/brothel/dt1.jpg" style="width: 60%"/>
        
        <img src="img/tiff/brothel/dt2.jpg" style="width: 60%"/><hr/>
        
        You spot Tiffany off in a side room, door wide open as fitting the exhibitionist slut.
        
        You catch her right as he cums all over her eager face. Her locked up clitty prevents him from returning the favor, but you assume she's used to the denial by now. 
        
        <video width="720" autoplay muted preload="auto" loop src="img/tiff/brothel/cumshot1.mp4"></video>
        
        <img src="img/tiff/brothel/cumshot2.jpg" style="width: 60%"/><hr/>
        
        You spot Tiffany off in a side room, door wide open as fitting the exhibitionist slut.
        
        She's in position for some spanking, arms up and legs spread. You dearly want to beat her ass till it's bright red, but you don't think Mr. Smith would appreciate you using his girls for free, particularly when you could be making him money instead. 
        
        <img src="img/tiff/brothel/spank1.jpg" style="width: 60%"/>
        
        <img src="img/tiff/brothel/spank2.jpg" style="width: 60%"/><hr/>
        `;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('tiffSelfie',{
    handler: function(){

        let eventChoice = randChoice([
            `"hey love, miss you! Thinking about you...and me...and maybe some friends with big fat dicks ;)"

            <video width="720" autoplay muted preload="auto" loop src="img/tiff/selfies/masturbate.mp4"></video>
    
            Damnit Tiffany, now you're turned on in public. Though that was probably her intent.`,
            `"dont forget to practice your sucking dear! a cock a day keeps the gag reflex at bay!"

            ${randChoice([`<img src="img/tiff/selfies/suck1.jpg" style="width: 60%"/>`,`<img src="img/tiff/selfies/suck2.jpg" style="width: 60%"/>`,`<img src="img/tiff/selfies/suck3.jpg" style="width: 60%"/>`])}`,
            `"always remember- pastel goths are valid too. besides im so pretty in pink"
            <img src="img/tiff/selfies/outfit1.jpg" style="width: 60%"/>`,
            `"gonna surprise the HR office tomorrow! they'll never expect maid service from me. tho things might get dirty instead of clean lol"
            <img src="img/tiff/selfies/outfit2.jpg" style="width: 60%"/>`,
            `"what do u think, is purple my color?"
            <img src="img/tiff/selfies/outfit3.jpg" style="width: 60%"/>`,
            `This text had no message with it, just a video.

            <video width="720" autoplay muted preload="auto" loop src="img/tiff/selfies/hookup.mp4"></video>
    
            Damnit Tiffany, now you're turned on in public. Though that was probably her intent.`,
            `"most of my clients want my girldick locked up, but i got to have a pussy today!"
            <img src="img/tiff/selfies/client_p.jpg" style="width: 60%"/>`
        ])

        let text = `You see you've got a message from Tiffany. After making sure nobody's looking over your shoulder, you open it.
        
        ${eventChoice}

        <hr/>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})