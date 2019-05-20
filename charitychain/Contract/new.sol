pragma solidity ^0.5.0;

contract sample
{
	struct user {
        string name;
        string email;
        string phone;
        string pass;
        uint256 balance;
        uint256 flag;
        uint256 reqamt;
        uint256 camt;
        uint256 pcnt;
     
    }
    struct Proposal {
        address investor;
        uint256 iamt;
    }

    Proposal[] public proposalList;
    mapping(address => user) m_user;
    mapping(address => uint[]) public prop_map;
    address[] public candidate_key; 

        //candidate_list [] public m_candidate_list;
    
    function newUser (address _key,string memory _name, string memory _email, string memory _phone, string memory _pass,uint256 _balance, uint256 _flag,uint256 _reqamt,uint256 _camt,uint256 _pcnt) public {
        m_user[_key] = user(_name,_email,_phone,_pass,_balance,_flag,_reqamt,_camt,_pcnt);
        candidate_key.push(_key);
    }
    
    function getUser(address _key) public view returns(string memory,string memory,string memory,string memory,uint256,uint256,uint256) {
        return (m_user[_key].name,m_user[_key].email,m_user[_key].phone, m_user[_key].pass,m_user[_key].balance,m_user[_key].reqamt,m_user[_key].camt);
    }
    function sendMoney(address _from, address _to, uint256 _amount) public {
        if(m_user[_to].flag==1){
            if((m_user[_to].camt) >= m_user[_to].reqamt){
                for(uint i=0; i < m_user[_to].pcnt; i++){
                    uint id= prop_map[_to][i];
                    m_user[proposalList[id].investor].balance-=proposalList[id].iamt;
                    m_user[_to].balance+=proposalList[id].iamt;
                }
                m_user[_to].flag-=1;
                m_user[_to].pcnt-=m_user[_to].pcnt;
                m_user[_to].reqamt-=m_user[_to].reqamt;
                m_user[_to].camt-=m_user[_to].camt;
            }
            else{
                proposalList.push(Proposal(_from,_amount));
                prop_map[_to].push(proposalList.length-1);
                m_user[_to].pcnt+=1;
                m_user[_to].camt+=_amount;
            }
            
        }
        else{
        m_user[_from].balance-=_amount;
        m_user[_to].balance+=_amount;
        }
    }
    
    function reqMoney(address _from,uint256 requestamt) public{
        
        m_user[_from].flag+=1;
        m_user[_from].reqamt+=requestamt;
        
    }
     function getAllUserCount() external view returns (uint256) {
        return candidate_key.length;          //return the count of users
    }
      function get_user_details(uint256 _c_id)  public view returns(address,string memory,uint256,uint256){
        return (candidate_key[_c_id], m_user[candidate_key[_c_id]].name,m_user[candidate_key[_c_id]].reqamt,m_user[candidate_key[_c_id]].flag);
    }
    
}

