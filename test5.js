class Customer{
    fullname;
    mobileNumber;
    address;
    aadharCardNumber;

    applyAccount(fullname,mobileNumber,address,aadharCardNumber){
        this.fullname=fullname;
        this.mobileNumber=mobileNumber;
        this.address=address;
        this.aadharCardNumber=aadharCardNumber;
    }
    static deposit(account,amount){
        if(amount>0){
            account.accountBalnce+=amount;
        }
        var accounts=JSON.parse(localStorage.getItem("accounts"));
        for(var i=0;i<accounts.length;i++){
            var accountObjectOfLC= accounts[i];

            if(account.accountNumber===accountObjectOfLC.accountNumber){
                accountObjectOfLC.accountBalnce=account.accountBalnce;
            }
        }
        localStorage.setItem("accounts",JSON.stringify(accounts));
    }
    
}

class BranchManager{
    //accountNumberCounter=100;
    accountValidator(accountDetails){
        if(accountDetails.aadharCardNumber!="" && accountDetails.fullname!=="")
        {
            accountDetails.accountNumber=this.generateUniqueAccountNumber();
            accountDetails.accountBalnce=0;
            return true;
        }
        else
        {
            return false;
        }
    }

    generateUniqueAccountNumber(){
        if(localStorage.getItem("accountNumberCounter")==null){
            localStorage.setItem("accountNumberCounter",2000);
        }
           var accountNumberCounter=parseInt(localStorage.getItem("accountNumberCounter"));
           accountNumberCounter=accountNumberCounter+1;
           localStorage.setItem("accountNumberCounter",accountNumberCounter);
           return accountNumberCounter;
    }
}

if(localStorage.getItem("accounts")==null){
    localStorage.setItem("accounts",JSON.stringify([]));
}
function applyAccount(){
    event.preventDefault();
    var fullname=document.getElementById("fullname").value;
    var mobileNumber=document.getElementById("mobileNumber").value;
    var address=document.getElementById("address").value;
    var aadharCardNumber=document.getElementById("aadharCardNumber").value;

    var customer= new Customer();
    customer.applyAccount(fullname,mobileNumber,address,aadharCardNumber);

    var branchmanger = new BranchManager();
    var status=branchmanger.accountValidator(customer);
    if(status)
    {
        var accounts=JSON.parse(localStorage.getItem("accounts"));
        accounts.push(customer);
        localStorage.setItem("accounts",JSON.stringify(accounts));

        document.getElementById("errorMessage").innerHTML="Account got approved";
        window.location.href="userlogin.html";
    }
    else
    {
        document.getElementById("errorMessage").innerHTML="Account not approved";
    }
}

function login(){
   event.preventDefault();
   var aadharCardNumber=document.getElementById("aadharCardNumber").value;
   var accounts=JSON.parse(localStorage.getItem("accounts")); 
   var userFound=false;
   for(var i=0;i<accounts.length;i++){
       var account= accounts[i];

       if(account.aadharCardNumber == aadharCardNumber)
        {
            userFound=true;
            localStorage.setItem("currentUser",JSON.stringify(account));
            window.location.href="dashboard.html";
        }
   }
   if(userFound==false){
    alert("aadhar card number is invalid");
}
}

function getCurrentUser(){
    return JSON.parse(localStorage.getItem("currentUser"));
}

function enableDeposit(){
    event.preventDefault();
    document.getElementById("depositForm").hidden=false;
}
function deposit(){
    event.preventDefault();
    var amount= parseInt(document.getElementById("amount").value);
    var currentObject=getCurrentUser();
    Customer.deposit(currentObject,amount);
    //currentObject.deposit(amount);
}