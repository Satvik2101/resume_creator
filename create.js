var fs = require('fs');

//read data from raw.json



function main() {
    var raw = JSON.parse(fs.readFileSync('raw.json', 'utf8'));
    var output = `
---
geometry: margin=0.8cm
colorlinks: true
fontsize: 10pt
pagestyle: empty

---

`;
    output += generateHeader(raw.name, raw.email, raw.phone, raw.title, raw.location, raw.links);
    output += generateEducation(raw.education);
    output += generateWorkExp(raw.workexp);
    output += generateProject(raw.projects);
    output += generateAchievements(raw.achievements);
    output += generateSkills(raw.skills);
    output += generatePors(raw.pors);
    console.log(output);
    //write to test.md
    fs.writeFileSync('test.md', output, 'utf8');
}

function generateHeader(name, email, phone, title, location, links) {
    var output = `# ${name} \\hfill \\small \\href{mailto:${email}}{${email}} ${phone}`;
    output += `\n${title}, ${location} \\hfill{}`;

    output += generateLinks(links);
    output += '\n\n';
    return output;
}

function generateEducation(education) {
    var output = `## EDUCATION\n`;

    //CALCULATE COLUMN WIDTHS

    var nameWidth = 0;
    var yearWidth = 0;
    var instituteWidth = 0;
    var scoreWidth = 0;

    for (var i = 0; i < education.length; i++) {
        if (education[i].name.length > nameWidth) {
            nameWidth = education[i].name.length;
        }
        if (education[i].year.length > yearWidth) {
            yearWidth = education[i].year.length;
        }
        if (education[i].institute.length > instituteWidth) {
            instituteWidth = education[i].institute.length;
        }
        if (education[i].score.length > scoreWidth) {
            scoreWidth = education[i].score.length;
        }
    }

    //GENERATE TABLE

    output += `| ${' '.repeat(nameWidth)} | ${' '.repeat(yearWidth)} | ${' '.repeat(instituteWidth)} | ${' '.repeat(scoreWidth)} |\n`;
    output += `| :${'-'.repeat(nameWidth - 2)}: | :${'-'.repeat(yearWidth - 2)}: | :${'-'.repeat(instituteWidth - 2)}: | :${'-'.repeat(scoreWidth - 2)}: |\n`;
    for (var i = 0; i < education.length; i++) {
        output += `| ${education[i].name} | ${education[i].year} | ${education[i].institute} | ${education[i].score}|\n`;
    }
    output += '\n \\vspace{-4mm}\n\n';
    return output;
}

function generateWorkExp(workexp) {
    var output = `## WORK EXPERIENCE\n\n---\n\n`;
    for (var i = 0; i < workexp.length; i++) {
        var techstack = generateTechStack(workexp[i].techstack);
        output += `### ***${workexp[i].role}***, ${workexp[i].company}, ${workexp[i].location} ${techstack} \\Date{${workexp[i].start} - ${workexp[i].end}}\n\n`;
        output += generatePoints(workexp[i].points);
        output += '\n';
    }
    return output;
}

function generateProject(projects) {
    var output = `## PROJECTS\n\n---\n\n`;
    for (var i = 0; i < projects.length; i++) {
        var techstack = generateTechStack(projects[i].techstack, true);
        var links = generateLinks(projects[i].links);
        var name;
        if (projects[i].product == null) {
            name = projects[i].name;
        } else {
            name = `${projects[i].name}'s ${projects[i].product}`;
        }

        output += `### ***${name}*** ${techstack} ${links}\n\n`;
        output += generatePoints(projects[i].points);
        output += '\n';
    }
    return output;
}

function generateAchievements(achievements) {
    var output = `## ACHIEVEMENTS AND AWARDS\n\n---\n\n`;
    output += generatePoints(achievements);
    output += '\n';
    return output;
}

function generatePors(pors) {
    var output = `## POSITIONS OF RESPONSIBILITY\n\n---\n\n`;
    for (var i = 0; i < pors.length; i++) {
        var techstack = generateTechStack(pors[i].techstack, false, false);
        var links = generateLinks(pors[i].links);

        output += `### ***${pors[i].role}***, ${pors[i].name}, ${links} \\Date{${pors[i].start} - ${pors[i].end}}\n`;
        output += `\\textbf{${techstack}}\n\n`;
        output += generatePoints(pors[i].points);
        output += '\n';
    }
    output += `\n`;
    return output;
}

function generateSkills(skills) {
    //3 column TABLE
    //find column WIDTHS

    output = `## TECHNICAL SKILLS\n\n`;
    output += `| | | |\n`;
    output += `| :${'-'.repeat(20)} | :${'-'.repeat(20)}: | ${'-'.repeat(20)}: |\n`;
    output += `| | | |\n`;
    for (var i = 0; i < 3; i++) {
        output += '| ';
        for (var j = 0; j < skills[i].length - 1; j++) {
            output += `${skills[i][j]}, `;
        }
        output += `${skills[i][skills[i].length - 1]} `;
    }
    output += '| \n';
    output += `| | | |\n\n`;
    output += `\\vspace{-4mm}\n\n`
    return output;

}
function generateTechStack(techStack, end, dash) {
    if (techStack == null || techStack == undefined) return "";
    var output = "";
    if (dash == true) {
        output += "- ";
    }
    output += "\\textcolor{gray}{";
    for (var i = 0; i < techStack.length - 1; i++) {
        output += `${techStack[i]} | `;
    }
    output += `${techStack[techStack.length - 1]}`;
    if (end == true) {
        output += " |";
    }
    output += "}";
    return output;
}

function generateLinks(links, end) {
    var output = "";
    for (var i = 0; i < links.length - 1; i++) {
        output += `[${links[i].name}](${links[i].url}) | `;
    }
    output += `[${links[links.length - 1].name}](${links[links.length - 1].url})`;
    if (end == true) {
        output += " |";
    }
    return output;
}

function generatePoints(points) {
    var output = "";
    for (var i = 0; i < points.length; i++) {
        output += `- ${points[i]}\n`;
    }
    return output;
}
main();
