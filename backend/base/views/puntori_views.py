from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Puntori
from base.serializer import PuntoriSerializer, KontrataSerializer

from rest_framework import status


@api_view(["GET"])
def getPuntoris(request):
    query = request.query_params.get("keyword")
    # print('Query:',query)

    if query == None:
        query = ""
    puntoris = Puntori.objects.filter(name__icontains=query).order_by("puntoriId")

    page = request.query_params.get("page", 1)
    paginator = Paginator(puntoris, 5)

    try:
        puntoris = paginator.page(page)
    except PageNotAnInteger:
        puntoris = paginator.page(1)
    except EmptyPage:
        puntoris = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = PuntoriSerializer(puntoris, many=True)
    return Response(
        {"puntoris": serializer.data, "page": page, "pages": paginator.num_pages}
    )


@api_view(["GET"])
def getPuntori(request, pk):
    puntori = Puntori.objects.get(puntoriId=pk)
    serializer = PuntoriSerializer(puntori, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createPuntori(request):
    user = request.user
    # data = request.data  

    puntori = Puntori.objects.create(
        user=user,
        name='Emri Puntorit'
    )

    serializer = PuntoriSerializer(puntori, many=False)
    return Response(serializer.data)



@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updatePuntori(request, pk):
    data = request.data
    puntori = Puntori.objects.get(puntoriId=pk)

    puntori.name = data["name"]


    puntori.save()

    serializer = PuntoriSerializer(puntori, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deletePuntori(request, pk):
    puntori = Puntori.objects.get(pk=pk)
    puntori.delete()
    return Response("Puntori Deleted")


@api_view(["GET"])
def getAllKontratas(request):
    puntori_name = request.query_params.get("puntori_name")

    try:
        puntori = Puntori.objects.get(name=puntori_name)

        kontratas = puntori.kontratas.all()

        data = KontrataSerializer(kontratas, many=True).data

        return Response(data, status=200)
    except Exception:
        return Response(status=400)
