
class Camioneta extends Vehiculo{
    cuatroXcuatro : number;
  
    constructor(id: number, marca: string, modelo: string, precio: number, cuatroXcuatro: number) {
        super(id, marca, modelo, precio);
        this.cuatroXcuatro = cuatroXcuatro;
    }
  
    public CamionetaToJSON() {
        let dataCamioneta = `{${super.VehiculoToString() + ',' + this.CamionetaToString()}}`;
        return JSON.parse(dataCamioneta);
    }
  
    public CamionetaToString() {
        return `"cuatroXcuatro": ${this.cuatroXcuatro}`;
    }
  }