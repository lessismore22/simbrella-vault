from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
import uuid


# Create your models here.
class User(AbstractUser):
    """Custom User model with additional fields for wallet system"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=255)
    phone_number = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    # password is inherited from AbstractUser
    
    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
        ('moderator', 'Moderator'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    is_active = models.BooleanField(default=True)
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number', 'first_name', 'last_name']
    
    class Meta:
        db_table = 'users'

class Wallet(models.Model):
    """Wallet model for managing user wallets"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wallets')
    
    WALLET_TYPE_CHOICES = [
        ('personal', 'Personal'),
        ('business', 'Business'),
        ('savings', 'Savings'),
    ]
    wallet_type = models.CharField(max_length=20, choices=WALLET_TYPE_CHOICES)
    wallet_name = models.CharField(max_length=100)
    balance = models.DecimalField(
        max_digits=15, 
        decimal_places=2, 
        default=0.00,
        validators=[MinValueValidator(0)]
    )
    
    CURRENCY_CHOICES = [
        ('NGN', 'Nigerian Naira'),
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('GBP', 'British Pound'),
    ]
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='NGN')
    is_active = models.BooleanField(default=True)
    is_frozen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'wallets'
        indexes = [
            models.Index(fields=['user', 'wallet_type']),
        ]
    
    def __str__(self):
        return f"{self.wallet_name} - {self.user.email}"

class Transaction(models.Model):
    """Transaction model for recording all transactions"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    
    TRANSACTION_TYPE_CHOICES = [
        ('transfer', 'Transfer'),
        ('deposit', 'Deposit'),
        ('withdrawal', 'Withdrawal'),
        ('payment', 'Payment'),
    ]
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES)
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('reversed', 'Reversed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    metadata = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'transactions'
        indexes = [
            models.Index(fields=['reference']),
            models.Index(fields=['status']),
            models.Index(fields=['transaction_type']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.reference} - {self.amount}"
    
    
    class Service(models.Model):
        """Services available in the system"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    service_name = models.CharField(max_length=100)
    
    SERVICE_TYPE_CHOICES = [
        ('airtime', 'Airtime'),
        ('data', 'Data'),
        ('electricity', 'Electricity'),
        ('cable_tv', 'Cable TV'),
        ('internet', 'Internet'),
    ]
    service_type = models.CharField(max_length=50, choices=SERVICE_TYPE_CHOICES)
    provider = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    api_endpoint = models.URLField(max_length=255, blank=True, null=True)
    configuration = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'services'
        indexes = [
            models.Index(fields=['service_type', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.service_name} - {self.provider}"

class Log(models.Model):
    """Audit logs for tracking system changes"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='audit_logs',
        null=True, 
        blank=True
    )
    action = models.CharField(max_length=100)
    resource_type = models.CharField(max_length=50, blank=True, null=True)
    resource_id = models.UUIDField(blank=True, null=True)
    old_values = models.JSONField(blank=True, null=True)
    new_values = models.JSONField(blank=True, null=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'audit_logs'
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['resource_type', 'resource_id']),
            models.Index(fields=['action']),
        ]
    
    def __str__(self):
        return f"{self.action} by {self.user} at {self.created_at}"