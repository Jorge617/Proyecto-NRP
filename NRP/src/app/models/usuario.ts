export class Usuario{
	constructor(
		public nombre: string | undefined,
		public token : string | undefined,
		public password : string | undefined,
		public r_password : string | undefined,
		public esCliente : boolean | undefined,
		
	){}
}