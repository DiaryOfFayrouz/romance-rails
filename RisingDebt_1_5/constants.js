const venusRegularConst = ['abella', 'aj', 'ana', 'angela', 'asa']

if(!SugarCube.State.variables.people){
    SugarCube.State.variables.people = {
        abella: {
            id: 'abella',
            name: "Bella",
            level: 1,
            maxlevel: 6,
            exp: 0,
            src: './img/venusRegulars/abella',
            sceneCount: 49,
            endingAvailable: () => SugarCube.State.variables.people.abella.level == SugarCube.State.variables.people.abella.maxlevel
        },
        aj: {
            id: 'aj',
            name: "Katie",
            level: 1,
            maxlevel: 6,
            exp: 0,
            src: './img/venusRegulars/aj',
            sceneCount: 40,
            endingAvailable: () => SugarCube.State.variables.people.aj.level == SugarCube.State.variables.people.aj.maxlevel
        },
        ana: {
            id: 'ana',
            name: "Naomi",
            level: 1,
            maxlevel: 6,
            exp: 0,
            src: './img/venusRegulars/ana',
            sceneCount: 49,
            endingAvailable: () => SugarCube.State.variables.people.ana.level == SugarCube.State.variables.people.ana.maxlevel
        },
        angela: {
            id: 'angela',
            name: "Bianca",
            level: 1,
            maxlevel: 6,
            exp: 0,
            src: './img/venusRegulars/angela',
            sceneCount: 61,
            endingAvailable: () => SugarCube.State.variables.people.angela.level == SugarCube.State.variables.people.angela.maxlevel
        },
        asa: {
            id: 'asa',
            name: "Kira",
            level: 1,
            maxlevel: 6,
            exp: 0,
            src: './img/venusRegulars/asa',
            sceneCount: 60,
            endingAvailable: () => SugarCube.State.variables.people.asa.level == SugarCube.State.variables.people.asa.maxlevel
        },
    }
    
    let debtStr = window.localStorage.getItem('risingDebt');
    let debtData;
    if (!debtStr) {
        debtData = {};
    }
    else {
        debtData = JSON.parse(debtStr);
    }
    for(let k of Object.keys(SugarCube.State.variables.people)){
        if(debtData[k]){
            SugarCube.State.variables.people[k].level = 5
        }
    }
}