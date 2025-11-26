let currentScoreMoi = 0;
let currentScoreCopine = 0;

const challengeIds = [
    'A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'F1', 'F2', 'F3', 'F4',
    'A3', 'A4', 'D1', 'D2', 'D3', 'D6', 'F5', 'F6', 'F7', 'F8',
    'A5', 'C3', 'C4', 'C5', 'E2', 'E4', 'F9', 'F10', 'F11', 'F12',
    'A6', 'B5', 'B6', 'D4', 'D5', 'E5', 'F13', 'F14', 'F15', 'F16',
    'C1', 'C2', 'C6', 'E1', 'E3', 'E6', 'F17', 'F18', 'F19', 'F20'
];

const scoreTableBody = document.querySelector('#score-table tbody');
const totalMoi = document.getElementById('total-moi');
const totalCopine = document.getElementById('total-copine');

challengeIds.forEach(id => {
    const row = scoreTableBody.insertRow();
    row.innerHTML = `
        <td>${id}</td>
        <td><input type="checkbox" data-joueur="moi" data-id="${id}" onchange="calculateScore()"></td>
        <td><input type="checkbox" data-joueur="copine" data-id="${id}" onchange="calculateScore()"></td>
    `;
});

function calculateScore() {
    const checkboxesMoi = document.querySelectorAll('input[data-joueur="moi"]:checked');
    const checkboxesCopine = document.querySelectorAll('input[data-joueur="copine"]:checked');

    currentScoreMoi = checkboxesMoi.length;
    currentScoreCopine = checkboxesCopine.length;

    totalMoi.textContent = currentScoreMoi;
    totalCopine.textContent = currentScoreCopine;
}

function downloadScores() {
    const date = new Date().toLocaleDateString('fr-FR');

    let content = `--- RESULTATS CHASSE A L'OBJET ULTIME PARIS (50 défis) ---\n`;
    content += `Date : ${date}\n\nDéfi\tVous\tCopine\n`;

    document.querySelectorAll('#score-table tbody tr').forEach(row => {
        const id = row.querySelector('td').textContent;
        const moi = row.querySelector('input[data-joueur="moi"]').checked ? 'X' : '';
        const copine = row.querySelector('input[data-joueur="copine"]').checked ? 'X' : '';
        content += `${id}\t${moi}\t${copine}\n`;
    });

    content += `\nTotal VOUS : ${currentScoreMoi}/50\nTotal Copine : ${currentScoreCopine}/50\n`;

    const filename = `scores_${date.replace(/\//g, '-')}.txt`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');

    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function initMap() {
    const parisCenter = { lat: 48.86, lng: 2.34 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: parisCenter,
        gestureHandling: "cooperative"
    });

    const areaCoords = [
        { lat: 48.885, lng: 2.30 },
        { lat: 48.90, lng: 2.35 },
        { lat: 48.885, lng: 2.39 },
        { lat: 48.85, lng: 2.40 },
        { lat: 48.835, lng: 2.38 },
        { lat: 48.82, lng: 2.32 },
        { lat: 48.84, lng: 2.27 },
        { lat: 48.885, lng: 2.30 }
    ];

    const searchPolygon = new google.maps.Polygon({
        paths: areaCoords,
        strokeColor: "#6c757d",
        fillColor: "#6c757d",
        fillOpacity: 0.15,
    });

    searchPolygon.setMap(map);

    new google.maps.Marker({
        position: parisCenter,
        map: map,
        title: "Paris Central"
    });
}
