const allReports = [];

// Self Grade Options
const SELF_GRADE_1 = "Not comfortable at all"; // r
const SELF_GRADE_2 = "Struggled with some concepts"; // r
const SELF_GRADE_3 = "Have general understanding"; // y
const SELF_GRADE_4 = "Confident I understand"; // no color
const SELF_GRADE_5 = "Extremely comfortable"; // green

// Pair Grade Options
const PAIR_GRADE_1 = "Not comfortable at all";
const PAIR_GRADE_2 = "Struggled with some concepts";
const PAIR_GRADE_3 = 'Had a general understanding';
const PAIR_GRADE_4 = 'Understood it all';
const PAIR_GRADE_5 = "Extremely comfortable";

const allReportNodes = document.querySelectorAll('.progress-report');
allReportNodes.forEach(node => { 
    const name = node.querySelector('.report-header.group a').innerText;
    const selfGradeNode = node.querySelector('.report .responses');
    const pairGradeNode = node.querySelector('.review .responses');
    const selfGrade = selfGradeNode ? selfGradeNode.innerText : null;
    const pairGrade = pairGradeNode ? pairGradeNode.innerText: null;
    
    const student = [name, ' ', ' '];
    
    if (selfGrade && (selfGrade.includes(SELF_GRADE_1) || selfGrade.includes(SELF_GRADE_2))) {
        student[1] = 'r';
    } else if (selfGrade && selfGrade.includes(SELF_GRADE_3)) {
        student[1] = 'y';
    }
    
    if (pairGrade && (pairGrade.includes(PAIR_GRADE_1) || pairGrade.includes(PAIR_GRADE_2))) {
        student[2] = 'r';
    } else if (pairGrade && pairGrade.includes(PAIR_GRADE_3)) {
        student[2] = 'y';
    }

    allReports.push(student);
});



allReports.sort((a,b) => {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    else return 0;
});

const selfGradeColors = allReports.map(student => student[1]);
const selfGradeString = selfGradeColors.join('\n');

const pairGradeColors = allReports.map(student => student[2]);
const pairGradeString = pairGradeColors.join('\n');