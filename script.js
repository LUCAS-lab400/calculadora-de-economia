// Variáveis globais
let metaEconomia = 0;
let totalGastos = 0;
let gastosRegistrados = [];

// Elementos do DOM
const metaInput = document.getElementById('metaInput');
const gastoInput = document.getElementById('gastoInput');
const descricaoInput = document.getElementById('descricaoInput');
const metaDisplay = document.getElementById('metaDisplay');
const gastosDisplay = document.getElementById('gastosDisplay');
const limiteDisplay = document.getElementById('limiteDisplay');
const mensagemAlerta = document.getElementById('mensagemAlerta');
const resumoMensal = document.getElementById('resumoMensal');

// Botões
document.getElementById('definirMetaBtn').addEventListener('click', definirMeta);
document.getElementById('registrarGastoBtn').addEventListener('click', registrarGasto);
document.getElementById('gerarResumoBtn').addEventListener('click', gerarResumo);

// Definir meta de economia
function definirMeta() {
    metaEconomia = parseFloat(metaInput.value);
    metaDisplay.textContent = metaEconomia.toFixed(2);
    atualizarLimite();
    metaInput.value = '';
    mensagemAlerta.textContent = "Meta definida! Vamos economizar!";
}

// Registrar gastos
function registrarGasto() {
    const valor = parseFloat(gastoInput.value);
    const descricao = descricaoInput.value;

    if (valor && !isNaN(valor)) {
        totalGastos += valor;
        gastosRegistrados.push({ valor, descricao });
        gastosDisplay.textContent = totalGastos.toFixed(2);
        gastoInput.value = '';
        descricaoInput.value = '';
        atualizarLimite();
    }
}

// Atualizar limite restante
function atualizarLimite() {
    const limite = metaEconomia - totalGastos;
    limiteDisplay.textContent = limite.toFixed(2);

    if (limite < 0) {
        mensagemAlerta.textContent = "Atenção! Você ultrapassou seu limite! Corte gastos.";
    } else if (limite < (metaEconomia * 0.3)) {
        mensagemAlerta.textContent = "Cuidado! Você está perto do limite.";
    } else {
        mensagemAlerta.textContent = "Tudo sob controle! Continue assim.";
    }
}

// Gerar resumo mensal
function gerarResumo() {
    const economia = metaEconomia - totalGastos;
    let resumoHTML = `
        <p>Meta: R$ ${metaEconomia.toFixed(2)}</p>
        <p>Total Gastos: R$ ${totalGastos.toFixed(2)}</p>
        <p>Economia: R$ ${economia.toFixed(2)}</p>
        <p>${economia >= 0 ? '✅ Parabéns! Você atingiu sua meta!' : '❌ Você não atingiu sua meta.'}</p>
    `;

    if (gastosRegistrados.length > 0) {
        resumoHTML += <><h3>Detalhe dos Gastos:</h3><ul>;
            gastosRegistrados.forEach(gasto = {resumoHTML += <li>${gasto.descricao || 'Sem descrição'}: R$ ${gasto.valor.toFixed(2)}</li>};
            );
            resumoHTML += </ul></>;
    }

    resumoMensal.innerHTML = resumoHTML;
}