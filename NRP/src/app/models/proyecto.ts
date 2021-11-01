import { Requisito } from "./requisito"
import { Usuario } from "./usuario"

export class Proyecto {
	constructor(
		public _id: string,
		public nombre: string,
		public requisitos: Requisito[],
		public fechaInicio: Date | string,
		public fechaFin: Date | string,
		public usuarios: any[],
		public descripcion: string,
		public idUsuario: string | undefined


	) { }
}
