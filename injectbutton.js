import * as api from './api.js';

function details_campaign(campaign_details_data, popup_from_button, win) {
  let details_donation_div = document.createElement('div')

  details_donation_div.id = 'details_donation_div'

  let campaign_title = document.createElement('h3')
  campaign_title.innerHTML = campaign_details_data.name

  let campaign_description = document.createElement('p')
  campaign_description.innerHTML = campaign_details_data.description

  campaign_description.id = 'campaign_description'

  let campaign_performance = document.createElement('p')
  campaign_performance.innerHTML = 'This campaign already recieved ' + campaign_details_data.collected + '$ out of the initial ' + campaign_details_data.goal + '$ collection goal'

  details_donation_div.appendChild(campaign_title)
  let next_line = document.createElement('br')
  details_donation_div.appendChild(campaign_description)
  details_donation_div.appendChild(next_line)

  details_donation_div.append(campaign_performance)

  //let progress_meter = document.createElement('div')  progress_meter.setAttribute("class", "meter");  let progress_bar = document.createElement('span')  progress_bar.style.width = '25%'  progress_meter.append(progress_bar) details_donation_div.append(progress_meter)
  //let baack_btn = document.createElement('input');    baack_btn.type = 'submit'    baack_btn.value = 'Back'    details_donation_div.append(baack_btn)

  if (popup_from_button = 1)
  {
    win.document.getElementsByTagName('body')[0].appendChild(details_donation_div)
  }
  else
  {
    document.getElementsByTagName('body')[0].appendChild(details_donation_div)}
  }

//getEthereumPrice(0.2)

  function fnAddButtons() {
    var btn = document.createElement("button");
    btn.innerHTML = "Donate Using OUR EXTENSION"; 
    btn.className = "button2";
    
    btn.id = "our_ex";
  
    //like_button = document.getElementById("top-level-buttons");
    var like_button = document.getElementById("logo");
    
    like_button.appendChild(btn);
  }
  
  fnAddButtons();

 function new_window(){
    console.log('the button was clicked')
    var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=480,height=200,top="+(screen.height-400)+",left="+(screen.width-700));
      header = win.document.createElement('h1')

      header.innerHTML = "Don"

      let popup_from_button = 1
      let campaign_details_data = {'name': 'Campaign #1','description': 'Here goes the text that describes the pourpose of this campaign','collected': 230,'goal' : 500 }
      details_campaign(campaign_details_data, popup_from_button, win)

      let amount_to_donate = win.document.createElement('input')
      amount_to_donate.placeholder = "Amount to donate in $"
      amount_to_donate.id = 'amount_to_donate_input'
      //win.document.getElementsByTagName('body')[0].appendChild(amount_to_donate)        
      win.document.getElementById('campaign_description').append(document.createElement('br'))
      win.document.getElementById('campaign_description').append(document.createElement('br'))
      
      win.document.getElementById('campaign_description').append(amount_to_donate)        
      
      let donate_button = document.createElement('button')
      donate_button.innerHTML = 'Donate'
      donate_button.id = 'donate_btn'
      donate_button.type= 'submit'
      
      win.document.getElementById('campaign_description').append(donate_button)              
      
      win.document.getElementById('donate_btn').addEventListener('click', () => {

        console.log('Donate button clicked.')
        
        console.log(win.document.getElementById("amount_to_donate_input").value)
        win.document.getElementById('details_donation_div').style.display = "none"
        
        // amount introduced to be donated.
        
        let confirmation_message = win.document.createElement('h3')
        confirmation_message.id = 'confirmation_message'
        confirmation_message.innerHTML = 'You are about to donate ' +win.document.getElementById("amount_to_donate_input").value + '$ to '+ campaign_details_data['name'] 
        win.document.getElementsByTagName('body')[0].appendChild(confirmation_message)        

        //let confirmation_message_binary = 1
        //let dollar_amount_to_donate = win.document.getElementById("amount_to_donate_input").value
        //let cost_of_transaction = 
        //api.getEthereumPrice(20, 1,win) 

        let confirm_donation_button = document.createElement('button')
        confirm_donation_button.innerHTML = 'Make Donation'
        confirm_donation_button.id = 'confirm_donation_button'
        confirm_donation_button.type= 'submit'
        
        win.document.getElementById('confirmation_message').append(confirm_donation_button)                     

        win.document.getElementById('confirm_donation_button').addEventListener('click', () => {

        let thank_you_message = document.createElement('h1')
        thank_you_message.innerHTML = 'Thank you for your donation!'

        
        win.document.getElementsByTagName('body')[0].appendChild(thank_you_message)                            
        
        })
        
        });
      }
var button = document.getElementById("our_ex")
button.addEventListener('click', new_window)

      // document.addEventListener('DOMContentLoaded',  () => {
//            //add event listener if its loaded
// var button = document.getElementById("our_ex")
// button.addEventListener('click', new_window)
// })