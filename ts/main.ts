window.addEventListener("load", () => {
    let main: Main = new Main();

    main.CargarListado();
    main.manejadora.filtrarPorTipo("auto");
});

class Main{
    manejadora : Manejadora = new Manejadora();
    btnEnviar  : HTMLButtonElement = <HTMLButtonElement> document.getElementById("btnEnviar");
    btnModal  : HTMLButtonElement = <HTMLButtonElement> document.getElementById("btnModal");
    btnBorrar  : HTMLButtonElement = <HTMLButtonElement> document.getElementById("btnBorrar");
    btnCerrarModal  : HTMLButtonElement = <HTMLButtonElement> document.getElementById("btnCerrarModal");
    tabla : HTMLDivElement = <HTMLDivElement> document.getElementById("bodytabla");
    
    constructor() {
        let marca : HTMLInputElement = <HTMLInputElement> document.getElementById("marca");
        let modelo : HTMLInputElement = <HTMLInputElement> document.getElementById("modelo");
        let precio : HTMLInputElement = <HTMLInputElement> document.getElementById("precio");
        let tipo : HTMLSelectElement = <HTMLSelectElement> document.getElementById("tipo");
        let cantidad_puertas : HTMLInputElement = <HTMLInputElement> document.getElementById("cant_puertas");
        let escuatro : HTMLInputElement = <HTMLInputElement> document.getElementById("escuatro");
        let filtro : HTMLInputElement = <HTMLInputElement> document.getElementById("filtro");
    
        this.btnEnviar.addEventListener('click', ()=>{
            let collection =  tipo.selectedOptions;

            if(collection[0].innerText == 'Auto'){
                this.manejadora.AgregarVehiculo(marca.value, modelo.value, parseInt(precio.value), parseInt(cantidad_puertas.value));
            }else{
                this.manejadora.AgregarVehiculo(marca.value, modelo.value, parseInt(precio.value), null, 1);
            }
            this.cerrarModal();
            this.actualizarTabla();
        });

        this.btnModal.addEventListener('click', ()=>{
            Main.mostrarModal();
        });

        this.btnCerrarModal.addEventListener('click', this.cerrarModal);

        tipo.addEventListener('change', (ev : Event) => {
            let resultado: HTMLInputElement = <HTMLInputElement>ev.target;
            if(resultado.value == 'Auto'){
                cantidad_puertas.disabled = false;
                escuatro.disabled = true;
            }else{
                cantidad_puertas.disabled = true;
                escuatro.disabled = false;
            }
        });   

        filtro.addEventListener('change', (ev : Event) => {
            let resultado: HTMLInputElement = <HTMLInputElement>ev.target;
            let nuevoListado = this.manejadora.filtrarPorTipo(resultado.value);
            this.actualizarTabla(nuevoListado);
        });   
    }

    public CargarListado(listado : Array<JSON> = null) {
        if(listado != null){
            listado.forEach(vehiculo => {
                this.agregarVehiculo(vehiculo);
            });
        }else{
            let vehiculos =  this.manejadora.ObteneVehiculos();

            vehiculos.forEach(vehiculo => {
                this.agregarVehiculo(vehiculo);
            });
        }
    }

    public agregarVehiculo(vehiculo : any) {
        if (vehiculo != null) {
          let newRow = document.createElement("tr");

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

            let btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'Borrar';
            btnBorrar.setAttribute('id', 'btnBorrar');
            btnBorrar.setAttribute('class', 'btn-del');
            
            btnBorrar.addEventListener('click', (ev : Event)=>{
                this.manejadora.Borrar(ev);
                this.actualizarTabla();
            })

            newRow
            .appendChild(document.createElement("td"))
            .appendChild(btnBorrar);

          this.tabla.appendChild(newRow);
        }
      }

    public static mostrarModal() {
        let form = <HTMLDivElement> document.getElementById("form");
        form.setAttribute('style', 'display:flex');
    }

    public cerrarModal() {
        let form = <HTMLDivElement> document.getElementById("form");
        form.setAttribute('style', 'display:none');
    }
      
    // public validarGenero() : string{
    //     if (this.sexo1.checked === true) {
    //       return this.sexo1.value;
    //     } else {
    //       return this.sexo2.value;
    //     }
    //   }

    public actualizarTabla(listado : Array<JSON> = null) {
        let tabla : HTMLDivElement = <HTMLDivElement> document.getElementById("bodytabla");

        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }
        if(listado != null){
            this.CargarListado(listado);
        }else{
            this.CargarListado();
        }
    }
}


