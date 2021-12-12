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
		public idUsuario: string,
		public planificacion: any[],
		public esfuerzoMax: any,
		public satisfaccionMax: any,
		public productividad: Number,
		public contribuciones: any[],
		public coberturas: any[]

	) { }
}
