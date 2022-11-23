const ingresos = [
    new Ingreso('Salario', 20000),
    new Ingreso('Venta coche', 50000)
    
];

const egresos = [
    new Egreso('Renta departamento', 4000),
    new Egreso('Ropa', 800)
];


const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const totalIngresos = () => {
    let totalIngresos = 0;
    for (let ingreso of ingresos) {
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

const totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}



/*let egresos = {
    Renta: 900,
    Ropa: 400
    //crear array, con objetos del tipo ingreso, declara arreglo

};
let ingresos = {
    Quincena: 9000,
    Venta: 400,

};*/

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('es-MX', { style: 'currency', currency:'MXN', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX', { style: 'percent', minimumFractionDigits: 2 });
}

const crearIngresoHTML = (ingreso) => {
    let ingresosHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button type="button" class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
                <button class="agregar_btn" onclick="agregarDato()">
                </button>
        </div>
    </div>
</div>`;
    return ingresosHTML;
}
const crearEgresoHTML = (egreso) => {
    let egresoHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_eliminar">
            <button type="button" class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick = 'eliminarEgreso(${egreso.id})></ion-icon>
            </button>

            
        </div>
    </div>
</div>`;
    return egresoHTML;
}


const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const cargarIngresos = () => {
    let ingresosHTML= '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const cargarEgresos = () => {
    let egresosHTML= '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);  
    } 
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}
const agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push( new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}