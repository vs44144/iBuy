from django.urls import path
from base.views import kontrata_views as views


urlpatterns =[

    path('', views.getKontratas, name="kontratas"),

    path('create/', views.createKontrata, name="kontrata-create"),
    # path('upload/', views.uploadImage, name="image-upload"),


    path('<str:pk>/', views.getKontrata, name="kontrata"),

    path('update/<str:pk>/', views.updateKontrata, name="kontrata-update"),
    path('delete/<str:pk>/', views.deleteKontrata, name="kontrata-delete"),
]