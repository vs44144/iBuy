from django.urls import path
from base.views import planet_views as views


urlpatterns =[

    path('', views.getPlanets, name="planets"),

    path('create/', views.createPlanet, name="planet-create"),
    # path('upload/', views.uploadImage, name="image-upload"),


    path('<int:pk>/', views.getPlanet, name="planet"),

    path('update/<int:pk>/', views.updatePlanet, name="planet-update"),
    path('delete/<int:pk>/', views.deletePlanet, name="planet-delete"),
    path('get-satellites/', views.getAllSatellites, name="planet-get-satellites"),
]