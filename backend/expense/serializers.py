from .models import ExpenseTracker
from rest_framework import serializers

class ExpenseTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseTracker
        fields = ["id","expense_item", "expense_date", "expense_price"]

