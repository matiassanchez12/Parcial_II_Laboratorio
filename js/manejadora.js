"use strict";
var Manejadora = /** @class */ (function () {
    function Manejadora() {
    }
    Manejadora.prototype.AgregarVehiculo = function (marca, modelo, precio, cantidadPuertas, cuatroXcuatro) {
        if (cantidadPuertas === void 0) { cantidadPuertas = null; }
        if (cuatroXcuatro === void 0) { cuatroXcuatro = null; }
        if (cantidadPuertas != null) {
            var vehiculo = new Auto(this.buscarId(), marca, modelo, precio, cantidadPuertas);
            var vehiculoJson = vehiculo.AutoToJSON();
            localStorage.setItem(vehiculo.id.toString(), JSON.stringify(vehiculoJson));
        }
        else {
            var vehiculo = new Camioneta(this.buscarId(), marca, modelo, precio, cuatroXcuatro);
            var vehiculoJson = vehiculo.CamionetaToJSON();
            localStorage.setItem(vehiculo.id.toString(), JSON.stringify(vehiculoJson));
        }
    };
    Manejadora.prototype.Borrar = function (ev) {
        var fila = ev.target;
        var id = fila.parentNode.parentNode.childNodes[0].textContent;
        var listado = this.ObteneVehiculos();
        listado.forEach(function (element) {
            if (element.id == id) {
                localStorage.removeItem(id);
                return;
            }
        });
    };
    Manejadora.prototype.ObteneVehiculos = function () {
        var local = localStorage;
        var arrayVehiculos = [];
        for (var key in local) {
            if (localStorage.getItem(key) != undefined) {
                var auxVehiculo = JSON.parse(localStorage.getItem(key));
                arrayVehiculos.push(auxVehiculo);
            }
        }
        return arrayVehiculos;
    };
    Manejadora.prototype.filtrarPorTipo = function (tipo) {
        var listado = this.ObteneVehiculos();
        if (tipo == "Auto") {
            return listado.filter(function (dato) { return dato.cantidadPuertas != null; });
        }
        else {
            return listado.filter(function (dato) { return dato.cuatroXcuatro != null; });
        }
    };
    Manejadora.prototype.buscarId = function () {
        var vehiculos = this.ObteneVehiculos();
        if (vehiculos.length != 0) {
            var encontrado = vehiculos.reduce(function (idMax, item) {
                if (item.id > idMax.id) {
                    idMax.id = item.id;
                    return idMax;
                }
                else {
                    return idMax;
                }
            });
            return parseInt(encontrado.id) + 1;
        }
        return 1;
    };
    return Manejadora;
}());
