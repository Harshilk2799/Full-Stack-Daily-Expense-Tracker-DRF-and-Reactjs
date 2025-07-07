from .serializers import ExpenseTrackerSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import ExpenseTracker
from rest_framework.permissions import IsAuthenticated


class AddExpenseTrackerAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = ExpenseTrackerSerializer(data=request.data)
        print("Data: ", request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "Add Expense Successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
class ManageExpenseTrackerAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print(request.user)
        expenses = ExpenseTracker.objects.filter(user=request.user)
        serializer = ExpenseTrackerSerializer(expenses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EditExpenseTrackerAPI(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, expense_id):
        try:
            expense = ExpenseTracker.objects.get(id=expense_id)
        except ExpenseTracker.DoesNotExist:
            return Response({"error": "expense is not found!"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ExpenseTrackerSerializer(expense, data=request.data ,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Edit Expense Successfully!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteExpenseTrackerAPI(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, expense_id):
        print("Delete..")
        try:
            expense = ExpenseTracker.objects.get(id=expense_id)
            expense.delete()
            return Response({"message": "Delete Expense Successfully!"}, status=status.HTTP_204_NO_CONTENT)
        
        except ExpenseTracker.DoesNotExist:
            return Response({"error": "expense is not found!"}, status=status.HTTP_404_NOT_FOUND)
 
class SearchExpenseTrackerAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        from_date = request.query_params.get("from")
        to_date = request.query_params.get("to")

        expense_data = ExpenseTracker.objects.filter(user = request.user,expense_date__range=[from_date, to_date])

        total_price = sum([expense.expense_price for expense in expense_data])
        serializer = ExpenseTrackerSerializer(expense_data, many=True)
        return Response({"expenses": serializer.data, "total_price": total_price}, status=status.HTTP_200_OK)