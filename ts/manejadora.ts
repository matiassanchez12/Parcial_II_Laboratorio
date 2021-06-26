class Manejadora {
    constructor() {
    }
    
    public AgregarVehiculo(marca: string, modelo: string, precio: number, cantidadPuertas: number = null, cuatroXcuatro: number = null) {

        if(cantidadPuertas != null){
            let vehiculo : Auto = new Auto(this.buscarId(), marca, modelo, precio, cantidadPuertas);
            
            let vehiculoJson : JSON = vehiculo.AutoToJSON();

            localStorage.setItem(vehiculo.id.toString(), JSON.stringify(vehiculoJson));
        }else{
            let vehiculo : Camioneta = new Camioneta(this.buscarId(), marca, modelo, precio, cuatroXcuatro);
            
            let vehiculoJson : JSON = vehiculo.CamionetaToJSON();
            
            localStorage.setItem(vehiculo.id.toString(), JSON.stringify(vehiculoJson));
        }
    }

    public Borrar(ev: Event) {
        let fila: HTMLElement = <HTMLElement>ev.target;

        let id = fila.parentNode.parentNode.childNodes[0].textContent;

        let listado = this.ObteneVehiculos();

        listado.forEach(element => {
            if(element.id == id){
                localStorage.removeItem(id);
                return;
            }
        });
    }

    public ObteneVehiculos() {
        let local = localStorage;
        let arrayVehiculos = [];
        for (var key in local) {
            if(localStorage.getItem(key) != undefined){
                let auxVehiculo = JSON.parse(localStorage.getItem(key));
                arrayVehiculos.push(auxVehiculo);
            }
        }
        return arrayVehiculos;
    }

    public filtrarPorTipo(tipo : string) {
        let listado = this.ObteneVehiculos();
        if(tipo == "Auto"){
            return listado.filter(dato => dato.cantidadPuertas != null);
        }else{
            return listado.filter(dato => dato.cuatroXcuatro != null);
        }
    }

    public buscarId() {
        let vehiculos = this.ObteneVehiculos();

        if(vehiculos.length != 0){
            let encontrado = vehiculos.reduce((idMax, item) =>{
                if(item.id > idMax.id){
                    idMax.id = item.id;
                    return idMax;
                }else{
                    return idMax;
                }
            });
            return parseInt(encontrado.id) + 1;
        }

        return 1;
    }
}