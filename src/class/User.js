class User {
	constructor(Usr_Name, Usr_Email, Usr_Password, Usr_Confirm_Password) {
		this.Usr_Name = Usr_Name;
		this.Usr_Email = Usr_Email;
		this.Usr_Password = Usr_Password;
		this.Usr_Confirm_Password = Usr_Confirm_Password;
		this.Usr_Cart = {
			Cart_Items: [],
		};
	}
}

export default User;
