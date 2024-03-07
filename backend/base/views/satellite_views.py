from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Satellite
from base.serializer import SatelliteSerializer

from rest_framework import status



@api_view(['GET'])
def getSatellites(request):
    query = request.query_params.get('keyword')
    # print('Query:',query)

    if query == None:
        query = ''
    satellites = Satellite.objects.filter(name__icontains=query).order_by('satelliteId')

    page = request.query_params.get('page', 1)
    paginator = Paginator(satellites, 5)

    try:
        satellites = paginator.page(page)
    except PageNotAnInteger:
        satellites = paginator.page(1)
    except EmptyPage:
        satellites = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    
    serializer = SatelliteSerializer(satellites, many=True)
    return Response({'satellites': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getSatellite(request, pk):
    satellite = Satellite.objects.get(satelliteId=pk)
    serializer = SatelliteSerializer(satellite, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createSatellite(request):
    user = request.user

    satellite = Satellite.objects.create(
        user=user,
        name='Satellite Name',
        type='',
        isDeleted=''
    )

    serializer = SatelliteSerializer(satellite, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateSatellite(request, pk):
    data = request.data
    satellite = Satellite.objects.get(_id=pk)

    satellite.name = data['name']
    satellite.shembull = data['shembull']
    satellite.description = data['description']

    satellite.save()

    serializer = SatelliteSerializer(satellite, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteSatellite(request, pk):
    satellite = Satellite.objects.get(_id=pk)
    satellite.delete()
    return Response('Satellite Deleted')



@api_view(['POST'])
def uploadImage(request):
    data = request.data

    satellite_id = data['satellite_id']
    satellite = Satellite.objects.get(_id=satellite_id)

    satellite.image = request.FILES.get('image')
    satellite.save()

    return Response('Image was uploaded')