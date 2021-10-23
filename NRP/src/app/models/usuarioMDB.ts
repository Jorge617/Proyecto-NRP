export class UsuarioMDB{
	constructor(
		public nombre: string | undefined,
		public password : string | undefined,
        public token : string | undefined,
        public importancia: Number | undefined,
		public esCliente : boolean | undefined,
		
	){}
}