from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Planet
from base.serializer import PlanetSerializer, SatelliteSerializer

from rest_framework import status


@api_view(["GET"])
def getPlanets(request):
    query = request.query_params.get("keyword")
    # print('Query:',query)

    if query == None:
        query = ""
    planets = Planet.objects.filter(name__icontains=query).order_by("planetId")

    page = request.query_params.get("page", 1)
    paginator = Paginator(planets, 5)

    try:
        planets = paginator.page(page)
    except PageNotAnInteger:
        planets = paginator.page(1)
    except EmptyPage:
        planets = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = PlanetSerializer(planets, many=True)
    return Response(
        {"planets": serializer.data, "page": page, "pages": paginator.num_pages}
    )


@api_view(["GET"])
def getPlanet(request, pk):
    planet = Planet.objects.get(planetId=pk)
    serializer = PlanetSerializer(planet, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createPlanet(request):
    user = request.user

    planet = Planet.objects.create(
        user=user,
        name="Planet Name",
        type="",
    )

    serializer = PlanetSerializer(planet, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updatePlanet(request, pk):
    data = request.data
    planet = Planet.objects.get(pk=pk)

    planet.name = data["name"]
    planet.type = data["description"]

    planet.save()

    serializer = PlanetSerializer(planet, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deletePlanet(request, pk):
    planet = Planet.objects.get(pk=pk)
    planet.delete()
    return Response("Planet Deleted")


@api_view(["GET"])
def getAllSatellites(request):
    planet_name = request.query_params.get("planet_name")

    try:
        planet = Planet.objects.get(name=planet_name)

        satellites = planet.satellites.all()

        data = SatelliteSerializer(satellites, many=True).data

        return Response(data, status=200)
    except Exception:
        return Response(status=400)
