
var script = document.createElement('script');
script.src = '/js/newjquery-3.3.1.min.js';
document.head.appendChild(script);


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];


var TestingContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "requestamt",
				"type": "uint256"
			}
		],
		"name": "reqMoney",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidate_key",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_c_id",
				"type": "uint256"
			}
		],
		"name": "get_user_details",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllUserCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "prop_map",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_key",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sendMoney",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_key",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_phone",
				"type": "string"
			},
			{
				"name": "_pass",
				"type": "string"
			},
			{
				"name": "_balance",
				"type": "uint256"
			},
			{
				"name": "_flag",
				"type": "uint256"
			},
			{
				"name": "_reqamt",
				"type": "uint256"
			},
			{
				"name": "_camt",
				"type": "uint256"
			},
			{
				"name": "_pcnt",
				"type": "uint256"
			}
		],
		"name": "newUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposalList",
		"outputs": [
			{
				"name": "investor",
				"type": "address"
			},
			{
				"name": "iamt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]); 

var TestingC = TestingContract.at('0xacfa5db6f3cab2fab5bd5247a43450daa91ab763');
console.log(TestingC);



$("#register").click(function() {

	if($("#name").val()!="" && $("#email").val()!="" && $("#phone").val()!="" && $("#password").val()!="" ){
   var email= $("#email").val();
	var account=web3.personal.newAccount($("#pass").val());
	console.log(account);
	TestingC.newUser(account,$("#name").val(), $("#email").val(),$("#phone").val(),$("#password").val(),1000,0,0,0,0,{from: web3.eth.defaultAccount, gas:3000000});
	alert("User Successfully added\nDonor ID : "+account);
	$("#name").val("");
	$("#email").val("");
	$("#count").val("");
	$("#num").val("");
	window.location = "/sendmail?valid="+account+"&mailid="+email;
	
}

});


//login page
function upload(){     
    if(document.getElementById("password").value==''||document.getElementById("username").value=='')
        {
            alert('Please enter your User id');
            return false;
            
        }
    var userid 		= document.getElementById("username").value;
    var password 	= document.getElementById("password").value;
	//console.log(password1);
	console.log(userid);
    if((userid.localeCompare("admin")==0)&&(password.localeCompare("admin")==0)){
		
		$.post("http://localhost:3000/", {email:userid}, function(data){
			console.log('hello login');
			console.log(data);
			$("#head").text("hellll");
			if(data==='done')          
            {
				window.location.href="/admin";
				return true;            
			}

		});
		console.log('hello logiwwn');

		return false;
        
    }
TestingC.getUser(userid,function(error, result){
	
        var pass =result[3];
		console.log(result[3]);//error
		

        
        if ((password.localeCompare(pass)==0)){
			$.post("http://localhost:3000/", {email:userid}, function(data){
				console.log('hello login');
				console.log(data);
				$("#head").text("hellll");
				if(data==='done')          
				{
					window.location.href="/admin";
					return true;            
				}
	
			});




                       }



    });
};

//Send Money
$("#send_money").click(function() {

	if($("#u_id").val()!="" && $("#to").val()!="" && $("#amount").val()!="" ){
   
	var account=web3.personal.newAccount($("#pass").val());
	console.log(account);
	var trhash=TestingC.sendMoney($("#u_id").val(), $("#to").val(),$("#amount").val(),{from: web3.eth.defaultAccount, gas:4700000});
	alert("Amount Successfully Transffered, Please note this hash for future reference "+trhash);
	$("#amount").val("");
	$("#to").val("");
	
	console.log(trhash);
}

});


//request money

$("#request_money").click(function() {

	if($("#reqamt").val()!="" ){
		
		var trhash=TestingC.reqMoney($("#u_id").val(), $("#reqamt").val(),{from: web3.eth.defaultAccount, gas:3000000});
		alert("Money Requested")
	
}

});

//verify
$("#verify_transaction").click(function() {

	if($("#u_id").val()!="" ){
   
	var receipt=web3.eth.getTransactionReceipt($("#u_id").val());
	console.log(receipt);
	alert("Transaction details: Block Number: "+receipt.blockNumber+" Block Hash: "+receipt.blockHash+" Gas Used: "+receipt.gasUsed);
	
	//$("#result").html("<br><table class='table'> <tr><th>Verify Transaction Details  </th><td>"+receipt.blockNumber+"</td></tr><tr><th>Total Vote  </th><td>"+"test"+"</td></tr><tr><td></td><td></td></tr></table>");

	//console.log(trhash);
}

});


//get candidate list
function get_candidate(){
	if(document.getElementById("c_id").value==""){
		alert("Please enter valid candidate ID");
		return false;
	}
	var userid=$('#c_id').val();
	TestingC.get_candidate_details(userid,function(error, result){
        console.log(error);
            var name =result[0];
        var vote =result[1].toString();
			console.log(result[1].toString());
			$("#result").html("<br><table class='table'> <tr><th>Candidate Name  </th><td>"+name+"</td></tr><tr><th>Total Vote  </th><td>"+vote+"</td></tr><tr><td></td><td></td></tr></table>");
            //console.log("hello");
        //console.log(result[0]);//error
        
        


    });

}

//new balance code

$("#balance").click(function() {

	
   
	var u_id=document.getElementById('user_key').value;

	TestingC.getUser(u_id,function(error, result){
		alert("Your account balance is "+result[4])
		console.log(result);//error



	});	



});

//View all fund requests
$("#view_all_request").click(function() {
	TestingC.getAllUserCount(function(error, result){
		html1='"<div class="funkyradio-success"><table class="table"><tr><td>ID</td><td>Name</td><td>Amount</td></tr>';
		for(var i=0;i<result.toString();i++){
			TestingC.get_user_details(i,function(error, result){	
				console.log(result);
				console.log(result[1].toString());	//votes
				console.log(result[0]);				//name
				console.log(result[2].toString());	//id
				var id=result[2].toString();
				var name=result[0];
				//html1=html1+"name+id";
				if(result[3]>0){
				html1+= '<tr><td>'+result[0]+'</td><td>'+result[1].toString()+'</td><td>'+result[2]+'</td></tr>';
				console.log(html1);
				$("#req_list").html(html1);
				}
			});

		}
		$("#req_list").html('</table></div>');
	});

})









//collect vote data
function voteCandidate(){			//$('#vote_list').change(function(){
	var radioValue = $("input[name='candidate']:checked").val();
	console.log(radioValue);
	var id=document.getElementById('voter_id').value;
	TestingC.getUser(id,function(error, result){
		console.log(result[6].toString()==0);
		if(result[6].toString()==0){
			TestingC.updateUser(id,function(error,result){
			TestingC.voteForCandidate(radioValue,function(error, result){
            var cnt =result.toString();
	});
})
}


});


}

//publish result
function publish_result(){	
	var i;		//$('#vote_list').change(function(){
	TestingC.getAllCandidatesCount(function(error, result){
		//console.log("count "+result.toString());
	for(i=0;i<result.toString();i++){
			TestingC.publishResult(i,function(error, result){
				console.log("hello result 	"+i);
				//alert("Result Published");
				
		});

	}
	var html1='<tr><th>Name</th><th>Vote</th></tr>';
	for(i=0;i<result.toString();i++){
		TestingC.allcandidatedetails(i,function(error, result){
			console.log(result[1].toString());	//votes
			console.log(result[0]);				//name
			console.log("id"+result[2].toString());	//id
			var id=result[2].toString();
			var name=result[0];
			//html1=html1+"name+id";
			TestingC.get_candidate_details(id,function(error, result){
			html1+= '<tr><td>'+result[0].toString()+'</td><td>'+result[1]+'</td></tr>';
			$("#result_data").html(html1);
			});
			console.log(result[2].toString());
			$("#result_data").html(html1+"</table>");
		
		});
	}
	


	});
	

}




