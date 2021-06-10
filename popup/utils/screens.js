import * as api from './api.js';

export function sup() {
  console.log('yoooooo');
}

export function auth_screen() {
  cleanScreen()
  let root = document.getElementById('root')

  let log_in_div = document.createElement('div')
  log_in_div.id = 'log_in_div'

  let text_login_here = document.createElement('p')
  text_login_here.className = "uk-heading-small uk-margin-top";
  text_login_here.innerHTML = 'Login here'
  log_in_div.append(text_login_here)  

  let email_field = document.createElement('input');
  email_field.className = "uk-input uk-margin-small";
  email_field.placeholder = "Email";

  let password_field = document.createElement('input');
  password_field.className = "uk-input uk-margin-small";
  password_field.placeholder = "Password";
  
  let log_in_button = document.createElement('button');
  log_in_button.className = "uk-button uk-button-secondary uk-width-1-1 uk-margin-small"
  log_in_button.innerHTML = "Login";

  log_in_div.appendChild(email_field)
  log_in_div.appendChild(password_field)
  log_in_div.appendChild(log_in_button)

  let sign_up_text_div = document.createElement('div')
  sign_up_text_div.id = 'sign_up_text_div'

  let text_dont_have_acc_yet = document.createElement('p')
  text_dont_have_acc_yet.innerHTML = 'Dont have an account yet? <a id="sign_up_red_button">Sign up</a>.'

  sign_up_text_div.append(text_dont_have_acc_yet) 

  log_in_div.append(sign_up_text_div)
  
  root.appendChild(log_in_div)

  document.getElementById('sign_up_red_button').addEventListener('click', () => {
    cleanScreen()
    let root = document.getElementById('root')
    
    let sign_up_div = document.createElement('div')
    sign_up_div.id = 'sign_up_div'
    
    let sign_up_button = document.createElement('button')
    sign_up_button.innerHTML = 'Sign Up'
    sign_up_button.className = "uk-button uk-button-secondary uk-width-1-1 uk-margin-small"
    sign_up_button.id = 'sign_up_button'

    let text_register = document.createElement('p')
    text_register.className = "uk-heading-small uk-margin-top";
    text_register.innerHTML = 'Register'
    sign_up_div.append(text_register)  

    let first_name_field = document.createElement('input')
    first_name_field.className = "uk-input uk-width-1-2 uk-margin-small-bottom";
    first_name_field.placeholder = "First Name"

    let last_name_field = document.createElement('input')
    last_name_field.className = "uk-input uk-width-1-2 uk-margin-small-bottom";
    last_name_field.placeholder = "Last Name"

    sign_up_div.appendChild(first_name_field)
    sign_up_div.appendChild(last_name_field)

    sign_up_div.appendChild(email_field)
    sign_up_div.appendChild(password_field)

    let user_type_field = document.createElement('select')
    user_type_field.className = "uk-select uk-margin-small"

    let type_donor = document.createElement('option')
    type_donor.innerHTML = "Donor"

    let type_influencer = document.createElement('option')
    type_influencer.innerHTML = "Influencer"

    user_type_field.appendChild(type_donor)
    user_type_field.appendChild(type_influencer)
    sign_up_div.appendChild(user_type_field)
    
    sign_up_div.appendChild(sign_up_button)

    let log_in_text_div = document.createElement('div')
    log_in_text_div.id = 'log_in_text_div'
  
    let text_have_acc = document.createElement('p')
    text_have_acc.innerHTML = 'Already have an account? <a id="log_in_red_button">Login instead</a>.'
  
    log_in_text_div.append(text_have_acc) 
    sign_up_div.append(log_in_text_div)

    root.appendChild(sign_up_div)

    document.getElementById('log_in_red_button').addEventListener('click', (event) => {
      cleanScreen()
      auth_screen()
    })

    document.getElementById('sign_up_button').addEventListener('submit', (event) => {
      let email = event.target["email"].value
      let firstName = event.target["first_name"].value
      let lastName = event.target["last_name"].value
      let password = event.target["password"].value
      let user_type = event.target["user_type"].value
    })
  });
}

auth_screen()

export function details_campaign(campaign_details_data) {
  let root = document.getElementById('root');
  
  let details_donation_div = document.createElement('div')
  details_donation_div.id = "details_donation_div"

  let campaign_title = document.createElement('p');
  campaign_title.className = "uk-heading-small uk-margin-top";
  campaign_title.innerHTML = campaign_details_data.name

  let campaign_description = document.createElement('p')
  campaign_description.innerHTML = campaign_details_data.description

  let campaign_performance = document.createElement('p')
  campaign_performance.innerHTML = 'This campaign already recieved ' + campaign_details_data.donated + '$ out of the initial ' + campaign_details_data.goal + '$ collection goal'

  details_donation_div.appendChild(campaign_title)
  details_donation_div.appendChild(campaign_description)
  details_donation_div.append(campaign_performance)

  //let progress_meter = document.createElement('div')  progress_meter.setAttribute("class", "meter");  let progress_bar = document.createElement('span')  progress_bar.style.width = '25%'  progress_meter.append(progress_bar) details_donation_div.append(progress_meter)
  //let baack_btn = document.createElement('input');    baack_btn.type = 'submit'    baack_btn.value = 'Back'    details_donation_div.append(baack_btn)

  root.appendChild(details_donation_div)
}

function cleanScreen() {
  document.getElementById('sign_up_div') && (document.getElementById('sign_up_div').style.display = 'none');
  document.getElementById('log_in_div') && (document.getElementById('log_in_div').style.display = 'none');
  document.getElementById('donation_div') && (document.getElementById('donation_div').style.display = 'none');
  document.getElementById('details_donation_div') && (document.getElementById('details_donation_div').style.display = 'none');
  document.getElementById('influencer_div') && (document.getElementById('influencer_div').style.display = 'none');
  document.getElementById('new_campaign_div') && (document.getElementById('new_campaign_div').style.display = 'none');
  document.getElementById('user_div') && (document.getElementById('user_div').style.display = 'none');
}

export function createInfluencerScreen(payload) {
  console.log('button clicked')
  console.log(payload)

  cleanScreen()
  let root = document.getElementById('root')

  let create_new_campaign_div = document.createElement('div')
  create_new_campaign_div.id = "influencer_div"

  let previous_campaigns_div = document.createElement('div')
  previous_campaigns_div.id = "previous_campaigns_div"

  let title_previous_campaigns = document.createElement('p')
  title_previous_campaigns.className = "uk-heading-small uk-margin-top uk-margin-small";
  title_previous_campaigns.innerHTML = 'Your campaigns'

  previous_campaigns_div.append(title_previous_campaigns)

  let table_previous_campaigns = document.createElement('table')
  table_previous_campaigns.className = "uk-table uk-table-divider uk-margin-small"

  let table_head = document.createElement('thead');
  let table_head_row = document.createElement('tr');

  let head = document.createElement('th');
  head.innerHTML = 'Name';
  table_head_row.appendChild(head);

  head = document.createElement('th');
  head.innerHTML = 'Amount';
  table_head_row.appendChild(head);

  table_head.appendChild(table_head_row);

  let t_body = document.createElement('tbody')

  // generate the table
  payload.map((camp, index) => {
    //console.log(camp, index)
    let tr = document.createElement('tr')

    let td_name = document.createElement('td')
    td_name.innerHTML = camp.name;

    let td_value = document.createElement('td')
    td_value.innerHTML = `${camp.donated}$ don`

    let details_donation = document.createElement('button')
    details_donation.className = "uk-button uk-button-default uk-button-small"
    details_donation.id = 'details_campaign ' + index
    details_donation.innerHTML = 'more'
    let td_details = document.createElement('td');
    td_details.className = "uk-padding-remove-right"
    td_details.appendChild(details_donation);

    tr.appendChild(td_name)
    tr.appendChild(td_value)
    tr.appendChild(td_details)

    t_body.appendChild(tr)
  })

  table_previous_campaigns.append(table_head)
  table_previous_campaigns.appendChild(t_body)
  previous_campaigns_div.appendChild(table_previous_campaigns)
  create_new_campaign_div.appendChild(previous_campaigns_div)

  let create_new_campaign_btn = document.createElement('button')
  create_new_campaign_btn.className = "uk-button uk-button-secondary uk-width-1-1 uk-margin-small"
  create_new_campaign_btn.id = 'create_new_campaign_btn'
  create_new_campaign_btn.innerHTML = 'Create campaign'

  create_new_campaign_div.appendChild(create_new_campaign_btn)

  root.appendChild(create_new_campaign_div)

  document.querySelectorAll("[id^='details_campaign']").forEach((item, i) => {
    item.addEventListener('click', (e) => {
      cleanScreen()
      let root = document.getElementById('root')

      let details_donation_div = document.createElement('div')
      details_donation_div.id = "donation_div"

      let update_campaign = document.createElement('button')
      update_campaign.className = "uk-button uk-button-secondary uk-width-1-1 uk-margin-small"
      update_campaign.innerHTML = 'Update Campaign'

      details_campaign(payload[i]);

      details_donation_div.appendChild(update_campaign)
      root.appendChild(details_donation_div)
    })
  });
}

export function createUserScreen(payload_user) {
  console.log('user button clicked')

  cleanScreen()
  let root = document.getElementById('root')

  let search_for_a_campaign_div = document.createElement('div')
  search_for_a_campaign_div.className = "uk-inline uk-width-1-1"
  search_for_a_campaign_div.id = 'search_for_a_campaign_div'

  let search_for_a_campaign_btn = document.createElement('a')
  search_for_a_campaign_btn.className = 'uk-form-icon uk-form-icon-flip'
  search_for_a_campaign_btn.href = ""
  search_for_a_campaign_btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>'
  // search_for_a_campaign_btn.setAttribute("uk-icon", "icon: link")
  search_for_a_campaign_btn.id = 'search_bar_btn'

  let search_for_a_campaign_search_box = document.createElement('input')
  search_for_a_campaign_search_box.className = "uk-input"
  search_for_a_campaign_search_box.id = 'search'
  search_for_a_campaign_search_box.type = 'text'
  search_for_a_campaign_search_box.placeholder = 'Search for a campaign'

  search_for_a_campaign_div.appendChild(search_for_a_campaign_btn)
  search_for_a_campaign_div.appendChild(search_for_a_campaign_search_box)


  // end search for capaign

  let previous_campaigns_donated_div = document.createElement('div')
  previous_campaigns_donated_div.id = "user_div"

  let title_previous_campaigns_donated = document.createElement('p')
  title_previous_campaigns_donated.className = "uk-heading-small uk-margin-top uk-margin-small"
  title_previous_campaigns_donated.innerHTML = 'Your donations'

  previous_campaigns_donated_div.append(title_previous_campaigns_donated)

  let table_previous_campaigns_donated = document.createElement('table')
  table_previous_campaigns_donated.className = "uk-table uk-table-divider uk-margin-small"

  let table_head = document.createElement('thead');
  let table_head_row = document.createElement('tr');

  let head = document.createElement('th');
  head.innerHTML = 'Name';
  table_head_row.appendChild(head);

  head = document.createElement('th');
  head.innerHTML = 'Amount';
  table_head_row.appendChild(head);

  table_head.appendChild(table_head_row);

  let t_body = document.createElement('tbody')

  payload_user.map((camp, index) => {
    //console.log(camp, index)
    let tr = document.createElement('tr')

    let td_name = document.createElement('td')
    td_name.innerHTML = camp.name;

    let td_value = document.createElement('td')
    td_value.innerHTML = `${camp.value}$ don`

    let details_donation = document.createElement('button')
    details_donation.className = "uk-button uk-button-default uk-button-small"
    details_donation.id = 'details_donation ' + index
    details_donation.innerHTML = 'more'
    let td_details = document.createElement('td');
    td_details.className = "uk-padding-remove-right"
    td_details.appendChild(details_donation);

    tr.appendChild(td_name)
    tr.appendChild(td_value)
    tr.appendChild(td_details)

    t_body.appendChild(tr)
  })

  table_previous_campaigns_donated.appendChild(table_head)
  table_previous_campaigns_donated.appendChild(t_body)
  
  previous_campaigns_donated_div.appendChild(search_for_a_campaign_div)
  previous_campaigns_donated_div.appendChild(table_previous_campaigns_donated)
  

  root.appendChild(previous_campaigns_donated_div)

  document.querySelectorAll("[id^='details_donation']").forEach((item, i) => {
    item.addEventListener('click', (e) => {
      //document.getElementById('details_donation').addEventListener('click', () => {
      cleanScreen()

      let details_donation_div = document.createElement('div')
      let title_details_donation = document.createElement('h1')

      console.log(e, i)
      // give each of the rows an id so that its data is shown next

      //let campaign_details_data = {'title_campaign': 'Campaign #1','description': 'Here goes the text that describes the pourpose of this campaign','collected': 230,'goal' : 500 }

      details_campaign(payload_user[i]);
    })
  });
}

export function createCampaignForm() {
  console.log('new campaign button clicked')

  cleanScreen()
  let root = document.getElementById('root')

  let new_campaign_div = document.createElement('div')
  new_campaign_div.id = "new_campaign_div"

  let new_campaign_form = document.createElement('form')
  new_campaign_form.id = 'new campaign'

  let text_create_new_campaign = document.createElement('p')
  text_create_new_campaign.className = "uk-heading-small uk-margin-top";
  text_create_new_campaign.innerHTML = 'New campaign'

  let title_new_campaign = document.createElement('input')
  title_new_campaign.className = "uk-input uk-margin-small-bottom"
  title_new_campaign.placeholder = "Title"

  new_campaign_form.append(text_create_new_campaign)
  new_campaign_form.appendChild(title_new_campaign)

  let new_campaign_description = document.createElement('textarea')
  new_campaign_description.className = 'uk-textarea uk-margin-small-bottom'
  new_campaign_description.rows = '5'
  new_campaign_description.placeholder = 'Description'

  new_campaign_form.appendChild(new_campaign_description)

  let create_campaign_btn = document.createElement('input');
  create_campaign_btn.type = 'submit'
  create_campaign_btn.className = "uk-button uk-button-secondary uk-width-1-1 uk-margin-small"
  create_campaign_btn.value = 'Create campaign'

  create_campaign_btn.addEventListener('click', async (e) => {
    e.preventDefault()

    let form_data = {
      "title": title_new_campaign.value,
      "description": new_campaign_description.value
    };

    let result = await api.postUserCauses(form_data);

    let success_text = document.createElement('p');
    success_text.className = "uk-margin-small-top uk-margin-bottom"
    success_text.innerHTML = `<b>${result.name}</b> successfully added.`;
    new_campaign_form.appendChild(success_text)
  });

  new_campaign_form.appendChild(create_campaign_btn)

  //let header = document.getElementById('header')
  new_campaign_div.appendChild(new_campaign_form)
  //header.appendChild(new_campaign_div) 
  root.appendChild(new_campaign_div)
}