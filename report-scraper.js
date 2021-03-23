const allReports = [];
// Self Grade Options
const SELF_GRADE_1 = "Not comfortable at all"; // r
const SELF_GRADE_2 = "Struggled with some concepts;" // r
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
    let color = '/';
    const name = node.querySelector('.report-header.group a').innerText;
    const selfGrade = node.querySelector('.report .responses .grade-edge').innerText;
    const pairGrade = node.querySelector('.review .responses .grade-edge').innerText;
    
})


