export class AuthInfo {

    constructor(
        public $uid:string
    ){

    }

    isLoggedIn(){
        console.log("$uid: ", this.$uid);
        return !!this.$uid;
    }
}