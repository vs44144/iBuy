from django.urls import path
from base.views import puntori_views as views


urlpatterns =[

    path('', views.getPuntoris, name="puntoris"),

    path('create/', views.createPuntori, name="puntori-create"),
    # path('upload/', views.uploadImage, name="image-upload"),


    path('<int:pk>/', views.getPuntori, name="puntori"),

    path('update/<int:pk>/', views.updatePuntori, name="puntori-update"),
    path('delete/<int:pk>/', views.deletePuntori, name="puntori-delete"),
    path('get-kontratas/', views.getAllKontratas, name="puntori-get-kontratas"),
]