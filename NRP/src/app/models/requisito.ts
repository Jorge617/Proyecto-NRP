export class Requisito{
	constructor(
		public _id: string,
		public nombre: string,
        public prioridad: [Number, String],
		public coste: number
		
	){}
}