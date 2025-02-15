// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: targetPosition - navbarHeight,
            behavior: 'smooth'
        });
    });
});

// Calculator functions
function calcularSC() {
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value) / 100; // Convertir cm a metros
    
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        document.getElementById("resultadoSC").textContent = "Datos inválidos";
        return;
    }
    
    let sc = (0.007184 * Math.pow(peso, 0.425) * Math.pow(altura * 100, 0.725)).toFixed(3);
    document.getElementById("resultadoSC").textContent = sc;
    animateResult("resultadoSC");
}

function calcularCarboplatino() {
    let creatinina = parseFloat(document.getElementById("creatinina").value);
    let edad = parseInt(document.getElementById("edad").value);
    let peso = parseFloat(document.getElementById("pesoCarboplatino").value);
    let sexo = document.getElementById("sexo").value;
    let auc = parseFloat(document.getElementById("auc").value);
    
    if (isNaN(creatinina) || isNaN(edad) || isNaN(peso) || isNaN(auc) || edad <= 0 || peso <= 0 || auc <= 0) {
        document.getElementById("resultadoCarboplatino").textContent = "Datos inválidos";
        return;
    }
    
    let clearence = ((140 - edad) * peso) / (72 * creatinina);
    if (sexo === "mujer") {
        clearence *= 0.85;
    }
    
    let dosis = (auc * (clearence + 25)).toFixed(2);
    document.getElementById("resultadoCarboplatino").textContent = dosis;
    animateResult("resultadoCarboplatino");
}

function calcularRenal() {
    let creatinina = parseFloat(document.getElementById("creatininaRenal").value);
    let edad = parseInt(document.getElementById("edadRenal").value);
    let peso = parseFloat(document.getElementById("pesoRenal").value);
    let sexo = document.getElementById("sexoRenal").value;
    
    if (isNaN(creatinina) || isNaN(edad) || isNaN(peso) || edad <= 0 || peso <= 0) {
        document.getElementById("resultadoRenal").textContent = "Datos inválidos";
        return;
    }
    
    let clearence = ((140 - edad) * peso) / (72 * creatinina);
    if (sexo === "mujer") {
        clearence *= 0.85;
    }
    
    document.getElementById("resultadoRenal").textContent = clearence.toFixed(2);
    animateResult("resultadoRenal");
}

// Animate result when calculated
function animateResult(elementId) {
    const element = document.getElementById(elementId);
    element.style.transform = 'scale(1.1)';
    element.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// Event listeners
document.getElementById("calcularSC").addEventListener("click", calcularSC);
document.getElementById("calcularCarboplatino").addEventListener("click", calcularCarboplatino);
document.getElementById("calcularRenal").addEventListener("click", calcularRenal);

// Input validation and real-time feedback
const numericInputs = document.querySelectorAll('input[type="number"]');
numericInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
        this.style.borderColor = this.value.trim() === '' ? '#ddd' : '#3498db';
    });
});
