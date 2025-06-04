//const ctx = document.getElementById('myChart').getContext('2d');
let myChart;

async function fetchData() {
    const response = await fetch('https://192.168.1.211:3000/api/alumnos');
    const data = await response.json();
    return data;
}

function getChartData(alumnos) {
    if (!Array.isArray(alumnos)) {
        console.error('La respuesta no es un array:', alumnos);
        return { labels: [], data: [] };
    }
    // Contar alumnos por estado
    const estados = {
        1: 'Activo',
        0: 'Inactivo'
    };
    const counts = {};
    alumnos.forEach(a => {
        const estado = estados[a.ESTADO] || `Estado ${a.ESTADO}`;
        counts[estado] = (counts[estado] || 0) + 1;
    });
    return {
        labels: Object.keys(counts),
        data: Object.values(counts)
    };
}

async function updateChart() {
    const alumnos = await fetchData();
    const chartData = getChartData(alumnos);

    myChart.data.labels = chartData.labels;
    myChart.data.datasets[0].data = chartData.data;
    myChart.update();
}

window.onload = async function() {
    const ctx = document.getElementById('dataGraph').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Cantidad de alumnos por estado',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    await updateChart();
    setInterval(updateChart, 5000); // Actualiza cada 5 segundos
};