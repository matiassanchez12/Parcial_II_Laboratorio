
class Auto extends Vehiculo{
    cantidadPuertas : number;
  
    constructor(id: number, marca: string, modelo: string, precio: number, cantidadPuertas: number) {
        super(id, marca, modelo, precio);
        this.cantidadPuertas = cantidadPuertas;
    }
  
    public AutoToJSON() {
        let dataAuto = `{${super.VehiculoToString() + ',' + this.AutoToString()}}`;
        return JSON.parse(dataAuto);
    }
  
    public AutoToString() {
        return `"cantidadPuertas": ${this.cantidadPuertas}`;
    }
  }