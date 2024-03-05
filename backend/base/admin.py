from django.contrib import admin
from .models import *

class ProductAdmin(admin.ModelAdmin):
    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        initial['image'] = '/static/images/placeholder.jpg'
        return initial

admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(Example)
