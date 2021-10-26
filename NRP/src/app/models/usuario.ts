import { Proyecto } from "./proyecto";

export class Usuario{
	constructor(
		public id : string | undefined,
		public nombre: string | undefined,
		public password : string | undefined,
		public r_password : string | undefined,
        public token : string | undefined,
        public importancia: Number | undefined,
		public esCliente : boolean | undefined,
		public proyectos:Proyecto[] | undefined,
		public propietario:String
		
	){}
}