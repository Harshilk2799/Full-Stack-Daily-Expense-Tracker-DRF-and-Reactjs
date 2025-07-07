from django.contrib import admin
from expense.models import ExpenseTracker

@admin.register(ExpenseTracker)
class ExpenseTrackerAdmin(admin.ModelAdmin):
    list_display = ["id", "user__first_name", "expense_item", "expense_date", "expense_price"]