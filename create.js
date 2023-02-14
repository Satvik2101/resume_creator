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
    console.log(output);
    //write to test.md
    fs.writeFileSync('test.md', output, 'utf8');
}

function generateHeader(name, email, phone, title, location, links) {
    var output = `# ${name} \\hfill \\small \\href{mailto:${email}}{${email}} ${phone}`;
    output += `\n${title}, ${location} \\hfill{}`;

    for (var i = 0; i < links.length; i++) {
        output += `[${links[i].name}](${links[i].url})  `;
    }
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
    output += '\n \\vspace{-4mm}\n';
    return output;
}
main();