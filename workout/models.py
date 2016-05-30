from django.conf import settings
from django.db import models

# Create your models here.

class SetExercise(models.Model):
    title = models.CharField( max_length=255 )
    owner = models.ForeignKey( settings.AUTH_USER_MODEL )

    unique_together = (("title", "owner"),)

class Exercise(models.Model):
    priority = models.IntegerField( default=1 ) # for sorting
    title = models.CharField( max_length=255, unique=True)
    repeat = models.CharField( max_length=255, default=3)
    weight = models.FloatField() #in kg
    rest_time = models.IntegerField() #in seconds
    set_exercise = models.ForeignKey( 'SetExercise', on_delete = models.CASCADE, )

