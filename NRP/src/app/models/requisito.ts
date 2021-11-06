import { Usuario } from "./usuario";

export class Requisito {
	constructor(
		public _id: string,
		public nombre: string,
		public descripcion: string,
		public fechaInicio: string,
		public fechaFin: string,
		public prioridad: any[],
		public coste: number,
		public idProyecto: string

	) { }
}