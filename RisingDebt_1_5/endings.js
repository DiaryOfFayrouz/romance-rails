SugarCube.Macro.add('venusRegularEnding',{
    handler: function(){
        let id = SugarCube.State.variables.venusRegularSelected;
        let text = `<<${id}Ending>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})


SugarCube.Macro.add('venusRegularsEndingIntro',{
    handler: function(){
        let id = SugarCube.State.variables.venusRegularSelected;
        let name = SugarCube.State.variables.people[id].name;
        let error = false;
        let text = `You sit on the bed next to ${name} and put your hand on her leg. "What's up?"
        
        `;
        if(id == 'abella'){
            text += `"I'll cut to the chase. I love fucking around and I really enjoy our time together. I don't know what I want in a relationship, but I know I want someone who gets me and doesn't expect anything super romantic. I like fucking girls, but I prefer to date men, it's like they balance me out or something. Most guys don't like me sleeping with other guys though, and that's a dealbreaker for me." She puts her hand on your chest and looks into your eyes.
            
            "I know your deal here, and I don't want you to feel stuck here. I'm willing to pay off the rest of your debt and get you your male body back if you want to give a relationship with me a shot. What do you say?"`
        } else if(id == 'ana'){
            text += `She looks you up and down with an appraising eye, as if it were the first time she was looking at you. Then she matches your eyes with resolve in her eyes.
            
            "So, it hasn't really come up, but I work at a high paying office job, and I've been under a lot of stress lately. You've been a wonderful source of stress relief so far, and I want to take it further. I'd like to buy out your debt from Mr. Smith and hire you as my secretary so I can get some relief whenever I desire. I'll even find an apartment for you to stay in while you get on your feet. How does that sound?`

        } else if(id == 'angela'){
            text += `Bianca seems extremely nervous and stares at the floor for a while. You give her leg a reassuring squeeze, and she actually starts to blush. You wait patiently as she gathers her courage.
            
            "I feel really stupid for saying this but...I think I'm falling for you. I know it's just work for you, but I feel safe around you and really happy every time I see you. I'm bi, but I think I'm homoromantic. My relationships with men just never work out and I want to try dating a woman for the first time." You don't really know what to say.
            
            "I know your situation here and I know you won't be able to see me outside of the Lounge, so I've saved up some money and can work out something with Mr. Smith about your debt. You can even live with me if you want, till you get stable I mean. If you want," she stammers. "So yeah, um. Will you go out with me?"`
            
        } else if(id == 'asa'){
            text += `"I'll make this quick. You're a good lay and I want you around so I can fuck you more conveniently. I'll be your sugar momma. I'll get out out of this place cause I don't want you to be tied down here, and I'll get you an apartment. So long as you keep making me happy, I'll keep you around. Sound good?"`
            
        } else if(id == 'aj'){
            text += `She hesitates for a moment, then blurts out "Move in with me." It takes you a second to process this.
            
            "Wait what?"
            
            "I know this sounds crazy, but I want you to be my roommate. I have a really nice place but I keep losing roommates because..." Katie blushes a little with embarassment. "Well I have a really high libido and I keep trying to sleep with my roommates, and then it always gets weird. But like, we're already screwing so it won't be as weird, and I can tell you have a good heart." You aren't sure if this is true, but you let her continue. 
            
            "I talked to the owner of the Venus Lounge, who talked to the guy who runs the building, and they agreed that you could move in with me as long as you keep working here. I don't know if this is ideal for you, and I understand if you don't feel comfortable with it, but I just had to ask. So um, yeah. I feel stupid just for asking, but I always follow my gut, and I think you'd be a good roomie. So, what do you think?" `
            
        } else {
            text += `404, ending not found. Something went wrong`
            error = true;
        }

        text +=`
        
        <<keycontrol 1>>[["I need to sleep on it"|Evening]]<</keycontrol>>
        <<if !${error}>><<keycontrol 2>>[["I'll do it"|VenusRegularEnding]]<</keycontrol>><</if>>`


        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('abellaEnding',{
    handler: function(){
        let text = `There's a bit of time before you move in together. Mr. Smith wanted to charge an exorbitant amount to fully restore your masculinity, but Bella's feminine wiles were too much for even him to resist, and he knocked down the price significantly. 

        <<vid "venusRegulars/abella/endings/endings" 1>>
        
        You weren't sure what to expect when you moved in with Bella as her anchor partner, or "Her number one harem slut" as she liked to put it. However it was surprisingly pleasant. Despite knowing your history, she took things very slowly and made sure you cemented your new relationship, both romantically, or at least what Bella's style of romantic entailed, and sexually, holding off on seeing other partners for a while.

        <<vid "venusRegulars/abella/endings/endings" 2>>

        <<vid "venusRegulars/abella/endings/endings" 3>>

        She ramped things up gradually, bringing over friends to fuck you and warm you up to group sex, despite your assurances that you didn't mind whatsoever.
        
        <<vid "venusRegulars/abella/endings/endings" 4>>

        <<vid "venusRegulars/abella/endings/endings" 5>>

        <<vid "venusRegulars/abella/endings/endings" 6>>

        Before long you are double dogging her with men you'd never met and hosting orgies every other week.

        <<vid "venusRegulars/abella/endings/endings" 7>>

        <<vid "venusRegulars/abella/endings/endings" 8>>

        <<vid "venusRegulars/abella/endings/endings" 9>>
        
        Sometimes you choose the polyam life, sometimes it chooses you. 

        End: Anchor Partner (You moved in with a Venus Lounge regular)

        <<set $fem to 0>><<set $penis to 6>>
        <<if $promiscuity < 100>><<set $promiscuity to 100>><<endif>>
        <<script>>SugarCube.setup.setLocal('abella', true)<</script>>
        `;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('anaEnding',{
    handler: function(){
        let text = `You're somewhat surprised that your secretarial position with Naomi did actually involve secretary work. For a few days you almost feel tricked as you go through boring workplace training. Thankfully, after training finished the office work because much lighter and your tasks shifted more towards your skillset.
        
        <<vid "venusRegulars/ana/endings/endings" 1>>

        <<vid "venusRegulars/ana/endings/endings" 2>>

        At first you stay in a cute little apartment provided by Naomi, but she soon has you move into her guest room so you can "help her relax" whenever she desires.

        <<vid "venusRegulars/ana/endings/endings" 3>>

        Thankfully, she's not a selfish lover, and gives as good as she gets. 

        <<vid "venusRegulars/ana/endings/endings" 4>>

        She even takes you to her favorite spa so you can get some R&R as well in the form of a fantastic massage...

        <<vid "venusRegulars/ana/endings/endings" 5>>

        ...complete with happy ending, of course.

        <<vid "venusRegulars/ana/endings/endings" 6>>

        <<vid "venusRegulars/ana/endings/endings" 7>>

        While it does feel a little weird being in an office 9 to 5 after all you've been through, the regularity definitely beats being under Mr. Smith's thumb. You definitely feel like you lucked out here. 

        End: Secretary (You work for a Venus Lounge regular)

        <<set $penis to 0>>
        <<script>>SugarCube.setup.setLocal('ana', true)<</script>>
        `;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('angelaEnding',{
    handler: function(){
        let text = `You had half assume that Bianca was just temporarily crushing on you and that your relationship would continue being mostly sexual until it inevitably fell apart, but she seems genuinely interested in taking things slow and getting to know you better. You don't even have sex for the first week. She takes you on a vacation and you just spent the time talking and getting to know each other better.
        
        <<vid "venusRegulars/angela/endings/endings" 1>>

        Once you moved into her place, you figured you'd start fucking, but the dry spell continues and you are constantly distracted and turned on by her teasing body

        <<vid "venusRegulars/angela/endings/endings" 2>>

        Finally, one night as you watch TV idly, you hear a strange sound from the bedroom. You walk in to find Bianca masturbating furiously and crying out your name as she cums. 

        <<vid "venusRegulars/angela/endings/endings" 3>>

        This was the turning point; from that moment on you fucked vigorously whenever you had the opportunity

        <<vid "venusRegulars/angela/endings/endings" 4>>

        Your relationship continued to blossom, until one day she approaches you with a nervous look on her face.

        <<linkappend '"Are you ok?"'>>
        
        She pauses, as if not sure where to begin, then gives you an unexpected hug.

        "I love you."

        "I love you too Bianca. What's on your mind?"

        She looks at the floor awkwardly.

        "So like I told you, I'm bi but I'm definitely homoromantic. I love women, but I like sex with men."

        "I can relate," you say dryly, eliciting a laugh.

        "What I'm trying to say is...if you wanted to have a penis again, I wouldn't mind. I don't want to feel like I'm holding you back."

        You accepted your femininity a long time ago, but you can't deny you miss having a cock. <span id="cockChoice">How do you respond?

        <<link '"I like having a pussy"'>><<replace "#cockChoice">>
        
        "I like having a pussy." Bianca smiles at you and gives you another hug, holding you close. She whispers in your ear, "Let's celebrate your pussy then," and starts to pull down your pants.
        
        Bianca is a very generous lover. After what felt like years of serving others sexually, it felt like she constantly focuses on your body and your pleasure

        <<vid "venusRegulars/angela/endings/endings" 5>>

        <<vid "venusRegulars/angela/endings/endings" 6>>

        Though it doesn't take much persuasion to get her to accept a little loving in return. 

        <<vid "venusRegulars/angela/endings/endings" 7>>

        You didn't think it was possible but you've fallen deeply in love with your former client. When she asks, you don't hesitate to say yes.

        End: Fiance 1 (You got engaged to a Venus Lounge regular)

        <<set $penis to 0>>
        <<script>>SugarCube.setup.setLocal('angela1', true)<</script>>
        <</replace>><</link>>
        <<link '"I want to have a dick"'>><<replace "#cockChoice">>
        
        "I want to have a dick." Bianca smiles at you and gives you another hug, holding you close. She whispers in your ear, "Let's get you a cock then," and you feel a shiver down your spine. After some haggling with the doctors at Mr. Smith's clinic, you've got yourself a penis again.
        
        Bianca is a very generous lover. After what felt like years of serving others sexually, it felt like she constantly focuses on your body and your pleasure. It feels so good to have someone appreciate your feminine side.

        <<vid "venusRegulars/angela/endings/trans/trans" 1>>

        While also loving your hard cock pounding them from behind.

        <<vid "venusRegulars/angela/endings/trans/trans" 2>>

        <<vid "venusRegulars/angela/endings/trans/trans" 3>>

        Even when it's hard for you to cum, she always takes the time to make sure you get to climax whenever you want.

        <<vid "venusRegulars/angela/endings/trans/trans" 4>>

        <<vid "venusRegulars/angela/endings/trans/trans" 5>>

        You didn't think it was possible but you've fallen deeply in love with your former client. When she asks, you don't hesitate to say yes.

        End: Fiance 2 (You got engaged to a Venus Lounge regular)

        <<set $penis to 0>>
        <<script>>SugarCube.setup.setLocal('angela2', true)<</script>><</replace>><</link>></span>
        <</linkappend>>

        
        `;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('asaEnding',{
    handler: function(){
        let text = `Life as one of Kira's booty calls has its ups and downs. On the one hand, you're still turning tricks at the Venus Lounge and Mr. Smith's brothel as your primary sources of income; though at least now you're making a larger cut and can pick your hours a bit better. Your apartment is small and sparse, and sometimes you miss the routine of working for Mr. Smith rather than freelancing. On the other hand, the sex is better than it ever was before.  
        
        <<vid "venusRegulars/asa/endings/endings" 1>>

        <<vid "venusRegulars/asa/endings/endings" 2>>

        You're amazed at her flexibility and stamina, especially while she's grinding on you; scissoring is her absolute favorite position and she'll go until you're bone tired and have to tap out. 

        <<vid "venusRegulars/asa/endings/endings" 3>>

        <<vid "venusRegulars/asa/endings/endings" 4>>

        It turns out Kira is a gym bunny and works out at home in her spare time on her roof deck. She invites you to come along with her, and while you do feel yourself getting into shape it is often very...distracting to work out with her.

        <<vid "venusRegulars/asa/endings/endings" 6>>

        <<vid "venusRegulars/asa/endings/endings" 7>>

        But in the end, the results speak for themselves. 

        <<vid "venusRegulars/asa/endings/endings" 5>>

        End: Sugar Baby (You still fuck a Venus Lounge regular)

        <<set $penis to 0>>
        <<script>>SugarCube.setup.setLocal('asa', true)<</script>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('ajEnding',{
    handler: function(){
        let text = `You were a bit bemused by Katie's offer to have you be her roommate, but it's been going alright so far. You divided up chores, you haven't really gotten into any major squabbles, you're both pretty neat, and she doesn't mind you working odd hours at the brothel. Oh, and you're still constantly fucking. Katie's a big fan of the outdoors so whether it's hanging out by the pool... 
        
        <<vid "venusRegulars/aj/endings/endings" 1>>

        ...or going to a local park...

        <<vid "venusRegulars/aj/endings/endings" 2>>

        ...you're getting to experience plenty of nature. 

        One of the more frustrating things about living at Katie first was the fact that she had friends over almost every weekend, and they would stay up making noise late into the evening. Well, it was frustrating at first.

        Then you started to get invited as well.

        <<vid "venusRegulars/aj/endings/endings" 3>>

        <<vid "venusRegulars/aj/endings/endings" 4>>

        At first sex with Katie was focused on her, like you were still her whore with the purpose of pleasing her.

        <<vid "venusRegulars/aj/endings/endings" 5>>

        But over time, she started to reciprocate more and more often.

        <<vid "venusRegulars/aj/endings/endings" 6>>

        And you've even bathed together and shared some intimate moments

        <<vid "venusRegulars/aj/endings/endings" 7>>

        You're just roommates though...right?

        End: Roommate (You live with a Venus Lounge regular)

        <<set $penis to 0>>
        <<script>>SugarCube.setup.setLocal('aj', true)<</script>>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('allEndings', {
    handler: function () {
        let endings = [
            {
                key: 'freedom',
                title: 'Freedom',
                spoiler: 'Paid off your debt',
            },
            {
                key: 'loyal',
                title: 'Assistant',
                spoiler: 'Had high loyalty and a pussy',
            },
            {
                key: 'disloyal',
                title: 'Obedient',
                spoiler: 'Had zero loyalty',
            },
            {
                key: 'debt',
                title: 'Slave',
                spoiler: 'Debt got too high',
            },
            {
                key: 'ditz',
                title: 'Bimbo',
                spoiler: 'Got too dumb',
            },
            {
                key: 'slut',
                title: 'Slut',
                spoiler: 'Got too promiscuous',
            },
            {
                key: 'athlete',
                title: 'Girlfriend',
                spoiler: 'Athlete',
            },
            {
                key: 'gangster',
                title: 'Bitch',
                spoiler: 'Gangster',
            },
            {
                key: 'richman',
                title: 'Pet',
                spoiler: 'Rich Man',
            },
            {
                key: 'freeuse',
                title: 'Free Use',
                spoiler: 'Owner',
            },
            {
                key: 'chaser',
                title: 'T4T',
                spoiler: 'Chaser',
            },
            {
                key: 'scientist',
                title: 'Broken',
                spoiler: 'Scientist failure',
            },
            {
                key: 'surgery',
                title: 'Fuckdoll',
                spoiler: 'Too much surgery',
            },
            {
                key: 'madame',
                title: 'Madame',
                spoiler: 'Please lots of ladies',
            },
            {
                key: 'himbo',
                title: 'Himbo',
                spoiler: 'Please lots of ladies',
            },
            {
                key: 'abella',
                title: 'Anchor Partner',
                spoiler: 'Reach max affection with Bella',
            },
            {
                key: 'ana',
                title: 'Secretary',
                spoiler: 'Reach max affection with Naomi',
            },
            {
                key: 'angela1',
                title: 'Fiance 1',
                spoiler: 'Reach max affection with Bianca',
            },
            {
                key: 'angela2',
                title: 'Fiance 2',
                spoiler: 'Reach max affection with Bianca',
            },
            {
                key: 'asa',
                title: 'Sugar Baby',
                spoiler: 'Reach max affection with Kira',
            },
            {
                key: 'aj',
                title: 'Roommate',
                spoiler: 'Reach max affection with Katie',
            },
        ];
        let text = ``;
        let debtStr = window.localStorage.getItem('risingDebt');
        let debtData;
        if (!debtStr) {
            debtData = {};
        }
        else {
            debtData = JSON.parse(debtStr);
        }
        text += `<table>`
        for (let i = 0; i < endings.length; i++) {
            let ending = endings[i];
            let checked = debtData[ending.key] ? 'checked' : '';
            let style = debtData[ending.key] ? `style="color: yellow; min-width: 100px"` : `style="min-width: 100px"`;
            let hint = debtData[ending.key] ? `Source: ${ending.spoiler}` : `<td><<linkreplace "  Show hint: ">>Hint: ${ending.spoiler}<</linkreplace>></td>`;

            text += `<tr><td ><input type="checkbox" style="width: 18px; height: 18px" ${checked} disabled/></td><td ${style}> ${ending.title}</td>${hint}</tr>`
        }
        text += `</table>`

        jQuery(`<div></div>`)
            .wiki(text)
            .appendTo(this.output)
    }
})