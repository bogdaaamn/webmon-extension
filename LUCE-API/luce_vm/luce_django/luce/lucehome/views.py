from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import get_template
from django.utils.http import is_safe_url
from accounts.models import User, Donation, Cause
from rest_framework import serializers, authentication, permissions
from rest_framework import generics
from rest_framework import filters


from django.http import JsonResponse
import json
from django.http import Http404
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status

# Access to Dataset model
from datastore.models import Dataset

# Access to forms
from accounts.forms import RegisterForm, LoginForm

# For login view:
from django.contrib.auth import authenticate, login, get_user_model

# For class-based views:
from django.views.generic import CreateView, FormView

# For redirect after form submission
from django.shortcuts import redirect
# Import newest versions of web3 scripts
from utils.web3_scripts import (
assign_address_v3,
deploy_contract_v3, 
publish_data_v3, 
add_requester_v3, 
update_contract_v3,
donate,
register_cause,
add_balance,
check_balance,
check_cause,
searchDonations
)

from .serializers import (
    UserSerializer, 
    PublicUserSerializer, 
    ContractSerializer, 
    CauseSerializer,
    DonationSerializer,
    PublicCauseSerializer, 
    PublicDonationSerializer)



# APIview for registering donors and influencers.
class RegisterUser(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data = request.data)
        validation = serializer.is_valid()
        if not validation: 
            return Response(serializer.errors)
        serializer = assign_address_v3(serializer)
        user_instance = serializer.save()
        tx_receipt = deploy_contract_v3(serializer)
        contract_address = tx_receipt.contractAddress
        user_instance.contract_address = contract_address
        user_instance.save()

        serializer = UserSerializer(user_instance)
        return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)

class FundUser(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, format=None):
        errors = {}
        if "amount" not in request.data:
            errors["amount"] = ["This field is required"]
        if errors:
            return Response(errors)
        
        user = request.user
        amount = request.data.get("amount")
        a = add_balance(user, amount)
        balance = check_balance(user)
        return Response({"message":"blance updatad successfully", "balance":balance})

#get a list of all users
class ListUsers(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    
    def get(self, request, format=None):
        queryset =  User.objects.all()
        serializer = PublicUserSerializer(queryset, many = True)
        return Response(serializer.data)

class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class InfluencerSearch(generics.ListAPIView):
    queryset = User.objects.filter(user_type = 0)
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicUserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["email", "first_name", "last_name", "ethereum_public_key"]
class DonorSearch(generics.ListAPIView):
    queryset = User.objects.filter(user_type = 1)
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicUserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["email", "first_name", "last_name", "ethereum_public_key"]
class UserSearch(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicUserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["email", "first_name", "last_name", "ethereum_public_key"]

#APIview for registering a cause
class RegisterCause(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, format=None):
        serializer = CauseSerializer(data = request.data, context = {"request":request})
        validation = serializer.is_valid()
        if not validation:
            return Response(serializer.errors)
        assign_address_v3(serializer)
        cause = serializer.save()
        print(register_cause(cause))
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CheckCause(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        errors = {}
        if "cause_id" not in request.data:
            errors["cause_id"] = ["This field is required"]
        if errors:
            return Response(errors)
        cause_id = request.data["cause_id"]
        causeObject = Cause.objects.filter(pk = cause_id)
        
        if not causeObject.exists():
            errors["cause_not_found"] = "no cause found with this id" 
        if errors:
            return Response(errors)
        
        cause = check_cause(user, causeObject.first())

        if cause[0] == False:
            errors["cause_not_found"] = "no cause found with this id in the blockchain"
        if errors:
            return Response(errors)

        response = {"cause_goal":cause[1], "cause_balance": cause[2], "cause_address": cause[3]}
        return Response(response)
        
        
        

class CauseSearch(generics.ListAPIView):
    queryset = Cause.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicCauseSerializer
    search_fields = ["title", "description", "ethereum_public_key"]
    
class CauseSearchByInfluencerID(generics.ListAPIView):
    queryset = Cause.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicCauseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["=creator__id"]
    
class CauseSearchByInfluencer(generics.ListAPIView):
    queryset = Cause.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicCauseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["creator__first_name", "creator__last_name", "creator__email"]
    


class createDonation(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, format=None):
        if Cause.objects.filter(pk = request.data.get('cause')).count()!=1:
            return Response({"error":"cause id not found"})
        user = request.user
        cause = Cause.objects.get(pk = request.data["cause"])
        donation_serializer = DonationSerializer(data = request.data, context = {"request":request})
        valid = donation_serializer.is_valid()
        if request.data.get('donor') != request.user.id:
            return Response({"error":"the donor id doesn't correspond to the authenticated user"})
        if not valid:
            return Response(donation_serializer.errors)
        logs = donate(validated_donation_serializer = donation_serializer, _user = request.user)
        donation_serializer.save()
        return Response({"donation":donation_serializer.data},status=status.HTTP_201_CREATED) 
  


class getDonation(APIView):
      def get(self, request, format=None):
        if "id" not in request.data:
            return Response({"errors":"id field is required"})
        donation = Donation.objects.filter(pk = request.data["id"])
        if not donation.exists():
            return Response({"errors":"id not found"})
        donation_serializer = PublicDonationSerializer(donation.first() , context = {"request":request})
        creator_id = donation_serializer.data["cause"]["creator"]["id"]
        donor_id = donation_serializer.data["donor"]["id"]

        creator = User.objects.get(pk = creator_id)
        donor = User.objects.get(pk = donor_id)

        searchDonations(donor, creator)
        return Response(donation_serializer.data)

class DonationSearchByCause(generics.ListAPIView):
    queryset = Donation.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicDonationSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["cause__title", "cause__description"]

class DonationSearchByCauseID(generics.ListAPIView):
    queryset = Donation.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicDonationSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["=cause__id"]

class DonationSearchByDonor(generics.ListAPIView):
    queryset = Donation.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicDonationSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["donor__email", "donor__first_name", "donor__last_name"]
class DonationSearchByDonorID(generics.ListAPIView):
    queryset = Donation.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicDonationSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["=donor__id"]

#this APIView is used to deploy contract
class DeployContract(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request, format=None):
        user_type = request.data.get('user_type')
        contract_serializer = ContractSerializer(data = request.data)
        user_serializer = UserSerializer(request.user)
        validation = contract_serializer.is_valid()
        if not validation:
            return Response(contract_serializer.errors)
        contract_address = deploy_contract_v3(user_serializer.data["ethereum_private_key"], contract_serializer.data["user_type"])
        return Response({"contract_address": contract_address, "user_type":user_type})


class LoginView(FormView):
    form_class = LoginForm
    template_name = 'accounts/login.html'
    success_url = '/'

    def form_valid(self, form):
        request = self.request
        next_ = request.GET.get('next')
        next_post = request.POST.get('next')
        redirect_path = next_ or next_post or None


        email = form.cleaned_data.get("email")
        password = form.cleaned_data.get("password")
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            try:
                del request.session['guest_email_id']
            except:
                pass
            if is_safe_url(redirect_path, request.get_host()):
                return redirect(redirect_path)
            else:
                return redirect('/')
        return super(LoginView, self).form_invalid(form)


class LoginView_PostReg(FormView):
    form_class = LoginForm
    template_name = 'accounts/login_post_reg.html'
    success_url = '/'

    def form_valid(self, form):
        request = self.request
        next_ = request.GET.get('next')
        next_post = request.POST.get('next')
        redirect_path = next_ or next_post or None


        email = form.cleaned_data.get("email")
        password = form.cleaned_data.get("password")
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            try:
                del request.session['guest_email_id']
            except:
                pass
            if is_safe_url(redirect_path, request.get_host()):
                return redirect(redirect_path)
            else:
                return redirect('/')
        return super(LoginView, self).form_invalid(form)


# Available scripts:
# create_wallet_old, fund_wallet, deploy_contract, assign_address
# assign_address_v3, deploy_contract_v3, publish_data_v3, add_requester_v3, update_contract_v3
def dev_view(request):

    # For testing make sure the current user has uploaded at least one dataset 
    dev_user = request.user # obtain current user
    if len(dev_user.datasets_owned.all()) >= 1:
        dev_dataset = dev_user.datasets_owned.all()[0] # Use first dataset that was uploaded by current user

    # Assign address & pre-fund
    if(request.GET.get('assign_address_v3')):
        # Pass user into web3 script
        current_user = dev_user
        # Script does work and passes updated user object back
        current_user = assign_address_v3(current_user)
        print(current_user)
        print(current_user.ethereum_public_key)
        print("Address was assigned to current user.")

    # Deploy contract
    if(request.GET.get('deploy_contract_v3')):
        current_user = dev_user
        print(current_user.ethereum_private_key)
        contract_address = deploy_contract_v3(current_user.ethereum_private_key)
        print(current_user)
        print("Contract address:", contract_address)
        # associate dev_dataset with deployed contract
        dev_dataset.contract_address = contract_address
        print(dev_dataset.contract_address)


    # Publish Data of dev_dataset to Smart Contract
    if(request.GET.get('publish_data_v3')):
        current_user = dev_user
        current_contract = dev_dataset.contract_address
        # Publish metadata to contract
        tx_receipt = publish_data_v3(
                        provider_private_key = current_user.ethereum_private_key, 
                        contract_address     = current_contract, 
                        description          = dev_dataset.description, 
                        license              = dev_dataset.license)
        print("Transaction receipt:\n", tx_receipt)



    # Add data requester to Smart Contract
    if(request.GET.get('add_requester_v3')):
        current_user = dev_user
        current_contract = dev_dataset.contract_address
        # Add data requester
        tx_receipt = add_requester_v3(
                        requester_private_key= current_user.ethereum_private_key, 
                        contract_address     = current_contract,
                        license              = dev_dataset.license)
        print("Transaction receipt:\n", tx_receipt)


    # Update Smart Contract
    if(request.GET.get('update_contract_v3')):
        current_user = dev_user
        current_contract = dev_dataset.contract_address
        # Update contract
        tx_receipt = publish_data_v3(
                        provider_private_key = current_user.ethereum_private_key, 
                        contract_address     = current_contract, 
                        description          = dev_dataset.description)
        print("Transaction receipt:\n", tx_receipt)




# First iteration functions:
    if(request.GET.get('assign_address')):
        # Pass request into web3 script

        current_user = request.user
        current_user = assign_address(current_user)
        # Save already takes place while assigning address
        # current_user.save()
        print(current_user)
        print(current_user.ethereum_public_key)
        print("Address was assigned to current user.")


    if(request.GET.get('deploy_contract')):
        current_user = request.user
        contract_address = deploy_contract(current_user)
        print("Contract address:")
        print(contract_address)   

    if(request.GET.get('create_wallet')):
        create_wallet_old()

    if(request.GET.get('mybtn')):
        print("The input value is: ", int(request.GET.get('mytextbox')) ) # or any other function

    context = {}
    template = 'dev.html'
    return render(request, template, context)
    