let saldo = 0;
let historialTransacciones = [];

function realizarDeposito(monto) {
    saldo += monto;
    historialTransacciones.push({
        tipo: "depósito",
        monto: monto,
        fecha: new Date(),
    });
}

function realizarRetiro(monto) {
    if (monto <= saldo) {
        saldo -= monto;
        historialTransacciones.push({
            tipo: "retiro",
            monto: monto,
            fecha: new Date(),
        });
    } else {
        Swal.fire('Saldo insuficiente', '', 'error');
    }
}

function consultarSaldo() {
    Swal.fire('Saldo actual: ' + saldo.toFixed(2));
}

function mostrarHistorialTransacciones() {
    let historial = '<ul>';
    historialTransacciones.forEach((transaccion) =>
        historial += `<li>${transaccion.tipo} - Monto: ${transaccion.monto} - Fecha: ${transaccion.fecha}</li>`
    );
    historial += '</ul>';
    Swal.fire({
        title: 'Historial de Transacciones',
        html: historial,
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const depositarButton = document.getElementById("depositar");
    const retirarButton = document.getElementById("retirar");
    const saldoButton = document.getElementById("saldo");
    const historialButton = document.getElementById("historial");
    const salirButton = document.getElementById("salir");

    depositarButton.addEventListener("click", function () {
        Swal.fire({
            title: 'Depositar',
            input: 'number',
            inputAttributes: {
                step: '0.01'
            },
            showCancelButton: true,
            confirmButtonText: 'Depositar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let deposito = parseFloat(result.value);
                if (!isNaN(deposito) && deposito > 0) {
                    realizarDeposito(deposito);
                    Swal.fire('¡Depósito realizado con éxito!', '', 'success');
                    actualizarSaldo();
                } else {
                    Swal.fire('Cantidad inválida', '', 'error');
                }
            }
        });
    });

    retirarButton.addEventListener("click", function () {
        Swal.fire({
            title: 'Retirar',
            input: 'number',
            inputAttributes: {
                step: '0.01'
            },
            showCancelButton: true,
            confirmButtonText: 'Retirar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let retiro = parseFloat(result.value);
                if (!isNaN(retiro) && retiro > 0) {
                    realizarRetiro(retiro);
                    Swal.fire('¡Retiro realizado con éxito!', '', 'success');
                    actualizarSaldo();
                } else {
                    Swal.fire('Cantidad inválida', '', 'error');
                }
            }
        });
    });

    saldoButton.addEventListener("click", function () {
        consultarSaldo();
    });

    historialButton.addEventListener("click", function () {
        mostrarHistorialTransacciones();
    });

    salirButton.addEventListener("click", function () {
        Swal.fire('Gracias por utilizar el Simulador Bancario');
    });
});


function actualizarSaldo() {
    const saldoElement = document.getElementById("saldo-actual");
    if (saldoElement) {
        saldoElement.textContent = "Saldo actual: " + saldo.toFixed(2);
    }
}
