import * as screens from './utils/screens.js';
import * as api from './utils/api.js';

let form = document.getElementById('signup')

document.getElementById('influencer').addEventListener('click', async () => {
  //make API call
  // let data = [
  //   {
  //     'name': 'Campaign #1',
  //     'description':'This is the description',
  //     'donated': 250,
  //     'collected':300,
  //     'goal':500
  //   },
  //   {
  //     'name': 'Campaign food for Cats',
  //     'description':'Lets feed the susperior species',
  //     'donated': 5550,
  //     'collected': 500000000,
  //     'goal': 1000000000
  //   },
  //   {
  //     'name': 'Campaign food for dogs',
  //     'description':'I guess these beings also deserve some food?',
  //     'donated': 0.5,
  //     'collected': -12,
  //     'goal' :13
  //   }
  // ]
  let data = await api.getUserCauses();

  screens.createInfluencerScreen(data);

  //influencer_or_user.appendChild(create_new_campaign_div)
  document.getElementById('create_new_campaign_btn').addEventListener('click', () => {
    screens.createCampaignForm()
  });
});

document.getElementById('user').addEventListener('click', async () => {
  // let payload_user = [
  //   {
  //     'name': 'Campaign #1',
  //     'description':'This is the description',
  //     'donated': 250,
  //     'collected':300,
  //     'goal':500
  //   },
  //   {
  //     'name': 'Campaign food for Cats',
  //     'description':'Lets feed the superior species',
  //     'donated': 5550,
  //     'collected': 500000000,
  //     'goal': 1000000000
  //   },
  //   {
      // 'name': 'Campaign food for dogs',
      // 'description':'I guess these beings also deserve some food?',
      // 'donated': 0.5,
      // 'collected': -12,
      // 'goal' :13
  //   }
  // ]

  let user_donations = await api.getUserDonations();
  let data = user_donations.map(async donation => {
    const donation_data = await api.getCause(donation.cause)
    console.dir(donation);
    return {'value': donation.value, ...donation_data};
  })

  console.log(await Promise.all(data))

  screens.createUserScreen(await Promise.all(data));

  // right now it looks for any click in the details of the campaigns
  
  document.getElementById('donate_selected_campaign').addEventListener('click', () => {

    let payload = 
      {
        'title_campaign': 'Campaign #1',
        'description': 'Here goes the text that describes the pourpose of this campaign',
        'collected': 230,
        'goal' : 500
      }
    search_for_a_campaign_div.style.display = 'none'  

    let title_donation_h2 = document.createElement('h2')
    title_donation_h2.innerHTML = 'Donate to: ' + payload.title_campaign
    document.getElementsByTagName('body')[0].appendChild(title_donation_h2)

    details_campaign(payload);

    let donate_field_div = document.createElement('div')
    let donate_field_input = document.createElement('input')
    donate_field_input.id = 'donate_field_input'

    donate_field_input.placeholder = 'Amount to donate'

    donate_field_btn = document.createElement('button')
    donate_field_btn.type = 'search bar'
    donate_field_btn.innerHTML = 'Donate'

    donate_field_div.appendChild(donate_field_input)
    donate_field_div.appendChild(donate_field_btn)

    donate_field_div.append(next_line)

    document.getElementsByTagName('body')[0].appendChild(donate_field_div)
  });
});