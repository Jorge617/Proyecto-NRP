import { Usuario } from "./usuario";

export class Requisito{
	constructor(
		public _id: string,
		public nombre: string,
        public prioridad: [Usuario, Number],
		public coste: number
		
	){}
}