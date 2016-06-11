import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
