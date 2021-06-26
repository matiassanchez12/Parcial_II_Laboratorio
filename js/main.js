"use strict";
window.addEventListener("load", function () {
    var main = new Main();
    main.CargarListado();
    main.manejadora.filtrarPorTipo("auto");
});
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        this.manejadora = new Manejadora();
        this.btnEnviar = document.getElementById("btnEnviar");
        this.btnModal = document.getElementById("btnModal");
        this.btnBorrar = document.getElementById("btnBorrar");
        this.btnCerrarModal = document.getElementById("btnCerrarModal");
        this.tabla = document.getElementById("bodytabla");
        var marca = document.getElementById("marca");
        var modelo = document.getElementById("modelo");
        var precio = document.getElementById("precio");
        var tipo = document.getElementById("tipo");
        var cantidad_puertas = document.getElementById("cant_puertas");
        var escuatro = document.getElementById("escuatro");
        var filtro = document.getElementById("filtro");
        this.btnEnviar.addEventListener('click', function () {
            var collection = tipo.selectedOptions;
            if (collection[0].innerText == 'Auto') {
                _this.manejadora.AgregarVehiculo(marca.value, modelo.value, parseInt(precio.value), parseInt(cantidad_puertas.value));
            }
            else {
                _this.manejadora.AgregarVehiculo(marca.value, modelo.value, parseInt(precio.value), null, 1);
            }
            _this.cerrarModal();
            _this.actualizarTabla();
        });
        this.btnModal.addEventListener('click', function () {
            Main.mostrarModal();
        });
        this.btnCerrarModal.addEventListener('click', this.cerrarModal);
        tipo.addEventListener('change', function (ev) {
            var resultado = ev.target;
            if (resultado.value == 'Auto') {
                cantidad_puertas.disabled = false;
                escuatro.disabled = true;
            }
            else {
                cantidad_puertas.disabled = true;
                escuatro.disabled = false;
            }
        });
        filtro.addEventListener('change', function (ev) {
            var resultado = ev.target;
            var nuevoListado = _this.manejadora.filtrarPorTipo(resultado.value);
            _this.actualizarTabla(nuevoListado);
        });
    }
    Main.prototype.CargarListado = function (listado) {
        var _this = this;
        if (listado === void 0) { listado = null; }
        if (listado != null) {
            listado.forEach(function (vehiculo) {
                _this.agregarVehiculo(vehiculo);
            });
        }
        else {
            var vehiculos = this.manejadora.ObteneVehiculos();
            vehiculos.forEach(function (vehiculo) {
                _this.agregarVehiculo(vehiculo);
            });
        }
    };
    Main.prototype.agregarVehiculo = function (vehiculo) {
        var _this = this;
        if (vehiculo != null) {
            var newRow = document.createElement("tr");
            newRow
                .appendChild(document.createElement("td"))
                .appendChild(document.createTextNode(vehiculo.id));
            newRow
                .appendChild(document.createElement("td"))
                .appendChild(document.createTextNode(vehiculo.marca));
            newRow
                .appendChild(document.createElement("td"))
                .appendChild(document.createTextNode(vehiculo.modelo));
            newRow
                .appendChild(document.createElement("td"))
                .appendChild(document.createTextNode(vehiculo.precio));
            var btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'Borrar';
            btnBorrar.setAttribute('id', 'btnBorrar');
            btnBorrar.setAttribute('class', 'btn-del');
            btnBorrar.addEventListener('click', function (ev) {
                _this.manejadora.Borrar(ev);
                _this.actualizarTabla();
            });
            newRow
                .appendChild(document.createElement("td"))
                .appendChild(btnBorrar);
            this.tabla.appendChild(newRow);
        }
    };
    Main.mostrarModal = function () {
        var form = document.getElementById("form");
        form.setAttribute('style', 'display:flex');
    };
    Main.prototype.cerrarModal = function () {
        var form = document.getElementById("form");
        form.setAttribute('style', 'display:none');
    };
    // public validarGenero() : string{
    //     if (this.sexo1.checked === true) {
    //       return this.sexo1.value;
    //     } else {
    //       return this.sexo2.value;
    //     }
    //   }
    Main.prototype.actualizarTabla = function (listado) {
        if (listado === void 0) { listado = null; }
        var tabla = document.getElementById("bodytabla");
        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }
        if (listado != null) {
            this.CargarListado(listado);
        }
        else {
            this.CargarListado();
        }
    };
    return Main;
}());
