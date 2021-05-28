export function sup() {
  console.log('yoooooo');
}

export function auth_screen() {

  let root = document.getElementById('root')

  let log_in_div = document.createElement('div')
  log_in_div.id = 'log_in_div'

  let text_login_here = document.createElement('p')
  text_login_here.innerHTML = 'Login here'
  log_in_div.append(text_login_here)  

  let email_field = document.createElement('input')
  email_field.placeholder = "Email"

  let password_field = document.createElement('input')
  password_field.placeholder = "Password"
  
  let log_in_button = document.createElement('button')
  log_in_button.innerHTML = 'Login'

  log_in_div.appendChild(email_field)
  
  log_in_div.appendChild(password_field)
  
  log_in_div.appendChild(document.createElement("br"))
  log_in_div.appendChild(document.createElement("br"))
  
  log_in_div.appendChild(log_in_button)

  let text_dont_have_acc_yet = document.createElement('p')
  text_dont_have_acc_yet.innerHTML = 'Dont have an account yet?'
  log_in_div.appendChild(document.createElement("br"))

  let sign_up_button = document.createElement('button')
  sign_up_button.innerHTML = 'Sign up'  
  sign_up_button.id = 'sign_up_button'

  log_in_div.append(text_dont_have_acc_yet)  
  log_in_div.append(sign_up_button)  
  
  root.appendChild(log_in_div)


  document.getElementById('sign_up_button').addEventListener('click', () => {

    log_in_div.style.display = "none"
    
    let sign_up_div = document.createElement('div')
    sign_up_div.id = 'sign_up_div'
    
    let sign_up_button = document.createElement('button')
    sign_up_button.innerHTML = 'Sign Up'

    sign_up_button.id = 'sign_up_button'
  
    sign_up_div.appendChild(email_field)
    
    sign_up_div.appendChild(password_field)
    
    sign_up_div.appendChild(document.createElement("br"))
    
    let first_name_field = document.createElement('input')
    first_name_field.placeholder = "First Name"

    let last_name_field = document.createElement('input')
    last_name_field.placeholder = "Last Name"

    let user_type_field = document.createElement('input')
    user_type_field.type = 'radio'
    user_type_field.name = 'user_type'
    user_type_field.value = 0
    user_type_field.checked

    let user_type__donor_label = document.createElement('label')
    user_type__donor_label.for = 'user_type'
    user_type__donor_label.innerHTML = 'Donor'

    let user_type_field_ = document.createElement('input')
    user_type_field_.type = 'radio'
    user_type_field_.name = 'dewey'
    user_type_field_.value = 1

    let user_type__influencer_label = document.createElement('label')
    user_type__influencer_label.for = 'dewey'
    user_type__influencer_label.innerHTML = 'Influencer'

    
    sign_up_div.appendChild(first_name_field)
    sign_up_div.appendChild(last_name_field)
    sign_up_div.appendChild(document.createElement("br"))
    sign_up_div.appendChild(user_type_field)
    
    sign_up_div.appendChild(user_type__donor_label)
    sign_up_div.appendChild(user_type_field_  )
    
    sign_up_div.appendChild(user_type__influencer_label)
    
    sign_up_div.appendChild(document.createElement("br"))
    
    sign_up_div.appendChild(sign_up_button)

    root.appendChild(sign_up_div)
  
  });

  document.getElementById('sign_up_button').addEventListener('submit', (event) => {
    let email = event.target["email"].value
    let firstName = event.target["first_name"].value
    let lastName = event.target["last_name"].value
    let password = event.target["password"].value
    let user_type = event.target["user_type"].value
  
    
  
  })
}

auth_screen()

export function details_campaign(campaign_details_data) {
  let details_donation_div = document.createElement('div')

  let campaign_title = document.createElement('h3')
  campaign_title.innerHTML = campaign_details_data.name

  let campaign_description = document.createElement('p')
  campaign_description.innerHTML = campaign_details_data.description

  let campaign_performance = document.createElement('p')
  campaign_performance.innerHTML = 'This campaign already recieved ' + campaign_details_data.collected + '$ out of the initial ' + campaign_details_data.goal + '$ collection goal'

  details_donation_div.appendChild(campaign_title)
  let next_line = document.createElement('br')
  details_donation_div.appendChild(campaign_description)
  details_donation_div.appendChild(next_line)

  details_donation_div.append(campaign_performance)

  //let progress_meter = document.createElement('div')  progress_meter.setAttribute("class", "meter");  let progress_bar = document.createElement('span')  progress_bar.style.width = '25%'  progress_meter.append(progress_bar) details_donation_div.append(progress_meter)
  //let baack_btn = document.createElement('input');    baack_btn.type = 'submit'    baack_btn.value = 'Back'    details_donation_div.append(baack_btn)

  document.getElementsByTagName('body')[0].appendChild(details_donation_div)
}

export function createInfluencerScreen(payload) {
  console.log('button clicked')
  console.log(payload)

  document.getElementById('root').style.display = 'none'
  document.getElementById('signup_form').style.display = 'none'

  let create_new_campaign_div = document.createElement('div')
  let create_new_campaign_btn = document.createElement('button')
  create_new_campaign_div.id = 'new_campaign'

  create_new_campaign_btn.id = 'create_new_campaign_btn'

  let text_btn = document.createElement('h1')
  text_btn.innerHTML = 'Create a Campaign'

  create_new_campaign_btn.appendChild(text_btn)

  create_new_campaign_div.appendChild(create_new_campaign_btn)

  let previous_campaigns_div = document.createElement('div')
  previous_campaigns_div.id = "previous_campaigns_div"
  let title_previous_campaigns = document.createElement('h3')
  title_previous_campaigns.innerHTML = 'Campaigns you started'

  previous_campaigns_div.append(title_previous_campaigns)

  let table_previous_campaigns = document.createElement('table')

  let t_body = document.createElement('tbody')

  // generate the table
  payload.map((camp, index) => {
    //console.log(camp, index)
    let tr = document.createElement('tr')

    let td_name = document.createElement('td')
    td_name.innerHTML = camp.name;

    let td_value = document.createElement('td')
    td_value.innerHTML = `${camp.donated}$ donated`

    let details_donation = document.createElement('button')
    details_donation.id = 'details_campaign ' + index
    details_donation.innerHTML = 'details'
    td_value.appendChild(details_donation)

    tr.appendChild(td_name)
    tr.appendChild(td_value)

    t_body.appendChild(tr)
  })

  table_previous_campaigns.appendChild(t_body)
  previous_campaigns_div.appendChild(table_previous_campaigns)

  create_new_campaign_div.appendChild(previous_campaigns_div)

  let next_line = document.createElement('br')
  document.getElementsByTagName('body')[0].appendChild(next_line)
  document.getElementsByTagName('body')[0].appendChild(create_new_campaign_div)

  document.querySelectorAll("[id^='details_campaign']").forEach((item, i) => {
    item.addEventListener('click', (e) => {

      //document.getElementById('details_donation').addEventListener('click', () => {
      create_new_campaign_div.style.display = 'none'
      let details_donation_div = document.createElement('div')
      let title_details_donation = document.createElement('h1')

      console.log(e, i)

      title_details_donation.innerHTML = 'You started the ' + payload[i].name + ' campaign'

      //let h1_title_campaign = document.createElement('h1')    h1_title_campaign.innerHTML = payload_user[i].name    h1_title_campaign.style.textAlign = 'center'

      //document.getElementsByTagName('body')[0].appendChild(h1_title_campaign)
      document.getElementsByTagName('body')[0].appendChild(title_details_donation)

      let update_campaign_div = document.createElement('div')
      let update_campaign = document.createElement('button')
      update_campaign.innerHTML = 'Update Campaign'
      update_campaign_div.appendChild(update_campaign)
      document.getElementsByTagName('body')[0].appendChild(update_campaign_div)

      details_campaign(payload[i]);
    })
  });
}

export function createUserScreen(payload_user) {
  console.log('user button clicked')

  // search for a campaign
  document.getElementById('root').style.display = 'none'
  document.getElementById('signup_form').style.display = 'none'

  let search_for_a_campaign_div = document.createElement('div')
  let search_for_a_campaign_search_box = document.createElement('input')
  search_for_a_campaign_div.id = 'search_for_a_campaign_div'

  search_for_a_campaign_search_box.id = 'search'
  search_for_a_campaign_search_box.type = 'search'
  search_for_a_campaign_search_box.placeholder = 'Search for a campaign'

  let search_for_a_campaign_btn = document.createElement('button')
  search_for_a_campaign_btn.type = 'search bar'
  search_for_a_campaign_btn.id = 'search_bar_btn'

  let image_search = document.createElement('img')
  image_search.id = 'image_search'
  image_search.src = 'search.png'

  search_for_a_campaign_btn.appendChild(image_search)
  search_for_a_campaign_div.appendChild(search_for_a_campaign_search_box)
  search_for_a_campaign_div.appendChild(search_for_a_campaign_btn)

  let next_line = document.createElement('br')
  search_for_a_campaign_div.appendChild(next_line)

  let donate_selected_campaign = document.createElement('button')
  donate_selected_campaign.id = 'donate_selected_campaign'
  donate_selected_campaign.innerHTML = 'Selected campaign'

  search_for_a_campaign_div.appendChild(donate_selected_campaign)

  document.getElementsByTagName('body')[0].appendChild(search_for_a_campaign_div)

  // end search for capaign

  let previous_campaigns_donated_div = document.createElement('div')
  previous_campaigns_donated_div.id = "previous_campaigns_donated_div"
  let title_previous_campaigns_donated = document.createElement('h3')
  title_previous_campaigns_donated.innerHTML = 'Campaigns you donated to'

  previous_campaigns_donated_div.append(title_previous_campaigns_donated)

  let table_previous_campaigns_donated = document.createElement('table')

  let t_body = document.createElement('tbody')

  payload_user.map((camp, index) => {
    //console.log(camp, index)
    let tr = document.createElement('tr')

    let td_name = document.createElement('td')
    td_name.innerHTML = camp.name;

    let td_value = document.createElement('td')
    td_value.innerHTML = `${camp.donated}$ donated`

    let details_donation = document.createElement('button')
    details_donation.id = 'details_donation ' + index
    details_donation.innerHTML = 'details'
    td_value.appendChild(details_donation)

    tr.appendChild(td_name)
    tr.appendChild(td_value)

    t_body.appendChild(tr)
  })

  table_previous_campaigns_donated.appendChild(t_body)
  previous_campaigns_donated_div.appendChild(table_previous_campaigns_donated)
  search_for_a_campaign_div.appendChild(previous_campaigns_donated_div)

  document.querySelectorAll("[id^='details_donation']").forEach((item, i) => {
    item.addEventListener('click', (e) => {
      //document.getElementById('details_donation').addEventListener('click', () => {
      search_for_a_campaign_div.style.display = 'none'
      let details_donation_div = document.createElement('div')
      let title_details_donation = document.createElement('h1')

      console.log(e, i)
      // give each of the rows an id so that its data is shown next

      //let campaign_details_data = {'title_campaign': 'Campaign #1','description': 'Here goes the text that describes the pourpose of this campaign','collected': 230,'goal' : 500 }

      title_details_donation.innerHTML = 'You donated ' + payload_user[i].donated + '$ to ' + payload_user[i].name

      //let h1_title_campaign = document.createElement('h1')    h1_title_campaign.innerHTML = payload_user[i].name    h1_title_campaign.style.textAlign = 'center'

      //document.getElementsByTagName('body')[0].appendChild(h1_title_campaign)
      document.getElementsByTagName('body')[0].appendChild(title_details_donation)

      details_campaign(payload_user[i]);
    })
  });
}

export function createCampaignForm() {
  console.log('new campaign button clicked')

    previous_campaigns_div.style.display = "none"
    create_new_campaign_btn.style.display = 'none'

    let new_campaign_div = document.createElement('div')
    let new_campaign_form = document.createElement('form')
    new_campaign_form.id = 'new campaign'

    let text_create_new_campaign = document.createElement('h1')
    text_create_new_campaign.innerHTML = 'New Campaign'

    let title_new_campaign = document.createElement('input')

    title_new_campaign.placeholder = "Title"

    new_campaign_form.append(text_create_new_campaign)
    new_campaign_form.appendChild(title_new_campaign)

    let next_line = document.createElement('br')

    new_campaign_form.appendChild(next_line)

    let new_campaign_description = document.createElement('input')
    new_campaign_description.id = 'new_campaign_input'
    new_campaign_description.placeholder = 'Description'

    new_campaign_form.appendChild(new_campaign_description)

    new_campaign_form.appendChild(next_line)

    let back_btn = document.createElement('input');
    back_btn.type = 'submit'
    back_btn.value = 'Back'

    let create_campaign_btn = document.createElement('input');
    create_campaign_btn.type = 'submit'
    create_campaign_btn.value = 'Create Campaign'

    new_campaign_form.appendChild(back_btn)
    new_campaign_form.appendChild(create_campaign_btn)

    //let header = document.getElementById('header')
    new_campaign_div.appendChild(new_campaign_form)
    //header.appendChild(new_campaign_div) 
    document.getElementsByTagName('body')[0].appendChild(new_campaign_div)
}