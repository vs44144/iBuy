from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import ShembulliPare
from base.serializer import ShembulliPareSerializer

from rest_framework import status



@api_view(['GET'])
def getShembujtepare(request):
    query = request.query_params.get('keyword')
    # print('Query:',query)

    if query == None:
        query = ''
    shembujtepare = ShembulliPare.objects.filter(name__icontains=query).order_by('shembulliPareId')

    page = request.query_params.get('page', 1)
    paginator = Paginator(shembujtepare, 5)

    try:
        shembujtepare = paginator.page(page)
    except PageNotAnInteger:
        shembujtepare = paginator.page(1)
    except EmptyPage:
        shembujtepare = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    
    serializer = ShembulliPareSerializer(shembujtepare, many=True)
    return Response({'shembujtepare': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getShembullipare(request, pk):
    shembullipare = ShembulliPare.objects.get(shembulliPareId=pk)
    serializer = ShembulliPareSerializer(shembullipare, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createShembullipare(request):
    user = request.user

    shembullipare = ShembulliPare.objects.create(
        user=user,
        name='Shembulli i Pare',
        shembull=0,
        type=''
    )

    serializer = ShembulliPareSerializer(shembullipare, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateShembullipare(request, pk):
    data = request.data
    shembullipare = ShembulliPare.objects.get(shembulliPareId=pk)

    shembullipare.name = data['name']
    shembullipare.type = data['type']

    shembullipare.save()

    serializer = ShembulliPareSerializer(shembullipare, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteShembullipare(request, pk):
    shembullipare = ShembulliPare.objects.get(shembulliPareId=pk)
    shembullipare.delete()
    return Response('Shembulli Pare Deleted')



@api_view(['POST'])
def uploadImage(request):
    data = request.data

    shembullipare_id = data['shembullipare_id']
    shembullipare = ShembulliPare.objects.get(shembulliPareId=shembullipare_id)

    shembullipare.image = request.FILES.get('image')
    shembullipare.save()

    return Response('Image was uploaded')


