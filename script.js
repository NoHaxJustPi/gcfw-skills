// NOTE:: images are 2-25, inclusive! (1 is blank, 26 is IW orb)
let grid = document.getElementById("skillgrid")
for (let i = 0; i < 24; i++) {
    let section = document.createElement("div")
    section.classList.add('skill');
    section.id = "skill"+i
    section.innerText = " "
    section.style = `background-image: url("skill_bgs/${i+2}.png")`
    grid.appendChild(section)
} // generated 'em cause i'm lazy :>

let spells = ["Freeze", "Whiteout", "Ice Shards", "Bolt", "Beam", "Barrage"]
let spellDiv = document.getElementById("spells")
for (let i = 0; i < 6; i++) {
    spellDiv.innerHTML += `<input type="checkbox" id="${spells[i]}" value="${spells[i]}"></input>
<label for="${spells[i]}">${spells[i]}</label><br>
`
}

let rawTable, spValues;
fetch('exp-table.csv')
    .then(response => response.text())
    .then((data) => {
        rawTable = data.split("\n");
        spValues = rawTable.map((x) => +x.split(",")[0]);
    })

//Skill Points,Experience Power,Killing Power,Mana Power,Transition Wave,True Colors,Fusion,Orb of Presence,Resonance,Critical Hit,Mana Leech,Fury,Amplifiers,Traps,Seeker Sense
//[SP, EXP, KP, MP, TW], TC, Fusion, Orb, Res, Crit, Mana, Fury, Amps, Traps, SS

skill_indices = [3, 2, 1, 4, 6, 7, 18, 19, 22, 23]
function calcSkills() {
    //unary plus casts string to number
    let sp = +document.getElementById("sp_input").value
    for (let i = 0; i < 6; i++) {
        if (document.getElementById(spells[i]).checked) {
            document.getElementById("skill"+(12+i)).innerText = "50"
            sp -= 50*51/2
        }
    }
    let start = 0;
    let end = spValues.length;
    let toTest = Math.ceil((start+end)/2);
    let oldTest;
    while (!(oldTest == toTest)) { // checking if two iterations give the same "target"
        oldTest = toTest
        toTest = Math.floor((start+end)/2)
        if (spValues[toTest] > sp) {
            end = toTest
        } else if (spValues[toTest] <= sp) {
            start = toTest
        }
    }
    for (let i = 5; i < 15; i++) {
        document.getElementById("skill" + skill_indices[i-5]).innerText = rawTable[toTest].split(",")[i]
    }
}
