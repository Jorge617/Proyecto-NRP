import { Requisito } from "./requisito"
import { Usuario } from "./usuario"

export class Proyecto{
	constructor(
		public id : string | undefined,
		public nombre: string | undefined,
		public requisitos:Requisito[]|undefined,
		public fechaInicio:string|undefined,
		public fechaFin:string|undefined,
		public usuarios:Usuario[]|undefined,
		public descripcion:string|undefined,
		public idUsuario:string|undefined

		
	){}
}
