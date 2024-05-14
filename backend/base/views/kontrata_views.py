from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Puntori, Kontrata
from base.serializer import KontrataSerializer

from rest_framework import status

@api_view(["GET"])
def getKontratas(request):
    query = request.query_params.get("keyword")
    if query is None:
        query = ""
    kontratas = Kontrata.objects.filter(name__icontains=query).order_by("kontrataId")

    page = request.query_params.get("page", 1)
    paginator = Paginator(kontratas, 5)

    try:
        kontratas = paginator.page(page)
    except PageNotAnInteger:
        kontratas = paginator.page(1)
    except EmptyPage:
        kontratas = paginator.page(paginator.num_pages)

    if page is None:
        page = 1

    page = int(page)

    serializer = KontrataSerializer(kontratas, many=True)
    return Response(
        {"kontratas": serializer.data, "page": page, "pages": paginator.num_pages}
    )


@api_view(["GET"])
def getKontrata(request, pk):
    kontrata = Kontrata.objects.get(kontrataId=pk)
    serializer = KontrataSerializer(kontrata, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createKontrata(request):
    user = request.user

    name = request.data.get("name", "Kontrata Name")
    start_data = request.data.get("startData", None)  # Get 'startData' from request data

    kontrata = Kontrata.objects.create(
        user=user,
        name=name,
        startData=start_data  # Assign 'startData' if it's available
    )

    serializer = KontrataSerializer(kontrata)
    return Response(serializer.data)



@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateKontrata(request, pk):
    data = request.data
    puntori_id = data.get("puntoriId")

    try:
        puntori = Puntori.objects.get(pk=puntori_id)
    except Puntori.DoesNotExist:
        return Response(status=400)

    kontrata = Kontrata.objects.get(pk=pk)

    kontrata.name = data["name"]
    kontrata.startData = data.get("startData", kontrata.startData)  
    kontrata.puntoriId = puntori

    kontrata.save()

    serializer = KontrataSerializer(kontrata, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteKontrata(request, pk):
    kontrata = Kontrata.objects.get(pk=pk)
    kontrata.delete()
    return Response("Kontrata Deleted")


# @api_view(["POST"])
# def uploadImage(request):
#     data = request.data

#     kontrata_id = data["kontrata_id"]
#     kontrata = Kontrata.objects.get(_id=kontrata_id)

#     kontrata.image = request.FILES.get("image")
#     kontrata.save()

#     return Response("Image was uploaded")
