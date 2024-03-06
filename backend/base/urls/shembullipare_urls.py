from django.urls import path
from base.views import shembullipare_views as views


urlpatterns =[

    path('', views.getShembujtepare, name="shembujtepare"),

    path('create/', views.createShembullipare, name="shembullipare-create"),
    path('upload/', views.uploadImage, name="image-upload"),


    path('<str:pk>/', views.getShembullipare, name="shembullipare"),

    path('update/<str:pk>/', views.updateShembullipare, name="shembullipare-update"),
    path('delete/<str:pk>/', views.deleteShembullipare, name="shembullipare-delete"),
]