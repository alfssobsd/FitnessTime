from django.conf.urls import url

from rest_framework import routers

from . import views


urlpatterns = []

router = routers.DefaultRouter()
router.register('exercise', views.Exercise)
router.register('group-exercise', views.GroupExercise)

urlpatterns += router.urls