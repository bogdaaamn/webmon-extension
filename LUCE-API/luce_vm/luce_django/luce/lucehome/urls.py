from re import A
from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views
from django.views.decorators.csrf import csrf_exempt


# Import generic logout view
from django.contrib.auth.views import LogoutView


from .views import (
    RegisterUser, ListUsers,
    UserView,DeployContract,
    FundUser,
    RegisterCause, createDonation,
    UserSearch,getDonation,
    InfluencerSearch, DonorSearch,
    CauseSearch, CauseSearchByInfluencer, CauseSearchByInfluencerID,
    DonationSearchByCause,
    DonationSearchByDonor, DonationSearchByCauseID,
    DonationSearchByDonorID, 
    CheckCause, 
    RegisterGroup,
    ContractDonations,
    ContractGroups,
    CreateDonationToGroup,
    GroupSearch,
    DonorBalanceView,
    InfluecerBalanceView
    )

# Import settings to access environment variables 
from django.conf import settings

# Import view functions here
from search.views import search_view

from API.views import login

from lucehome.views import (
    
    dev_view,
    # register_view,

    LoginView,
    LoginView_PostReg,
    )

from datastore.views import (
	upload_view,
	browse_view,
    my_data_view,
    detail_view,
    update_view,
    # UpdateView,
    delete_view,
    publish_view,
    request_access_view,
    my_access_view,
    upload_success_view,
    publish_success_view,
    update_success_view,
    
	)


urlpatterns = [
    path('user/register/', RegisterUser.as_view(), name="user-register"),
    path('user/influencer/', InfluencerSearch.as_view(), name="influencer-serch"),
    path('user/fund/', FundUser.as_view(), name="fund"),
    path('user/donor/', DonorSearch.as_view(), name="donor-search"),
    path('user/all/', UserSearch.as_view(), name = "user-search-all"),
    path('api-token-auth/', views.obtain_auth_token, name = "api-token-auth") ,
    path('donation/create/', createDonation.as_view(), name = "donation-create"), 
    path('donation/create/group/', CreateDonationToGroup.as_view(), name = "donation to group"),
    path('donation/get/', getDonation.as_view(), name="donation-get"),
    path('donation/cause/', DonationSearchByCause.as_view(), name = "donation-search-by-cause"),
    path('donation/cause/id/', DonationSearchByCauseID.as_view(), name="donatoin-search-by-cause-id"),
    path('donation/donor/',DonationSearchByDonor.as_view(), name="donatoin-search-by-donor"),
    path('donation/donor/id/', DonationSearchByDonorID.as_view(),name="donatoin-search-by-donor-id"),
    path('user/', UserView.as_view()),
    path('cause/register/', RegisterCause.as_view(), name="cause-register"),
    path('cause/', CauseSearch.as_view(), name="cause-search"),
    path('cause/influencer/', CauseSearchByInfluencer.as_view(), name="cause-search-influencer"),
    path('cause/influencer/id/', CauseSearchByInfluencerID.as_view(), name="cause-search-influencer-id"),
    path('cause/check/', CheckCause.as_view(), name="check"),
    path('group/register/', RegisterGroup.as_view(), name="register group"),
    path('group/id/', GroupSearch.as_view(), name="group search"),
    path('contract/donations/', ContractDonations.as_view(), name="contract donations"),
    path('contract/groups/', ContractGroups.as_view(), name="contract"),
    path('contract/donor/balance', DonorBalanceView.as_view(), name="donor-balance"),
    path('contract/influencer/balance', InfluecerBalanceView.as_view(), name="influencer balance"),
    path('deploy/', DeployContract.as_view()),
    path('luce_admin/', admin.site.urls),
    path('login-uphold/', login),
    path('upload/', upload_view),
    path('browse/', browse_view),
    path('my_data/', my_data_view),
    path('my_access/', my_access_view),
    path('dev/', dev_view),
    path('search/', search_view),

    # path('register/', register_view),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),

    path('search/', search_view),

    # Post Registration/Upload Views
    path('register_login/', LoginView_PostReg.as_view()),
    # path('upload_success/', ),

    

    path('data/<int:dataset_id>/', detail_view),
    path('data/<int:dataset_id>/edit', update_view),
    path('data/<int:dataset_id>/delete', delete_view),
    path('data/<int:dataset_id>/publish', publish_view),
    path('data/<int:dataset_id>/request', request_access_view),
    path('data/<int:dataset_id>/upload_success', upload_success_view),
    path('data/<int:dataset_id>/publish_success', publish_success_view),
    path('data/<int:dataset_id>/update_success', update_success_view)
    # re_path(r'^data/(?P<slug>\w+)/$', detail_view)

    ]
urlpatterns = format_suffix_patterns(urlpatterns)


if settings.DEBUG:
    # Use local simulated CDN
    # Add the following to urlpatterns
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
