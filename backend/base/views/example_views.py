from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Example, Review
from base.serializer import ExampleSerializer

from rest_framework import status



@api_view(['GET'])
def getExamples(request):
    query = request.query_params.get('keyword')
    # print('Query:',query)

    if query == None:
        query = ''
    examples = Example.objects.filter(name__icontains=query).order_by('_id')

    page = request.query_params.get('page', 1)
    paginator = Paginator(examples, 5)

    try:
        examples = paginator.page(page)
    except PageNotAnInteger:
        examples = paginator.page(1)
    except EmptyPage:
        examples = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    
    serializer = ExampleSerializer(examples, many=True)
    return Response({'examples': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopExamples(request):
    examples = Example.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ExampleSerializer(examples, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getExample(request, pk):
    example = Example.objects.get(_id=pk)
    serializer = ExampleSerializer(example, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createExample(request):
    user = request.user

    example = Example.objects.create(
        user=user,
        name='Example Name',
        shembull=0,
        description=''
    )

    serializer = ExampleSerializer(example, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateExample(request, pk):
    data = request.data
    example = Example.objects.get(_id=pk)

    example.name = data['name']
    example.shembull = data['shembull']
    example.description = data['description']

    example.save()

    serializer = ExampleSerializer(example, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteExample(request, pk):
    example = Example.objects.get(_id=pk)
    example.delete()
    return Response('Example Deleted')



@api_view(['POST'])
def uploadImage(request):
    data = request.data

    example_id = data['example_id']
    example = Example.objects.get(_id=example_id)

    example.image = request.FILES.get('image')
    example.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createExampleReview(request, pk):
    user = request.user
    example = Example.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = example.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Example already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            example=example,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = example.review_set.all()
        example.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        example.rating = total / len(reviews)
        example.save()

        return Response('Review Added')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateExampleStock(request):
    data = request.data
    example_id = data['example_id']
    quantity = data['quantity']

    try:
        example = Example.objects.get(_id=example_id)
        if example.countInStock >= quantity:
            example.countInStock -= quantity
            example.save()
            return Response('Example stock updated successfully')
        else:
            return Response('Insufficient stock', status=status.HTTP_400_BAD_REQUEST)
    except Example.DoesNotExist:
        return Response('Example not found', status=status.HTTP_404_NOT_FOUND)