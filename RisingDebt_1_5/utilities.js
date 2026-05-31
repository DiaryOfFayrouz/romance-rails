function randInt(minvalue, maxvalue){
	try{
		if(!maxvalue){
			maxvalue = minvalue;
			minvalue = 0;
		}
		else if(minvalue === maxvalue){
			return minvalue
		}
		else if(maxvalue < minvalue){
			maxvalue = minvalue+1;
			minvalue = 0;
		}
		else{
		//Change to inclusive maxvalue
		maxvalue += 1;
	}
	return Math.floor(Math.random() * (maxvalue-minvalue))+minvalue;	
}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: randInt(${minvalue}, ${maxvalue})<br/>`; throw(e)}
}

function randChoice(choices){
	try{
		if(!choices || choices.length === 0){
			return undefined
		}
		return choices[randInt(choices.length)]
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: randChoice(${choices})<br/>`; throw(e)}
}

function randChoices(choices, count){
	try{
		if(count >= choices.length){
			return choices
		}
		let indices = {};
		let results = [];
		let counter = 0;
		while(Object.keys(indices).length < count && counter < 100){
			let i = randInt(choices.length);
			counter++;
			if(!indices[i]){
				let newchoice = copyObj(choices[i]);
				results.push(newchoice);
				indices[i] = true;
			}
		}
		return results
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: randChoices(${choices}, ${count})<br/>`; throw(e)}
}

const last = (list) => list[list.length-1]

const removeAtIndex = (list, i) => {
	try{
		let newlist = [].concat(list);
		newlist.splice(i, 1)
		return newlist
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: removeAtIndex(${list}, ${i})<br/>`; throw(e)}
}

const objEqual = (o1, o2, once) => {
	let areequal = true;
	if(typeof o1 != typeof o2){
		return false
	}
	if(typeof o1 === 'object' || Array.isArray(o1)){
		for(let k of Object.keys(o1)){
			if(!o2[k]){
				return false
			}
			else if(Array.isArray(o1[k])){
				if(!Array.isArray(o2[k])){
					return false
				}
				if(o1[k].length != o2[k].length){
					return false
				}
				for(let v=0; v<o1[k].length; v++){
					areequal = areequal && objEqual(o1[k][v], o2[k][v])
					if(!areequal){return false};
				}
			}
			else if(typeof o1[k] === 'object'){
				areequal = areequal && objEqual(o1[k], o2[k])
				if(!areequal){return false};
			}
			else{
				areequal = areequal && (o1[k] == o2[k])
				if(!areequal){return false};
			}
		}
		let rev = true;
		if(!once){
			rev = objEqual(o2, o1, true)
		}
		return areequal && rev
	}
	else{
		return o1 === o2
	}

}

const argIsPlayer = (args, idx) => {
	if(!idx) {idx = 0};
	if(args.length > idx && args[idx] != 'player'){
		return args[idx]
	}
	else{
		return 'player'
	}
}

const getCharFromArgs = (args, idx) => {
	let name = argIsPlayer(args, idx);
	return (name === 'player' ? SugarCube.State.variables.player : SugarCube.State.variables.opponents[name])
}

const removeObj = (list, o) => {
	return list.filter((val) => !objEqual(val, o));
	
}

const copyObj = (obj) => {
	try{
		if(obj){
			return JSON.parse(JSON.stringify(obj))
		}
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: copyObj(${obj})<br/>`; throw(e)}
}

const filterUnique = (mylist) => {
	return mylist.filter((val, i) => mylist.indexOf(val) == i)
}

const filterUniqueObjects = (mylist) => {
	try{
		let strlist = mylist.map((val) => JSON.stringify(val));
		flist = filterUnique(strlist);
		return flist.map((val) => JSON.parse(val))
	}
	catch(e){
		return mylist
	}	
}

const shuffle = (mylist) => {
	try{
		if(mylist.length === 0 || mylist.length === 1){
			return mylist
		}
		return mylist.map((a) => ({sort: Math.random(), value: a}))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value)
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: shuffle(${mylist})<br/>`; throw(e)}
}

const isBetween = (i, vals) => {
	try{
		if(!vals){
			return true
		}
		else{
			return (i >= vals[0] && i <= vals[1])
		}
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: isBetween(${i}, ${vals})<br/>`; throw(e)}
}

SugarCube.State.variables.isBetween = isBetween;

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const capitalCase = (s) => {
	try{
		return s.split('_').map((w) => capitalize(w)).join(' ')
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: capitalCase(${s})<br/>`; throw(e)}
}

const clamp = (val, min, max) => {
	return Math.min(max, Math.max(min, val))
}

const generateBody = (gender) => {
	try{
		if(!gender){
			gender = randChoice(['m', 'f'])
		}
		let body = {}
		let genderbent = Math.random() > 0.9;
		body.name = randChoice(genderedNames[gender])
		if(!genderbent && gender === 'm'){
			body.breasts = 0;
			body.penis = randChoice([2, 3, 4])
			body.pussy = 0;
			body.ass = randChoice([0, 1]);
		}

		else if(!genderbent && gender === 'f'){
			body.breasts = randChoice([1, 2, 3]);
			body.penis = 0;
			body.pussy = 1;
			body.ass = randChoice([1, 2]);
		}
		else{
			gender = randChoice(['m', 'f'])
			body.breasts = randChoice([0, 1, 2, 3]);
			body.penis = randChoice([0, 2, 3, 4])
			body.pussy = randChoice([0, 1]);
			body.ass = randChoice([0, 1, 2]);
			body.name = randChoice(genderedNames[gender])
		}

		return body
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: generateBody(${gender})<br/>`; throw(e)}
}

const displayDS = (domsub) => {
	try{
		let ratings = ['Slave', 'Very Submissive','Very Submissive', 'Submissive', 'Submissive', 'Neutral', 'Neutral', 'Neutral', 'Dominant','Dominant', 'Very Dominant','Very Dominant', 'Master'];
		let val = Math.floor(domsub/8);
		return ratings[val]
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: displayDS(${domsub})<br/>`; throw(e)}
}

const addStat = (stat, val, updatesidebar, name) => {
	try{
		let basestat = stat.replace("max", "");
		let maxstat = "max"+basestat;
		if(!name || name === 'player' || name === 'you' || name === 'You'){
			SugarCube.State.variables.player[stat]  += val;
			let maxval = SugarCube.State.variables.player[maxstat];
			
			if(avatarMapping[basestat]){
				maxval = avatarMapping[basestat].length - 1
			}
			if(SugarCube.State.variables.player[basestat] >= maxval){
				SugarCube.State.variables.player[basestat] = maxval;
			}
			if(SugarCube.State.variables.player[stat] <= 0 ||
				(stat == 'domsub' && displayDS(SugarCube.State.variables.player[stat]) === "Slave")){
				SugarCube.State.variables.player[stat] = 0;
			}
		}
	if(updatesidebar){updateSidebarFn()};
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: addStat(${stat}, ${val}, ${name}, ${updatesidebar}) <br/>`; throw(e)}
}

const updateBody = (cat, val, name, updatesidebar) => {
	try{
		let oldval, idealval;
		let idealcat = 'ideal'+cat;
		let idealskey = cat+"Ideals";
		let isPlayer;
		if(!name || name === 'player' || name === 'you' || name === 'You'){
			isPlayer = true;
			oldval = SugarCube.State.variables.player[cat]
			idealval = SugarCube.State.variables.player[idealcat]; 
			SugarCube.State.variables.player[cat] = val;
		}
		else {
			isPlayer = false;
			oldval = SugarCube.State.variables.opponents[name][cat]
			//idealval = SugarCube.State.variables.opponents[name][idealcat]
			//SugarCube.State.variables.opponents[name].idealsKnown[cat] = true
			SugarCube.State.variables.opponents[name][cat] = val;
		}
		if(updatesidebar) {updateSidebarFn()};
		/*let isIdeal = bodyIdeals[idealskey](idealval, val).ideal;
		let wasIdeal = bodyIdeals[idealskey](idealval, oldval).ideal;
		if(isIdeal && !wasIdeal){
			return "ideal"
		}
		else if(wasIdeal && !isIdeal){
			return "not_ideal"
		}
		else if(wasIdeal && isIdeal){
			return "nochange"
		}
		else {
			if((val > oldval && idealval > val) || (val < oldval && idealval < val)){
				return "better"
			}
			else{
				return "worse"
			}
		}*/
		return "nochange"
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: updateBody(${cat}, ${val}, ${name}, ${updatesidebar})<br/>`; throw(e)}
} 

const getMedia = (src, style, controls, misc) => {
	try{
		if(!misc){
			misc = '';
		}
		if(!controls){
			controls = 'autoplay muted loop preload'
		}
		if(!style){
			style = '';
		}
		if(!src){
			return `<div>Image not found!</div>`
		}
		if(src.endsWith('webm')){
			return `<video ${controls} style="${style}" class="vid" ${misc}>
			<source src="${src}" type="video/webm"></video>`
		}
		else if(src.endsWith('mp4')){
			return `<video ${controls} style="${style}" class="vid" ${misc}>
			<source src="${src}" type="video/mp4"></video>`
		}
		else{
			return `<img src="${src}" style="${style}" class="img" ${misc}/>`	
		}
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: getMedia(${src}, ${style}, ${controls})<br/>`; throw(e)}
}

const addClass = (elem, c) => {
	try{

	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: addClass(${elem}, ${c})<br/>`; throw(e)}
};

const removeClass = (elem, c) => {
	try{

	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: removeClass(${elem}, ${c})<br/>`; throw(e)}
};

const toggleClass = (elem, c) => {
	try{

	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: toggleClass(${elem}, ${c})<br/>`; throw(e)}
}

const updateSidebarFn = () => {
	try{
		jQuery('#updatesidebarlink > a').click();
	}catch(e){ SugarCube.setup.errorLog += `ERR: ${e} FILE: utilities.js FN: updateSidebarFn()<br/>`; throw(e)}
}


const genderBreakpoints = {
	"-4": "very he",
	"0": "he",
	"1": "they",
	"3": "she",
	"5": "very she"
}

const getFaceInfo = (src) => {
	if(!src || src === ''){
		return {src: null, base: '', gender: '', ranking: ''}
	}
	const face = src.split('/').pop()
	const base = face.split('_')[0]
	const gender = face.split('_')[1].split('.')[0]
	let ranking;
	if(SugarCube.setup.bimbofaces && SugarCube.setup.bimbofaces.faces.includes(face)){
		ranking = 5;
	}
	else{
		ranking = Object.keys(SugarCube.setup.faces[base]).find((f) => SugarCube.setup.faces[base][f].includes(gender))
	}
	return {src, base, gender, ranking: parseInt(ranking)}
}

const getFace = (isPlayer) => {
	if(isPlayer){
		if(facefilters.player){
			let filteredFaces = Object.keys(SugarCube.setup.faces).reduce((acc, c) => {
				if(facefilters.player.includes(c)){
					acc[c] = copyObj(SugarCube.setup.faces[c]);
				}
				return acc
			}, {})
			return randChoice(Object.keys(filteredFaces))
		}
	}
	else{
		if(facefilters.opponents){
			let filteredFaces = Object.keys(SugarCube.setup.faces).reduce((acc, c) => {
				if(facefilters.opponents.includes(c)){
					acc[c] = copyObj(SugarCube.setup.faces[c]);
				}
				return acc
			}, {})
			return randChoice(Object.keys(filteredFaces))
		}
	}
	return randChoice(Object.keys(SugarCube.setup.faces))
}

const getGenderScore = (pussy, breasts, penis) => {
	return ((pussy*3)+(breasts)-(penis)) //range -8 to 16
}

const getGenderFromScore = (femmasc) => {
	let gender;
	for(let i = -10; i<=10; i++){
			if(i<=0){
				gender = copyObj(constants.malePronouns)
			}
			if(i===1){
				gender = copyObj(constants.enbyPronouns)
			}
			if(i >=3){
				gender = copyObj(constants.femalePronouns)
			}
		if(i >= femmasc){
			break
		}	
	}
	return {gender}
}

const updateGender = (name) => {
	if(!name || name.toLowerCase() == 'you'|| name.toLowerCase() == 'player'){
		let char = copyObj(SugarCube.State.variables.player);
		let gender = {
			they: char.they,
			them: char.them,
			their: char.their,
			They: char.They,
			Them: char.Them,
			Their: char.Their,
		}
		let text = ``;

		let femmasc = getGenderScore(char.pussy, char.breasts, char.penis);
		let gendershift = '';
		
		let newgenderinfo = getGenderFromScore(femmasc);
		gender = newgenderinfo.gender;

		return text
	}
}

const getHighestFetish = (char) => {
	let fets = (char === 'you' || char === 'player') ? SugarCube.State.variables.player.fetishes : SugarCube.State.variables.opponents[char].fetishes;
	return Object.keys(fets).reduce((acc, f) => {
		if(fets[f] > acc.count){
			acc = {char: char, fetish: f, count: fets[f]}
		}
		return acc
	}, {char: char, fetish: '', count: -1})

}

const fetishRankings = (filterFn) => {
	if(!filterFn){
		filterFn = (a) => true
	}
	let rankings = [getHighestFetish('you')];
	for(let o of Object.keys(SugarCube.State.variables.opponents)){
		rankings.push(getHighestFetish(o))
	}

	return rankings.sort((a, b) => {
		if(a.count === b.count){
			if(a.fetish === 'sex_work'){
				return -1
			}
			if(b.fetish === 'sex_work'){
				return 1
			}
			return 0
		}
		return (b.count-a.count)/Math.abs(b.count-a.count)
	}).filter(a => filterFn(a));

}

const transformRankings = () => {
	let rankings = [];
	for(let c of Object.keys(SugarCube.State.variables.stats.current.transformCounts)){
		let count = SugarCube.State.variables.stats.current.transformCounts[c];
		if(c === 'player'){
			rankings.push({char: 'you', count: count})
		}
		else{
			rankings.push({char: c, count: count})
		}
	}
	if(rankings.length == 0){
		rankings = [{char: 'you', count: 0}]
	}

	return rankings.sort((a, b) => {
		if(a.count === b.count){
			return 0
		}
		return (b.count-a.count)/Math.abs(b.count-a.count)
	});

}

const getSupplyWeight = () => {
	return Object.keys(SugarCube.State.variables.player.inventory).reduce((acc, k) => {
		let item = SugarCube.State.variables.player.inventory[k];
		let weight = item.weight * item.count;
		return acc+weight
	}, 0)
}

const isEquipped = (name, removeUses) => {
	let equipped = SugarCube.State.variables.player.inventory[name] && SugarCube.State.variables.player.inventory[name].equipped;
	if(!equipped){
		return equipped
	}

	if(removeUses){
		if(removeUses == 'all'){
			removeUses = SugarCube.State.variables.player.inventory[name].uses
		}
		SugarCube.State.variables.player.inventory[name].uses -= removeUses;
		if(SugarCube.State.variables.player.inventory[name].uses < 0){
			SugarCube.State.variables.player.inventory[name].uses = 0;
		}
		if(SugarCube.State.variables.player.inventory[name].uses == 0){
			SugarCube.State.variables.player.inventory[name].equipped = false;
			SugarCube.State.variables.player.inventory[name].uses = SugarCube.State.variables.player.inventory[name].maxuses
			SugarCube.State.temporary.extraMessage = `
			<div>Your ${SugarCube.State.variables.player.inventory[name].name.toLowerCase()} crumbles into dust</div>`
			redrawPC()
		}
	}
	return equipped
}

const gainAffection = (name, amount) => {
	let {level, maxlevel, exp} = SugarCube.State.variables.people[name]
	let printName = SugarCube.State.variables.people[name].name;;
	exp += amount;
	if(exp < 0){
		exp = 0;
		level = Math.max(1, level-1);
		SugarCube.State.variables.people[name].exp = exp;
		SugarCube.State.variables.people[name].level = level;
		return `You have disappointed ${printName}. Their affection with you has gone down`
	}
	else if(exp >= level*10 && level < maxlevel){
		exp = exp-level*10;
		level = Math.min(maxlevel, level+1)
		SugarCube.State.variables.people[name].exp = exp;
		SugarCube.State.variables.people[name].level = level;
		return `You have made ${printName} very happy! Their affection with you has gone up`
	}
	else{
		SugarCube.State.variables.people[name].exp = exp;
		return ''
	}
}

const checkEnding = (ending) => {
	let debtStr = window.localStorage.getItem('risingDebt');
    let debtData;
    if (!debtStr) {
        debtData = {};
    }
    else {
        debtData = JSON.parse(debtStr);
    }
	return debtData[ending]
}