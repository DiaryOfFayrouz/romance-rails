const imgMap = {
    "fr": { ext: "png", subliminals: [] }, "uk": { ext: "png", subliminals: [] }, "female/free/4": { ext: "gif", subliminals: [] }, "hypno/fem/shorten": { ext: "sh", subliminals: [] }, "hypno/iq/shorten": { ext: "sh", subliminals: [] }, "place/afternoon": { ext: "jpg", subliminals: [] }, "place/bedroom": { ext: "png", subliminals: [] }, "place/car": { ext: "jpg", subliminals: [] }, "place/clinic": { ext: "jpg", subliminals: [] }, "place/contract": { ext: "jpg", subliminals: [] }, "place/hall": { ext: "jpg", subliminals: [] }, "place/hospital": { ext: "jpg", subliminals: [] }, "place/library": { ext: "jpg", subliminals: [] }, "place/loanshark": { ext: "png", subliminals: [] }, "place/mortimer": { ext: "jpg", subliminals: [] }, "place/noon": { ext: "jpg", subliminals: [] }, "place/nurse": { ext: "jpg", subliminals: [] }, "place/pray": { ext: "gif", subliminals: [] }, "place/pray2": { ext: "gif", subliminals: [] }, "place/receptionist": { ext: "jpg", subliminals: [] }, "place/sun": { ext: "jpg", subliminals: [] },
}
const getPropByPath = (object, path, defaultValue) => {
    const _path = Array.isArray(path)
        ? path
        : path.split('.');
    if (object && _path.length) return getPropByPath(object[_path.shift()], _path, defaultValue);
    return object === undefined ? defaultValue : object;
};

window.pickImgNumber = (min, max, key) => {
    let counter = 0;
    let val = randInt(min, max);
    let img = key + val;

    while (counter < 4 * max && SugarCube.State.variables.imgseen[img]) {
        counter += 1;
        val = randInt(min, max)
        img = key + val
    }
    SugarCube.State.variables.imgseen[img] = true;
    return val
}

window.pickImg = (imgs) => {
    let counter = 0;
    let img = randChoice(imgs);

    while (counter < 4 * max && SugarCube.State.variables.imgseen[img]) {
        counter += 1;
        img = randChoice(imgs);
    }

    SugarCube.State.variables.imgseen[img] = true;
    return img
}
SugarCube.State.variables.hypnoTextInterval = null;
SugarCube.State.variables.hypnoTextCounter = 0;

const updateText = (id, choices) => {
    SugarCube.State.variables.hypnoTextCounter = (SugarCube.State.variables.hypnoTextCounter + 1) % choices.length;
    if (document.getElementById(id)) {
        if (!SugarCube.State.variables.hypnoTextInterval) {
            SugarCube.State.variables.hypnoTextInterval = setInterval(() => updateText(id, choices), 1000);
        }
        $('#' + id).attr('subliminal', choices[SugarCube.State.variables.hypnoTextCounter]);
    }
    else {
        if (SugarCube.State.variables.hypnoTextInterval) {
            clearInterval(SugarCube.State.variables.hypnoTextInterval);
            SugarCube.State.variables.hypnoTextInterval = null;
            SugarCube.State.variables.hypnoTextCounter = 0;
        }
    }
}

SugarCube.Macro.add('pinkvid', {
    handler: function () {
        let key = this.args[0];
        let id = this.args[1];
        let suffix = '';
        if (this.args.length > 2) {
            suffix = this.args[2];
        }
        let ext = 'webm'
        let choices = [''];
        if (imgMap[key + suffix + id]) {
            ext = imgMap[key + suffix + id].ext;
            choices = imgMap[key + suffix + id].subliminals;
        }
        let htmlid = (key + suffix + id).replaceAll('/', '_');
        if (!ext) { ext = 'webm'; }
        if (!choices || choices == []) { choices = [''] }
        let text = `<div class="tinted-video" subliminal="" id="${htmlid}"><video width="720" autoplay muted preload="auto" loop src="img/${key}${suffix}${id}.${ext}"></video></div>`;

        jQuery(`<span></span>`)
            .wiki(text)
            .appendTo(this.output)

        jQuery('#' + htmlid).ready(function () { updateText(htmlid, choices) });
    }
})

SugarCube.Macro.add('pinkvids', {
    handler: function () {
        let key1 = this.args[0];
        let id1 = this.args[1];
        let suffix1 = '';
        if (this.args.length > 2) {
            suffix1 = this.args[2];
        }
        let ext1 = 'webm'
        let choices1 = [''];
        if (imgMap[key1 + suffix1 + id1]) {
            ext1 = imgMap[key1 + suffix1 + id1].ext;
            choices1 = imgMap[key1 + suffix1 + id1].subliminals;
        }
        let htmlid1 = (key1 + suffix1 + id1).replaceAll('/', '_');
        if (!ext1) { ext1 = 'webm'; }
        if (!choices1 || choices1 == []) { choices1 = [''] }

        let key2 = this.args[3];
        let id2 = this.args[4];
        let suffix2 = '';
        if (this.args.length > 5) {
            suffix2 = this.args[5];
        }
        let ext2 = 'webm'
        let choices2 = [''];
        if (imgMap[key2 + suffix2 + id2]) {
            ext2 = imgMap[key2 + suffix2 + id2].ext;
            choices2 = imgMap[key2 + suffix2 + id2].subliminals;
        }
        let htmlid2 = (key2 + suffix2 + id2).replaceAll('/', '_');
        if (!ext2) { ext2 = 'webm'; }
        if (!choices2 || choices2 == []) { choices2 = [''] }


        let text = `<div style="position: relative; height: 450px"><span style="position: absolute; left: 0; top: 0; opacity: 100%"><div class="tinted-video" subliminal="" id="${htmlid1}"><video width="720" autoplay muted preload="auto" loop src="img/${key1}${suffix1}${id1}.${ext1}"></video></div></span><span style="position: absolute; left: 0; top: 0; opacity: 20%"><div class="tinted-video" subliminal="" id="${htmlid2}"><video width="720" autoplay muted preload="auto" loop src="img/${key2}${suffix2}${id2}.${ext2}"></video></div></span></div>`;

        jQuery(`<span></span>`)
            .wiki(text)
            .appendTo(this.output)

        jQuery('#' + htmlid1).ready(function () { updateText(htmlid1, choices1) });
        jQuery('#' + htmlid2).ready(function () { updateText(htmlid2, choices2) });
    }
})

SugarCube.Macro.add('vid', {
    handler: function () {
        let key = this.args[0];
        let id = this.args[1];
        let suffix = '';
        if (this.args.length > 2) {
            suffix = this.args[2];
        }
        let ext = 'webm'
        let choices = [''];
        if (imgMap[key + suffix + id]) {
            ext = imgMap[key + suffix + id].ext;
            choices = imgMap[key + suffix + id].subliminals;
        }
        let htmlid = (key + suffix + id).replaceAll('/', '_');
        if (!ext) { ext = 'webm'; }
        if (!choices || choices == []) { choices = [''] }
        let text = `<video width="720" autoplay muted preload="auto" loop src="img/${key}${suffix}${id}.${ext}"></video>`;

        jQuery(`<div></div>`)
            .wiki(text)
            .appendTo(this.output)
    }
})

SugarCube.Macro.add('workOptions', {
    handler: function () {
        let workoptions = ['cafe', 'bar', 'femme', 'stupid', 'slut'];
        let clients = ['subblack', 'atlove', 'chaserlove'];
        let clients2 = ['richcount', 'scientist', 'gloryholecount', 'internvisits'];
        workoptions = workoptions.concat([], clients.reduce((acc, c) => {
            if (SugarCube.State.variables[c] >= 25) {
                acc.push(c)
            }
            return acc
        }, []), clients2.reduce((acc, c) => {
            if (SugarCube.State.variables[c] >= 6) {
                acc.push(c)
            }
            return acc
        }, []));
        console.log(workoptions);

        SugarCube.State.variables.workreq = workoptions[randInt(0, workoptions.length - 1)];
        if (SugarCube.State.variables.loyalty >= 99 && SugarCube.State.variables.penis > 0) {
            SugarCube.State.variables.workreq = 'femme';
        }

        if (SugarCube.State.variables.workreq == "cafe") {
            SugarCube.State.variables.workmsg = "I want you to work at the cafe today."
        }
        else if (SugarCube.State.variables.workreq == "bar") {
            SugarCube.State.variables.workmsg = "I want you to work at the bar today."

        }
        else if (SugarCube.State.variables.workreq == "femme") {
            SugarCube.State.variables.workmsg = "I want you to work on your femininity. Go to HR or the clinic today and get treated."
            if (SugarCube.State.variables.loyalty >= 99) {
                SugarCube.State.variables.workmsg += " I expect you to do this as soon as possible.";
                if (SugarCube.State.variables.penis > 0) {
                    SugarCube.State.variables.workmsg += " Continue to do this until you you have a pussy for me.";
                }
            }

        }
        else if (SugarCube.State.variables.workreq == "stupid") {
            SugarCube.State.variables.workmsg = "You're too smart for my liking. Go to HR today and get treated."

        }
        else if (SugarCube.State.variables.workreq == "slut") {
            SugarCube.State.variables.workmsg = "I want you sluttier. Go to HR today and get treated."

        } else if (SugarCube.State.variables.workreq == "subblack") {
            SugarCube.State.variables.workmsg = "The gangster's been asking for you. Make sure you visit him tonight."

        } else if (SugarCube.State.variables.workreq == "atlove") {
            SugarCube.State.variables.workmsg = "The athletes's been asking for you. Make sure you visit him tonight."

        } else if (SugarCube.State.variables.workreq == "chaserlove") {
            SugarCube.State.variables.workmsg = "The chaser's been asking for you. Make sure you visit him tonight"

        } else if (SugarCube.State.variables.workreq == "richcount") {
            SugarCube.State.variables.workmsg = "The rich man's been asking for you. Make sure you visit him tonight"

        } else if (SugarCube.State.variables.workreq == "scientist") {
            SugarCube.State.variables.workmsg = "The scientist's been asking for you. Make sure you visit him tonight"

        } else if (SugarCube.State.variables.workreq == "gloryholecount") {
            SugarCube.State.variables.workmsg = "I heard you've been quite popular at the gloryhole. I want you to go there this afternoon."

        } else if (SugarCube.State.variables.workreq == "internvisits") {
            SugarCube.State.variables.workmsg = "The intern's been asking for you. Make sure you visit him tonight"

        } else {
            SugarCube.State.variables.workreq = "none";
            SugarCube.State.variables.workmsg = "It is a bright and sunny morning on day $days working for Mr. Smith. What should you do to start the day?"
        }

        let text = `<span style="color: yellow">You've got a message from Mr. Smith.</span> "${SugarCube.State.variables.workmsg}"`
        jQuery(`<div></div>`)
            .wiki(text)
            .appendTo(this.output)
    }
})

/*
Freedom
Disloyal
Loyal
Ditz
Debt
Slut
Althlete
Gangster
RichMan
Chaser
Scientist
Surgery

*/

SugarCube.setup.setLocal = function (key, val) {
    let debtStr = window.localStorage.getItem('risingDebt');
    let debtData;
    if (!debtStr) {
        debtData = {};
    }
    else {
        debtData = JSON.parse(debtStr);
    }
    debtData[key] = val;
    window.localStorage.setItem('risingDebt', JSON.stringify(debtData));
}

SugarCube.setup.getLocal = function (key, d) {
    let debtStr = window.localStorage.getItem('risingDebt');
    let debtData;
    if (!debtStr) {
        debtData = {};
    }
    else {
        debtData = JSON.parse(debtStr);
    }
    if (!key || !debtData[key]) {
        return d
    }
    return debtData[key];
}


SugarCube.setup.getProgress = () => {
    let iq = SugarCube.State.variables.iq;
    let speed = SugarCube.State.variables.machinespeed;
    let val = { s: 1, m: 3, f: 5, vf: 7 }[speed];
    let bonus = Math.max(0, Math.floor((iq - 100) / 10));
    SugarCube.State.variables.progress = val + bonus;
    SugarCube.State.variables.progressMsg = `+${val} progress gained${bonus > 0 ? `, plus +${bonus} bonus from your IQ score` : ''}.`;
    return val + bonus
}

SugarCube.Macro.add('progressBar', {
    handler: function () {
        let key = this.args[0];
        let val = SugarCube.State.variables[key];
        let cap = SugarCube.State.variables[key + 'max']
        let width = Math.max(0, Math.min((val / cap) * 100, 100));

        let text = `<<nobr>><div style="background-color: black; border: 2px solid white; width: 60vw; height: 24px; position: absolute"><div style="background-color: white; height:24px;width:${val}%; position: absolute"> </div></div><</nobr>>`

        jQuery(`<div></div>`)
            .wiki(text)
            .appendTo(this.output)
    }
})

/*
Spermogenesis Serum
Tincture of Libido
Subliminal Linking
Brain Overloading
Enlengthening Machine
VR/AR
*/

SugarCube.State.variables.researchmax = SugarCube.setup.getLocal("researchmax", 100);

SugarCube.State.variables.researchRewards = SugarCube.setup.getLocal('researchRewards', {
    libido: {
        name: "Essence of Libido",
        claimed: false,
        active: false,
        requirements: null,
        description: "Drastically spikes the libido of individuals who consume it, causing them to be more willing and interested in sexual acts than they would be otherwise. Can be used in drinks in the cafe or the bar to reduce the promiscuity requirement for scenes.",
        purchase: `You drink the serum the professor hands you and sit patiently in the chair, waiting for the result. "I tried to give you a small dose since I've had some issues with it in testing so far. I hope it wasn't too small...feeling anything?"

"Nope," you reply.

"Hmm. I'm going to go use the restroom, I'll be right back."

<video width="720" autoplay muted loop  src="img/science/libido/1.webm"/>

Although you don't remember what happened next, security footage later showed you suddenly breaking out into a sweat, tearing off your clothes, and running out of the room. Another camera caught you fucking the janitor in the supply closet; presumably he was the first person you came in contact with.

All things considered, the experiment was a success.`,

    },
    cum: {
        name: "Spermomorphic Serum",
        claimed: false,
        active: false,
        requirements: "libido",
        description: "After a few hours, increases the amount of semen produced during ejaculation and thusly increases urge to orgasm. Also drastically improves taste and smell, causing a spike in arousal. Some side effects remain to be documented. Can be used in drinks in the cafe or the bar.",
        purchase: `<i>Several hours after the professor took the serum</i>

"Now don't worry, the frequency of orgasm and the amount of ejaculate was abnormally high in this case. In actual use, the serum will be much more dilute. I must have gotten the ratios wrong this time, but trust me I will conduct some more research before sharing this with our guests." 

<video width="720" autoplay muted loop  src="img/science/cum/scientist.webm"/>

You barely heard the professor, moaning as you masturbate, your face competely glazed with his cum. "I'll take that as approval of the formula. I trust your discretion as to when and where to use it. I can only manufacture a certain amount per day, and it doesn't have a long shelf life, so be mindful." You orgasm again, your head nodding in either assent or mindless bliss. "Very well then...I'll leave you alone to clean up. See you soon I suppose."`,

    },
    subliminal: {
        name: "Subliminal Linking",
        claimed: false,
        active: false,
        requirements: null,
        description: "Incorporates machines into your HR trainings to create a subconscious association. When you do research with the professor, you'll re-experience the last training you took.",
        purchase: `"So wait, why would I want to do this again?"

"First of all, I thought you'd appreciate the progress I've made in enhancing Mr. Smith's training program," Professor Mort replied, a little miffed by your dismissiveness. "Secondly, I'm sure you've noticed that sometimes you need to...adjust yourself to suit the needs of your other clients. This will just make it a little easier to do so."

"I'm going to end up really stupid aren't I."

"Please don't, it will slow down our progress."`,

    },
    overload: {
        name: "Hypnotic Overloading",
        claimed: false,
        active: false,
        requirements: 'subliminal',
        description: "Incorporates machines into your HR trainings to further remove conscious resistance. Whenever you do an HR training, you'll double the effect at the cost of IQ.",
        purchase: `"Ok, now I'm really confused, why on earth would I want to do this?"

"You really don't have any respect for my work do you?" Professor Mort replied sarcastically. "As we established, sometimes you need to...adjust yourself to suit the needs of your other clients. This will just make it a little easier to do so with some...side effects."

"I'm going to end up really, REALLY stupid aren't I."

"...let me contact the library and see about hiring a more competent tutor."`,

    },
    lengthen: {
        name: "Penile Reenrichment",
        claimed: false,
        active: false,
        requirements: null,
        description: "Provides the opportunity to lengthen one's penis using incredibly high tech machinery.",
        purchase: `"It's just a penis pump," you say as you look skeptically at the professor's newest invention.

"It is a vacuum device more tuned to the male member than any other ever devised; guaranteed to increase your length and girth from any starting length."

"Penis pumps don't actually work, you can't fool me." Sighing, the professor pulls down his pants to show you his large bulge. 

"Is that sufficient proof? Wait...what are you doing?" 
<video width="720" autoplay muted loop  src="img/science/lengthen/scientist1.webm"/>

As if in a trance, you pull down his underwear and marvel at his enhanced cock, then take it into your mouth. 

"Testing it out professor," you say with a sly grin. He gives you an intense look of hunger that you've never seen from him before. 

"I have no objection to...continuing this data collection."

<video width="720" autoplay muted loop  src="img/science/lengthen/scientist2.webm"/>`,

    },
});

SugarCube.setup.allResearch = () => {
    for (let k of Object.keys(SugarCube.State.variables.researchRewards)) {
        SugarCube.State.variables.researchRewards[k].claimed = true
    }
}

SugarCube.Macro.add('researchRewards', {
    handler: function () {
        const rewards = SugarCube.State.variables.researchRewards;

        let val = SugarCube.State.variables.research;
        let cap = SugarCube.State.variables.researchmax;
        let text = ``;
        for (let k of Object.keys(SugarCube.State.variables.researchRewards)) {
            let r = SugarCube.State.variables.researchRewards[k];
            if (r.requirements && !SugarCube.State.variables.researchRewards[r.requirements].claimed) {
                text += `<div>You cannot purchase ${r.name}</div><hr/>`
            }
            else if (r.claimed) {
                text += `<div>You already purchased ${r.name}.</div><hr/>`
            }
            else {
                text += `<div><<link "Purchase ${r.name}">><<set $purchased to "${k}">><<set $research to 0>><<goto [[ResearchPurchase]]>><</link>></div>`
                text += `<div>${r.description}</div><hr/>`
            }
        }


        jQuery(`<div></div>`)
            .wiki(text)
            .appendTo(this.output)
    }
})

SugarCube.Macro.add('researchPurchase', {
    handler: function () {
        let key = SugarCube.State.variables.purchased;
        SugarCube.State.variables.researchRewards[key].claimed = true;
        SugarCube.setup.setLocal('researchRewards', SugarCube.State.variables.researchRewards);

        let val = SugarCube.State.variables.researchRewards[key];

        let text = `<div>${val.purchase}</div>`;

        jQuery(`<div></div>`)
            .wiki(text)
            .appendTo(this.output)
    }
})

SugarCube.Macro.add('sidebar', {
    handler: function () {
        let text = `<b>Stats</b>
Debt: $money
Loyalty: $loyalty
Femininity: $fem 
<<if $penis > 0 >> Penis: <<print $penis>> inches <<endif>> <<if $penis == 0 >> <e style="color:#fb64ed;">You have a Pussy!</e> <<endif>>
Promiscuity: $promiscuity
IQ: $iq
D/s status: ${displayDS(SugarCube.State.variables.domsub)}

<hr/>

[[Endings]]
[[Tasks]]

[[Tips]]`

        jQuery(`<div></div>`)
            .wiki(text)
            .appendTo(this.output)
    }
});

SugarCube.Macro.add('scienceSettings', {
    handler: function () {
        let anycomplete = Object.keys(SugarCube.State.variables.researchRewards).reduce((acc, c) => { return acc || SugarCube.State.variables.researchRewards[c].claimed }, false);
        let text = ``;
        if (anycomplete) {
            text += `<div>
			<span class="scienceButton"><<click "Science!">><<toggleclass "#sciSettings" "hideme">><</click>></span>
<div id="sciSettings" class="hideme">`

            if (SugarCube.State.variables.researchRewards.cum.claimed) {
                text += `<label><<radiobutton "$cafePotion" "cum" autocheck>> Add ${SugarCube.State.variables.researchRewards.cum.name} to cafe drinks</label><br/>`
            }
            if (SugarCube.State.variables.researchRewards.libido.claimed) {
                text += `<label><<radiobutton "$cafePotion" "libido" autocheck>> Add ${SugarCube.State.variables.researchRewards.libido.name} to cafe drinks</label><br/>`
            }
            if (SugarCube.State.variables.researchRewards.libido.claimed || SugarCube.State.variables.researchRewards.cum.claimed) {
                text += `<label><<radiobutton "$cafePotion" "none" autocheck>> Don't spike the cafe drinks</label><hr/>`
            }

            if (SugarCube.State.variables.researchRewards.cum.claimed) {
                text += `<label><<radiobutton "$barPotion" "cum" autocheck>> Add ${SugarCube.State.variables.researchRewards.cum.name} to bar drinks</label><br/>`
            }
            if (SugarCube.State.variables.researchRewards.libido.claimed) {
                text += `<label><<radiobutton "$barPotion" "libido" autocheck>> Add ${SugarCube.State.variables.researchRewards.libido.name} to bar drinks</label><br/>`
            }
            if (SugarCube.State.variables.researchRewards.libido.claimed || SugarCube.State.variables.researchRewards.cum.claimed) {
                text += `<label><<radiobutton "$barPotion" "none" autocheck>> Don't spike the bar drinks</label><hr/>`
            }

            if (SugarCube.State.variables.researchRewards.overload.claimed) {
                text += `<label><<radiobutton "$machineHypno" "overload" autocheck>> Use machines to intensify hypno sessions</label><br/>`
            }
            if (SugarCube.State.variables.researchRewards.subliminal.claimed) {
                text += `<label><<radiobutton "$machineHypno" "subliminal" autocheck>> Use machines to create subliminal links during hypno sessions</label><br/>`
            }
            if (SugarCube.State.variables.researchRewards.overload.claimed || SugarCube.State.variables.researchRewards.subliminal.claimed) {
                text += `<label><<radiobutton "$machineHypno" "none" autocheck>> Don't use machines in hypno sessions</label><hr/>`
            }

            text += `</div>
</div>
`
        }

        jQuery(`<div></div>`)
            .wiki(text)
            .appendTo(this.output)
    }
});

SugarCube.Macro.add('keycontrol', {
    tags: null,
    handler: function () {
        let num = this.args[0];
        let glyph = `${num}`;
        let code = `Digit${glyph}`
        if (typeof num == 'string') {
            num = num.charCodeAt(0) - 48;
            code = `Key${glyph}`
        }
        let id = `keycontrol_${glyph}${Date.now()}`;
        let text = `<<if $keycontrols>><span style="color: yellow">(${glyph})</span> <</if>>${this.payload[0].contents}`

        jQuery(`<span id="${id}"></span>`)
            .wiki(text)
            .appendTo(this.output)

        if (!SugarCube.State || SugarCube.State.variables.keycontrols) {
            $(document).keyup(function (e) {
                if (e.code == code || e.keyCode == num + 48) {
                    $('#' + id + ' > a').trigger("click");
                }
            });
        }
    }
});

window.maxOut = function () {

    SugarCube.State.variables.money = 10000;
    SugarCube.State.variables.fem = 75;
    SugarCube.State.variables.penis = 5;
    SugarCube.State.variables.promiscuity = 75;
    SugarCube.State.variables.interest = 12;
    SugarCube.State.variables.iq = 75;
    SugarCube.State.variables.subblack = 75;
    SugarCube.State.variables.gangnumber = true;
    SugarCube.State.variables.richcount = 7;
    SugarCube.State.variables.atlove = 75;
    SugarCube.State.variables.chaserlove = 75;
    SugarCube.State.variables.chasernumber = true;
    SugarCube.State.variables.internvisits = 7;
    SugarCube.State.variables.freeuse = 3;
    SugarCube.State.variables.scientist = 7;
    SugarCube.State.variables.gloryholecount = 7;
}

SugarCube.Macro.add('vidgrid', {
    handler: function () {
        let key = this.args[0];
        let start = this.args[1];
        let end = this.args[2];
        let count = end-start;

        let ext = 'webm'
        if (!ext) { ext = 'webm'; }
        let text = ``;
        if(count == 4){
            text = `<<nobr>><div style="position: relative; display: block; width: 720px; height: 480px">
            <div style="position: absolute; top: 0; left: 0; display: block"><video width="360" height="240" style="object-fit: fill;" autoplay muted preload="auto" loop src="img/${key}${start}.${ext}"></video></div>
            <div style="position: absolute; top: 0; left: 360px; display: block"><video width="360" height="240" style="object-fit: fill;" autoplay muted preload="auto" loop src="img/${key}${start+1}.${ext}"></video></div>
            <div style="position: absolute; top: 240px; left: 0; display: block"><video width="360" height="240" style="object-fit: fill;" autoplay muted preload="auto" loop src="img/${key}${start+2}.${ext}"></video></div>
            <div style="position: absolute; top: 240px; left: 360px; display: block"><video width="360" height="240" style="object-fit: fill;" autoplay muted preload="auto" loop src="img/${key}${start+3}.${ext}"></video></div>
            </div><</nobr>>`;
        } 

        jQuery(`<div></div>`)
            .wiki(text)
            .appendTo(this.output)
    }
})

const tasks = [
    {
        id: 'bonnie1',
        desc: "Prove you aren't Mr. Smith's bitch and meet B",
        show: ['variable|bonnieIntro|true'],
        complete: ['variable|metBonnie|true'],
        subtask: false
    },
    {
        id: 'bonnie2',
        desc: "Put in some time at the Cat Scratch Club and continue being disloyal to Mr. Smith",
        show: ['variable|metBonnie|true'],
        complete: ['variable|bonnieTasks|true'],
        subtask: false
    },
]

const showTask = (task) => {
    return task.show.reduce((s, acc) => {
        const splitshow = s.split('|')
        if(!acc){
            return acc
        }
        if(splitshow[0] == 'variable'){
            return SugarCube.State.variables[splitshow[1]].toString() == splitshow[2] && acc 
        }
        return acc
    }, true)
}

const taskCompleted = (task) => {
    return task.complete.reduce((s, acc) => {
    const splitcomplete = s.split('|')
    if(!acc){
        return acc
    }
    if(splitcomplete[0] == 'variable'){
        return SugarCube.State.variables[splitcomplete[1]].toString() == splitcomplete[2] && acc 
    }
    return acc
}, true)

}

SugarCube.Macro.add('tasks',{
    handler: function(){
        let text = `<ul>`;
        let showtasks = tasks.map((t) => {
            let show = showTask(t);

            let completed = taskCompleted(t);

            return`${t.subtask ? '' : '<br/>'}<li><input ${t.subtask ? 'style="padding-left: 16px"' : ''} type='checkbox' ${completed ? 'checked ' : ''}disabled/> ${show ? t.desc : '???????????????'}</li>`
        }).join('<br/>')
        text += `${showtasks}
        </ul>`

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})

SugarCube.Macro.add('tips',{
    handler: function(){
        let text = `<ul>
            <li>Don't be afraid to experiment with loyalty. Content may be unlocked once you reach certain thresholds, both high and low</li>
            <li>Mr. Smith will request you see certain clients that you've visited before. If you no longer fit the client's tastes, you'll disappoint them, and in doing so disappoint Mr. Smith</li>
            <li>The more submissive you are, the easier it is to stumble into an ending when seeing certain clients or other ending triggers</li>
            <li>Some clients in a certain location may have multiple endings, currently or in later versions. Upon getting their main ending, progress with them will move faster in future plays.</li>
        </ul>`;

        jQuery(`<div></div>`)
        .wiki(text)
        .appendTo(this.output)
    }
})