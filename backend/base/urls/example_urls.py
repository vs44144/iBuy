from django.urls import path
from base.views import example_views as views


urlpatterns =[

    path('', views.getExamples, name="examples"),

    path('create/', views.createExample, name="example-create"),
    path('upload/', views.uploadImage, name="image-upload"),


    path('<str:pk>/', views.getExample, name="example"),

    path('update/<str:pk>/', views.updateExample, name="example-update"),
    path('delete/<str:pk>/', views.deleteExample, name="example-delete"),
]