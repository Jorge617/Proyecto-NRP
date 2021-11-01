import { Proyecto } from "./proyecto";

export class Usuario {
	constructor(
		public id: string,
		public nombre: string,
		public password: string,
		public r_password: string,
		public token: string,
		public importancia: Number,
		public esCliente: boolean,
		public proyectos: Proyecto[],
		public propietario: String[]

	) { }
}