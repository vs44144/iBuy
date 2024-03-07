from django.urls import path
from base.views import satellite_views as views


urlpatterns =[

    path('', views.getSatellites, name="satellites"),

    path('create/', views.createSatellite, name="satellite-create"),
    # path('upload/', views.uploadImage, name="image-upload"),


    path('<str:pk>/', views.getSatellite, name="satellite"),

    path('update/<str:pk>/', views.updateSatellite, name="satellite-update"),
    path('delete/<str:pk>/', views.deleteSatellite, name="satellite-delete"),
]